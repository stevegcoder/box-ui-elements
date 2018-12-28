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
 * @file class for Box marker based API's to inherit common functionality from
 * @author Box
 */
import { getTypedFileId } from '../util/file';
import Base from './Base';
class MarkerBasedApi extends Base {
    /**
     * Determines if the API has more items to fetch
     *
     * @param {string} marker the marker from the start to start fetching at
     * @return {boolean} true if there are more items
     */
    hasMoreItems(marker) {
        return marker !== null && marker !== '';
    }
    /**
     * Helper for get
     *
     * @param {string} id the file id
     * @param {string} marker the marker from the start to start fetching at
     * @param {number} limit the number of items to fetch
     * @param {Object} requestData the request query params
     * @param {boolean} shouldFetchAll true if should get all the pages before calling
     * @private
     */
    markerGetRequest(id, marker, limit, shouldFetchAll, requestData = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isDestroyed()) {
                return;
            }
            // Make the XHR request
            try {
                const url = this.getUrl(id);
                const queryParams = Object.assign({}, requestData, { marker,
                    limit });
                const { data } = yield this.xhr.get({
                    url,
                    id: getTypedFileId(id),
                    params: queryParams,
                });
                const entries = this.data ? this.data.entries : [];
                this.data = Object.assign({}, data, { entries: entries.concat(data.entries) });
                const nextMarker = data.next_marker;
                if (shouldFetchAll && this.hasMoreItems(nextMarker)) {
                    this.markerGetRequest(id, nextMarker, limit, shouldFetchAll, requestData);
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
     * Marker based API get
     *
     * @param {string} id the file id
     * @param {Function} successCallback the success callback
     * @param {Function} errorCallback the error callback
     * @param {string} marker the marker from the start to start fetching at
     * @param {number} limit the number of items to fetch
     * @param {Object} params the request query params
     * @param {boolean} shouldFetchAll true if should get all the pages before calling the sucessCallback
     */
    markerGet({ id, successCallback, errorCallback, marker = '', limit = 1000, requestData, shouldFetchAll = true, }) {
        return __awaiter(this, void 0, void 0, function* () {
            this.successCallback = successCallback;
            this.errorCallback = errorCallback;
            return this.markerGetRequest(id, marker, limit, shouldFetchAll, requestData);
        });
    }
}
export default MarkerBasedApi;
//# sourceMappingURL=MarkerBasedAPI.js.map