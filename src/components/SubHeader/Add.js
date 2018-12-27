/**
 * @was-flow
 * @file Content sub header component
 * @author Box
 */
import Menu from 'box-react-ui/lib/components/menu/Menu';
import messages from '../messages';
import './Add.scss';
const Add = ({ onUpload, onCreate, isLoaded, showUpload = true, showCreate = true }) => isRightAligned, constrainToScrollParent;
 >
    type;
"button";
className = "be-btn-add";
isDisabled = {};
isLoaded;
 >
    />
    < /Button>
    < Menu >
    { showUpload } && onClick;
{
    onUpload;
}
 >
    Object.assign({}, messages.upload) /  >
    /MenuItem>;
{
    showCreate && onClick;
    {
        onCreate;
    }
     >
        Object.assign({}, messages.newFolder) /  >
        /MenuItem>;
}
/Menu>
    < /DropdownMenu>;
;
export default Add;
//# sourceMappingURL=Add.js.map