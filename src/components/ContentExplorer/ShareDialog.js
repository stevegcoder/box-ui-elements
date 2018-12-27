/**
 * @was-flow
 * @file Content Explorer Delete Confirmation Dialog
 * @author Box
 */
import noop from 'lodash/noop';
import { injectIntl } from 'react-intl';
import messages from '../messages';
import { CLASS_MODAL_CONTENT, CLASS_MODAL_OVERLAY, CLASS_MODAL } from '../../constants';
import './ShareDialog.scss';
const ShareDialog = ({ isOpen, canSetShareAccess, onShareAccessChange, onCancel, item, isLoading, parentElement, appElement, intl, }) => {
    let textInput = null;
    const copy = () => {
        if (textInput instanceof HTMLInputElement) {
            textInput.select();
            document.execCommand('copy');
        }
    };
    const { shared_link: sharedLink } = item;
    const { url } = sharedLink || {
        url: intl.formatMessage(messages.shareDialogNone),
    };
    /* eslint-disable jsx-a11y/label-has-for */
    return isOpen = { isOpen };
    parentSelector = {}();
};
parentElement;
portalClassName = {} `${CLASS_MODAL} be-modal-share`;
className = { CLASS_MODAL_CONTENT };
overlayClassName = { CLASS_MODAL_OVERLAY };
onRequestClose = { onCancel };
contentLabel = { intl, : .formatMessage(messages.shareDialogLabel) };
appElement = { appElement }
    >
        className;
"be-modal-content" >
    tagName;
"div";
{
    messages.shareDialogText;
}
/>
    < span >
    type;
"text";
onChange = { noop };
ref = { input };
{
    textInput = input;
}
value = { url }
    /  >
    type;
"button";
className = "be-modal-button-copy";
onClick = { copy };
autoFocus >
    Object.assign({}, messages.copy) /  >
    /PrimaryButton>
    < /span>
    < /label>
    < /div>
    < div;
className = "be-modal-btns" >
    className;
"bce-shared-access-select";
canSetShareAccess = { canSetShareAccess };
onChange = { onShareAccessChange };
item = { item }
    /  >
    type;
"button";
onClick = { onCancel };
isLoading = { isLoading } >
    Object.assign({}, messages.close) /  >
    /Button>
    < /div>
    < /Modal>;
;
;
export default injectIntl(ShareDialog);
//# sourceMappingURL=ShareDialog.js.map