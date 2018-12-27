/**
 * @was-flow
 * @file Helper for the box recents api
 * @author Box
 */
import Base from './Base';
import FileAPI from './File';
import FolderAPI from './Folder';
import WebLinkAPI from './WebLink';
import flatten from '../util/flatten';
import { getBadItemError } from '../util/error';
import { FOLDER_FIELDS_TO_FETCH } from '../util/fields';
import { DEFAULT_ROOT, CACHE_PREFIX_RECENTS, FIELD_DATE, SORT_DESC, ERROR_CODE_FETCH_RECENTS } from '../constants';

class Recents extends Base {
    constructor() {
        super(...arguments);
        /**
         * Handles the folder Recents response
         *
         * @param {Object} response
         * @return {void}
         */
        this.recentsSuccessHandler = ({ data }) => {
            if (this.isDestroyed()) {
                return;
            }
            const {
                entries,
                order: { by, direction },
            } = data;
            const items = [];
            entries.forEach(({ item, interacted_at }) => {
                const { path_collection } = item;
                const shouldInclude =
                    this.id === DEFAULT_ROOT ||
                    (!!path_collection && path_collection.entries.findIndex(crumb => crumb.id === this.id) !== -1);
                if (shouldInclude) {
                    items.push(Object.assign(item, { interacted_at }));
                }
            });
            const flattenedItems = flatten(
                items,
                new FolderAPI(this.options),
                new FileAPI(this.options),
                new WebLinkAPI(this.options),
            );
            this.getCache().set(this.key, {
                item_collection: {
                    entries: flattenedItems,
                    order: [
                        {
                            by,
                            direction,
                        },
                    ],
                },
            });
            this.finish();
        };
        /**
         * Handles the Recents error
         *
         * @param {Error} error fetch error
         * @return {void}
         */
        this.recentsErrorHandler = error => {
            if (this.isDestroyed()) {
                return;
            }
            this.errorCallback(error, this.errorCode);
        };
    }

    /**
     * Creates a key for the cache
     *
     * @param {string} id folder id
     * @return {string} key
     */
    getCacheKey(id) {
        return `${CACHE_PREFIX_RECENTS}${id}`;
    }

    /**
     * URL for recents api
     *
     * @return {string} base url for files
     */
    getUrl() {
        return `${this.getBaseApiUrl()}/recent_items`;
    }

    /**
     * Returns the results
     *
     * @return {void}
     */
    finish() {
        if (this.isDestroyed()) {
            return;
        }
        const cache = this.getCache();
        const recents = cache.get(this.key);
        const { item_collection } = recents;
        if (!item_collection) {
            throw getBadItemError();
        }
        const { entries } = item_collection;
        if (!Array.isArray(entries)) {
            throw getBadItemError();
        }
        const collection = {
            id: this.id,
            items: entries.map(key => cache.get(key)),
            percentLoaded: 100,
            sortBy: FIELD_DATE,
            sortDirection: SORT_DESC,
        };
        this.successCallback(collection);
    }

    /**
     * Does the network request
     *
     * @return {Promise}
     */
    recentsRequest() {
        if (this.isDestroyed()) {
            return Promise.reject();
        }
        this.errorCode = ERROR_CODE_FETCH_RECENTS;
        return this.xhr
            .get({
                url: this.getUrl(),
                params: {
                    fields: FOLDER_FIELDS_TO_FETCH.toString(),
                },
            })
            .then(this.recentsSuccessHandler)
            .catch(this.recentsErrorHandler);
    }

    /**
     * Gets recent files
     *
     * @param {string} id - parent folder id
     * @param {Function} successCallback - Function to call with results
     * @param {Function} errorCallback - Function to call with errors
     * @param {boolean|void} [options.forceFetch] - Bypasses the cache
     * @return {void}
     */
    recents(id, successCallback, errorCallback, options = {}) {
        if (this.isDestroyed()) {
            return;
        }
        // Save references
        this.id = id;
        this.successCallback = successCallback;
        this.errorCallback = errorCallback;
        const cache = this.getCache();
        this.key = this.getCacheKey(this.id);
        // Clear the cache if needed
        if (options.forceFetch) {
            cache.unset(this.key);
        }
        // Return the Cache value if it exists
        if (cache.has(this.key)) {
            this.finish();
            return;
        }
        // Make the XHR request
        this.recentsRequest();
    }
}
export default Recents;
// # sourceMappingURL=Recents.js.map
