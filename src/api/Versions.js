/**
 * @was-flow
 * @file Helper for the box versions API
 * @author Box
 */
import OffsetBasedAPI from './OffsetBasedAPI';
import { ERROR_CODE_FETCH_VERSIONS, DEFAULT_FETCH_START, DEFAULT_FETCH_END } from '../constants';
import { VERSIONS_FIELDS_TO_FETCH } from '../util/fields';
const ACTION = {
    upload: 'upload',
    delete: 'delete',
    restore: 'restore',
};
class Versions extends OffsetBasedAPI {
    constructor() {
        super(...arguments);
        /**
         * Formats the versions api response to usable data
         * @param {Object} data the api response data
         */
        this.successHandler = (data) => {
            if (this.isDestroyed() || typeof this.successCallback !== 'function') {
                return;
            }
            const { entries } = data;
            const versions = entries.map((version) => {
                return Object.assign({}, version, { action: version.trashed_at ? ACTION.delete : ACTION.upload });
            });
            this.successCallback(Object.assign({}, data, { entries: versions }));
        };
    }
    /**
     * API URL for versions
     *
     * @param {string} [id] - a box file id
     * @return {string} base url for files
     */
    getUrl(id) {
        if (!id) {
            throw new Error('Missing file id!');
        }
        return `${this.getBaseApiUrl()}/files/${id}/versions`;
    }
    /**
     * API for fetching versions on a file
     *
     * @param {string} fileId - a box file id
     * @param {Function} successCallback - the success callback
     * @param {Function} errorCallback - the error callback
     * @param {number} offset - the offset of the starting version index
     * @param {number} limit - the max number of versions to fetch
     * @param {Array} fields - the fields to fetch
     * @param {boolean} shouldFetchAll - true if all versions should be fetched
     * @returns {void}
     */
    getVersions(fileId, successCallback, errorCallback, offset = DEFAULT_FETCH_START, limit = DEFAULT_FETCH_END, fields = VERSIONS_FIELDS_TO_FETCH, shouldFetchAll = true) {
        this.errorCode = ERROR_CODE_FETCH_VERSIONS;
        this.offsetGet(fileId, successCallback, errorCallback, offset, limit, fields, shouldFetchAll);
    }
}
export default Versions;
//# sourceMappingURL=Versions.js.map