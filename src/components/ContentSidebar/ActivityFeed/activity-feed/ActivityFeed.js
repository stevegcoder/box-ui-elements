/**
 * @was-flow
 * @file Component for Activity feed
 */
import * as React from 'react';
import getProp from 'lodash/get';
import noop from 'lodash/noop';
import { ItemTypes } from './activityFeedUtils';
import './ActivityFeed.scss';
class ActivityFeed extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isInputOpen: false,
        };
        /**
         * Detects whether or not the empty state should be shown.
         * @param {object} currentUser - The user that is logged into the account
         * @param {object} feedItems - Items in the activity feed
         */
        this.isEmpty = ({ currentUser, feedItems } = this.props) => !currentUser ||
            !feedItems ||
            feedItems.length === 0 ||
            (feedItems.length === 1 && feedItems[0].type === ItemTypes.fileVersion);
        /**
         * Scrolls the container to the bottom
         */
        this.resetFeedScroll = () => {
            if (this.feedContainer) {
                this.feedContainer.scrollTop = this.feedContainer.scrollHeight;
            }
        };
        this.onKeyDown = (event) => {
            const { nativeEvent } = event;
            nativeEvent.stopImmediatePropagation();
        };
        this.approvalCommentFormFocusHandler = () => {
            this.resetFeedScroll();
            this.setState({ isInputOpen: true });
        };
        this.approvalCommentFormCancelHandler = () => this.setState({ isInputOpen: false });
        this.approvalCommentFormSubmitHandler = () => this.setState({ isInputOpen: false });
        this.onCommentCreate = ({ text, hasMention }) => {
            const { onCommentCreate = noop } = this.props;
            onCommentCreate(text, hasMention);
            this.approvalCommentFormSubmitHandler();
        };
        /**
         * Creates a task.
         *
         * @param {string} text - Task text
         * @param {Array} assignees - List of assignees
         * @param {number} dueAt - Task's due date
         * @return {void}
         */
        this.onTaskCreate = ({ text, assignees, dueAt }) => {
            const { onTaskCreate = noop } = this.props;
            onTaskCreate(text, assignees, dueAt);
            this.approvalCommentFormSubmitHandler();
        };
        /**
         * Invokes version history popup handler.
         *
         * @param {Object} data - Version history data
         * @return {void}
         */
        this.openVersionHistoryPopup = (data) => {
            const versionInfoHandler = this.props.onVersionHistoryClick || noop;
            versionInfoHandler(data);
        };
    }
    componentDidMount() {
        this.resetFeedScroll();
    }
    componentDidUpdate(prevProps, prevState) {
        const { feedItems: prevFeedItems } = prevProps;
        const { feedItems: currFeedItems } = this.props;
        const { isInputOpen: prevIsInputOpen } = prevState;
        const { isInputOpen: currIsInputOpen } = this.state;
        const isEmpty = this.isEmpty(this.props);
        const wasEmpty = this.isEmpty(prevProps);
        const hasLoaded = isEmpty !== wasEmpty && !isEmpty;
        const hasMoreItems = prevFeedItems && currFeedItems && prevFeedItems.length < currFeedItems.length;
        const hasNewItems = !prevFeedItems && currFeedItems;
        const hasInputOpened = currIsInputOpen !== prevIsInputOpen;
        if (hasLoaded || hasMoreItems || hasNewItems || hasInputOpened) {
            this.resetFeedScroll();
        }
    }
    render() {
        const { translations, approverSelectorContacts, mentionSelectorContacts, currentUser, isDisabled, getAvatarUrl, getUserProfileUrl, file, onCommentCreate, getApproverWithQuery, getMentionWithQuery, activityFeedError, onVersionHistoryClick, onCommentDelete, onTaskDelete, onTaskUpdate, onTaskAssignmentUpdate, feedItems, } = this.props;
        const { isInputOpen } = this.state;
        const hasCommentPermission = getProp(file, 'permissions.can_comment', false);
        const showApprovalCommentForm = !!(currentUser && hasCommentPermission && onCommentCreate && feedItems);
        const isEmpty = this.isEmpty(this.props);
        return (
        // eslint-disable-next-line
        className) = "bcs-activity-feed";
        onKeyDown = { this: .onKeyDown } >
            ref;
        {
            ref => {
                this.feedContainer = ref;
            };
        }
        className = "bcs-activity-feed-items-container"
            >
                {};
        showCommentMessage = { showApprovalCommentForm } /  >
        ;
        (Object.assign({}, activityFeedError));
        items = {};
        isDisabled = { isDisabled };
        currentUser = { currentUser };
        onTaskAssignmentUpdate = { onTaskAssignmentUpdate };
        onCommentDelete = { hasCommentPermission, onCommentDelete: noop };
        // We don't know task edit/delete specific permissions,
        // but you must at least be able to comment to do these operations.
        onTaskDelete = { hasCommentPermission, onTaskDelete: noop };
        onTaskEdit = { hasCommentPermission, onTaskUpdate: noop };
        onVersionInfo = { onVersionHistoryClick, this: .openVersionHistoryPopup, null:  };
        translations = { translations };
        getAvatarUrl = { getAvatarUrl };
        getUserProfileUrl = { getUserProfileUrl };
        mentionSelectorContacts = { mentionSelectorContacts };
        getMentionWithQuery = { getMentionWithQuery }
            /  >
        ;
    }
}
/div>;
{
    showApprovalCommentForm ? onSubmit = { this: .resetFeedScroll }
        :
    ;
    isDisabled = { isDisabled };
    approverSelectorContacts = { approverSelectorContacts };
    mentionSelectorContacts = { mentionSelectorContacts };
    className = {};
    createComment = { hasCommentPermission, this: .onCommentCreate, noop };
    createTask = { hasCommentPermission, this: .onTaskCreate, noop };
    updateTask = { hasCommentPermission, onTaskUpdate: noop };
    getApproverWithQuery = { getApproverWithQuery };
    getMentionWithQuery = { getMentionWithQuery };
    isOpen = { isInputOpen };
    user = { currentUser };
    onCancel = { this: .approvalCommentFormCancelHandler };
    onFocus = { this: .approvalCommentFormFocusHandler };
    getAvatarUrl = { getAvatarUrl }
        /  >
    ;
    null;
}
/div>;
;
export default ActivityFeed;
//# sourceMappingURL=ActivityFeed.js.map