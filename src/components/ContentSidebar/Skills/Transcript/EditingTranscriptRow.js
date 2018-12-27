/**
 * @was-flow
 * @file Editable transcript row component
 * @author Box
 */
import PrimaryButton from 'box-react-ui/lib/components/primary-button/PrimaryButton';
import messages from '../../../messages';
import { SKILLS_TARGETS } from '../../../../interactionTargets';
import './EditingTranscriptRow.scss';
const EditingTranscriptRow = ({ time, text = '', onSave, onCancel, onChange }) => className = "be-transcript-row be-transcript-editing-row" >
    { time } && className;
"be-transcript-time" > { time } < /div>}
    < div;
className = "be-transcript-text" >
    maxRows;
{
    10;
}
onChange = { onChange };
value = { text } /  >
    className;
"be-transcript-buttons" >
    type;
"button";
onClick = { onCancel };
data - resin - target;
{
    SKILLS_TARGETS.TRANSCRIPTS.EDIT_CANCEL;
}
 >
    Object.assign({}, messages.cancel) /  >
    /Button>
    < PrimaryButton;
type = "button";
onClick = { onSave };
data - resin - target;
{
    SKILLS_TARGETS.TRANSCRIPTS.EDIT_SAVE;
}
 >
    Object.assign({}, messages.save) /  >
    /PrimaryButton>
    < /div>
    < /div>
    < /div>;
;
export default EditingTranscriptRow;
//# sourceMappingURL=EditingTranscriptRow.js.map