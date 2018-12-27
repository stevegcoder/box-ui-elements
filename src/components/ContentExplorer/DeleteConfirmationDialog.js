/**
 * @was-flow
 * @file Content Explorer Delete Confirmation Dialog
 * @author Box
 */
import { injectIntl } from 'react-intl';
import Button from 'box-react-ui/lib/components/button/Button';
import messages from '../messages';
import { CLASS_MODAL_CONTENT, CLASS_MODAL_OVERLAY, CLASS_MODAL, TYPE_FOLDER } from '../../constants';
const DeleteConfirmationDialog = ({ isOpen, onDelete, onCancel, item, isLoading, parentElement, appElement, intl, }) => {
    const message = item.type === TYPE_FOLDER ? messages.deleteDialogFolderText : messages.deleteDialogFileText;
    return isOpen = { isOpen };
    parentSelector = {}();
};
parentElement;
portalClassName = { CLASS_MODAL };
className = { CLASS_MODAL_CONTENT };
overlayClassName = { CLASS_MODAL_OVERLAY };
onRequestClose = { onCancel };
contentLabel = { intl, : .formatMessage(messages.deleteDialogLabel) };
appElement = { appElement }
    >
        Object.assign({}, message);
values = {};
{
    name: item.name;
}
/>
    < div;
className = "be-modal-btns" >
    type;
"button";
onClick = { onDelete };
isLoading = { isLoading } >
    Object.assign({}, messages.delete) /  >
    /PrimaryButton>
    < Button;
type = "button";
onClick = { onCancel };
isDisabled = { isLoading };
autoFocus >
    Object.assign({}, messages.cancel) /  >
    /Button>
    < /div>
    < /Modal>;
;
;
export default injectIntl(DeleteConfirmationDialog);
//# sourceMappingURL=DeleteConfirmationDialog.js.map