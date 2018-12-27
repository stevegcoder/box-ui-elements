/**
 * @was-flow
 * @file Function to render the date table cell
 * @author Box
 */
import Menu from 'box-react-ui/lib/components/menu/Menu';
import Browser from '../../util/Browser';
import messages from '../messages';
import { PERMISSION_CAN_DOWNLOAD, PERMISSION_CAN_RENAME, PERMISSION_CAN_DELETE, PERMISSION_CAN_SHARE, PERMISSION_CAN_PREVIEW, TYPE_FILE, TYPE_WEBLINK, } from '../../constants';
import './MoreOptionsCell.scss';
export default (canPreview, canShare, canDownload, canDelete, canRename, onItemSelect, onItemDelete, onItemDownload, onItemRename, onItemShare, onItemPreview, isSmall) => ({ rowData }) => {
    const onFocus = () => onItemSelect(rowData);
    const onDelete = () => onItemDelete(rowData);
    const onDownload = () => onItemDownload(rowData);
    const onRename = () => onItemRename(rowData);
    const onShare = () => onItemShare(rowData);
    const onPreview = () => onItemPreview(rowData);
    const { permissions, type } = rowData;
    if (!permissions) {
        return />;;
    }
    const allowPreview = type === TYPE_FILE && canPreview && permissions[PERMISSION_CAN_PREVIEW];
    const allowOpen = type === TYPE_WEBLINK;
    const allowDelete = canDelete && permissions[PERMISSION_CAN_DELETE];
    const allowShare = canShare && permissions[PERMISSION_CAN_SHARE];
    const allowRename = canRename && permissions[PERMISSION_CAN_RENAME];
    const allowDownload = canDownload && permissions[PERMISSION_CAN_DOWNLOAD] && type === TYPE_FILE && !Browser.isMobile();
    const allowed = allowDelete || allowRename || allowDownload || allowPreview || allowShare || allowOpen;
    if (!allowed) {
        return />;;
    }
    return className = "bce-more-options" >
        isRightAligned;
    constrainToScrollParent >
        type;
    "button";
    onFocus = { onFocus };
    className = "bce-btn-more-options" >
    ;
    /Button>
        < Menu >
        {};
    {
        allowOpen ? onClick = { onPreview } >
            Object.assign({}, messages.open) /  >
            /MenuItem>
            :
        ;
        null;
    }
    {
        allowDelete ? onClick = { onDelete } >
            Object.assign({}, messages.delete) /  >
            /MenuItem>
            :
        ;
        null;
    }
    {
        allowDownload ? onClick = { onDownload } >
            Object.assign({}, messages.download) /  >
            /MenuItem>
            :
        ;
        null;
    }
    {
        allowRename ? onClick = { onRename } >
            Object.assign({}, messages.rename) /  >
            /MenuItem>
            :
        ;
        null;
    }
    {
        allowShare ? onClick = { onShare } >
            Object.assign({}, messages.share) /  >
            /MenuItem>
            :
        ;
        null;
    }
    /Menu>
        < /DropdownMenu>;
    {
        allowShare && !isSmall ? type = "button" : ;
        onFocus = { onFocus };
        onClick = { onShare } >
            Object.assign({}, messages.share) /  >
            /Button>;
        null;
    }
    /div>;
    ;
};
//# sourceMappingURL=moreOptionsCellRenderer.js.map