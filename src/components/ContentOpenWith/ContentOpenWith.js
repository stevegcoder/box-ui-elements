/**
 * @was-flow
 * @file Open With Component
 * @author Box
 */
import { PureComponent } from 'react';
import classNames from 'classnames';
import uniqueid from 'lodash/uniqueId';
import noop from 'lodash/noop';
import API from '../../api';
import '../base.scss';
import './ContentOpenWith.scss';
import { CLIENT_NAME_OPEN_WITH, DEFAULT_HOSTNAME_API, HTTP_GET, HTTP_POST } from '../../constants';
const WINDOW_OPEN_BLOCKED_ERROR = 'Unable to open integration in new window';
const UNSUPPORTED_INVOCATION_METHOD_TYPE = 'Integration invocation using this HTTP method type is not supported';
class ContentOpenWith extends PureComponent {
    /**
     * [constructor]
     *
     * @private
     * @return {ContentOpenWith}
     */
    constructor(props) {
        super(props);
        this.initialState = {
            isDropdownOpen: false,
            integrations: null,
            isLoading: true,
            fetchError: null,
            executePostData: null,
            shouldRenderErrorIntegrationPortal: false,
            shouldRenderLoadingIntegrationPortal: false,
        };
        /**
         * Fetch app integrations info needed to render.
         *
         * @param {OpenWithIntegrations} integrations - The available Open With integrations
         * @return {void}
         */
        this.fetchOpenWithSuccessHandler = (integrations) => {
            this.setState({ integrations, isLoading: false });
        };
        /**
         * Handles a fetch error for the open_with_integrations and app_integrations endpoints
         *
         * @param {Error} error - An axios fetch error
         * @return {void}
         */
        this.fetchErrorHandler = (error) => {
            this.props.onError(error);
            this.setState({ fetchError: error, isLoading: false });
        };
        /**
         * Click handler when an integration is clicked
         *
         * @private
         * @return {void}
         */
        this.onIntegrationClick = ({ appIntegrationId, displayName }) => {
            const { fileId } = this.props;
            // window.open() is immediately invoked to avoid popup-blockers
            // The name is included to be the target of a form if the integration is a POST integration.
            // A uniqueid is used to force the browser to open a new tab every time, while still allowing
            // a form to reference a given tab.
            this.integrationWindow = this.window.open('', `${uniqueid(appIntegrationId)}`);
            this.integrationWindow.document.title = displayName;
            this.integrationWindow.onunload = this.cleanupIntegrationWindow;
            this.setState({
                shouldRenderLoadingIntegrationPortal: true,
                shouldRenderErrorIntegrationPortal: false,
            });
            this.api
                .getAppIntegrationsAPI(false)
                .execute(appIntegrationId, fileId, this.executeIntegrationSuccessHandler, this.executeIntegrationErrorHandler);
            this.executeId = appIntegrationId;
        };
        /**
         * cleans up the portal UI when a tab is closed so that we can remount the component later.
         *
         * @private
         * @return {void}
         */
        this.cleanupIntegrationWindow = () => {
            this.setState({
                shouldRenderLoadingIntegrationPortal: false,
                shouldRenderErrorIntegrationPortal: false,
            });
        };
        /**
         * Opens the integration in a new tab based on the API data
         *
         * @private
         * @param {ExecuteAPI} executeData - API response on how to open an executed integration
    
         * @return {void}
         */
        this.executeIntegrationSuccessHandler = (executeData) => {
            const { method, url } = executeData;
            switch (method) {
                case HTTP_POST:
                    this.setState({ executePostData: executeData });
                    break;
                case HTTP_GET:
                    if (!this.integrationWindow) {
                        this.executeIntegrationErrorHandler(Error(WINDOW_OPEN_BLOCKED_ERROR));
                        return;
                    }
                    // Prevents abuse of window.opener
                    // see here for more details: https://mathiasbynens.github.io/rel-noopener/
                    this.integrationWindow.location = url;
                    this.integrationWindow.opener = null;
                    this.onExecute();
                    break;
                default:
                    this.executeIntegrationErrorHandler(Error(UNSUPPORTED_INVOCATION_METHOD_TYPE));
            }
            this.integrationWindow = null;
        };
        /**
         * Clears state after a form has been submitted
         *
         * @private
         * @return {void}
         */
        this.onExecuteFormSubmit = () => {
            this.onExecute();
            this.setState({ executePostData: null });
        };
        /**
         * Handles execution related errors
         *
         * @private
         * @param {Error} error - Error object
         * @return {void}
         */
        this.executeIntegrationErrorHandler = (error) => {
            this.props.onError(error);
            // eslint-disable-next-line no-console
            console.error(error);
            this.setState({
                shouldRenderLoadingIntegrationPortal: false,
                shouldRenderErrorIntegrationPortal: true,
            });
        };
        const { token, apiHost, clientName, requestInterceptor, responseInterceptor } = props;
        this.id = uniqueid('bcow_');
        this.api = new API({
            token,
            apiHost,
            clientName,
            requestInterceptor,
            responseInterceptor,
        });
        // Clone initial state to allow for state reset on new files
        this.state = Object.assign({}, this.initialState);
    }
    /**
     * Destroys api instances with caches
     *
     * @private
     * @return {void}
     */
    clearCache() {
        this.api.destroy(true);
    }
    /**
     * Cleanup
     *
     * @private
     * @inheritdoc
     * @return {void}
     */
    componentWillUnmount() {
        // Don't destroy the cache while unmounting
        this.api.destroy(false);
    }
    /**
     *
     * @private
     * @inheritdoc
     * @return {void}
     */
    componentDidMount() {
        const { fileId } = this.props;
        if (!fileId) {
            return;
        }
        this.window = window;
        this.fetchOpenWithData();
    }
    /**
     * After component updates, re-fetch Open With data if appropriate.
     *
     * @return {void}
     */
    componentDidUpdate(prevProps) {
        const { fileId: currentFileId } = this.props;
        const { fileId: previousFileId } = prevProps;
        if (!currentFileId) {
            return;
        }
        if (currentFileId !== previousFileId) {
            this.setState({ isLoading: true });
            this.fetchOpenWithData();
        }
    }
    /**
     * Fetches Open With data.
     *
     * @return {void}
     */
    fetchOpenWithData() {
        const { fileId, language } = this.props;
        this.api
            .getOpenWithAPI(false)
            .getOpenWithIntegrations(fileId, language, this.fetchOpenWithSuccessHandler, this.fetchErrorHandler);
    }
    /**
     * Called when the Open With button gets new properties
     *
     * @private
     * @return {void}
     */
    componentWillReceiveProps() {
        /* no-op */
    }
    /**
     * Calls the onExecute prop and resets the execute ID
     *
     * @private
     * @return {void}
     */
    onExecute() {
        this.props.onExecute(this.executeId);
        this.executeId = null;
        this.setState({
            shouldRenderLoadingIntegrationPortal: false,
        });
    }
    /**
     * Gets a display integration, if available, for the Open With button
     *
     * @private
     * @return {?Integration}
     */
    getDisplayIntegration() {
        const { integrations } = this.state;
        // We only consider an integration a display integration if is the only integration in our state
        return Array.isArray(integrations) && integrations.length === 1 ? integrations[0] : null;
    }
    /**
     * Render the Open With element
     *
     * @private
     * @inheritdoc
     * @return {Element}
     */
    render() {
        const { language, messages: intlMessages } = this.props;
        const { fetchError, isLoading, integrations, executePostData, shouldRenderLoadingIntegrationPortal, shouldRenderErrorIntegrationPortal, } = this.state;
        const className = classNames('be bcow', this.props.className);
        const displayIntegration = this.getDisplayIntegration();
        const numIntegrations = integrations ? integrations.length : 0;
        return language = { language };
        messages = { intlMessages } >
            id;
        {
            this.id;
        }
        className = { className } >
            { numIntegrations } <= 1 ? error = { fetchError }
            :
        ;
        onClick = { this: .onIntegrationClick };
        displayIntegration = { displayIntegration };
        isLoading = { isLoading }
            /  >
        ;
        onClick = { this: .onIntegrationClick };
        integrations = { integrations } /  >
        ;
    }
}
ContentOpenWith.defaultProps = {
    className: '',
    clientName: CLIENT_NAME_OPEN_WITH,
    apiHost: DEFAULT_HOSTNAME_API,
    onExecute: noop,
    onError: noop,
};
{
    (shouldRenderLoadingIntegrationPortal || shouldRenderErrorIntegrationPortal) && hasError;
    {
        shouldRenderErrorIntegrationPortal;
    }
    integrationWindow = { this: .integrationWindow }
        /  >
    ;
}
{
    executePostData && onSubmit;
    {
        this.onExecuteFormSubmit;
    }
    executePostData = { executePostData };
    windowName = { this: .integrationWindow && this.integrationWindow.name };
    id = { this: .id }
        /  >
    ;
}
/div>
    < /Internationalize>;
;
export default ContentOpenWith;
//# sourceMappingURL=ContentOpenWith.js.map