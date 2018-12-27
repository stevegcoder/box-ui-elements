/**
 * @was-flow
 * @file Preview sidebar nav button component
 * @author Box
 */
import classNames from 'classnames';
import './SidebarNavButton.scss';
const SidebarNavButton = ({ tooltip, isSelected, onClick, interactionTarget, children }) => {
    const buttonClass = classNames('bcs-nav-btn', {
        'bcs-nav-btn-is-selected': isSelected,
    });
    return text = { tooltip };
    position = "middle-left" >
        className;
    {
        buttonClass;
    }
    type = "button";
    onClick = { onClick };
    data - resin - target;
    {
        interactionTarget;
    }
     >
        { children }
        < /PlainButton>
        < /Tooltip>;
};
;
;
export default SidebarNavButton;
//# sourceMappingURL=SidebarNavButton.js.map