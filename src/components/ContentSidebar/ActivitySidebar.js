/**
 * @was-flow
 * @file Activity feed sidebar component
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
import * as React from 'react';
import debounce from 'lodash/debounce';
import noop from 'lodash/noop';
import { FormattedMessage } from 'react-intl';
import ActivityFeed from './ActivityFeed/activity-feed/ActivityFeed';
import messages from '../messages';
import { withAPIContext } from '../APIContext';
import { withErrorBoundary } from '../ErrorBoundary';
import { getBadUserError, getBadItemError } from '../../util/error';
import { DEFAULT_COLLAB_DEBOUNCE, ORIGIN_ACTIVITY_SIDEBAR } from '../../constants';
export const activityFeedInlineError = {
    inlineError: {
        title: messages.errorOccured,
        content: messages.activityFeedItemApiError,
    },
};
class ActivitySidebar extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {};
        /**
         * Success callback for fetching feed items
         */
        this.feedSuccessCallback = () => {
            this.fetchFeedItems();
        };
        /**
         * Error callback for fetching feed items
         *
         * @param {Error} e - the error which occured
         * @param {Error} code - the code for the error
         * @param {Object} contextInfo - the context info for the error
         */
        this.feedErrorCallback = (e, code, contextInfo) => {
            this.errorCallback(e, code, contextInfo);
            this.fetchFeedItems();
        };
        /**
         * Deletes a task via the API.
         *
         * @param {Object} args - A subset of the task
         */
        this.deleteTask = ({ id }) => {
            const { file, api, onTaskDelete = noop } = this.props;
            api.getFeedAPI(false).deleteTask(file, id, (taskId) => {
                this.feedSuccessCallback();
                onTaskDelete(taskId);
            }, this.feedErrorCallback);
            // need to load the pending item
            this.fetchFeedItems();
        };
        /**
         * Updates a task in the state via the API.
         *
         * @param {Object} args - A subset of the task
         * @return void
         */
        this.updateTask = ({ text, id }) => {
            const { file, api } = this.props;
            api.getFeedAPI(false).updateTask(file, id, text, this.feedSuccessCallback, this.feedErrorCallback);
            // need to load the pending item
            this.fetchFeedItems();
        };
        /**
         * Updates the task assignment
         *
         * @param {string} taskId - ID of task to be updated
         * @param {string} taskAssignmentId - Task assignment ID
         * @param {string} status - New task assignment status
         * @param {string} message - the message to the assignee
         * @return void
         */
        this.updateTaskAssignment = (taskId, taskAssignmentId, status, message) => {
            const { file, api } = this.props;
            api.getFeedAPI(false).updateTaskAssignment(file, taskId, taskAssignmentId, status, message, this.feedSuccessCallback, this.feedErrorCallback);
            // need to load the pending item
            this.fetchFeedItems();
        };
        /**
         * Deletes a comment via the API.
         *
         * @param {Object} args - A subset of the comment
         * @return void
         */
        this.deleteComment = ({ id, permissions }) => {
            const { file, api, onCommentDelete = noop } = this.props;
            api.getFeedAPI(false).deleteComment(file, id, permissions, (comment) => {
                this.feedSuccessCallback();
                onCommentDelete(comment);
            }, this.feedErrorCallback);
            // need to load the pending item
            this.fetchFeedItems();
        };
        /**
         * Posts a new comment to the API
         *
         * @param {string} text - The comment's text
         * @param {boolean} hasMention - The comment's text
         * @return {void}
         */
        this.createComment = (text, hasMention) => {
            const { file, api, onCommentCreate = noop } = this.props;
            const { currentUser } = this.state;
            if (!currentUser) {
                throw getBadUserError();
            }
            api.getFeedAPI(false).createComment(file, currentUser, text, hasMention, (comment) => {
                onCommentCreate(comment);
                this.feedSuccessCallback();
            }, this.feedErrorCallback);
            // need to load the pending item
            this.fetchFeedItems();
        };
        /**
         * Creates a task via the API
         *
         * @param {string} message - Task text
         * @param {Array} assignees - List of assignees
         * @param {number} dueAt - Task's due date
         * @return {void}
         */
        this.createTask = (message, assignees, dueAt) => {
            const { currentUser } = this.state;
            const { file, api } = this.props;
            if (!currentUser) {
                throw getBadUserError();
            }
            api.getFeedAPI(false).createTask(file, currentUser, message, assignees, dueAt, this.feedSuccessCallback, this.feedErrorCallback);
            // need to load the pending item
            this.fetchFeedItems();
        };
        /**
         * Handles a successful feed API fetch
         *
         * @private
         * @param {Array} feedItems - the feed items
         * @return {void}
         */
        this.fetchFeedItemsSuccessCallback = (feedItems) => {
            this.setState({ feedItems, activityFeedError: undefined });
        };
        /**
         * Handles a failed feed item fetch
         *
         * @private
         * @param {Error} e - API error
         * @return {void}
         */
        this.fetchFeedItemsErrorCallback = (feedItems) => {
            this.setState({
                feedItems,
                activityFeedError: activityFeedInlineError,
            });
        };
        /**
         * Network error callback
         *
         * @private
         * @param {Error} error - Error object
         * @param {Error} code - the code for the error
         * @param {Object} contextInfo - the context info for the error
         * @return {void}
         */
        this.errorCallback = (error, code, contextInfo = {}) => {
            /* eslint-disable no-console */
            console.error(error);
            /* eslint-enable no-console */
            this.props.onError(error, code, contextInfo);
        };
        /**
         * User fetch success callback
         *
         * @private
         * @param {Object} currentUser - User info object
         * @return {void}
         */
        this.fetchCurrentUserSuccessCallback = (currentUser) => {
            this.setState({ currentUser, currentUserError: undefined });
        };
        /**
         * File approver contacts fetch success callback
         *
         * @private
         * @param {BoxItemCollection} collaborators - Collaborators response data
         * @return {void}
         */
        this.getApproverContactsSuccessCallback = (collaborators) => {
            const { entries } = collaborators;
            this.setState({ approverSelectorContacts: entries });
        };
        /**
         * File @mention contacts fetch success callback
         *
         * @private
         * @param {BoxItemCollection} collaborators - Collaborators response data
         * @return {void}
         */
        this.getMentionContactsSuccessCallback = (collaborators) => {
            const { entries } = collaborators;
            this.setState({ mentionSelectorContacts: entries });
        };
        /**
         * File @mention contacts fetch success callback
         *
         * @private
         * @param {string} searchStr - Search string to filter file collaborators by
         * @return {void}
         */
        this.getApproverWithQuery = debounce(this.getCollaborators.bind(this, this.getApproverContactsSuccessCallback, this.errorCallback), DEFAULT_COLLAB_DEBOUNCE);
        /**
         * Fetches file @mention's
         *
         * @private
         * @param {string} searchStr - Search string to filter file collaborators by
         * @return {void}
         */
        this.getMentionWithQuery = debounce(this.getCollaborators.bind(this, this.getMentionContactsSuccessCallback, this.errorCallback), DEFAULT_COLLAB_DEBOUNCE);
        /**
         * Handles a failed file user info fetch
         *
         * @private
         * @param {ElementsXhrError} e - API error
         * @return {void}
         */
        this.fetchCurrentUserErrorCallback = (e, code) => {
            this.setState({
                currentUser: undefined,
                currentUserError: {
                    maskError: {
                        errorHeader: messages.currentUserErrorHeaderMessage,
                        errorSubHeader: messages.defaultErrorMaskSubHeaderMessage,
                    },
                },
            });
            this.errorCallback(e, code, {
                error: e,
            });
        };
        /**
         * Gets the user avatar URL
         *
         * @param {string} userId the user id
         * @param {string} fileId the file id
         * @return the user avatar URL string for a given user with access token attached
         */
        this.getAvatarUrl = (userId) => __awaiter(this, void 0, void 0, function* () {
            const { file, api } = this.props;
            return api.getUsersAPI(false).getAvatarUrlWithAccessToken(userId, file.id);
        });
    }
    componentDidMount() {
        const { currentUser } = this.props;
        this.fetchFeedItems(true);
        this.fetchCurrentUser(currentUser);
    }
    /**
     * Fetches a Users info
     *
     * @private
     * @param {User} [user] - Box User. If missing, gets user that the current token was generated for.
     * @return {void}
     */
    fetchCurrentUser(user, shouldDestroy = false) {
        const { api, file } = this.props;
        if (!file) {
            throw getBadItemError();
        }
        if (typeof user === 'undefined') {
            api.getUsersAPI(shouldDestroy).getUser(file.id, this.fetchCurrentUserSuccessCallback, this.fetchCurrentUserErrorCallback);
        }
        else {
            this.setState({ currentUser: user, currentUserError: undefined });
        }
    }
    /**
     * Fetches the feed items for the sidebar
     *
     * @param {boolean} shouldDestroy true if the api factory should be destroyed
     */
    fetchFeedItems(shouldRefreshCache = false, shouldDestroy = false) {
        const { file, api } = this.props;
        api.getFeedAPI(shouldDestroy).feedItems(file, shouldRefreshCache, this.fetchFeedItemsSuccessCallback, this.fetchFeedItemsErrorCallback, this.errorCallback);
    }
    /**
     * Fetches file collaborators
     *
     * @param {Function} successCallback - the success callback
     * @param {Function} errorCallback - the error callback
     * @param {string} searchStr - the search string
     * @return {void}
     */
    getCollaborators(successCallback, errorCallback, searchStr) {
        // Do not fetch without filter
        const { file, api } = this.props;
        if (!searchStr || searchStr.trim() === '') {
            return;
        }
        api.getFileCollaboratorsAPI(true).getFileCollaborators(file.id, successCallback, errorCallback, {
            params: {
                filter_term: searchStr,
            },
        });
    }
    render() {
        const { file, isDisabled = false, onVersionHistoryClick, getUserProfileUrl } = this.props;
        const { currentUser, approverSelectorContacts, mentionSelectorContacts, feedItems, activityFeedError, currentUserError, } = this.state;
        return title = {} < FormattedMessage;
        {
            messages.sidebarActivityTitle;
        }
        />}>
            < ActivityFeed;
        file = { file };
        activityFeedError = { activityFeedError };
        approverSelectorContacts = { approverSelectorContacts };
        mentionSelectorContacts = { mentionSelectorContacts };
        currentUser = { currentUser };
        isDisabled = { isDisabled };
        onCommentCreate = { this: .createComment };
        onCommentDelete = { this: .deleteComment };
        onTaskCreate = { this: .createTask };
        onTaskDelete = { this: .deleteTask };
        onTaskUpdate = { this: .updateTask };
        onTaskAssignmentUpdate = { this: .updateTaskAssignment };
        getApproverWithQuery = { this: .getApproverWithQuery };
        getMentionWithQuery = { this: .getMentionWithQuery };
        onVersionHistoryClick = { onVersionHistoryClick };
        getAvatarUrl = { this: .getAvatarUrl };
        getUserProfileUrl = { getUserProfileUrl };
        feedItems = { feedItems };
        currentUserError = { currentUserError }
            /  >
            /SidebarContent>;
        ;
    }
}
export { ActivitySidebar as ActivitySidebarComponent };
export default withErrorBoundary(ORIGIN_ACTIVITY_SIDEBAR)(withAPIContext(ActivitySidebar));
//# sourceMappingURL=ActivitySidebar.js.map