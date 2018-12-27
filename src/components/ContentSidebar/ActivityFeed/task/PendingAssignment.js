/**
 * @was-flow
 * @file PendingAssignment component
 */
import { FormattedMessage } from 'react-intl';
import PlainButton from 'box-react-ui/lib/components/plain-button';
import Tooltip from 'box-react-ui/lib/components/tooltip';
import { ACTIVITY_TARGETS } from '../../../../interactionTargets';
import messages from '../../../messages';
const PendingAssignment = ({ name, onTaskApproval, onTaskReject, shouldShowActions }) => className = "bcs-task-pending-assignment" >
    className;
"bcs-task-assignment-name" > { name } < /div>;
{
    shouldShowActions ? className = "bcs-task-assignment-actions" >
        position : ;
    "bottom-center";
    text = {} < FormattedMessage;
    {
        messages.taskApprove;
    }
    />}>
        < PlainButton;
    className = "bcs-task-check-btn";
    onClick = { onTaskApproval };
    data - resin - target;
    {
        ACTIVITY_TARGETS.TASK_APPROVE;
    }
        >
            className;
    "bcs-task-check-icon";
    height = { 18:  };
    width = { 18:  } /  >
        /PlainButton>
        < /Tooltip>
        < Tooltip;
    position = "bottom-center";
    text = {} < FormattedMessage;
    {
        messages.taskReject;
    }
    />}>
        < PlainButton;
    className = "bcs-task-x-btn";
    onClick = { onTaskReject };
    data - resin - target;
    {
        ACTIVITY_TARGETS.TASK_REJECT;
    }
        >
            className;
    "bcs-task-x-icon";
    height = { 18:  };
    width = { 18:  } /  >
        /PlainButton>
        < /Tooltip>
        < /div>;
    null;
}
/div>;
;
export default PendingAssignment;
//# sourceMappingURL=PendingAssignment.js.map