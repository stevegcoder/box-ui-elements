/**
 * @was-flow
 * @file AddApproval component for ApprovalCommentForm component
 */
import { injectIntl } from 'react-intl';
import { ACTIVITY_TARGETS } from '../../../../interactionTargets';
import messages from '../../../messages';
const AddApproval = ({ approvalDate, approvers, approverSelectorContacts, approverSelectorError, isAddApprovalVisible, onApprovalDateChange, onApproverSelectorInput, onApproverSelectorRemove, onApproverSelectorSelect, intl, }) => className = "bcs-comment-add-approver" >
    className;
"bcs-comment-add-approver-checkbox";
data - resin - target;
{
    ACTIVITY_TARGETS.APPROVAL_FORM_ADD_TASK;
}
label = { intl, : .formatMessage(messages.approvalAddTask) };
name = "addApproval";
isChecked = { isAddApprovalVisible };
tooltip = { intl, : .formatMessage(messages.approvalAddTaskTooltip) }
    /  >
    {}
    < /div>;
;
export default injectIntl(AddApproval);
//# sourceMappingURL=AddApproval.js.map