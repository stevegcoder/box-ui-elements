/**
 * @was-flow
 * @file Add Approval Fields component for ApprovalComment component
 */
import { injectIntl, FormattedMessage } from 'react-intl';
import DatePicker from 'box-react-ui/lib/components/date-picker/DatePicker';
import messages from '../../../messages';
import { ACTIVITY_TARGETS, INTERACTION_TARGET } from '../../../../interactionTargets';
const AddApprovalFields = ({ approvalDate, approvers, approverSelectorContacts = [], approverSelectorError, onApprovalDateChange, onApproverSelectorInput, onApproverSelectorRemove, onApproverSelectorSelect, intl, }) => {
    const approverOptions = approverSelectorContacts
        // filter selected approvers
        .filter(({ id }) => !approvers.find(({ value }) => value === id))
        // map to datalist item format
        .map(({ id, item }) => (Object.assign({}, item, { text: item.name, value: id })));
    return className = "bcs-comment-add-approver-fields-container" >
        error;
    {
        approverSelectorError;
    }
    label = {} < FormattedMessage;
    {
        messages.approvalAssignees;
    }
    />};
    onInput = { onApproverSelectorInput };
    onRemove = { onApproverSelectorRemove };
    onSelect = { onApproverSelectorSelect };
    placeholder = { intl, : .formatMessage(messages.approvalAddAssignee) };
    selectedOptions = { approvers };
    selectorOptions = { approverOptions }
        >
            { approverOptions, : .map(({ id, name, email }) => key = { id }, name = { name }, subtitle = { email } /  >
                ) }
        < /PillSelectorDropdown>
        < DatePicker;
    className = "bcs-comment-add-approver-date-input";
    label = {} < FormattedMessage;
    {
        messages.approvalDueDate;
    }
    />};
    minDate = { new: Date() };
    name = "approverDateInput";
    placeholder = { intl, : .formatMessage(messages.approvalSelectDate) };
    onChange = { onApprovalDateChange };
    value = { approvalDate };
    inputProps = {};
    {
        [INTERACTION_TARGET];
        ACTIVITY_TARGETS.TASK_DATE_PICKER,
        ;
    }
};
/>
    < /div>;
;
;
export default injectIntl(AddApprovalFields);
//# sourceMappingURL=AddApprovalFields.js.map