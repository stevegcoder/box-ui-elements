/**
 * @was-flow
 * @file Comment Input Controls components for ApprovalCommentForm
 */
import PrimaryButton from 'box-react-ui/lib/components/primary-button/PrimaryButton';
import messages from '../../../messages';
import { ACTIVITY_TARGETS } from '../../../../interactionTargets';
const CommentInputControls = ({ onCancel }) => className = "bcs-comment-input-controls" >
    className;
"bcs-comment-input-cancel-btn";
data - resin - target;
{
    ACTIVITY_TARGETS.APPROVAL_FORM_CANCEL;
}
onClick = { onCancel };
type = "button"
    >
        Object.assign({}, messages.commentCancel) /  >
    /Button>
    < PrimaryButton;
className = "bcs-comment-input-submit-btn";
data - resin - target;
{
    ACTIVITY_TARGETS.APPROVAL_FORM_POST;
}
 >
    Object.assign({}, messages.commentPost) /  >
    /PrimaryButton>
    < /div>;
;
export default CommentInputControls;
//# sourceMappingURL=CommentInputControls.js.map