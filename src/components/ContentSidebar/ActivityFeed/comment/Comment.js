/**
 * @was-flow
 * @file Comment component
 */
import * as React from 'react';
import noop from 'lodash/noop';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import getProp from 'lodash/get';
import messages from '../../../messages';
import { ACTIVITY_TARGETS } from '../../../../interactionTargets';
import './Comment.scss';
import { PLACEHOLDER_USER } from '../../../../constants';
const ONE_HOUR_MS = 3600000; // 60 * 60 * 1000
class Comment extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isEditing: false,
            isFocused: false,
            isInputOpen: false,
        };
        this.onKeyDown = (event) => {
            const { nativeEvent } = event;
            nativeEvent.stopImmediatePropagation();
        };
        this.approvalCommentFormFocusHandler = () => this.setState({ isInputOpen: true });
        this.approvalCommentFormCancelHandler = () => this.setState({ isInputOpen: false, isEditing: false });
        this.approvalCommentFormSubmitHandler = () => this.setState({ isInputOpen: false, isEditing: false });
        this.updateTaskHandler = (args) => {
            const { onEdit = noop } = this.props;
            onEdit(args);
            this.approvalCommentFormSubmitHandler();
        };
        this.toEdit = () => this.setState({ isEditing: true, isInputOpen: true });
        this.handleCommentFocus = () => {
            this.setState({ isFocused: true });
        };
        this.handleCommentBlur = () => {
            this.setState({ isFocused: false });
        };
    }
    render() {
        const { created_by, created_at, permissions, id, inlineDeleteMessage = messages.commentDeletePrompt, isPending, error, onDelete, onEdit, tagged_message = '', translatedTaggedMessage, translations, currentUser, isDisabled, getAvatarUrl, getUserProfileUrl, getMentionWithQuery, mentionSelectorContacts, } = this.props;
        const { toEdit } = this;
        const { isEditing, isFocused, isInputOpen } = this.state;
        const createdAtTimestamp = new Date(created_at).getTime();
        const canDelete = getProp(permissions, 'can_delete', false);
        const canEdit = getProp(permissions, 'can_edit', false);
        const createdByUser = created_by || PLACEHOLDER_USER;
        return className = "bcs-comment-container" >
            className;
        {
            classNames('bcs-comment', {
                'bcs-is-pending': isPending || error,
                'bcs-is-focused': isFocused,
            });
        }
        onBlur = { this: .handleCommentBlur };
        onFocus = { this: .handleCommentFocus }
            >
                className;
        "bcs-comment-avatar";
        getAvatarUrl = { getAvatarUrl };
        user = { createdByUser } /  >
            className;
        "bcs-comment-content" >
            className;
        "bcs-comment-headline" >
            className;
        "bcs-comment-user-name";
        data - resin - target;
        {
            ACTIVITY_TARGETS.PROFILE;
        }
        id = { createdByUser, : .id };
        name = { createdByUser, : .name };
        getUserProfileUrl = { getUserProfileUrl }
            /  >
            text;
        {
            (Object.assign({}, messages.commentPostedFullDateTime));
            values = {};
            {
                time: createdAtTimestamp;
            }
        }
        />;
    }
}
    >
        className;
"bcs-comment-created-at" >
    timestamp;
{
    createdAtTimestamp;
}
relativeThreshold = { ONE_HOUR_MS } /  >
    /small>
    < /Tooltip>;
{
    onEdit && canEdit && !isPending ? id : ;
    {
        id;
    }
    toEdit = { toEdit } /  > ;
    null;
}
{
    onDelete && canDelete && !isPending ? id = { id }
        :
    ;
    permissions = { permissions };
    message = {} < FormattedMessage;
    {
        inlineDeleteMessage;
    }
    />};
    onDelete = { onDelete }
        /  >
    ;
    null;
}
/div>;
{
    isEditing ? onSubmit = {}() : ;
    { }
}
isDisabled = { isDisabled };
className = {};
updateTask = { this: .updateTaskHandler };
isOpen = { isInputOpen };
user = { currentUser };
onCancel = { this: .approvalCommentFormCancelHandler };
onFocus = { this: .approvalCommentFormFocusHandler };
isEditing = { isEditing };
entityId = { id };
tagged_message = {};
getAvatarUrl = { getAvatarUrl };
mentionSelectorContacts = { mentionSelectorContacts };
getMentionWithQuery = { getMentionWithQuery }
    /  >
;
null;
{
    !isEditing ? id = { id }
        :
    ;
    tagged_message = { tagged_message };
    translatedTaggedMessage = { translatedTaggedMessage };
    {
        translations;
    }
    translationFailed = { error, true: null };
    getUserProfileUrl = { getUserProfileUrl }
        /  >
    ;
    null;
}
/div>
    < /div>;
{
    error ? Object.assign({}, error) /  >  : null;
}
/div>;
;
export default Comment;
//# sourceMappingURL=Comment.js.map