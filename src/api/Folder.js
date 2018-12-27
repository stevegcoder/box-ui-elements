/**
 * @was-flow
 * @file Helper for the box folder api
 * @author Box
 */
import noop from 'lodash/noop';
import Item from './Item';
import flatten from '../util/flatten';
import FileAPI from './File';
import WebLinkAPI from './WebLink';
import { FOLDER_FIELDS_TO_FETCH } from '../util/fields';
import { CACHE_PREFIX_FOLDER, ERROR_CODE_FETCH_FOLDER, ERROR_CODE_CREATE_FOLDER } from '../constants';
import { getBadItemError } from '../util/error';

class Folder extends Item {
    constructor() {
        super(...arguments);
        /**
         * Handles the folder fetch response
         *
         * @param {Object} response
         * @return {void}
         */
        this.folderSuccessHandler = ({ data }) => {
            if (this.isDestroyed()) {
                return;
            }
            const { item_collection } = data;
            if (!item_collection) {
                throw getBadItemError();
            }
            const { entries, total_count, limit, offset } = item_collection;
            if (
                !Array.isArray(entries) ||
                typeof total_count !== 'number' ||
                typeof limit !== 'number' ||
                typeof offset !== 'number'
            ) {
                throw getBadItemError();
            }
            const flattened = flatten(
                entries,
                new Folder(this.options),
                new FileAPI(this.options),
                new WebLinkAPI(this.options),
            );
            this.itemCache = (this.itemCache || []).concat(flattened);
            this.getCache().set(
                this.key,
                Object.assign({}, data, {
                    item_collection: Object.assign({}, item_collection, {
                        entries: this.itemCache,
                    }),
                }),
            );
            this.finish();
        };
        /**
         * API to rename an Item
         *
         * @param {string} id - parent folder id
         * @param {string} name - new folder name
         * @param {Function} successCallback - success callback
         * @param {Function} errorCallback - error callback
         * @return {void}
         */
        this.createSuccessHandler = ({ data }) => {
            const { id: childId } = data;
            if (this.isDestroyed() || !childId) {
                return;
            }
            const childKey = this.getCacheKey(childId);
            const cache = this.getCache();
            const parent = cache.get(this.key);
            if (!parent) {
                this.successCallback(data);
                return;
            }
            const { item_collection } = parent;
            if (!item_collection) {
                throw getBadItemError();
            }
            const { total_count, entries } = item_collection;
            if (!Array.isArray(entries) || typeof total_count !== 'number') {
                throw getBadItemError();
            }
            cache.set(childKey, data);
            item_collection.entries = [childKey].concat(entries);
            item_collection.total_count = total_count + 1;
            this.successCallback(data);
        };
    }

    /**
     * Creates a key for the cache
     *
     * @param {string} id folder id
     * @return {string} key
     */
    getCacheKey(id) {
        return `${CACHE_PREFIX_FOLDER}${id}`;
    }

    /**
     * Base URL for folder api
     *
     * @param {string} [id] optional file id
     * @return {string} base url for files
     */
    getUrl(id) {
        const suffix = id ? `/${id}` : '';
        return `${this.getBaseApiUrl()}/folders${suffix}`;
    }

    /**
     * Tells if a folder has its items all loaded
     *
     * @return {boolean} if items are loaded
     */
    isLoaded() {
        const cache = this.getCache();
        return cache.has(this.key);
    }

    /**
     * Composes and returns the results
     *
     * @return {void}
     */
    finish() {
        if (this.isDestroyed()) {
            return;
        }
        const cache = this.getCache();
        const folder = cache.get(this.key);
        const { id, name, permissions, path_collection, item_collection } = folder;
        if (!item_collection || !path_collection) {
            throw getBadItemError();
        }
        const { entries, offset, total_count } = item_collection;
        if (!Array.isArray(entries) || typeof total_count !== 'number') {
            throw getBadItemError();
        }
        const collection = {
            id,
            name,
            offset,
            percentLoaded: 100,
            permissions,
            boxItem: folder,
            breadcrumbs: path_collection.entries,
            items: entries.map(key => cache.get(key)),
            sortBy: this.sortBy,
            sortDirection: this.sortDirection,
            totalCount: total_count,
        };
        this.successCallback(collection);
    }

    /**
     * Does the network request for fetching a folder
     *
     * @return {void}
     */
    folderRequest() {
        if (this.isDestroyed()) {
            return Promise.reject();
        }
        this.errorCode = ERROR_CODE_FETCH_FOLDER;
        return this.xhr
            .get({
                url: this.getUrl(this.id),
                params: {
                    direction: this.sortDirection.toLowerCase(),
                    limit: this.limit,
                    offset: this.offset,
                    fields: FOLDER_FIELDS_TO_FETCH.toString(),
                    sort: this.sortBy.toLowerCase(),
                },
            })
            .then(this.folderSuccessHandler)
            .catch(this.errorHandler);
    }

    /**
     * Gets a box folder and its items
     *
     * @param {string} id - Folder id
     * @param {number} limit - maximum number of items to retrieve
     * @param {number} offset - starting index from which to retrieve items
     * @param {string} sortBy - sort by field
     * @param {string} sortDirection - sort direction
     * @param {Function} successCallback - Function to call with results
     * @param {Function} errorCallback - Function to call with errors
     * @param {boolean|void} [options.fields] - Optionally include specific fields
     * @param {boolean|void} [options.forceFetch] - Optionally Bypasses the cache
     * @param {boolean|void} [options.refreshCache] - Optionally Updates the cache
     * @return {void}
     */
    getFolder(id, limit, offset, sortBy, sortDirection, successCallback, errorCallback, options = {}) {
        if (this.isDestroyed()) {
            return;
        }
        // Save references
        this.id = id;
        this.key = this.getCacheKey(id);
        this.limit = limit;
        this.offset = offset;
        this.sortBy = sortBy;
        this.sortDirection = sortDirection;
        this.successCallback = successCallback;
        this.errorCallback = errorCallback;
        // Clear the cache if needed
        if (options.forceFetch) {
            this.getCache().unset(this.key);
        }
        // Return the Cache value if it exists
        if (this.isLoaded()) {
            this.finish();
            return;
        }
        // Make the XHR request
        this.folderRequest();
    }

    /**
     * Does the network request for fetching a folder
     *
     * @return {void}
     */
    folderCreateRequest(name) {
        if (this.isDestroyed()) {
            return Promise.reject();
        }
        this.errorCode = ERROR_CODE_CREATE_FOLDER;
        const url = `${this.getUrl()}?fields=${FOLDER_FIELDS_TO_FETCH.toString()}`;
        return this.xhr
            .post({
                url,
                data: {
                    name,
                    parent: {
                        id: this.id,
                    },
                },
            })
            .then(this.createSuccessHandler)
            .catch(this.errorHandler);
    }

    /**
     * API to create a folder
     *
     * @param {string} id - parent folder id
     * @param {string} name - new folder name
     * @param {Function} successCallback - success callback
     * @param {Function} errorCallback - error callback
     * @return {void}
     */
    create(id, name, successCallback, errorCallback = noop) {
        if (this.isDestroyed()) {
            return;
        }
        this.id = id;
        this.key = this.getCacheKey(id);
        this.successCallback = successCallback;
        this.errorCallback = errorCallback;
        this.folderCreateRequest(name);
    }
}
export default Folder;
// # sourceMappingURL=Folder.js.map
