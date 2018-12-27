/**
 * @was-flow
 * @file Multiput upload base class
 * @author Box
 */
import BaseUpload from './BaseUpload';

const DEFAULT_MULTIPUT_CONFIG = {
    digestReadahead: 5,
    initialRetryDelayMs: 5000,
    maxRetryDelayMs: 60000,
    parallelism: 5,
    requestTimeoutMs: 120000,
    retries: 5,
};
class BaseMultiput extends BaseUpload {
    /**
     * [constructor]
     *
     * @param {Options} options
     * @param {Object} sessionEndpoints
     * @param {MultiputConfig} [config]
     * @return {void}
     */
    constructor(options, sessionEndpoints, config) {
        super(options);
        /**
         * POST log event
         *
         * @param {string} eventType
         * @param {string} [eventInfo]
         * @return {Promise}
         */
        this.logEvent = (eventType, eventInfo) => {
            const data = {
                event_type: eventType,
            };
            if (eventInfo) {
                data.event_info = eventInfo;
            }
            return this.xhr.post({
                url: this.sessionEndpoints.logEvent,
                data,
            });
        };
        this.config = config || DEFAULT_MULTIPUT_CONFIG;
        this.sessionEndpoints = sessionEndpoints;
    }
}
export default BaseMultiput;
// # sourceMappingURL=BaseMultiput.js.map
