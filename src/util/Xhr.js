/**
 * @was-flow
 * @file Network utilities
 * @author Box
 */
import axios from 'axios';
import getProp from 'lodash/get';
import TokenService from './TokenService';
import {
    HEADER_ACCEPT,
    HEADER_CLIENT_NAME,
    HEADER_CLIENT_VERSION,
    HEADER_CONTENT_TYPE,
    HTTP_POST,
    HTTP_PUT,
    HTTP_DELETE,
    HTTP_OPTIONS,
} from '../constants';

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
const DEFAULT_UPLOAD_TIMEOUT_MS = 120000;
class Xhr {
    /**
     * [constructor]
     *
     * @param {Object} options
     * @param {string} options.id - item id
     * @param {string} options.clientName - Client Name
     * @param {string|function} options.token - Auth token
     * @param {string} [options.sharedLink] - Shared link
     * @param {string} [options.sharedLinkPassword] - Shared link password
     * @param {string} [options.requestInterceptor] - Request interceptor
     * @param {string} [options.responseInterceptor] - Response interceptor
     * @return {Xhr} Cache instance
     */
    constructor({
        id,
        clientName,
        token,
        version,
        sharedLink,
        sharedLinkPassword,
        responseInterceptor,
        requestInterceptor,
    } = {}) {
        /**
         * Error interceptor that wraps the passed in responseInterceptor
         *
         * @param {Object} error - Error object from axios
         * @return {Promise} rejected promise with error info
         */
        this.errorInterceptor = error => {
            const errorObject = getProp(error, 'response.data', error);
            if (typeof this.responseInterceptor === 'function') {
                this.responseInterceptor(errorObject);
            }
            return Promise.reject(error);
        };
        this.id = id;
        this.token = token;
        this.clientName = clientName;
        this.version = version;
        this.sharedLink = sharedLink;
        this.sharedLinkPassword = sharedLinkPassword;
        this.responseInterceptor = responseInterceptor;
        this.axios = axios.create();
        this.axiosSource = axios.CancelToken.source();
        if (typeof responseInterceptor === 'function') {
            // Called on any non 2xx response
            this.axios.interceptors.response.use(responseInterceptor, this.errorInterceptor);
        }
        if (typeof requestInterceptor === 'function') {
            this.axios.interceptors.request.use(requestInterceptor);
        }
    }

    /**
     * Utility to parse a URL.
     *
     * @param {string} url - Url to parse
     * @return {Object} parsed url
     */
    getParsedUrl(url) {
        const a = document.createElement('a');
        a.href = url;
        return {
            api: url.replace(`${a.origin}/2.0`, ''),
            host: a.host,
            hostname: a.hostname,
            pathname: a.pathname,
            origin: a.origin,
            protocol: a.protocol,
            hash: a.hash,
            port: a.port,
        };
    }

    /**
     * Builds a list of required XHR headers.
     *
     * @param {string} [id] - Optional box item id
     * @param {Object} [args] - Optional existing headers
     * @return {Object} Headers
     */
    getHeaders(id, args = {}) {
        return __awaiter(this, void 0, void 0, function*() {
            const headers = Object.assign(
                {
                    Accept: 'application/json',
                    [HEADER_CONTENT_TYPE]: 'application/json',
                },
                args,
            );
            if (this.sharedLink) {
                headers.BoxApi = `shared_link=${this.sharedLink}`;
                if (this.sharedLinkPassword) {
                    headers.BoxApi = `${headers.BoxApi}&shared_link_password=${this.sharedLinkPassword}`;
                }
            }
            if (this.clientName) {
                headers[HEADER_CLIENT_NAME] = this.clientName;
            }
            if (this.version) {
                headers[HEADER_CLIENT_VERSION] = this.version;
            }
            // If id is passed in, use that, otherwise default to this.id
            const itemId = id || this.id || '';
            const token = yield TokenService.getWriteToken(itemId, this.token);
            if (token) {
                // Only add a token when there was one found
                headers.Authorization = `Bearer ${token}`;
            }
            return headers;
        });
    }

    /**
     * HTTP GETs a URL
     *
     * @param {string} id - Box item id
     * @param {string} url - The URL to fetch
     * @param {Object} [headers] - Key-value map of headers
     * @param {Object} [params] - Key-value map of querystring params
     * @return {Promise} - HTTP response
     */
    get({ url, id, params = {}, headers = {} }) {
        return this.getHeaders(id, headers).then(hdrs =>
            this.axios.get(url, {
                cancelToken: this.axiosSource.token,
                params,
                headers: hdrs,
                parsedUrl: this.getParsedUrl(url),
            }),
        );
    }

    /**
     * HTTP POSTs a URL with JSON data
     *
     * @param {string} id - Box item id
     * @param {string} url - The URL to fetch
     * @param {Object} data - JS Object representation of JSON data to send
     * @param {Object} params - Optional query params for the request
     * @param {Object} [headers] - Key-value map of headers
     * @param {string} [method] - xhr type
     * @return {Promise} - HTTP response
     */
    post({ url, id, data, params, headers = {}, method = HTTP_POST }) {
        return this.getHeaders(id, headers).then(hdrs =>
            this.axios({
                url,
                data,
                params,
                method,
                parsedUrl: this.getParsedUrl(url),
                headers: hdrs,
            }),
        );
    }

    /**
     * HTTP PUTs a URL with JSON data
     *
     * @param {string} id - Box item id
     * @param {string} url - The URL to fetch
     * @param {Object} data - JS Object representation of JSON data to send
     * @param {Object} params - Optional query params for the request
     * @param {Object} [headers] - Key-value map of headers
     * @return {Promise} - HTTP response
     */
    put({ url, id, data, params, headers = {} }) {
        return this.post({ id, url, data, params, headers, method: HTTP_PUT });
    }

    /**
     * HTTP DELETEs a URL with JSON data
     *
     * @param {string} id - Box item id
     * @param {string} url - The URL to fetch
     * @param {Object} data - JS Object representation of JSON data to send
     * @param {Object} [headers] - Key-value map of headers
     * @return {Promise} - HTTP response
     */
    delete({ url, id, data = {}, headers = {} }) {
        return this.post({ id, url, data, headers, method: HTTP_DELETE });
    }

    /**
     * HTTP OPTIONs a URL with JSON data.
     *
     * @param {string} id - Box item id
     * @param {string} url - The URL to post to
     * @param {Object} data - The non-file post data that should accompany the post
     * @param {Object} [headers] - Key-value map of headers
     * @param {Function} successHandler - Load success handler
     * @param {Function} errorHandler - Error handler
     * @return {void}
     */
    options({ id, url, data, headers = {}, successHandler, errorHandler }) {
        return this.getHeaders(id, headers)
            .then(hdrs =>
                this.axios({
                    url,
                    data,
                    method: HTTP_OPTIONS,
                    headers: hdrs,
                })
                    .then(successHandler)
                    .catch(errorHandler),
            )
            .catch(errorHandler);
    }

    /**
     * HTTP POST or PUT a URL with File data. Uses native XHR for progress event.
     *
     * @param {string} id - Box item id
     * @param {string} url - The URL to post to
     * @param {Object} [data] - File data and attributes
     * @param {Object} [headers] - Key-value map of headers
     * @param {string} [method] - XHR method, supports 'POST' and 'PUT'
     * @param {Function} successHandler - Load success handler
     * @param {Function} errorHandler - Error handler
     * @param {Function} progressHandler - Progress handler
     * @param {boolean} [withIdleTimeout] - enable idle timeout
     * @param {number} [idleTimeoutDuration] - idle timeout duration
     * @param {Function} [idleTimeoutHandler]
     * @return {void}
     */
    uploadFile({
        id,
        url,
        data,
        headers = {},
        method = HTTP_POST,
        successHandler,
        errorHandler,
        progressHandler,
        withIdleTimeout = false,
        idleTimeoutDuration = DEFAULT_UPLOAD_TIMEOUT_MS,
        idleTimeoutHandler,
    }) {
        return this.getHeaders(id, headers)
            .then(hdrs => {
                let idleTimeout;
                let progressHandlerToUse = progressHandler;
                if (withIdleTimeout) {
                    // Func that aborts upload and executes timeout callback
                    const idleTimeoutFunc = () => {
                        this.abort();
                        if (idleTimeoutHandler) {
                            idleTimeoutHandler();
                        }
                    };
                    idleTimeout = setTimeout(idleTimeoutFunc, idleTimeoutDuration);
                    // Progress handler that aborts upload if there has been no progress for >= timeoutMs
                    progressHandlerToUse = event => {
                        clearTimeout(idleTimeout);
                        idleTimeout = setTimeout(idleTimeoutFunc, idleTimeoutDuration);
                        progressHandler(event);
                    };
                }
                this.axios({
                    url,
                    data,
                    transformRequest: (reqData, reqHeaders) => {
                        // Remove Accept & Content-Type added by getHeaders()
                        delete reqHeaders[HEADER_ACCEPT];
                        delete reqHeaders[HEADER_CONTENT_TYPE];
                        if (headers[HEADER_CONTENT_TYPE]) {
                            reqHeaders[HEADER_CONTENT_TYPE] = headers[HEADER_CONTENT_TYPE];
                        }
                        // Convert to FormData if needed
                        if (reqData && !(reqData instanceof Blob) && reqData.attributes) {
                            const formData = new FormData();
                            Object.keys(reqData).forEach(key => {
                                formData.append(key, reqData[key]);
                            });
                            return formData;
                        }
                        return reqData;
                    },
                    method,
                    headers: hdrs,
                    onUploadProgress: progressHandlerToUse,
                    cancelToken: this.axiosSource.token,
                })
                    .then(response => {
                        clearTimeout(idleTimeout);
                        successHandler(response);
                    })
                    .catch(error => {
                        clearTimeout(idleTimeout);
                        errorHandler(error);
                    });
            })
            .catch(errorHandler);
    }

    /**
     * Aborts an axios request.
     *
     * @return {void}
     */
    abort() {
        if (this.axiosSource) {
            this.axiosSource.cancel();
        }
    }
}
export default Xhr;
// # sourceMappingURL=Xhr.js.map
