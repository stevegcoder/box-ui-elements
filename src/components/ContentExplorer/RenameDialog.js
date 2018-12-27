/**
 * @was-flow
 * @file Content Explorer Rename Dialog
 * @author Box
 */
import { injectIntl } from 'react-intl';
import Button from 'box-react-ui/lib/components/button/Button';
import messages from '../messages';
import { CLASS_MODAL_CONTENT, CLASS_MODAL_OVERLAY, CLASS_MODAL, ERROR_CODE_ITEM_NAME_TOO_LONG, ERROR_CODE_ITEM_NAME_IN_USE, } from '../../constants';
/* eslint-disable jsx-a11y/label-has-for */
const RenameDialog = ({ isOpen, onRename, onCancel, item, isLoading, errorCode, parentElement, appElement, intl, }) => {
    let textInput = null;
    let error;
    const { name = '', extension } = item;
    const ext = extension ? `.${extension}` : '';
    const nameWithoutExt = extension ? name.replace(ext, '') : name;
    /**
     * Appends the extension and calls rename function
     */
    const rename = () => {
        if (textInput && textInput.value) {
            if (textInput.value === nameWithoutExt) {
                onCancel();
            }
            else {
                onRename(textInput.value, ext);
            }
        }
    };
    /**
     * Grabs reference to the input element
     */
    const ref = input => {
        textInput = input;
        if (textInput instanceof HTMLInputElement) {
            textInput.focus();
            textInput.select();
        }
    };
    /**
     * Handles enter key down
     */
    const onKeyDown = ({ key }) => {
        switch (key) {
            case 'Enter':
                rename();
                break;
            default:
                break;
        }
    };
    switch (errorCode) {
        case ERROR_CODE_ITEM_NAME_IN_USE:
            error = messages.renameDialogErrorInUse;
            break;
        case ERROR_CODE_ITEM_NAME_TOO_LONG:
            error = messages.renameDialogErrorTooLong;
            break;
        default:
            error = errorCode ? messages.renameDialogErrorInvalid : null;
            break;
    }
    return isOpen = { isOpen };
    parentSelector = {}();
};
parentElement;
portalClassName = {} `${CLASS_MODAL} be-modal-rename`;
className = { CLASS_MODAL_CONTENT };
overlayClassName = { CLASS_MODAL_OVERLAY };
onRequestClose = { onCancel };
contentLabel = { intl, : .formatMessage(messages.renameDialogLabel) };
appElement = { appElement }
    >
        {} /  >
    /div>;
null;
tagName;
"div";
{
    messages.renameDialogText;
}
values = {};
{
    name: nameWithoutExt;
}
/>
    < input;
type = "text";
required;
ref = { ref };
defaultValue = { nameWithoutExt };
onKeyDown = { onKeyDown } /  >
    /label>
    < div;
className = "be-modal-btns" >
    type;
"button";
onClick = { rename };
isLoading = { isLoading } >
    Object.assign({}, messages.rename) /  >
    /PrimaryButton>
    < Button;
type = "button";
onClick = { onCancel };
isDisabled = { isLoading } >
    Object.assign({}, messages.cancel) /  >
    /Button>
    < /div>
    < /Modal>;
;
;
export default injectIntl(RenameDialog);
//# sourceMappingURL=RenameDialog.js.map