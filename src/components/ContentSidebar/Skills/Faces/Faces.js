/**
 * @was-flow
 * @file Faces Skill Card component
 * @author Box
 */
import * as React from 'react';
import classNames from 'classnames';
import PrimaryButton from 'box-react-ui/lib/components/primary-button/PrimaryButton';
import messages from '../../../messages';
import { SKILLS_TARGETS } from '../../../../interactionTargets';
import './Faces.scss';
class Faces extends React.PureComponent {
    /**
     * [constructor]
     *
     * @public
     * @return {Faces}
     */
    constructor(props) {
        super(props);
        /**
         * Toggles the edit mode
         *
         * @private
         * @return {void}
         */
        this.toggleIsEditing = () => {
            this.setState(prevState => ({
                isEditing: !prevState.isEditing,
            }));
        };
        /**
         * Toggles face selection
         *
         * @private
         * @return {void}
         */
        this.onSelect = (face) => {
            const { selected } = this.state;
            this.setState({
                selected: selected === face ? undefined : face,
            });
        };
        /**
         * Deletes a face
         *
         * @private
         * @return {void}
         */
        this.onDelete = (face) => {
            const { removes } = this.state;
            removes.push(face);
            this.setState({ removes: removes.slice(0) });
        };
        /**
         * Saves the new card data
         *
         * @private
         * @return {void}
         */
        this.onSave = () => {
            const { onSkillChange } = this.props;
            const { removes } = this.state;
            this.toggleIsEditing();
            if (removes.length > 0) {
                this.setState({ isLoading: true });
                onSkillChange(removes);
            }
        };
        /**
         * Cancels editing
         *
         * @private
         * @return {void}
         */
        this.onCancel = () => {
            this.resetState(this.props);
        };
        this.state = {
            faces: props.card.entries,
            removes: [],
            isEditing: props.hasError,
            hasError: props.hasError,
            isLoading: false,
        };
    }
    /**
     * Helper to reset the state
     *
     * @private
     * @param {Object} props - component props
     * @return {void}
     */
    resetState(props) {
        this.setState({
            faces: props.card.entries,
            removes: [],
            isEditing: false,
            selected: undefined,
            hasError: false,
            isLoading: false,
        });
    }
    /**
     * Renders the faces
     *
     * @private
     * @return {void}
     */
    render() {
        const { card, isEditable, getViewer } = this.props;
        const { selected, faces, removes, isEditing, hasError, isLoading } = this.state;
        const { duration } = card;
        const hasFaces = faces.length > 0;
        const entries = faces.filter((face) => !removes.includes(face));
        const editClassName = classNames('be-face-edit', {
            'be-faces-is-editing': isEditing,
        });
        return isLoading = { isLoading };
        className = "be-faces" >
            { hasFaces } && isEditable && !isLoading && text;
        {
            (Object.assign({}, messages.editLabel) /  > );
        }
         >
            type;
        "button";
        className = { editClassName };
        onClick = { this: .toggleIsEditing };
        data - resin - target;
        {
            SKILLS_TARGETS.FACES.EDIT;
        }
            >
                />
            < /PlainButton>
            < /Tooltip>;
    }
}
{
    hasError && title;
    {
        (Object.assign({}, messages.sidebarSkillsErrorTitle) /  > );
    }
     >
        Object.assign({}, messages.sidebarSkillsErrorContent) /  >
        /InlineError>;
}
{
    hasFaces ? (entries.map((face, index) => (
    /* eslint-disable react/no-array-index-key */
    key) = { index }, face = { face }, selected = { selected }, isEditing = { isEditing }, onDelete = { this: .onDelete }, onSelect = { this: .onSelect }
        /  >
    /* eslint-enable react/no-array-index-key */
    ))
        :
    ;
    (Object.assign({}, messages.skillNoInfoFoundError) /  >
    );
}
{
    !!selected && !isEditing && Array.isArray(selected.appears) && selected.appears.length > 0 && timeslices;
    {
        selected.appears;
    }
    duration = { duration };
    getViewer = { getViewer };
    interactionTarget = { SKILLS_TARGETS, : .FACES.TIMELINE }
        /  >
    ;
}
{
    isEditing && className;
    "be-faces-buttons" >
        type;
    "button";
    onClick = { this: .onCancel };
    data - resin - target;
    {
        SKILLS_TARGETS.FACES.EDIT_CANCEL;
    }
        >
            Object.assign({}, messages.cancel) /  >
        /Button>
        < PrimaryButton;
    type = "button";
    onClick = { this: .onSave };
    data - resin - target;
    {
        SKILLS_TARGETS.FACES.EDIT_SAVE;
    }
        >
            Object.assign({}, messages.save) /  >
        /PrimaryButton>
        < /div>;
}
/LoadingIndicatorWrapper>;
;
export default Faces;
//# sourceMappingURL=Faces.js.map