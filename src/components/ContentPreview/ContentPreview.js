/**
 * @was-flow
 * @file Content Preview Component
 * @author Box
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import 'regenerator-runtime/runtime';
import { PureComponent } from 'react';
import uniqueid from 'lodash/uniqueId';
import throttle from 'lodash/throttle';
import cloneDeep from 'lodash/cloneDeep';
import omit from 'lodash/omit';
import getProp from 'lodash/get';
import noop from 'lodash/noop';
import { decode } from 'box-react-ui/lib/utils/keys';
import API from '../../api';
import makeResponsive from '../makeResponsive';
import TokenService from '../../util/TokenService';
import { isInputElement, focus } from '../../util/dom';
import { getTypedFileId } from '../../util/file';
import { withErrorBoundary } from '../ErrorBoundary';
import { PREVIEW_FIELDS_TO_FETCH } from '../../util/fields';
import { DEFAULT_HOSTNAME_API, DEFAULT_HOSTNAME_APP, DEFAULT_HOSTNAME_STATIC, DEFAULT_PREVIEW_VERSION, DEFAULT_LOCALE, DEFAULT_PATH_STATIC_PREVIEW, CLIENT_NAME_CONTENT_PREVIEW, HEADER_RETRY_AFTER, ORIGIN_PREVIEW, ORIGIN_CONTENT_PREVIEW, ERROR_CODE_UNKNOWN, } from '../../constants';
import '../fonts.scss';
import '../base.scss';
import './ContentPreview.scss';
const InvalidIdError = new Error('Invalid id for Preview!');
const RETRY_COUNT = 3; // number of times to retry network request for a file
const MS_IN_S = 1000; // ms in a sec
const PREVIEW_LOAD_METRIC_EVENT = 'load';
class ContentPreview extends PureComponent {
    /**
     * [constructor]
     *
     * @return {ContentPreview}
     */
    constructor(props) {
        super(props);
        this.retryCount = 0;
        this.initialState = {
            isFileError: false,
            isReloadNotificationVisible: false,
        };
        /**
         * Handler for 'preview_error' preview event
         *
         * @param {PreviewError} previewError - the error data emitted from preview
         * @return {void}
         */
        this.onPreviewError = (_a) => {
            var { error } = _a, rest = __rest(_a, ["error"]);
            const { code = ERROR_CODE_UNKNOWN } = error;
            this.props.onError(error, code, Object.assign({}, rest, { error }), ORIGIN_PREVIEW);
        };
        /**
         * Event handler 'preview_metric' which also adds in the file fetch time if it's a load event
         *
         * @param {Object} previewMetrics - the object emitted by 'preview_metric'
         * @return {void}
         */
        this.onPreviewMetric = (previewMetrics) => {
            const { onMetric } = this.props;
            const { event_name } = previewMetrics;
            let metrics = Object.assign({}, previewMetrics);
            // We need to add in the total file fetch time to the file_info_time and value (total)
            // as preview does not do the files call
            if (event_name === PREVIEW_LOAD_METRIC_EVENT) {
                const totalFetchFileTime = this.getTotalFileFetchTime();
                const totalTime = (previewMetrics.value || 0) + totalFetchFileTime;
                // If an unnatural load time occurs or is invalid, don't log a load event
                if (!totalTime) {
                    return;
                }
                metrics = Object.assign({}, previewMetrics, { file_info_time: totalFetchFileTime, value: totalTime });
            }
            onMetric(metrics);
        };
        /**
         * onLoad function for preview
         *
         * @return {void}
         */
        this.onPreviewLoad = (data) => {
            const { onLoad, collection } = this.props;
            const currentIndex = this.getFileIndex();
            const filesToPrefetch = collection.slice(currentIndex + 1, currentIndex + 5);
            const previewTimeMetrics = getProp(data, 'metrics.time');
            let loadData = data;
            if (previewTimeMetrics) {
                const totalPreviewMetrics = this.addFetchFileTimeToPreviewMetrics(previewTimeMetrics);
                loadData = Object.assign({}, loadData, { metrics: Object.assign({}, loadData.metrics, { time: totalPreviewMetrics }) });
            }
            onLoad(loadData);
            this.focusPreview();
            if (this.preview && filesToPrefetch.length > 1) {
                this.prefetch(filesToPrefetch);
            }
        };
        /**
         * Loads preview in the component using the preview library.
         *
         * @return {void}
         */
        this.loadPreview = () => __awaiter(this, void 0, void 0, function* () {
            const _a = this.props, { token: tokenOrTokenFunction, collection, onError } = _a, rest = __rest(_a, ["token", "collection", "onError"]);
            const { file } = this.state;
            if (!this.isPreviewLibraryLoaded() || !file || !tokenOrTokenFunction) {
                return;
            }
            const fileId = this.getFileId(file);
            const typedId = getTypedFileId(fileId);
            const token = yield TokenService.getReadToken(typedId, tokenOrTokenFunction);
            if (fileId !== this.state.currentFileId) {
                return;
            }
            const previewOptions = {
                container: `#${this.id} .bcpr-content`,
                header: 'none',
                headerElement: `#${this.id} .bcpr-header`,
                showAnnotations: this.canViewAnnotations(),
                showDownload: this.canDownload(),
                skipServerUpdate: true,
                useHotkeys: false,
            };
            const { Preview } = global.Box;
            this.preview = new Preview();
            this.preview.addListener('load', this.onPreviewLoad);
            this.preview.addListener('preview_error', this.onPreviewError);
            this.preview.addListener('preview_metric', this.onPreviewMetric);
            this.preview.updateFileCache([file]);
            this.preview.show(file.id, token, Object.assign({}, previewOptions, omit(rest, Object.keys(previewOptions))));
        });
        /**
         * Updates preview file from temporary staged file.
         *
         * @return {void}
         */
        this.loadFileFromStage = () => {
            if (this.stagedFile) {
                this.setState(Object.assign({}, this.initialState, { file: this.stagedFile }), () => {
                    this.stagedFile = undefined;
                });
            }
        };
        /**
         * Removes the reload notification
         *
         * @return {void}
         */
        this.closeReloadNotification = () => {
            this.setState({ isReloadNotificationVisible: false });
        };
        /**
         * Tells the preview to resize
         *
         * @return {void}
         */
        this.onResize = () => {
            if (this.preview && this.preview.getCurrentViewer()) {
                this.preview.resize();
            }
        };
        /**
         * File fetch success callback
         *
         * @param {Object} file - Box file
         * @return {void}
         */
        this.fetchFileSuccessCallback = (file) => {
            this.fetchFileEndTime = performance.now();
            this.retryCount = 0;
            const { file: currentFile } = this.state;
            const isExistingFile = currentFile ? currentFile.id === file.id : false;
            const isWatermarked = getProp(file, 'watermark_info.is_watermarked', false);
            // If the file is watermarked or if its a new file, then update the state
            // In this case preview should reload without prompting the user
            if (isWatermarked || !isExistingFile) {
                this.setState(Object.assign({}, this.initialState, { file }));
                // $FlowFixMe file version and sha1 should exist at this point
            }
            else if (currentFile.file_version.sha1 !== file.file_version.sha1) {
                // If we are already prevewing the file that got updated then show the
                // user a notification to reload the file only if its sha1 changed
                this.stagedFile = file;
                this.setState(Object.assign({}, this.initialState, { isReloadNotificationVisible: true }));
            }
        };
        /**
         * File fetch error callback
         *
         * @return {void}
         */
        this.fetchFileErrorCallback = (fileError, code) => {
            const { currentFileId } = this.state;
            if (this.retryCount >= RETRY_COUNT) {
                this.setState({ isFileError: true });
                this.props.onError(fileError, code, {
                    error: fileError,
                });
            }
            else {
                this.retryCount += 1;
                clearTimeout(this.retryTimeout);
                // Respect 'Retry-After' header if present, otherwise retry with exponential back-off
                let timeoutMs = Math.pow(2, this.retryCount) * MS_IN_S;
                const retryAfter = getProp(`fileError.response.headers[${HEADER_RETRY_AFTER}]`);
                if (retryAfter) {
                    const retryAfterS = parseInt(retryAfter, 10);
                    if (!Number.isNaN(retryAfterS)) {
                        timeoutMs = retryAfterS * MS_IN_S;
                    }
                }
                this.retryTimeout = setTimeout(() => {
                    this.fetchFile(currentFileId);
                }, timeoutMs);
            }
        };
        /**
         * Returns the preview instance
         *
         * @return {Preview} current instance of preview
         */
        this.getPreview = () => {
            const { file } = this.state;
            if (!this.preview || !file) {
                return null;
            }
            return this.preview;
        };
        /**
         * Returns the viewer instance being used by preview.
         * This will let child components access the viewers.
         *
         * @return {Viewer} current instance of the preview viewer
         */
        this.getViewer = () => {
            const preview = this.getPreview();
            const viewer = preview ? preview.getCurrentViewer() : null;
            return viewer && viewer.isLoaded() && !viewer.isDestroyed() ? viewer : null;
        };
        /**
         * Shows a preview of the previous file.
         *
         * @public
         * @return {void}
         */
        this.navigateLeft = () => {
            const currentIndex = this.getFileIndex();
            const newIndex = currentIndex === 0 ? 0 : currentIndex - 1;
            if (newIndex !== currentIndex) {
                this.navigateToIndex(newIndex);
            }
        };
        /**
         * Shows a preview of the next file.
         *
         * @public
         * @return {void}
         */
        this.navigateRight = () => {
            const { collection } = this.props;
            const currentIndex = this.getFileIndex();
            const newIndex = currentIndex === collection.length - 1 ? collection.length - 1 : currentIndex + 1;
            if (newIndex !== currentIndex) {
                this.navigateToIndex(newIndex);
            }
        };
        /**
         * Downloads file.
         *
         * @public
         * @return {void}
         */
        this.download = () => {
            const { onDownload } = this.props;
            const { file } = this.state;
            if (this.preview) {
                this.preview.download();
                onDownload(cloneDeep(file));
            }
        };
        /**
         * Prints file.
         *
         * @public
         * @return {void}
         */
        this.print = () => {
            if (this.preview) {
                this.preview.print();
            }
        };
        /**
         * Mouse move handler that is throttled and show
         * the navigation arrows if applicable.
         *
         * @return {void}
         */
        this.onMouseMove = throttle(() => {
            const viewer = this.getViewer();
            const isPreviewing = !!viewer;
            const CLASS_NAVIGATION_VISIBILITY = 'bcpr-nav-is-visible';
            clearTimeout(this.mouseMoveTimeoutID);
            if (!this.previewContainer) {
                return;
            }
            // Always assume that navigation arrows will be hidden
            this.previewContainer.classList.remove(CLASS_NAVIGATION_VISIBILITY);
            // Only show it if either we aren't previewing or if we are then the viewer
            // is not blocking the show. If we are previewing then the viewer may choose
            // to not allow navigation arrows. This is mostly useful for videos since the
            // navigation arrows may interfere with the settings menu inside video player.
            if (this.previewContainer && (!isPreviewing || viewer.allowNavigationArrows())) {
                this.previewContainer.classList.add(CLASS_NAVIGATION_VISIBILITY);
            }
            this.mouseMoveTimeoutID = setTimeout(() => {
                if (this.previewContainer) {
                    this.previewContainer.classList.remove(CLASS_NAVIGATION_VISIBILITY);
                }
            }, 1500);
        }, 1000, true);
        /**
         * Keyboard events
         *
         * @return {void}
         */
        this.onKeyDown = (event) => {
            const { useHotkeys } = this.props;
            if (!useHotkeys) {
                return;
            }
            let consumed = false;
            const key = decode(event);
            const viewer = this.getViewer();
            // If focus was on an input or if the viewer doesn't exist
            // then don't bother doing anything further
            if (!key || !viewer || isInputElement(event.target)) {
                return;
            }
            if (typeof viewer.onKeydown === 'function') {
                consumed = !!viewer.onKeydown(key, event.nativeEvent);
            }
            if (!consumed) {
                switch (key) {
                    case 'ArrowLeft':
                        this.navigateLeft();
                        consumed = true;
                        break;
                    case 'ArrowRight':
                        this.navigateRight();
                        consumed = true;
                        break;
                    default:
                    // no-op
                }
            }
            if (consumed) {
                event.preventDefault();
                event.stopPropagation();
            }
        };
        /**
         * Holds the reference the preview container
         *
         * @return {void}
         */
        this.containerRef = (container) => {
            this.previewContainer = container;
        };
        this.ref = { measureRef };
        this.onKeyDown = { this: .onKeyDown };
        this.tabIndex = { 0:  }
            >
                { hasHeader } && file;
        const { cache, token, sharedLink, sharedLinkPassword, apiHost, requestInterceptor, responseInterceptor, fileId, } = props;
        this.id = uniqueid('bcpr_');
        this.api = new API({
            cache,
            token,
            sharedLink,
            sharedLinkPassword,
            apiHost,
            clientName: CLIENT_NAME_CONTENT_PREVIEW,
            requestInterceptor,
            responseInterceptor,
        });
        this.state = Object.assign({}, this.initialState, { currentFileId: fileId, prevFileIdProp: fileId });
    }
    /**
     * Cleanup
     *
     * @return {void}
     */
    componentWillUnmount() {
        if (this.retryTimeout) {
            clearTimeout(this.retryTimeout);
        }
        // Don't destroy the cache while unmounting
        this.api.destroy(false);
    }
    /**
     * Cleans up the preview instance
     */
    destroyPreview() {
        if (this.preview) {
            this.preview.destroy();
            this.preview.removeAllListeners();
            this.preview = undefined;
        }
    }
    /**
     * Destroys api instances with caches
     *
     * @private
     * @return {void}
     */
    clearCache() {
        this.api.destroy(true);
    }
    /**
     * Once the component mounts, load Preview assets and fetch file info.
     *
     * @return {void}
     */
    componentDidMount() {
        this.loadStylesheet();
        this.loadScript();
        this.fetchFile(this.state.currentFileId);
        this.focusPreview();
    }
    static getDerivedStateFromProps(props, state) {
        const { fileId } = props;
        if (fileId !== state.prevFileIdProp) {
            return {
                currentFileId: fileId,
                prevFileIdProp: fileId,
            };
        }
        return null;
    }
    /**
     * After component updates, load Preview if appropriate.
     *
     * @return {void}
     */
    componentDidUpdate(prevProps, prevState) {
        const { token } = this.props;
        const { currentFileId } = this.state;
        const hasFileIdChanged = prevState.currentFileId !== currentFileId;
        const hasTokenChanged = prevProps.token !== token;
        if (hasFileIdChanged) {
            this.destroyPreview();
            this.fetchFile(currentFileId);
        }
        else if (this.shouldLoadPreview(prevState)) {
            this.loadPreview();
        }
        else if (hasTokenChanged) {
            this.updatePreviewToken();
        }
    }
    /**
     * Updates the access token used by preview library
     *
     * @param {boolean} shouldReload - true if preview should be reloaded
     */
    updatePreviewToken(shouldReload = false) {
        if (this.preview) {
            this.preview.updateToken(this.props.token, shouldReload);
        }
    }
    /**
     * Returns whether or not preview should be loaded.
     *
     * @param {Props} prevProps - Previous props
     * @param {State} prevState - Previous state
     * @return {boolean}
     */
    shouldLoadPreview(prevState) {
        const { file } = this.state;
        const { file: prevFile } = prevState;
        const versionPath = 'file_version.id';
        const previousVersionId = getProp(prevFile, versionPath);
        const currentVersionId = getProp(file, versionPath);
        let loadPreview = false;
        if (previousVersionId && currentVersionId) {
            // Load preview if file version ID has changed
            loadPreview = currentVersionId !== previousVersionId;
        }
        else {
            // Load preview if file object has newly been populated in state
            loadPreview = !prevFile && !!file;
        }
        return loadPreview;
    }
    /**
     * Returns preview asset urls
     *
     * @return {string} base url
     */
    getBasePath(asset) {
        const { staticHost, staticPath, language, previewLibraryVersion } = this.props;
        const path = `${staticPath}/${previewLibraryVersion}/${language}/${asset}`;
        const suffix = staticHost.endsWith('/') ? path : `/${path}`;
        return `${staticHost}${suffix}`;
    }
    /**
     * Determines if preview assets are loaded
     *
     * @return {boolean} true if preview is loaded
     */
    isPreviewLibraryLoaded() {
        return !!global.Box && !!global.Box.Preview;
    }
    /**
     * Loads external css by appending a <link> element
     *
     * @return {void}
     */
    loadStylesheet() {
        const { head } = document;
        const url = this.getBasePath('preview.css');
        if (!head || head.querySelector(`link[rel="stylesheet"][href="${url}"]`)) {
            return;
        }
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = url;
        head.appendChild(link);
    }
    /**
     * Loads external script by appending a <script> element
     *
     * @return {void}
     */
    loadScript() {
        const { head } = document;
        const url = this.getBasePath('preview.js');
        if (!head || this.isPreviewLibraryLoaded()) {
            return;
        }
        const previewScript = head.querySelector(`script[src="${url}"]`);
        if (previewScript) {
            return;
        }
        const script = document.createElement('script');
        script.src = url;
        script.addEventListener('load', this.loadPreview);
        head.appendChild(script);
    }
    /**
     * Focuses the preview on load.
     *
     * @return {void}
     */
    focusPreview() {
        const { autoFocus, getInnerRef } = this.props;
        if (autoFocus && !isInputElement(document.activeElement)) {
            focus(getInnerRef());
        }
    }
    /**
     * Updates preview cache and prefetches a file
     *
     * @param {BoxItem} file - file to prefetch
     * @return {void}
     */
    updatePreviewCacheAndPrefetch(file, token) {
        if (!this.preview || !file || !file.id) {
            return;
        }
        this.preview.updateFileCache([file]);
        this.preview.prefetch({ fileId: file.id, token });
    }
    /**
     * Gets the file id
     *
     * @param {string|BoxItem} file - box file or file id
     * @return {string} file id
     */
    getFileId(file) {
        if (typeof file === 'string') {
            return file;
        }
        if (typeof file === 'object' && !!file.id) {
            return file.id;
        }
        throw InvalidIdError;
    }
    /**
     * Prefetches the next few preview files if any
     *
     * @param {Array<string|BoxItem>} files - files to prefetch
     * @return {void}
     */
    prefetch(files) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = this.props;
            const typedIds = files.map(file => getTypedFileId(this.getFileId(file)));
            yield TokenService.cacheTokens(typedIds, token);
            files.forEach(file => {
                const fileId = this.getFileId(file);
                this.fetchFile(fileId, noop, noop, {
                    refreshCache: false,
                });
            });
        });
    }
    /**
     * Calculates the total file fetch time
     *
     * @return {number} the total fetch time
     */
    getTotalFileFetchTime() {
        if (!this.fetchFileStartTime || !this.fetchFileEndTime) {
            return 0;
        }
        const totalFetchFileTime = Math.round(this.fetchFileEndTime - this.fetchFileStartTime);
        return totalFetchFileTime;
    }
    /**
     * Adds in the file fetch time to the preview metrics
     *
     * @param {Object} previewTimeMetrics - the preview time metrics
     * @return {Object} the preview time metrics merged with the files call time
     */
    addFetchFileTimeToPreviewMetrics(previewTimeMetrics) {
        const totalFetchFileTime = this.getTotalFileFetchTime();
        const { rendering, conversion, preload } = previewTimeMetrics;
        // We need to add in the total file fetch time to the rendering and total as preview
        // does not do the files call. In the case the file is in the process of
        // being converted, we need to add to conversion instead of the render
        let totalConversion = conversion;
        let totalRendering = rendering;
        let totalPreload = preload;
        if (conversion) {
            totalConversion += totalFetchFileTime;
        }
        else {
            totalRendering += totalFetchFileTime;
        }
        if (totalPreload) {
            // Preload is optional, depending on file type
            totalPreload += totalFetchFileTime;
        }
        const previewMetrics = {
            conversion: totalConversion,
            rendering: totalRendering,
            total: totalRendering + totalConversion,
            preload: totalPreload,
        };
        return previewMetrics;
    }
    /**
     * Returns whether file can be downloaded based on file properties, permissions, and user-defined options.
     *
     * @return {boolean}
     */
    canDownload() {
        const { canDownload } = this.props;
        const { file } = this.state;
        const isFileDownloadable = getProp(file, 'permissions.can_download', false) && getProp(file, 'is_download_available', false);
        return isFileDownloadable && !!canDownload;
    }
    /**
     * Returns whether file can be annotated based on permissions
     *
     * @return {boolean}
     */
    canAnnotate() {
        const { showAnnotations } = this.props;
        const { file } = this.state;
        const isFileAnnotatable = getProp(file, 'permissions.can_annotate', false);
        return !!showAnnotations && isFileAnnotatable;
    }
    /**
     * Returns whether a preview should render annotations based on permissions
     *
     * @return {boolean}
     */
    canViewAnnotations() {
        const { showAnnotations } = this.props;
        const { file } = this.state;
        const hasViewAllPermissions = getProp(file, 'permissions.can_view_annotations_all', false);
        const hasViewSelfPermissions = getProp(file, 'permissions.can_view_annotations_self', false);
        return !!showAnnotations && (this.canAnnotate() || hasViewAllPermissions || hasViewSelfPermissions);
    }
    /**
     * Fetches a file
     *
     * @param {string} id file id
     * @param {Function|void} [successCallback] - Callback after file is fetched
     * @param {Function|void} [errorCallback] - Callback after error
     * @param {Object|void} [fetchOptions] - Fetch options
     * @return {void}
     */
    fetchFile(id, successCallback, errorCallback, fetchOptions = {}) {
        if (!id) {
            return;
        }
        this.fetchFileStartTime = performance.now();
        this.fetchFileEndTime = null;
        this.api
            .getFileAPI()
            .getFile(id, successCallback || this.fetchFileSuccessCallback, errorCallback || this.fetchFileErrorCallback, Object.assign({}, fetchOptions, { fields: PREVIEW_FIELDS_TO_FETCH }));
    }
    /**
     * Finds the index of current file inside the collection
     *
     * @return {number} -1 if not indexed
     */
    getFileIndex() {
        const { currentFileId } = this.state;
        const { collection } = this.props;
        if (!currentFileId || collection.length < 2) {
            return -1;
        }
        return collection.findIndex(item => {
            if (typeof item === 'string') {
                return item === currentFileId;
            }
            return item.id === currentFileId;
        });
    }
    /**
     * Shows a preview of a file at the specified index in the current collection.
     *
     * @public
     * @param {number} index - Index of file to preview
     * @return {void}
     */
    navigateToIndex(index) {
        const { collection, onNavigate } = this.props;
        const { length } = collection;
        if (length < 2 || index < 0 || index > length - 1) {
            return;
        }
        const fileOrId = collection[index];
        const fileId = typeof fileOrId === 'object' ? fileOrId.id || '' : fileOrId;
        this.setState({
            currentFileId: fileId,
        }, () => {
            // Execute navigation callback
            onNavigate(fileId);
        });
    }
    /**
     * Renders the file preview
     *
     * @inheritdoc
     * @return {Element}
     */
    render() {
        const { apiHost, isLarge, token, language, messages, className, contentSidebarProps, contentOpenWithProps, hasHeader, onClose, measureRef, sharedLink, sharedLinkPassword, requestInterceptor, responseInterceptor, } = this.props;
        const { file, isFileError, isReloadNotificationVisible, currentFileId } = this.state;
        const { collection } = this.props;
        const fileIndex = this.getFileIndex();
        const hasLeftNavigation = collection.length > 1 && fileIndex > 0 && fileIndex < collection.length;
        const hasRightNavigation = collection.length > 1 && fileIndex > -1 && fileIndex < collection.length - 1;
        if (!currentFileId) {
            return null;
        }
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
        return language = { language };
        messages = { messages } >
            id;
        {
            this.id;
        }
        className = {} `be bcpr ${className}`;
    }
}
ContentPreview.defaultProps = {
    apiHost: DEFAULT_HOSTNAME_API,
    appHost: DEFAULT_HOSTNAME_APP,
    autoFocus: false,
    canDownload: true,
    className: '',
    collection: [],
    contentOpenWithProps: {},
    contentSidebarProps: {},
    hasHeader: false,
    language: DEFAULT_LOCALE,
    onDownload: noop,
    onError: noop,
    onLoad: noop,
    onMetric: noop,
    onNavigate: noop,
    previewLibraryVersion: DEFAULT_PREVIEW_VERSION,
    showAnnotations: true,
    staticHost: DEFAULT_HOSTNAME_STATIC,
    staticPath: DEFAULT_PATH_STATIC_PREVIEW,
    useHotkeys: true,
};
{
    file;
}
token = { token };
onClose = { onClose };
onPrint = { this: .print };
canDownload = { this: .canDownload() };
onDownload = { this: .download };
contentOpenWithProps = { contentOpenWithProps };
canAnnotate = { this: .canAnnotate() }
    /  >
;
className;
"bcpr-body" >
    className;
"bcpr-container";
onMouseMove = { this: .onMouseMove };
ref = { this: .containerRef } >
    {}
    < /Measure>;
className = "bcpr-loading-wrapper" >
    isLoading;
{
    !isFileError;
}
loadingIndicatorProps = {};
{
    size: 'large',
    ;
}
/>
    < /div>;
{
    hasLeftNavigation && type;
    "button";
    className = "bcpr-navigate-left";
    onClick = { this: .navigateLeft } >
        />
        < /PlainButton>;
}
{
    hasRightNavigation && type;
    "button";
    className = "bcpr-navigate-right";
    onClick = { this: .navigateRight } >
        />
        < /PlainButton>;
}
/div>;
{
    file && Object.assign({}, contentSidebarProps);
    isLarge = { isLarge };
    apiHost = { apiHost };
    token = { token };
    cache = { this: .api.getCache() };
    fileId = { currentFileId };
    getPreview = { this: .getPreview };
    getViewer = { this: .getViewer };
    sharedLink = { sharedLink };
    sharedLinkPassword = { sharedLinkPassword };
    requestInterceptor = { requestInterceptor };
    responseInterceptor = { responseInterceptor }
        /  >
    ;
}
/div>;
{
    isReloadNotificationVisible && onClose;
    {
        this.closeReloadNotification;
    }
    onClick = { this: .loadFileFromStage } /  >
    ;
}
/div>
    < /Internationalize>;
;
export { ContentPreview as ContentPreviewComponent };
export default withErrorBoundary(ORIGIN_CONTENT_PREVIEW)(makeResponsive(ContentPreview));
//# sourceMappingURL=ContentPreview.js.map