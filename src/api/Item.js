/**
 * @was-flow
 * @file Helper for the box item API
 * @author Box
 */
import noop from 'lodash/noop';
import setProp from 'lodash/set';
import Base from './Base';
import { getBadItemError, getBadPermissionsError } from '../util/error';
import { ACCESS_NONE, CACHE_PREFIX_SEARCH, CACHE_PREFIX_FOLDER, TYPE_FOLDER, ERROR_CODE_DELETE_ITEM, ERROR_CODE_RENAME_ITEM, ERROR_CODE_SHARE_ITEM, } from '../constants';
class Item extends Base {
    constructor() {
        super(...arguments);
        /**
         * Handles response for deletion
         *
         * @return {void}
         */
        this.deleteSuccessHandler = () => {
            if (this.isDestroyed()) {
                return;
            }
            // When fetching the parent folder from the cache
            // we have no guarantees that it will be there since
            // search results happen across folders and we only
            // add those folders to cache that have been navigated to.
            const parentKey = this.getParentCacheKey(this.parentId);
            const folder = this.getCache().get(parentKey);
            if (!folder) {
                this.postDeleteCleanup();
                return;
            }
            // Same logic as above but in this case we may have the parent
            // folders meta data in cache but not its contents.
            const { item_collection } = folder;
            if (!item_collection) {
                this.postDeleteCleanup();
                return;
            }
            const { entries, total_count } = item_collection;
            if (!Array.isArray(entries) || typeof total_count !== 'number') {
                throw getBadItemError();
            }
            const childKey = this.getCacheKey(this.id);
            const oldCount = entries.length;
            const newEntries = entries.filter((entry) => entry !== childKey);
            const newCount = newEntries.length;
            const updatedObject = this.merge(parentKey, 'item_collection', Object.assign(item_collection, {
                entries: newEntries,
                total_count: total_count - (oldCount - newCount),
            }));
            this.successCallback(updatedObject);
            this.postDeleteCleanup();
        };
        /**
         * Handles response for rename
         *
         * @param {BoxItem} data - The updated item
         * @return {void}
         */
        this.renameSuccessHandler = ({ data }) => {
            if (!this.isDestroyed()) {
                // Get rid of all searches
                this.getCache().unsetAll(CACHE_PREFIX_SEARCH);
                const updatedObject = this.merge(this.getCacheKey(this.id), 'name', data.name);
                this.successCallback(updatedObject);
            }
        };
        /**
         * Handles response for shared link
         *
         * @param {BoxItem} data - The updated item
         * @return {void}
         */
        this.shareSuccessHandler = ({ data }) => {
            if (!this.isDestroyed()) {
                const updatedObject = this.merge(this.getCacheKey(this.id), 'shared_link', data.shared_link);
                this.successCallback(updatedObject);
            }
        };
    }
    /**
     * Creates a key for the item's parent
     * This is always a folder
     *
     * @param {string} Id - folder id
     * @return {string} Key
     */
    getParentCacheKey(id) {
        return `${CACHE_PREFIX_FOLDER}${id}`;
    }
    /**
     * Creates a key for the cache
     *
     * @param {string} Id - Folder id
     * @return {string} Key
     */
    getCacheKey(id) {
        return `getCacheKey(${id}) should be overriden`;
    }
    /**
     * API URL for items
     *
     * @param {string} id - Item id
     * @protected
     * @return {string} Base url for files
     */
    getUrl(id) {
        return `getUrl(${id}) should be overriden`;
    }
    /**
     * Merges new data with old data and returns new data
     *
     * @param {String} cacheKey - The cache key of item to merge
     * @param {String} key - The attribute to merge
     * @param {Object} value - The value to merge
     * @return {BoxItem} The newly updated object from the cache
     */
    merge(cacheKey, key, value) {
        const cache = this.getCache();
        cache.merge(cacheKey, setProp({}, key, value));
        return cache.get(cacheKey);
    }
    /**
     * Steps to do after deletion
     *
     * @return {void}
     */
    postDeleteCleanup() {
        if (this.isDestroyed()) {
            return;
        }
        // Get rid of all searches
        this.getCache().unsetAll(CACHE_PREFIX_SEARCH);
        this.successCallback();
    }
    /**
     * API to delete an Item
     *
     * @param {Object} item - Item to delete
     * @param {Function} successCallback - Success callback
     * @param {Function} errorCallback - Error callback
     * @return {void}
     */
    deleteItem(item, successCallback, errorCallback = noop) {
        if (this.isDestroyed()) {
            return Promise.reject();
        }
        this.errorCode = ERROR_CODE_DELETE_ITEM;
        const { id, permissions, parent, type } = item;
        if (!id || !permissions || !parent || !type) {
            errorCallback(getBadItemError(), this.errorCode);
            return Promise.reject();
        }
        const { id: parentId } = parent;
        const { can_delete } = permissions;
        if (!can_delete || !parentId) {
            errorCallback(getBadPermissionsError(), this.errorCode);
            return Promise.reject();
        }
        this.id = id;
        this.parentId = parentId;
        this.successCallback = successCallback;
        this.errorCallback = errorCallback;
        const url = `${this.getUrl(id)}${type === TYPE_FOLDER ? '?recursive=true' : ''}`;
        return this.xhr
            .delete({ url })
            .then(this.deleteSuccessHandler)
            .catch((e) => {
            this.errorHandler(e);
        });
    }
    /**
     * API to rename an Item
     *
     * @param {Object} item - Item to rename
     * @param {string} name - Item new name
     * @param {Function} successCallback - Success callback
     * @param {Function} errorCallback - Error callback
     * @return {void}
     */
    rename(item, name, successCallback, errorCallback = noop) {
        if (this.isDestroyed()) {
            return Promise.reject();
        }
        this.errorCode = ERROR_CODE_RENAME_ITEM;
        const { id, permissions } = item;
        if (!id || !permissions) {
            errorCallback(getBadItemError(), this.errorCode);
            return Promise.reject();
        }
        const { can_rename } = permissions;
        if (!can_rename) {
            errorCallback(getBadPermissionsError(), this.errorCode);
            return Promise.reject();
        }
        this.id = id;
        this.successCallback = successCallback;
        this.errorCallback = errorCallback;
        return this.xhr
            .put({ url: `${this.getUrl(id)}`, data: { name } })
            .then(this.renameSuccessHandler)
            .catch((e) => {
            this.errorHandler(e);
        });
    }
    /**
     * API to create or remove a shared link
     *
     * @param {Object} item - Item to share
     * @param {string} access - Shared access level
     * @param {Function} successCallback - Success callback
     * @param {Function|void} errorCallback - Error callback
     * @return {void}
     */
    share(item, access, successCallback, errorCallback = noop) {
        if (this.isDestroyed()) {
            return Promise.reject();
        }
        this.errorCode = ERROR_CODE_SHARE_ITEM;
        const { id, permissions } = item;
        if (!id || !permissions) {
            errorCallback(getBadItemError(), this.errorCode);
            return Promise.reject();
        }
        const { can_share, can_set_share_access } = permissions;
        if (!can_share || !can_set_share_access) {
            errorCallback(getBadPermissionsError(), this.errorCode);
            return Promise.reject();
        }
        this.id = id;
        this.successCallback = successCallback;
        this.errorCallback = errorCallback;
        // We use the parent folder's auth token since use case involves
        // only content explorer or picker which works onf folder tokens
        return this.xhr
            .put({
            url: this.getUrl(this.id),
            data: {
                shared_link: access === ACCESS_NONE ? null : { access },
            },
        })
            .then(this.shareSuccessHandler)
            .catch((e) => {
            this.errorHandler(e);
        });
    }
}
export default Item;
//# sourceMappingURL=Item.js.map