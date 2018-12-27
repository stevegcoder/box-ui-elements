/**
 * @was-flow
 * @file Content Explorer Component
 * @author Box
 */
import 'regenerator-runtime/runtime';
import { Component } from 'react';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import noop from 'lodash/noop';
import uniqueid from 'lodash/uniqueId';
import cloneDeep from 'lodash/cloneDeep';
import API from '../../api';
import makeResponsive from '../makeResponsive';
import openUrlInsideIframe from '../../util/iframe';
import { isFocusableElement, isInputElement, focus } from '../../util/dom';
import { DEFAULT_HOSTNAME_UPLOAD, DEFAULT_HOSTNAME_API, DEFAULT_HOSTNAME_APP, DEFAULT_HOSTNAME_STATIC, DEFAULT_SEARCH_DEBOUNCE, SORT_ASC, FIELD_NAME, DEFAULT_ROOT, VIEW_SEARCH, VIEW_FOLDER, VIEW_ERROR, VIEW_RECENTS, TYPE_FILE, TYPE_WEBLINK, TYPE_FOLDER, CLIENT_NAME_CONTENT_EXPLORER, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, DEFAULT_VIEW_FILES, DEFAULT_VIEW_RECENTS, ERROR_CODE_ITEM_NAME_INVALID, ERROR_CODE_ITEM_NAME_TOO_LONG, TYPED_ID_FOLDER_PREFIX, } from '../../constants';
import '../fonts.scss';
import '../base.scss';
import '../modal.scss';
class ContentExplorer extends Component {
    /**
     * [constructor]
     *
     * @private
     * @return {ContentExplorer}
     */
    constructor(props) {
        super(props);
        this.firstLoad = true; // Keeps track of very 1st load
        /**
         * Network error callback
         *
         * @private
         * @param {Error} error error object
         * @return {void}
         */
        this.errorCallback = (error) => {
            this.setState({
                view: VIEW_ERROR,
            });
            /* eslint-disable no-console */
            console.error(error);
            /* eslint-enable no-console */
        };
        /**
         * Refreshing the item collection depending upon the view.
         * Navigation event is prevented.
         *
         * @private
         * @return {void}
         */
        this.refreshCollection = () => {
            const { currentCollection: { id }, view, searchQuery, } = this.state;
            if (view === VIEW_FOLDER && id) {
                this.fetchFolder(id, false);
            }
            else if (view === VIEW_RECENTS) {
                this.showRecents(false);
            }
            else if (view === VIEW_SEARCH && searchQuery) {
                this.search(searchQuery);
            }
            else {
                throw new Error('Cannot refresh incompatible view!');
            }
        };
        /**
         * Fetches a folder, defaults to fetching root folder
         *
         * @private
         * @param {string|void} [id] folder id
         * @param {Boolean|void} [triggerNavigationEvent] To trigger navigate event
         * @return {void}
         */
        this.fetchFolder = (id, triggerNavigationEvent = true) => {
            const { rootFolderId } = this.props;
            const { currentCollection: { id: currentId }, currentOffset, currentPageSize: limit, searchQuery = '', sortBy, sortDirection, } = this.state;
            const folderId = typeof id === 'string' ? id : rootFolderId;
            const hasFolderChanged = currentId && currentId !== folderId;
            const hasSearchQuery = !!searchQuery.trim().length;
            const offset = hasFolderChanged || hasSearchQuery ? 0 : currentOffset; // Reset offset on folder or mode change
            // If we are navigating around, aka not first load
            // then reset the focus to the root so that after
            // the collection loads the activeElement is not the
            // button that was clicked to fetch the folder
            if (!this.firstLoad) {
                this.rootElement.focus();
            }
            // Reset search state, the view and show busy indicator
            this.setState({
                searchQuery: '',
                view: VIEW_FOLDER,
                currentCollection: this.currentUnloadedCollection(),
                currentOffset: offset,
            });
            // Fetch the folder using folder API
            this.api.getFolderAPI().getFolder(folderId, limit, offset, sortBy, sortDirection, (collection) => {
                this.fetchFolderSuccessCallback(collection, triggerNavigationEvent);
            }, this.errorCallback, { forceFetch: true });
        };
        /**
         * Action performed when clicking on an item
         *
         * @private
         * @param {Object|string} item - the clicked box item
         * @return {void}
         */
        this.onItemClick = (item) => {
            // If the id was passed in, just use that
            if (typeof item === 'string') {
                this.fetchFolder(item);
                return;
            }
            const { id, type } = item;
            const { isTouch } = this.props;
            if (type === TYPE_FOLDER) {
                this.fetchFolder(id);
                return;
            }
            if (isTouch) {
                return;
            }
            this.preview(item);
        };
        /**
         * Search success callback
         *
         * @private
         * @param {Object} collection item collection object
         * @return {void}
         */
        this.searchSuccessCallback = (collection) => {
            const { currentCollection } = this.state;
            // Unselect any rows that were selected
            this.unselect();
            // Close any open modals
            this.closeModals();
            this.setState({
                selected: undefined,
                currentCollection: Object.assign(currentCollection, collection),
            });
        };
        /**
         * Debounced searching
         *
         * @private
         * @param {string} id folder id
         * @param {string} query search string
         * @return {void}
         */
        this.debouncedSearch = debounce((id, query) => {
            const { currentOffset, currentPageSize } = this.state;
            this.api
                .getSearchAPI()
                .search(id, query, currentPageSize, currentOffset, this.searchSuccessCallback, this.errorCallback, {
                forceFetch: true,
            });
        }, DEFAULT_SEARCH_DEBOUNCE);
        /**
         * Searches
         *
         * @private
         * @param {string} query search string
         * @return {void}
         */
        this.search = (query) => {
            const { rootFolderId } = this.props;
            const { currentCollection: { id }, currentOffset, searchQuery, } = this.state;
            const folderId = typeof id === 'string' ? id : rootFolderId;
            const trimmedQuery = query.trim();
            if (!query) {
                // Cancel the debounce so we don't search on a previous query
                this.debouncedSearch.cancel();
                // Query was cleared out, load the prior folder
                // The prior folder is always the parent folder for search
                this.setState({ currentOffset: 0 }, () => {
                    this.fetchFolder(folderId, false);
                });
                return;
            }
            if (!trimmedQuery) {
                // Query now only has bunch of spaces
                // do nothing and but update prior state
                this.setState({
                    searchQuery: query,
                });
                return;
            }
            this.setState({
                selected: undefined,
                searchQuery: query,
                view: VIEW_SEARCH,
                currentCollection: this.currentUnloadedCollection(),
                currentOffset: trimmedQuery === searchQuery ? currentOffset : 0,
            });
            this.debouncedSearch(folderId, query);
        };
        /**
         * Uploads
         *
         * @private
         * @param {File} file dom file object
         * @return {void}
         */
        this.upload = () => {
            const { currentCollection: { id, permissions }, } = this.state;
            const { canUpload } = this.props;
            if (!canUpload || !id || !permissions) {
                return;
            }
            const { can_upload } = permissions;
            if (!can_upload) {
                return;
            }
            this.setState({
                isUploadModalOpen: true,
            });
        };
        /**
         * Upload success handler
         *
         * @private
         * @param {File} file dom file object
         * @return {void}
         */
        this.uploadSuccessHandler = () => {
            const { currentCollection: { id }, } = this.state;
            this.fetchFolder(id, false);
        };
        /**
         * Changes the share access of an item
         *
         * @private
         * @param {Object} item file or folder object
         * @param {string} access share access
         * @return {void}
         */
        this.changeShareAccess = (access) => {
            const { selected } = this.state;
            const { canSetShareAccess } = this.props;
            if (!selected || !canSetShareAccess) {
                return;
            }
            const { permissions, type } = selected;
            if (!permissions || !type) {
                return;
            }
            const { can_set_share_access } = permissions;
            if (!can_set_share_access) {
                return;
            }
            this.setState({ isLoading: true });
            this.api.getAPI(type).share(selected, access, (updatedItem) => {
                this.setState({ isLoading: false });
                this.select(updatedItem);
            });
        };
        /**
         * Chages the sort by and sort direction
         *
         * @private
         * @param {string} sortBy - field to sorty by
         * @param {string} sortDirection - sort direction
         * @return {void}
         */
        this.sort = (sortBy, sortDirection) => {
            const { currentCollection: { id }, } = this.state;
            if (id) {
                this.setState({ sortBy, sortDirection }, this.refreshCollection);
            }
        };
        /**
         * Selects or unselects an item
         *
         * @private
         * @param {Object} item - file or folder object
         * @param {Function|void} [onSelect] - optional on select callback
         * @return {void}
         */
        this.select = (item, callback = noop) => {
            const { selected, currentCollection: { items = [] }, } = this.state;
            const { onSelect } = this.props;
            if (item === selected) {
                callback(item);
                return;
            }
            this.unselect();
            item.selected = true;
            const focusedRow = items.findIndex((i) => i.id === item.id);
            this.setState({ focusedRow, selected: item }, () => {
                onSelect(cloneDeep([item]));
                callback(item);
            });
        };
        /**
         * Selects the clicked file and then previews it
         * or opens it, if it was a web link
         *
         * @private
         * @param {Object} item - file or folder object
         * @return {void}
         */
        this.preview = (item) => {
            const { type, url } = item;
            if (type === TYPE_WEBLINK) {
                window.open(url);
                return;
            }
            this.select(item, this.previewCallback);
        };
        /**
         * Previews a file
         *
         * @private
         * @param {Object} item - file or folder object
         * @return {void}
         */
        this.previewCallback = () => {
            const { selected } = this.state;
            const { canPreview } = this.props;
            if (!selected || !canPreview) {
                return;
            }
            const { permissions } = selected;
            if (!permissions) {
                return;
            }
            const { can_preview } = permissions;
            if (!can_preview) {
                return;
            }
            this.setState({ isPreviewModalOpen: true });
        };
        /**
         * Selects the clicked file and then downloads it
         *
         * @private
         * @param {Object} item - file or folder object
         * @return {void}
         */
        this.download = (item) => {
            this.select(item, this.downloadCallback);
        };
        /**
         * Downloads a file
         *
         * @private
         * @return {void}
         */
        this.downloadCallback = () => {
            const { selected } = this.state;
            const { canDownload, onDownload } = this.props;
            if (!selected || !canDownload) {
                return;
            }
            const { id, permissions } = selected;
            if (!id || !permissions) {
                return;
            }
            const { can_download } = permissions;
            if (!can_download) {
                return;
            }
            const openUrl = (url) => {
                openUrlInsideIframe(url);
                onDownload(cloneDeep([selected]));
            };
            const { type } = selected;
            if (type === TYPE_FILE) {
                this.api.getFileAPI().getDownloadUrl(id, openUrl, noop);
            }
        };
        /**
         * Selects the clicked file and then deletes it
         *
         * @private
         * @param {Object} item - file or folder object
         * @return {void}
         */
        this.delete = (item) => {
            this.select(item, this.deleteCallback);
        };
        /**
         * Deletes a file
         *
         * @private
         * @return {void}
         */
        this.deleteCallback = () => {
            const { selected, isDeleteModalOpen } = this.state;
            const { canDelete, onDelete } = this.props;
            if (!selected || !canDelete) {
                return;
            }
            const { id, permissions, parent, type } = selected;
            if (!id || !permissions || !parent || !type) {
                return;
            }
            const { id: parentId } = parent;
            const { can_delete } = permissions;
            if (!can_delete || !parentId) {
                return;
            }
            if (!isDeleteModalOpen) {
                this.setState({ isDeleteModalOpen: true });
                return;
            }
            this.setState({ isLoading: true });
            this.api.getAPI(type).deleteItem(selected, () => {
                onDelete(cloneDeep([selected]));
                this.refreshCollection();
            });
        };
        /**
         * Selects the clicked file and then renames it
         *
         * @private
         * @param {Object} item - file or folder object
         * @return {void}
         */
        this.rename = (item) => {
            this.select(item, this.renameCallback);
        };
        /**
         * Callback for renaming an item
         *
         * @private
         * @param {string} value new item name
         * @return {void}
         */
        this.renameCallback = (nameWithoutExt, extension) => {
            const { selected, isRenameModalOpen } = this.state;
            const { canRename, onRename } = this.props;
            if (!selected || !canRename) {
                return;
            }
            const { id, permissions, type } = selected;
            if (!id || !permissions || !type) {
                return;
            }
            const { can_rename } = permissions;
            if (!can_rename) {
                return;
            }
            if (!isRenameModalOpen || !nameWithoutExt) {
                this.setState({ isRenameModalOpen: true, errorCode: '' });
                return;
            }
            const name = `${nameWithoutExt}${extension}`;
            if (!nameWithoutExt.trim()) {
                this.setState({
                    errorCode: ERROR_CODE_ITEM_NAME_INVALID,
                    isLoading: false,
                });
                return;
            }
            this.setState({ isLoading: true });
            this.api.getAPI(type).rename(selected, name, (updatedItem) => {
                this.setState({ isRenameModalOpen: false });
                this.refreshCollection();
                this.select(updatedItem);
                onRename(cloneDeep(selected));
            }, ({ code }) => {
                this.setState({ errorCode: code, isLoading: false });
            });
        };
        /**
         * Creates a new folder
         *
         * @private
         * @return {void}
         */
        this.createFolder = () => {
            this.createFolderCallback();
        };
        /**
         * New folder callback
         *
         * @private
         * @param {string} name - folder name
         * @return {void}
         */
        this.createFolderCallback = (name) => {
            const { isCreateFolderModalOpen, currentCollection } = this.state;
            const { canCreateNewFolder, onCreate } = this.props;
            if (!canCreateNewFolder) {
                return;
            }
            const { id, permissions } = currentCollection;
            if (!id || !permissions) {
                return;
            }
            const { can_upload } = permissions;
            if (!can_upload) {
                return;
            }
            if (!isCreateFolderModalOpen || !name) {
                this.setState({ isCreateFolderModalOpen: true, errorCode: '' });
                return;
            }
            if (!name) {
                this.setState({
                    errorCode: ERROR_CODE_ITEM_NAME_INVALID,
                    isLoading: false,
                });
                return;
            }
            if (name.length > 255) {
                this.setState({
                    errorCode: ERROR_CODE_ITEM_NAME_TOO_LONG,
                    isLoading: false,
                });
                return;
            }
            this.setState({ isLoading: true });
            this.api.getFolderAPI().create(id, name, (item) => {
                this.refreshCollection();
                this.select(item);
                onCreate(cloneDeep(item));
            }, ({ code }) => {
                this.setState({
                    errorCode: code,
                    isLoading: false,
                });
            });
        };
        /**
         * Selects the clicked file and then shares it
         *
         * @private
         * @param {Object} item - file or folder object
         * @return {void}
         */
        this.share = (item) => {
            this.select(item, this.shareCallback);
        };
        /**
         * Chages the sort by and sort direction
         *
         * @private
         * @return {void}
         */
        this.shareCallback = () => {
            const { selected } = this.state;
            const { canShare } = this.props;
            if (!selected || !canShare) {
                return;
            }
            const { permissions } = selected;
            if (!permissions) {
                return;
            }
            const { can_share } = permissions;
            if (!can_share) {
                return;
            }
            this.setState({ isShareModalOpen: true });
        };
        /**
         * Saves reference to table component
         *
         * @private
         * @param {Component} react component
         * @return {void}
         */
        this.tableRef = (table) => {
            this.table = table;
        };
        /**
         * Closes the modal dialogs that may be open
         *
         * @private
         * @return {void}
         */
        this.closeModals = () => {
            const { focusedRow } = this.state;
            this.setState({
                isLoading: false,
                isDeleteModalOpen: false,
                isRenameModalOpen: false,
                isCreateFolderModalOpen: false,
                isShareModalOpen: false,
                isUploadModalOpen: false,
                isPreviewModalOpen: false,
            });
            const { selected, currentCollection: { items = [] }, } = this.state;
            if (selected && items.length > 0) {
                focus(this.rootElement, `.bce-item-row-${focusedRow}`);
            }
        };
        /**
         * Keyboard events
         *
         * @private
         * @return {void}
         */
        this.onKeyDown = (event) => {
            if (isInputElement(event.target)) {
                return;
            }
            const { rootFolderId } = this.props;
            const key = event.key.toLowerCase();
            switch (key) {
                case '/':
                    focus(this.rootElement, '.be-search input[type="search"]', false);
                    event.preventDefault();
                    break;
                case 'arrowdown':
                    focus(this.rootElement, '.bce-item-row', false);
                    this.setState({ focusedRow: 0 });
                    event.preventDefault();
                    break;
                case 'g':
                    break;
                case 'b':
                    if (this.globalModifier) {
                        focus(this.rootElement, '.be-breadcrumb button', false);
                        event.preventDefault();
                    }
                    break;
                case 'f':
                    if (this.globalModifier) {
                        this.fetchFolder(rootFolderId);
                        event.preventDefault();
                    }
                    break;
                case 'u':
                    if (this.globalModifier) {
                        this.upload();
                        event.preventDefault();
                    }
                    break;
                case 'r':
                    if (this.globalModifier) {
                        this.showRecents();
                        event.preventDefault();
                    }
                    break;
                case 'n':
                    if (this.globalModifier) {
                        this.createFolder();
                        event.preventDefault();
                    }
                    break;
                default:
                    this.globalModifier = false;
                    return;
            }
            this.globalModifier = key === 'g';
        };
        /**
         * Handle pagination changes
         *
         * @param {number} newOffset - the new page offset value
         */
        this.paginate = (newOffset) => {
            this.setState({ currentOffset: newOffset }, this.refreshCollection);
        };
        const { token, sharedLink, sharedLinkPassword, apiHost, uploadHost, initialPage, initialPageSize, sortBy, sortDirection, requestInterceptor, responseInterceptor, rootFolderId, } = props;
        this.api = new API({
            token,
            sharedLink,
            sharedLinkPassword,
            apiHost,
            uploadHost,
            requestInterceptor,
            responseInterceptor,
            clientName: CLIENT_NAME_CONTENT_EXPLORER,
            id: `${TYPED_ID_FOLDER_PREFIX}${rootFolderId}`,
        });
        this.id = uniqueid('bce_');
        this.state = {
            sortBy,
            sortDirection,
            rootName: '',
            currentCollection: {},
            currentOffset: initialPageSize * (initialPage - 1),
            currentPageSize: initialPageSize,
            searchQuery: '',
            view: VIEW_FOLDER,
            isDeleteModalOpen: false,
            isRenameModalOpen: false,
            isCreateFolderModalOpen: false,
            isShareModalOpen: false,
            isUploadModalOpen: false,
            isPreviewModalOpen: false,
            isLoading: false,
            errorCode: '',
            focusedRow: 0,
        };
    }
    /**
     * Destroys api instances
     *
     * @private
     * @return {void}
     */
    clearCache() {
        this.api.destroy(true);
    }
    /**
     * Cleanup
     *
     * @private
     * @inheritdoc
     * @return {void}
     */
    componentWillUnmount() {
        this.clearCache();
    }
    /**
     * Fetches the root folder on load
     *
     * @private
     * @inheritdoc
     * @return {void}
     */
    componentDidMount() {
        const { defaultView, currentFolderId } = this.props;
        this.rootElement = ((document.getElementById(this.id)));
        any;
        HTMLElement;
        ;
        this.appElement = ((this.rootElement.firstElementChild));
        any;
        HTMLElement;
        ;
        if (defaultView === DEFAULT_VIEW_RECENTS) {
            this.showRecents();
        }
        else {
            this.fetchFolder(currentFolderId);
        }
    }
    /**
     * Fetches the current folder if different
     * from what was already fetched before.
     *
     * @private
     * @inheritdoc
     * @return {void}
     */
    componentWillReceiveProps(nextProps) {
        const { currentFolderId } = nextProps;
        const { currentCollection: { id }, } = this.state;
        if (typeof currentFolderId === 'string' && id !== currentFolderId) {
            this.fetchFolder(currentFolderId);
        }
    }
    /**
     * Resets the collection so that the loading bar starts showing
     *
     * @private
     * @return {Collection}
     */
    currentUnloadedCollection() {
        const { currentCollection } = this.state;
        return Object.assign(currentCollection, {
            percentLoaded: 0,
        });
    }
    /**
     * Focuses the grid and fires navigate event
     *
     * @private
     * @return {void}
     */
    finishNavigation() {
        const { autoFocus } = this.props;
        const { currentCollection: { percentLoaded }, } = this.state;
        // If loading for the very first time, only allow focus if autoFocus is true
        if (this.firstLoad && !autoFocus) {
            this.firstLoad = false;
            return;
        }
        // Don't focus the grid until its loaded and user is not already on an interactable element
        if (percentLoaded === 100 && !isFocusableElement(document.activeElement)) {
            focus(this.rootElement, '.bce-item-row');
            this.setState({ focusedRow: 0 });
        }
        this.firstLoad = false;
    }
    /**
     * Folder fetch success callback
     *
     * @private
     * @param {Object} collection - item collection object
     * @param {Boolean|void} triggerNavigationEvent - To trigger navigate event and focus grid
     * @return {void}
     */
    fetchFolderSuccessCallback(collection, triggerNavigationEvent) {
        const { onNavigate, rootFolderId } = this.props;
        const { id, name, boxItem } = collection;
        // New folder state
        const newState = {
            selected: undefined,
            currentCollection: collection,
            rootName: id === rootFolderId ? name : '',
        };
        // Unselect any rows that were selected
        this.unselect();
        // Close any open modals
        this.closeModals();
        if (triggerNavigationEvent) {
            // Fire folder navigation event
            this.setState(newState, this.finishNavigation);
            if (boxItem) {
                onNavigate(cloneDeep(boxItem));
            }
        }
        else {
            this.setState(newState);
        }
    }
    /**
     * Recents fetch success callback
     *
     * @private
     * @param {Object} collection item collection object
     * @param {Boolean} triggerNavigationEvent - To trigger navigate event
     * @return {void}
     */
    recentsSuccessCallback(collection, triggerNavigationEvent) {
        // Unselect any rows that were selected
        this.unselect();
        // Set the new state and focus the grid for tabbing
        const newState = { currentCollection: collection };
        if (triggerNavigationEvent) {
            this.setState(newState, this.finishNavigation);
        }
        else {
            this.setState(newState);
        }
    }
    /**
     * Shows recents.
     *
     * @private
     * @param {Boolean|void} [triggerNavigationEvent] To trigger navigate event
     * @return {void}
     */
    showRecents(triggerNavigationEvent = true) {
        const { rootFolderId } = this.props;
        // Reset search state, the view and show busy indicator
        this.setState({
            searchQuery: '',
            view: VIEW_RECENTS,
            currentCollection: this.currentUnloadedCollection(),
            currentOffset: 0,
        });
        // Fetch the folder using folder API
        this.api.getRecentsAPI().recents(rootFolderId, (collection) => {
            this.recentsSuccessCallback(collection, triggerNavigationEvent);
        }, this.errorCallback, { forceFetch: true });
    }
    /**
     * Unselects an item
     *
     * @private
     * @param {Object} item - file or folder object
     * @param {Function|void} [onSelect] - optional on select callback
     * @return {void}
     */
    unselect() {
        const { selected } = this.state;
        if (selected) {
            selected.selected = false;
        }
    }
    /**
     * Renders the file picker
     *
     * @private
     * @inheritdoc
     * @return {Element}
     */
    render() {
        const { language, messages, rootFolderId, logoUrl, canUpload, canCreateNewFolder, canSetShareAccess, canDelete, canRename, canDownload, canPreview, canShare, token, sharedLink, sharedLinkPassword, apiHost, appHost, staticHost, uploadHost, isSmall, isMedium, isTouch, className, measureRef, onPreview, onDownload, onUpload, requestInterceptor, responseInterceptor, contentPreviewProps, } = this.props;
        const { view, rootName, currentCollection, currentPageSize, searchQuery, isDeleteModalOpen, isRenameModalOpen, isShareModalOpen, isUploadModalOpen, isPreviewModalOpen, isCreateFolderModalOpen, selected, isLoading, errorCode, focusedRow, } = this.state;
        const { id, offset, permissions, totalCount } = currentCollection;
        const { can_upload } = permissions || {};
        const styleClassName = classNames('be bce', className);
        const allowUpload = canUpload && !!can_upload;
        const allowCreate = canCreateNewFolder && !!can_upload;
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
        return language = { language };
        messages = { messages } >
            id;
        {
            this.id;
        }
        className = { styleClassName };
        ref = { measureRef } >
            className;
        "be-app-element";
        onKeyDown = { this: .onKeyDown };
        tabIndex = { 0:  } >
            view;
        {
            view;
        }
        isSmall = { isSmall };
        searchQuery = { searchQuery };
        logoUrl = { logoUrl };
        onSearch = { this: .search }
            /  >
            view;
        {
            view;
        }
        rootId = { rootFolderId };
        isSmall = { isSmall };
        rootName = { rootName };
        currentCollection = { currentCollection };
        canUpload = { allowUpload };
        canCreateNewFolder = { allowCreate };
        onUpload = { this: .upload };
        onCreate = { this: .createFolder };
        onItemClick = { this: .fetchFolder };
        onSortChange = { this: .sort }
            /  >
            view;
        {
            view;
        }
        rootId = { rootFolderId };
        isSmall = { isSmall };
        isMedium = { isMedium };
        isTouch = { isTouch };
        rootElement = { this: .rootElement };
        focusedRow = { focusedRow };
        canSetShareAccess = { canSetShareAccess };
        canShare = { canShare };
        canPreview = { canPreview };
        canDelete = { canDelete };
        canRename = { canRename };
        canDownload = { canDownload };
        currentCollection = { currentCollection };
        tableRef = { this: .tableRef };
        onItemSelect = { this: .select };
        onItemClick = { this: .onItemClick };
        onItemDelete = { this: .delete };
        onItemDownload = { this: .download };
        onItemRename = { this: .rename };
        onItemShare = { this: .share };
        onItemPreview = { this: .preview };
        onSortChange = { this: .sort }
            /  >
            offset;
        {
            offset;
        }
        onChange = { this: .paginate };
        pageSize = { currentPageSize };
        totalCount = { totalCount }
            /  >
            /Footer>
            < /div>;
        {
            allowUpload && !!this.appElement ? isOpen = { isUploadModalOpen }
                :
            ;
            currentFolderId = { id };
            token = { token };
            sharedLink = { sharedLink };
            sharedLinkPassword = { sharedLinkPassword };
            apiHost = { apiHost };
            uploadHost = { uploadHost };
            onClose = { this: .uploadSuccessHandler };
            parentElement = { this: .rootElement };
            appElement = { this: .appElement };
            onUpload = { onUpload };
            requestInterceptor = { requestInterceptor };
            responseInterceptor = { responseInterceptor }
                /  >
            ;
            null;
        }
        {
            allowCreate && !!this.appElement ? isOpen = { isCreateFolderModalOpen }
                :
            ;
            onCreate = { this: .createFolderCallback };
            onCancel = { this: .closeModals };
            isLoading = { isLoading };
            errorCode = { errorCode };
            parentElement = { this: .rootElement };
            appElement = { this: .appElement }
                /  >
            ;
            null;
        }
        {
            canDelete && selected && !!this.appElement ? isOpen = { isDeleteModalOpen }
                :
            ;
            onDelete = { this: .deleteCallback };
            onCancel = { this: .closeModals };
            item = { selected };
            isLoading = { isLoading };
            parentElement = { this: .rootElement };
            appElement = { this: .appElement }
                /  >
            ;
            null;
        }
        {
            canRename && selected && !!this.appElement ? isOpen = { isRenameModalOpen }
                :
            ;
            onRename = { this: .renameCallback };
            onCancel = { this: .closeModals };
            item = { selected };
            isLoading = { isLoading };
            errorCode = { errorCode };
            parentElement = { this: .rootElement };
            appElement = { this: .appElement }
                /  >
            ;
            null;
        }
        {
            canShare && selected && !!this.appElement ? isOpen = { isShareModalOpen }
                :
            ;
            canSetShareAccess = { canSetShareAccess };
            onShareAccessChange = { this: .changeShareAccess };
            onCancel = { this: .refreshCollection };
            item = { selected };
            isLoading = { isLoading };
            parentElement = { this: .rootElement };
            appElement = { this: .appElement }
                /  >
            ;
            null;
        }
        {
            canPreview && selected && !!this.appElement ? isOpen = { isPreviewModalOpen }
                :
            ;
            isTouch = { isTouch };
            onCancel = { this: .closeModals };
            item = { selected };
            currentCollection = { currentCollection };
            token = { token };
            parentElement = { this: .rootElement };
            appElement = { this: .appElement };
            onPreview = { onPreview };
            onDownload = { onDownload };
            canDownload = { canDownload };
            cache = { this: .api.getCache() };
            apiHost = { apiHost };
            appHost = { appHost };
            staticHost = { staticHost };
            sharedLink = { sharedLink };
            sharedLinkPassword = { sharedLinkPassword };
            contentPreviewProps = { contentPreviewProps };
            requestInterceptor = { requestInterceptor };
            responseInterceptor = { responseInterceptor }
                /  >
            ;
            null;
        }
        /div>
            < /Internationalize>;
        ;
        /* eslint-enable jsx-a11y/no-static-element-interactions */
        /* eslint-enable jsx-a11y/no-noninteractive-tabindex */
    }
}
ContentExplorer.defaultProps = {
    rootFolderId: DEFAULT_ROOT,
    sortBy: FIELD_NAME,
    sortDirection: SORT_ASC,
    canDownload: true,
    canDelete: true,
    canUpload: true,
    canRename: true,
    canShare: true,
    canPreview: true,
    canSetShareAccess: true,
    canCreateNewFolder: true,
    autoFocus: false,
    apiHost: DEFAULT_HOSTNAME_API,
    appHost: DEFAULT_HOSTNAME_APP,
    staticHost: DEFAULT_HOSTNAME_STATIC,
    uploadHost: DEFAULT_HOSTNAME_UPLOAD,
    className: '',
    onDelete: noop,
    onDownload: noop,
    onPreview: noop,
    onRename: noop,
    onCreate: noop,
    onSelect: noop,
    onUpload: noop,
    onNavigate: noop,
    defaultView: DEFAULT_VIEW_FILES,
    initialPage: DEFAULT_PAGE_NUMBER,
    initialPageSize: DEFAULT_PAGE_SIZE,
    contentPreviewProps: {
        contentSidebarProps: {},
    },
};
export { ContentExplorer as ContentExplorerComponent };
export default makeResponsive(ContentExplorer);
//# sourceMappingURL=ContentExplorer.js.map