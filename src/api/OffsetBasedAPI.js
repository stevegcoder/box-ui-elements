var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @was-flow
 * @file class for Box offset based API's to inherit common functionality from
 * @author Box
 */
import Base from './Base';
import { getTypedFileId } from '../util/file';
import { DEFAULT_FETCH_START, DEFAULT_FETCH_END } from '../constants';
class OffsetBasedApi extends Base {
    /**
     * Gets query params for the API
     *
     * @param {number} offset the offset from the start to start fetching at
     * @param {number} limit the number of items to fetch
     * @param {array} fields the fields to fetch
     * @return the query params object
     */
    getQueryParameters(offset, limit, fields) {
        const queryParams = {
            offset,
            limit,
        };
        if (fields && fields.length > 0) {
            queryParams.fields = fields.toString();
        }
        return queryParams;
    }
    /**
     * Determines if the API has more items to fetch
     *
     * @param {number} offset the offset from the start to start fetching at
     * @param {number} totalCount the total number of items
     * @return {boolean} true if there are more items
     */
    hasMoreItems(offset, totalCount) {
        return totalCount === undefined || offset < totalCount;
    }
    /**
     * Helper for get
     *
     * @param {string} id the file id
     * @param {number} offset the offset from the start to start fetching at
     * @param {number} limit the number of items to fetch
     * @param {array} fields the fields to fetch
     * @param {boolean} shouldFetchAll true if should get all the pages before calling the sucessCallback
     * @private
     */
    offsetGetRequest(id, offset, limit, shouldFetchAll, fields) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isDestroyed()) {
                return;
            }
            // Make the XHR request
            try {
                const params = this.getQueryParameters(offset, limit, fields);
                const url = this.getUrl(id);
                const { data } = yield this.xhr.get({
                    url,
                    id: getTypedFileId(id),
                    params,
                });
                const entries = this.data ? this.data.entries : [];
                this.data = Object.assign({}, data, { entries: entries.concat(data.entries) });
                const totalCount = data.total_count;
                const nextOffset = offset + limit;
                if (shouldFetchAll && this.hasMoreItems(nextOffset, totalCount)) {
                    this.offsetGetRequest(id, nextOffset, limit, shouldFetchAll, fields);
                    return;
                }
                this.successHandler(this.data);
            }
            catch (error) {
                this.errorHandler(error);
            }
        });
    }
    /**
     * Offset based API get
     *
     * @param {string} id the file id
     * @param {Function} successCallback the success callback
     * @param {Function} errorCallback the error callback
     * @param {number} offset the offset from the start to start fetching at
     * @param {number} limit the number of items to fetch
     * @param {array} fields the fields to fetch
     * @param {boolean} shouldFetchAll true if should get all the pages before calling the sucessCallback
     */
    offsetGet(id, successCallback, errorCallback, offset = DEFAULT_FETCH_START, limit = DEFAULT_FETCH_END, fields, shouldFetchAll = true) {
        return __awaiter(this, void 0, void 0, function* () {
            this.successCallback = successCallback;
            this.errorCallback = errorCallback;
            return this.offsetGetRequest(id, offset, limit, shouldFetchAll, fields);
        });
    }
}
export default OffsetBasedApi;
//# sourceMappingURL=OffsetBasedAPI.js.map