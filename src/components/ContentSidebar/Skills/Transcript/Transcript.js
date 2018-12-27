/**
 * @was-flow
 * @file Transcript component
 * @author Box
 */
import * as React from 'react';
import classNames from 'classnames';
import { formatTime } from 'box-react-ui/lib/utils/datetime';
import { nines } from 'box-react-ui/lib/styles/variables';
import { isValidTimeSlice } from './timeSliceUtils';
import { copy } from '../../../../util/download';
import { SKILLS_TARGETS } from '../../../../interactionTargets';
import messages from '../../../messages';
import './Transcript.scss';
class Transcript extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            isEditingIndex: undefined,
            newTranscriptText: '',
            isCollapsed: true,
            isLoading: false,
        };
        /**
         * Reducer to accumulate all transcript entries for copying
         *
         * @param {Object} accumulator - reducer accumulator
         * @return {string} accumulated transcript entries
         */
        this.transcriptReducer = (accumulator, { appears, text }) => {
            const start = isValidTimeSlice(appears) && Array.isArray(appears) ? `${formatTime(appears[0].start)}:` : '';
            return `${accumulator}${start} ${text || ''}\r\n`;
        };
        /**
         * Mapper to accumulate all transcript entries for displaying
         *
         * @param {Object} accumulator - reducer accumulator
         * @param {number} index - mapper index
         * @return {string} accumulated transcript entries
         */
        this.transcriptMapper = ({ appears, text }, index) => {
            const { isEditingIndex, newTranscriptText } = this.state;
            const isEditingRow = isEditingIndex === index;
            const transcriptText = isEditingRow ? newTranscriptText : text;
            const interactionTarget = isEditingRow
                ? SKILLS_TARGETS.TRANSCRIPTS.EDIT_TEXT
                : SKILLS_TARGETS.TRANSCRIPTS.TRANSCRIPT;
            return key = { index };
            isEditing = { isEditingRow };
            appears = { appears };
            text = { transcriptText };
            onClick = {}();
            this.onClick(index);
        };
        this.onSave = { this: .onSave };
        this.onCancel = { this: .onCancel };
        this.onChange = { this: .onChange };
        this.interactionTarget = { interactionTarget }
            /  >
        ;
    }
    /**
     * Called when transcripts gets new properties
     *
     * @private
     * @return {void}
     */
    componentWillReceiveProps() {
        const wasEditing = typeof this.state.isEditingIndex === 'number';
        this.setState({
            isEditingIndex: wasEditing ? -1 : undefined,
            newTranscriptText: '',
            isLoading: false,
        });
    }
    ;
}
;
/**
 * Toggles the edit mode
 *
 * @private
 * @return {void}
 */
toggleIsEditing = () => {
    this.setState(prevState => ({
        isEditingIndex: typeof prevState.isEditingIndex === 'number' ? undefined : -1,
    }));
};
/**
 * Previews a transcript segment
 *
 * @private
 * @param {number|void} [index] - row index to edit
 * @return {void}
 */
previewSegment(index, number);
{
    const { card: { entries }, getViewer, } = this.props;
    const { appears } = entries[index];
    const viewer = getViewer ? getViewer() : null;
    const isValid = isValidTimeSlice(appears) && Array.isArray(appears) && appears.length === 1;
    const timeSlice = ((appears) => );
    const start = isValid ? timeSlice[0].start : 0;
    if (isValid && viewer && typeof viewer.play === 'function') {
        viewer.play(start);
    }
}
/**
 * Saves the new card data
 *
 * @private
 * @return {void}
 */
onSave = () => {
    const { card: { entries }, onSkillChange, } = this.props;
    const { isEditingIndex, newTranscriptText } = this.state;
    if (typeof isEditingIndex !== 'number') {
        return;
    }
    const entry = entries[isEditingIndex];
    if (entry.text === newTranscriptText) {
        this.onCancel();
    }
    else {
        this.setState({ isLoading: true, isEditingIndex: -1 });
        onSkillChange(null, null, [
            {
                replacement: Object.assign({}, entry, { text: newTranscriptText }),
                replaced: entry,
            },
        ]);
    }
};
/**
 * Cancels editing
 *
 * @private
 * @return {void}
 */
onCancel = () => {
    this.setState({ isEditingIndex: -1, newTranscriptText: '' });
};
/**
 * Reflects changes of editing
 *
 * @private
 * @param {Event} event - keyboard event
 * @return {void}
 */
onChange = (event) => {
    const currentTarget = (event.currentTarget), HTMLTextAreaElement;
    this.setState({
        newTranscriptText: currentTarget.value,
    });
};
/**
 * Click handler for transcript
 *
 * @private
 * @return {void}
 */
onClick = (index) => {
    const { card: { entries }, } = this.props;
    const { isEditingIndex } = this.state;
    if (typeof isEditingIndex === 'number') {
        this.setState({
            isEditingIndex: index,
            newTranscriptText: entries[index].text,
        });
    }
    else {
        this.previewSegment(index);
    }
};
/**
 * Copies the transcript.
 * Also animates the copy button.
 *
 * @private
 * @return {void}
 */
copyTranscript = () => {
    const { card: { entries }, } = this.props;
    const copiedClass = 'be-transcript-copied';
    copy(entries.reduce(this.transcriptReducer, ''));
    // Animate the button by adding a class
    if (this.copyBtn) {
        this.copyBtn.classList.add(copiedClass);
    }
    // Remove the animation class
    setTimeout(() => {
        if (this.copyBtn) {
            this.copyBtn.classList.remove(copiedClass);
        }
    }, 1000);
};
/**
 * Copy button reference
 *
 * @private
 * @return {void}
 */
copyBtnRef = (btn) => {
    this.copyBtn = btn;
};
/**
 * Toggles transcript exapand and collapse
 *
 * @private
 * @return {void}
 */
toggleExpandCollapse = () => {
    this.setState(prevState => ({
        isCollapsed: !prevState.isCollapsed,
    }));
};
/**
 * Renders the transcript
 *
 * @private
 * @return {Object}
 */
render();
{
    const { card: { entries }, isEditable, } = this.props;
    const { isEditingIndex, isCollapsed, isLoading } = this.state;
    const hasEntries = entries.length > 0;
    const hasManyEntries = entries.length > 5;
    const isEditing = typeof isEditingIndex === 'number';
    const editBtnClassName = classNames('be-transcript-edit', {
        'be-transcript-is-editing': isEditing,
    });
    const contentClassName = classNames({
        'be-transcript-content-collapsed': isCollapsed,
    });
    const expandCollapseMessage = isCollapsed ? messages.expand : messages.collapse;
    return isLoading = { isLoading };
    className = "be-transcript" >
        { hasEntries } && !isLoading && className;
    "be-transcript-actions" >
        text;
    {
        (Object.assign({}, messages.copy) /  > );
    }
     >
        type;
    "button";
    className = "be-transcript-copy";
    getDOMRef = { this: .copyBtnRef };
    onClick = { this: .copyTranscript };
    data - resin - target;
    {
        SKILLS_TARGETS.TRANSCRIPTS.COPY;
    }
        >
            color;
    {
        nines;
    }
    />
        < /PlainButton>
        < /Tooltip>;
    {
        hasManyEntries && text;
        {
            (Object.assign({}, expandCollapseMessage) /  > );
        }
         >
            type;
        "button";
        className = "be-transcript-expand";
        onClick = { this: .toggleExpandCollapse };
        data - resin - target;
        {
            SKILLS_TARGETS.TRANSCRIPTS.EXPAND;
        }
            >
                {} /  > ;
        color;
        {
            nines;
        }
        />}
            < /PlainButton>
            < /Tooltip>;
    }
    {
        isEditable && text;
        {
            (Object.assign({}, messages.editLabel) /  > );
        }
         >
            type;
        "button";
        className = { editBtnClassName };
        onClick = { this: .toggleIsEditing };
        data - resin - target;
        {
            SKILLS_TARGETS.TRANSCRIPTS.EDIT;
        }
            >
                />
            < /PlainButton>
            < /Tooltip>;
    }
    /div>;
}
{
    isEditing ? className = "be-transcript-edit-message" >
        Object.assign({}, messages.transcriptEdit) /  >
        /div>
        :
    ;
    null;
}
{
    hasEntries ? className = { contentClassName } > { entries, : .map(this.transcriptMapper) } < /div>
        :
    ;
    (Object.assign({}, messages.skillNoInfoFoundError) /  >
    );
}
/LoadingIndicatorWrapper>;
;
export default Transcript;
//# sourceMappingURL=Transcript.js.map