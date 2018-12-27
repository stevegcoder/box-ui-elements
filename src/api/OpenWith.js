/**
 * @was-flow
 * @file Helper for the open_with_integrations API endpoint
 * @author Box
 */
import Base from './Base';
import { HEADER_ACCEPT_LANGUAGE, DEFAULT_LOCALE, ERROR_CODE_FETCH_INTEGRATIONS } from '../constants';

class OpenWith extends Base {
    /**
     * API URL for Open With
     *
     * @param {string} [id] - a box file id
     * @return {string} base url for files
     */
    getUrl(id) {
        if (!id) {
            throw new Error('Missing file id!');
        }
        return `${this.getBaseApiUrl()}/files/${id}/open_with_integrations`;
    }

    /**
     * Gets Open With integration data
     *
     * @param {string} fileId - Box file ID
     * @param {string} locale - locale to receive translated strings from the API
     * @param {Function} successCallback - Success callback
     * @param {Function} errorCallback - Error callback
     * @return {void}
     */
    getOpenWithIntegrations(fileId, locale = DEFAULT_LOCALE, successCallback, errorCallback) {
        this.errorCode = ERROR_CODE_FETCH_INTEGRATIONS;
        const params = {
            headers: {
                [HEADER_ACCEPT_LANGUAGE]: locale,
            },
        };
        this.get({
            id: fileId,
            params,
            successCallback: openWithIntegrations => {
                const formattedOpenWithData = this.formatOpenWithData(openWithIntegrations);
                successCallback(formattedOpenWithData);
            },
            errorCallback,
        });
    }

    /**
     * Formats Open With data conveniently for the client
     *
     * @param {Array<Object>} openWithIntegrations - The modified Open With integration objects
     * @return {Array<Integration>} formatted Open With integrations
     */
    formatOpenWithData(openWithIntegrations) {
        const { items, default_app_integration: defaultIntegration } = openWithIntegrations;
        const integrations = items.map(
            ({
                app_integration,
                disabled_reasons,
                display_name,
                display_description,
                display_order,
                is_disabled,
                should_show_consent_popup,
            }) => {
                const { id, type } = app_integration;
                return {
                    appIntegrationId: id,
                    displayDescription: display_description,
                    disabledReasons: disabled_reasons,
                    displayOrder: display_order,
                    isDefault: !!defaultIntegration && id === defaultIntegration.id,
                    isDisabled: is_disabled,
                    displayName: display_name,
                    requiresConsent: should_show_consent_popup,
                    type,
                };
            },
        );
        // Sort integrations by displayOrder
        return integrations.sort((integrationA, integrationB) => integrationA.displayOrder - integrationB.displayOrder);
    }
}
export default OpenWith;
// # sourceMappingURL=OpenWith.js.map
