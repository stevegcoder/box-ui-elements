/**
 * @was-flow
 * @file Editable Skill Keywords card component
 * @author Box
 */
import * as React from 'react';
import PrimaryButton from 'box-react-ui/lib/components/primary-button/PrimaryButton';
import messages from '../../../messages';
import getPills from './keywordUtils';
import { SKILLS_TARGETS } from '../../../../interactionTargets';
var type = ;
{
    Pill, Pills;
}
from;
'./flowTypes';
import './EditableKeywords.scss';
class EditableKeywords extends React.PureComponent {
    /**
     * [constructor]
     *
     * @public
     * @return {EditableKeywords}
     */
    constructor(props) {
        super(props);
        /**
         * Called when keywords gets new properties.
         * Should reset to original state.
         *
         * @private
         * @param {Object} option - pill
         * @param {number} index - pill index
         * @return {void}
         */
        this.onRemove = (option, index) => {
            const { onDelete, keywords } = this.props;
            onDelete(keywords[index]);
        };
        /**
         * When pressing enter in the pill input box
         *
         * @private
         * @param {Event} event - keyboard event
         * @return {void}
         */
        this.onKeyDown = ({ key }) => {
            if (key === 'Enter' && !this.state.isInCompositionMode) {
                this.onBlur();
            }
        };
        /**
         * Called when pill selector is blurred.
         * Adds a new pill if needed.
         *
         * @private
         * @return {void}
         */
        this.onBlur = () => {
            const { onAdd } = this.props;
            const { keyword } = this.state;
            if (keyword) {
                onAdd({
                    type: 'text',
                    text: keyword,
                });
            }
        };
        /**
         * Enables composition mode.
         *
         * @private
         * @return {void}
         */
        this.onCompositionStart = () => {
            this.setState({ isInCompositionMode: true });
        };
        /**
         * Disables composition mode.
         *
         * @private
         * @return {void}
         */
        this.onCompositionEnd = () => {
            this.setState({ isInCompositionMode: false });
        };
        /**
         * Called when pill selector gets new input value.
         *
         * @private
         * @return {void}
         */
        this.onInput = (event) => {
            const currentTarget = (event.currentTarget), HTMLInputElement;
            this.setState({
                keyword: currentTarget.value,
            });
        };
        this.state = {
            pills: getPills(props.keywords),
            keyword: '',
            isInCompositionMode: false,
        };
    }
    /**
     * Called when keywords gets new properties.
     * Should reset to original state.
     *
     * @private
     * @param {Object} nextProps - component props
     * @return {void}
     */
    componentWillReceiveProps(nextProps) {
        this.setState({ pills: getPills(nextProps.keywords), keyword: '' });
    }
    /**
     * Renders the keywords
     *
     * @private
     * @return {void}
     */
    render() {
        const { onSave, onCancel } = this.props;
        const { pills, keyword } = this.state;
        return className = "pill-selector-wrapper" >
            onBlur;
        {
            this.onBlur;
        }
        onCompositionStart = { this: .onCompositionStart };
        onCompositionEnd = { this: .onCompositionEnd };
        onInput = { this: .onInput };
        onKeyDown = { this: .onKeyDown };
        onPaste = { this: .onInput };
        onRemove = { this: .onRemove };
        selectedOptions = { pills };
        value = { keyword }
            /  >
            className;
        "be-keywords-buttons" >
            type;
        "button";
        onClick = { onCancel };
        data - resin - target;
        {
            SKILLS_TARGETS.KEYWORDS.EDIT_CANCEL;
        }
         >
            Object.assign({}, messages.cancel) /  >
            /Button>
            < PrimaryButton;
        type = "button";
        onClick = { onSave };
        data - resin - target;
        {
            SKILLS_TARGETS.KEYWORDS.EDIT_SAVE;
        }
         >
            Object.assign({}, messages.save) /  >
            /PrimaryButton>
            < /div>
            < /span>;
        ;
    }
}
export default EditableKeywords;
//# sourceMappingURL=EditableKeywords.js.map