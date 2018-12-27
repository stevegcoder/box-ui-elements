/**
 * @was-flow
 * @file Preview sidebar section component
 * @author Box
 */
import * as React from 'react';
import classNames from 'classnames';
import IconCaretDown from 'box-react-ui/lib/icons/general/IconCaretDown';
import { COLOR_999 } from '../../constants';
import './SidebarSection.scss';
class SidebarSection extends React.PureComponent {
    /**
     * [constructor]
     *
     * @private
     * @return {ContentPreview}
     */
    constructor(props) {
        super(props);
        /**
         * Click handler for toggling the section
         *
         * @private
         * @param {Event} event - click event
         * @return {void}
         */
        this.toggleVisibility = () => {
            this.setState(prevState => ({
                isOpen: !prevState.isOpen,
            }));
        };
        this.state = {
            isOpen: props.isOpen,
        };
    }
    /**
     * Renders the section
     *
     * @private
     * @inheritdoc
     * @return {void}
     */
    render() {
        const { isOpen } = this.state;
        const { children, className, title, interactionTarget } = this.props;
        const sectionClassName = classNames('bcs-section', {
            'bcs-section-open': isOpen,
        }, className);
        return className = { sectionClassName } >
            { title } && type;
        "button";
        onClick = { this: .toggleVisibility };
        className = "bcs-section-title";
        data - resin - target;
        {
            interactionTarget;
        }
            >
                { title }
            < IconCaretDown;
        color = { COLOR_999 };
        width = { 8:  } /  >
            /PlainButton>;
    }
}
SidebarSection.defaultProps = {
    className: '',
    isOpen: true,
};
{
    (isOpen || !title) && className;
    "bcs-section-content" > { children } < /div>}
        < /div>;
    ;
}
export default SidebarSection;
//# sourceMappingURL=SidebarSection.js.map