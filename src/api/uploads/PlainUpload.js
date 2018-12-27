/**
 * @was-flow
 * @file Helper for the plain Box Upload API
 * @author Box
 */
import noop from 'lodash/noop';
import BaseUpload from './BaseUpload';
import { digest } from '../../util/webcrypto';

const __awaiter =
    (this && this.__awaiter) ||
    function(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))((resolve, reject) => {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator.throw(value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : new P(resolve => {
                          resolve(result.value);
                      }).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
const CONTENT_MD5_HEADER = 'Content-MD5';
class PlainUpload extends BaseUpload {
    constructor() {
        super(...arguments);
        /**
         * Handles an upload success response
         *
         * @param {Object} data - Upload success data
         * @return {void}
         */
        this.uploadSuccessHandler = ({ data }) => {
            const { entries } = data;
            if (this.isDestroyed()) {
                return;
            }
            if (typeof this.successCallback === 'function') {
                // Response entries are the successfully created Box File objects
                this.successCallback(entries);
            }
        };
        /**
         * Handles an upload progress event
         *
         * @param {Object} event - Progress event
         * @return {void}
         */
        this.uploadProgressHandler = event => {
            if (this.isDestroyed()) {
                return;
            }
            if (typeof this.progressCallback === 'function') {
                this.progressCallback(event);
            }
        };
        /**
         * Uploads a file. If a file ID is supplied, use the Upload File
         * Version API to replace the file.
         *
         * @param {Object} - Request options
         * @param {boolean} [options.url] - Upload URL to use
         * @return {Promise} Async function promise
         */
        this.preflightSuccessHandler = ({ data }) =>
            __awaiter(this, void 0, void 0, function*() {
                if (this.isDestroyed()) {
                    return;
                }
                // Use provided upload URL if passed in, otherwise construct
                let uploadUrl = data.upload_url;
                if (!uploadUrl) {
                    uploadUrl = `${this.getBaseUploadUrl()}/files/content`;
                    if (this.fileId) {
                        uploadUrl = uploadUrl.replace('content', `${this.fileId}/content`);
                    }
                }
                const attributes = JSON.stringify({
                    name: this.fileName,
                    parent: { id: this.folderId },
                });
                const options = {
                    url: uploadUrl,
                    data: {
                        attributes,
                        file: this.file,
                    },
                    headers: {},
                    successHandler: this.uploadSuccessHandler,
                    errorHandler: this.preflightErrorHandler,
                    progressHandler: this.uploadProgressHandler,
                };
                // Calculate SHA1 for file consistency check
                const sha1 = yield this.computeSHA1(this.file);
                if (sha1) {
                    options.headers = {
                        [CONTENT_MD5_HEADER]: sha1,
                    };
                }
                this.xhr.uploadFile(options);
            });
    }

    /**
     * Uploads a file. If there is a conflict and overwrite is true, replace the file.
     * Otherwise, re-upload with a different name.
     *
     * @param {Object} options - Upload options
     * @param {string} options.folderId - untyped folder id
     * @param {string} [options.fileId] - Untyped file id (e.g. no "file_" prefix)
     * @param {File} options.file - File blob object
     * @param {Function} [options.successCallback] - Function to call with response
     * @param {Function} [options.errorCallback] - Function to call with errors
     * @param {Function} [options.progressCallback] - Function to call with progress
     * @param {boolean} [overwrite] - Should upload overwrite file with same name
     * @return {void}
     */
    upload({
        folderId,
        fileId,
        file,
        successCallback = noop,
        errorCallback = noop,
        progressCallback = noop,
        overwrite = true,
    }) {
        if (this.isDestroyed()) {
            return;
        }
        // Save references
        this.folderId = folderId;
        this.fileId = fileId;
        this.file = file;
        this.fileName = this.file.name;
        this.successCallback = successCallback;
        this.errorCallback = errorCallback;
        this.progressCallback = progressCallback;
        this.overwrite = overwrite;
        this.makePreflightRequest();
    }

    /**
     * Cancels upload of a file.
     *
     * @return {void}
     */
    cancel() {
        if (this.isDestroyed()) {
            return;
        }
        clearTimeout(this.retryTimeout);
        this.destroy();
    }

    /**
     * Calculates SHA1 of a file
     *
     * @param {File} file
     * @return {Promise} Promise that resolves with SHA1 digest
     */
    computeSHA1(file) {
        return __awaiter(this, void 0, void 0, function*() {
            let sha1 = '';
            try {
                // Adapted from https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
                const reader = new window.FileReader();
                const { buffer } = yield this.readFile(reader, file);
                const hashBuffer = yield digest('SHA-1', buffer);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                sha1 = hashArray.map(b => `00${b.toString(16)}`.slice(-2)).join('');
            } catch (e) {
                // Return empty sha1 if hashing fails
            }
            return sha1;
        });
    }
}
export default PlainUpload;
// # sourceMappingURL=PlainUpload.js.map
