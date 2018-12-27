/**
 * @was-flow
 * @file Transcript row component
 * @author Box
 */
import { formatTime } from 'box-react-ui/lib/utils/datetime';
import { isValidTimeSlice } from './timeSliceUtils';
import './TranscriptRow.scss';
const TranscriptRow = ({ appears, text, isEditing, onClick, onSave, onCancel, onChange, interactionTarget }) => {
    const isValid = isValidTimeSlice(appears) && Array.isArray(appears) && appears.length === 1;
    const timeSlice = ((appears) => );
    const start = isValid ? formatTime(timeSlice[0].start) : undefined;
    return isEditing ? onSave = { onSave } : ;
    onCancel = { onCancel };
    onChange = { onChange };
    time = { start };
    text = { text } /  >
    ;
};
interactionTarget = { interactionTarget };
onClick = { onClick };
time = { start };
text = { text } /  >
;
;
;
export default TranscriptRow;
//# sourceMappingURL=TranscriptRow.js.map