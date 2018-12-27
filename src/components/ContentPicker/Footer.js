/**
 * @was-flow
 * @file Footer list component
 * @author Box
 */
import PrimaryButton from 'box-react-ui/lib/components/primary-button/PrimaryButton';
import messages from '../messages';
import './Footer.scss';
const Footer = ({ selectedCount, onSelectedClick, hasHitSelectionLimit, onCancel, onChoose, chooseButtonLabel, cancelButtonLabel, children, }) => className = "bcp-footer" >
    className;
"bcp-footer-left" >
    type;
"button";
onClick = { onSelectedClick } >
    className;
"bcp-selected-count" > { selectedCount } < /span>
    & nbsp;
(Object.assign({}, messages.selected) /  >
    /PlainButton>
    & nbsp);
{
    hasHitSelectionLimit ? className = "bcp-selected-max" >
        Object.assign({}, messages.max) /  >
        /span>
        :
    ;
    null;
}
/div>
    < div;
className = "bcp-footer-right" >
    { children }
    < div;
className = "bcp-footer-actions" >
    type;
"button";
onClick = { onCancel } >
    { cancelButtonLabel } || Object.assign({}, messages.cancel) /  > ;
/Button>
    < PrimaryButton;
type = "button";
onClick = { onChoose } >
    { chooseButtonLabel } || Object.assign({}, messages.choose) /  > ;
/PrimaryButton>
    < /div>
    < /div>
    < /footer>;
;
export default Footer;
//# sourceMappingURL=Footer.js.map