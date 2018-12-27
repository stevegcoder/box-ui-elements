/**
 * @was-flow
 * @file Details sidebar component
 * @author Box
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import noop from 'lodash/noop';
import getProp from 'lodash/get';
import messages from '../messages';
import { SECTION_TARGETS } from '../../interactionTargets';
import { withAPIContext } from '../APIContext';
import { withErrorBoundary } from '../ErrorBoundary';
import { HTTP_STATUS_CODE_FORBIDDEN, ORIGIN_DETAILS_SIDEBAR, IS_ERROR_DISPLAYED } from '../../constants';
import './DetailsSidebar.scss';
class DetailsSidebar extends React.PureComponent {
    constructor(props) {
        super(props);
        /**
         * File description update callback
         *
         * @private
         * @param {BoxItem} file - Updated file object
         * @return {void}
         */
        this.descriptionChangeSuccessCallback = (file) => {
            this.setState({ file, fileError: undefined });
        };
        /**
         * Handles a failed file description update
         *
         * @private
         * @param {BoxItem} file - Original file object
         * @return {void}
         */
        this.descriptionChangeErrorCallback = (file) => {
            // Reset the state back to the original description since the API call failed
            this.setState({
                file,
                fileError: {
                    inlineError: {
                        title: messages.fileDescriptionInlineErrorTitleMessage,
                        content: messages.defaultInlineErrorContentMessage,
                    },
                },
            });
        };
        /**
         * Function to update file description
         *
         * @private
         * @param {string} newDescription - New file description
         * @return {void}
         */
        this.onDescriptionChange = (newDescription) => {
            const { api } = this.props;
            const { file } = this.state;
            const { description } = file;
            if (newDescription === description) {
                return;
            }
            api.getFileAPI().setFileDescription(file, newDescription, this.descriptionChangeSuccessCallback, this.descriptionChangeErrorCallback);
        };
        /**
         * Handles a failed file access stats fetch
         *
         * @private
         * @param {Error} e - API error
         * @param {string} code - error code
         * @return {void}
         */
        this.fetchAccessStatsErrorCallback = (e, code) => {
            const isForbidden = getProp(e, 'status') === HTTP_STATUS_CODE_FORBIDDEN;
            let accessStatsError;
            if (isForbidden) {
                accessStatsError = {
                    error: messages.fileAccessStatsPermissionsError,
                };
            }
            else {
                accessStatsError = {
                    maskError: {
                        errorHeader: messages.fileAccessStatsErrorHeaderMessage,
                        errorSubHeader: messages.defaultErrorMaskSubHeaderMessage,
                    },
                };
            }
            this.setState({
                isLoadingAccessStats: false,
                accessStats: undefined,
                accessStatsError,
            });
            this.props.onError(e, code, {
                e,
                [IS_ERROR_DISPLAYED]: !isForbidden,
            });
        };
        /**
         * File access stats fetch success callback
         *
         * @private
         * @param {Object} accessStats - access stats for a file
         * @return {void}
         */
        this.fetchAccessStatsSuccessCallback = (accessStats) => {
            this.setState({
                accessStats,
                accessStatsError: undefined,
                isLoadingAccessStats: false,
            });
        };
        /**
         * File classification fetch success callback.
         *
         * @param {ClassificationInfo} classification - Info about the file's classification
         * @return {void}
         */
        this.fetchClassificationSuccessCallback = (classification) => {
            this.setState({
                classification,
                classificationError: undefined,
                isLoadingClassification: false,
            });
        };
        /**
         * Handles a failed file classification fetch
         *
         * @private
         * @param {ElementsXhrError} error - API error
         * @param {string} code - Error code
         * @return {void}
         */
        this.fetchClassificationErrorCallback = (error, code) => {
            const isForbiddenError = getProp(error, 'status') === HTTP_STATUS_CODE_FORBIDDEN;
            let classificationError;
            if (!isForbiddenError) {
                classificationError = {
                    inlineError: {
                        title: messages.fileClassificationErrorHeaderMessage,
                        content: messages.defaultErrorMaskSubHeaderMessage,
                    },
                };
            }
            this.setState({
                classification: undefined,
                classificationError,
                isLoadingClassification: false,
            });
            this.props.onError(error, code, {
                error,
                [IS_ERROR_DISPLAYED]: !isForbiddenError,
            });
        };
        /**
         * Fetches the classification for a file
         *
         * @private
         * @return {void}
         */
        this.fetchClassification = () => {
            const { api } = this.props;
            const { file } = this.state;
            this.setState({ isLoadingClassification: true });
            api.getMetadataAPI(false).getClassification(file, this.fetchClassificationSuccessCallback, this.fetchClassificationErrorCallback, {
                refreshCache: true,
            });
        };
        /**
         * Add classification click handler
         *
         * @private
         * @return {void}
         */
        this.onClassificationClick = () => {
            const { onClassificationClick } = this.props;
            onClassificationClick(this.fetchClassification);
        };
        this.state = {
            file: props.file,
            isLoadingAccessStats: false,
            isLoadingClassification: false,
        };
    }
    componentDidMount() {
        const { hasAccessStats, hasClassification } = this.props;
        if (hasAccessStats) {
            this.fetchAccessStats();
        }
        if (hasClassification) {
            this.fetchClassification();
        }
    }
    /**
     * Fetches the access stats for a file
     *
     * @private
     * @return {void}
     */
    fetchAccessStats() {
        const { api } = this.props;
        const { file } = this.state;
        this.setState({ isLoadingAccessStats: true });
        api.getFileAccessStatsAPI(false).getFileAccessStats(file.id, this.fetchAccessStatsSuccessCallback, this.fetchAccessStatsErrorCallback);
    }
    render() {
        const { hasProperties, hasNotices, hasAccessStats, hasClassification, hasRetentionPolicy, hasVersions, onAccessStatsClick, onVersionHistoryClick, onRetentionPolicyExtendClick, retentionPolicy, bannerPolicy, } = this.props;
        const { accessStats, accessStatsError, classification, classificationError, file, fileError, isLoadingAccessStats, isLoadingClassification, } = this.state;
        return title = {} < FormattedMessage;
        {
            messages.sidebarDetailsTitle;
        }
        />}>;
        {
            hasNotices && className;
            "bcs-details-content" > { hasNotices } && file;
            {
                file;
            }
            />}</div >
            ;
        }
        {
            hasAccessStats && accessStats;
            {
                accessStats;
            }
            onAccessStatsClick = { onAccessStatsClick };
            file = { file };
            {
                accessStatsError;
            }
            />;
        }
        {
            hasProperties && interactionTarget;
            {
                SECTION_TARGETS.FILE_PROPERTIES;
            }
            title = {} < FormattedMessage;
            {
                messages.sidebarProperties;
            }
            />}
                >
                    { hasVersions } && className;
            "bcs-details-content" >
                { hasVersions } && onVersionHistoryClick;
            {
                onVersionHistoryClick;
            }
            file = { file } /  >
            ;
        }
        /div>;
    }
}
DetailsSidebar.defaultProps = {
    hasNotices: false,
    hasProperties: false,
    hasAccessStats: false,
    hasClassification: false,
    hasRetentionPolicy: false,
    hasVersions: false,
    onClassificationClick: noop,
    onError: noop,
};
onDescriptionChange;
{
    this.onDescriptionChange;
}
file = { file };
{
    fileError;
}
hasClassification = { hasClassification };
onClassificationClick = { this: .onClassificationClick };
classification = { classification };
hasRetentionPolicy = { hasRetentionPolicy };
retentionPolicy = { retentionPolicy };
bannerPolicy = { bannerPolicy };
onRetentionPolicyExtendClick = { onRetentionPolicyExtendClick };
isLoading = { isLoadingAccessStats } && isLoadingClassification;
{
    classificationError;
}
/>
    < /SidebarSection>;
/SidebarContent>;
;
export { DetailsSidebar as DetailsSidebarComponent };
export default withErrorBoundary(ORIGIN_DETAILS_SIDEBAR)(withAPIContext(DetailsSidebar));
//# sourceMappingURL=DetailsSidebar.js.map