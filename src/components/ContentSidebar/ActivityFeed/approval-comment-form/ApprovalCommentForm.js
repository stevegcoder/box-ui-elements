/**
 * @was-flow
 * @file Component for Approval comment form
 */
import * as React from 'react';
import noop from 'lodash/noop';
import classNames from 'classnames';
import { ContentState, EditorState } from 'draft-js';
import { injectIntl } from 'react-intl';
import { DraftMentionDecorator, } from 'box-react-ui/lib/components/form-elements/draft-js-mention-selector';
import commonMessages from 'box-react-ui/lib/common/messages';
import messages from '../../../messages';
import './ApprovalCommentForm.scss';
class ApprovalCommentForm extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            approvalDate: null,
            approvers: [],
            approverSelectorError: '',
            commentEditorState: EditorState.createWithContent(ContentState.createFromText(this.props.tagged_message || ''), DraftMentionDecorator),
            isAddApprovalVisible: false,
        };
        this.onFormChangeHandler = (formData) => this.setState({ isAddApprovalVisible: formData.addApproval === 'on' });
        this.onFormValidSubmitHandler = (formData) => {
            const { createComment = noop, createTask = noop, intl, updateTask = noop, onSubmit, entityId } = this.props;
            const { text, hasMention } = this.getFormattedCommentText();
            if (!text) {
                return;
            }
            if (formData.addApproval === 'on') {
                const { approvers, approvalDate } = this.state;
                if (approvers.length === 0) {
                    this.setState({
                        approverSelectorError: intl.formatMessage(commonMessages.requiredFieldError),
                    });
                    return;
                }
                createTask({
                    text,
                    assignees: approvers,
                    dueAt: approvalDate,
                });
            }
            else if (entityId) {
                updateTask({ text, id: entityId });
            }
            else {
                createComment({ text, hasMention });
            }
            if (onSubmit) {
                onSubmit();
            }
            this.setState({
                commentEditorState: EditorState.createEmpty(DraftMentionDecorator),
                isAddApprovalVisible: false,
                approvalDate: null,
                approvers: [],
            });
        };
        this.onMentionSelectorChangeHandler = (nextEditorState) => this.setState({ commentEditorState: nextEditorState });
        this.onApprovalDateChangeHandler = (date) => {
            this.setState({ approvalDate: date });
        };
        /**
         * Formats the comment editor's text such that it will be accepted by the server.
         *
         * @returns {Object}
         */
        this.getFormattedCommentText = () => {
            const { commentEditorState } = this.state;
            const contentState = commentEditorState.getCurrentContent();
            const blockMap = contentState.getBlockMap();
            const resultStringArr = [];
            // The API needs to explicitly know if a message contains a mention.
            let hasMention = false;
            // For all ContentBlocks in the ContentState:
            blockMap.forEach(block => {
                const text = block.getText();
                const blockMapStringArr = [];
                // Break down the ContentBlock into ranges
                block.findEntityRanges(() => true, (start, end) => {
                    const entityKey = block.getEntityAt(start);
                    // If the range is an Entity, format its text eg "@[1:Username]"
                    // Otherwise append its text to the block result as-is
                    if (entityKey) {
                        const entity = contentState.getEntity(entityKey);
                        const stringToAdd = `@[${entity.getData().id}:${text.substring(start + 1, end)}]`;
                        blockMapStringArr.push(stringToAdd);
                        hasMention = true;
                    }
                    else {
                        blockMapStringArr.push(text.substring(start, end));
                    }
                });
                resultStringArr.push(blockMapStringArr.join(''));
            });
            // Concatentate the array of block strings with newlines
            // (Each block represents a paragraph)
            return { text: resultStringArr.join('\n'), hasMention };
        };
        this.handleApproverSelectorInput = (value) => {
            const { getApproverWithQuery = noop } = this.props;
            getApproverWithQuery(value);
            this.setState({ approverSelectorError: '' });
        };
        this.handleApproverSelectorSelect = (pills) => {
            this.setState({ approvers: this.state.approvers.concat(pills) });
        };
        this.handleApproverSelectorRemove = (option, index) => {
            const approvers = this.state.approvers.slice();
            approvers.splice(index, 1);
            this.setState({ approvers });
        };
    }
    componentWillReceiveProps(nextProps) {
        const { isOpen } = nextProps;
        if (isOpen !== this.props.isOpen && !isOpen) {
            this.setState({
                commentEditorState: EditorState.createEmpty(DraftMentionDecorator),
                isAddApprovalVisible: false,
            });
        }
    }
    render() {
        const { approverSelectorContacts, className, createTask, getMentionWithQuery = noop, intl: { formatMessage }, isDisabled, isOpen, mentionSelectorContacts = [], onCancel, onFocus, user, isEditing, tagged_message, getAvatarUrl, } = this.props;
        const { approvalDate, approvers, approverSelectorError, commentEditorState, isAddApprovalVisible } = this.state;
        const inputContainerClassNames = classNames('bcs-comment-input-container', className, {
            'bcs-comment-input-is-open': isOpen,
        });
        return className = { inputContainerClassNames } >
            {};
        isEditing && className;
        "bcs-avatar-container" >
            getAvatarUrl;
        {
            getAvatarUrl;
        }
        user = { user } /  >
            /div>;
    }
}
ApprovalCommentForm.defaultProps = {
    isOpen: false,
};
className;
"bcs-comment-input-form-container" >
    onChange;
{
    this.onFormChangeHandler;
}
onValidSubmit = { this: .onFormValidSubmitHandler } >
    className;
"bcs-comment-input";
contacts = { isOpen, mentionSelectorContacts: [] };
editorState = { commentEditorState };
hideLabel;
isDisabled = { isDisabled };
isRequired = { isOpen };
name = "commentText";
label = "Comment";
onChange = { this: .onMentionSelectorChangeHandler };
onFocus = { onFocus };
onMention = { getMentionWithQuery };
placeholder = { tagged_message, null: formatMessage(messages.commentWrite) };
validateOnBlur = { false:  }
    /  >
    className;
{
    classNames('bcs-at-mention-tip', {
        'accessibility-hidden': isOpen,
    });
}
    >
        Object.assign({}, messages.atMentionTip) /  >
    /aside>;
{
    createTask ? approvalDate = { approvalDate }
        :
    ;
    approvers = { approvers };
    approverSelectorContacts = { approverSelectorContacts };
    approverSelectorError = { approverSelectorError };
    formatMessage = { formatMessage };
    isAddApprovalVisible = { isAddApprovalVisible };
    onApprovalDateChange = { this: .onApprovalDateChangeHandler };
    onApproverSelectorInput = { this: .handleApproverSelectorInput };
    onApproverSelectorRemove = { this: .handleApproverSelectorRemove };
    onApproverSelectorSelect = { this: .handleApproverSelectorSelect }
        /  >
    ;
    null;
}
onCancel;
{
    onCancel;
}
/>
    < /Form>
    < /div>
    < /div>;
;
// For testing only
export { ApprovalCommentForm as ApprovalCommentFormUnwrapped };
export default injectIntl(ApprovalCommentForm);
//# sourceMappingURL=ApprovalCommentForm.js.map