/**
 * @was-flow
 * @file Helper for the box Users API
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
import Base from './Base';
import TokenService from '../util/TokenService';
import { getTypedFileId } from '../util/file';
import { ERROR_CODE_FETCH_CURRENT_USER } from '../constants';
class Users extends Base {
    /**
     * API URL for Users
     *
     * @return {string} base url for users
     */
    getUrl() {
        return `${this.getBaseApiUrl()}/users/me`;
    }
    /**
     * API URL for Users avatar
     *
     * @param {string} id - A box user id.
     * @return {string} base url for users
     */
    getAvatarUrl(id) {
        if (!id) {
            throw new Error('Missing user id');
        }
        return `${this.getBaseApiUrl()}/users/${id}/avatar`;
    }
    /**
     * Gets the user avatar URL
     *
     * @param {string} userId the user id
     * @param {string} fileId the file id
     * @return {string} the user avatar URL string for a given user with access token attached
     */
    getAvatarUrlWithAccessToken(userId, fileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = yield TokenService.getReadToken(getTypedFileId(fileId), this.options.token);
            if (typeof accessToken === 'string') {
                return `${this.getAvatarUrl(userId)}?access_token=${accessToken}`;
            }
            return null;
        });
    }
    /**
     * API for fetching a user
     *
     * @param {string} id - a box file id
     * @param {Function} successCallback - Success callback
     * @param {Function} errorCallback - Error callback
     * @param {Object} requestData - additional request data
     * @returns {Promise<void>}
     */
    getUser(id, successCallback, errorCallback, requestData = {}) {
        this.errorCode = ERROR_CODE_FETCH_CURRENT_USER;
        this.get({
            id,
            successCallback,
            errorCallback,
            requestData,
        });
    }
}
export default Users;
//# sourceMappingURL=Users.js.map