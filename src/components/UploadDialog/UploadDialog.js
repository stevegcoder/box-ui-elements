/**
 * @was-flow
 * @file Content Explorer Delete Confirmation Dialog
 * @author Box
 */
import { injectIntl } from 'react-intl';
import messages from '../messages';
import { CLASS_MODAL_CONTENT_FULL_BLEED, CLASS_MODAL_OVERLAY, CLASS_MODAL } from '../../constants';
const UploadDialog = ({ isOpen, currentFolderId, token, sharedLink, sharedLinkPassword, apiHost, uploadHost, onClose, parentElement, appElement, onUpload, requestInterceptor, responseInterceptor, intl, }) => isOpen = { isOpen };
parentSelector = {}();
parentElement;
portalClassName = {} `${CLASS_MODAL} be-modal-upload`;
className = { CLASS_MODAL_CONTENT_FULL_BLEED };
overlayClassName = { CLASS_MODAL_OVERLAY };
onRequestClose = { onClose };
contentLabel = { intl, : .formatMessage(messages.upload) };
appElement = { appElement }
    >
        rootFolderId;
{
    currentFolderId;
}
token = { token };
sharedLink = { sharedLink };
sharedLinkPassword = { sharedLinkPassword };
apiHost = { apiHost };
uploadHost = { uploadHost };
onClose = { onClose };
onComplete = { onUpload };
requestInterceptor = { requestInterceptor };
responseInterceptor = { responseInterceptor }
    /  >
    /Modal>;
;
export default injectIntl(UploadDialog);
//# sourceMappingURL=UploadDialog.js.map