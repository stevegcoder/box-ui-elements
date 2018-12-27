/**
 * @was-flow
 * @file Content Explorer Preview dialog
 * @author Box
 */
import { injectIntl } from 'react-intl';
import cloneDeep from 'lodash/cloneDeep';
import messages from '../messages';
import { TYPE_FILE, CLASS_MODAL_CONTENT_FULL_BLEED, CLASS_MODAL_OVERLAY, CLASS_MODAL } from '../../constants';
const PreviewDialog = ({ item, isOpen, parentElement, appElement, token, cache, currentCollection, canDownload, onCancel, onPreview, onDownload, apiHost, appHost, staticHost, sharedLink, sharedLinkPassword, contentPreviewProps, requestInterceptor, responseInterceptor, intl, }) => {
    const { items } = currentCollection;
    const onLoad = (data) => {
        onPreview(cloneDeep(data));
    };
    if (!item || !items) {
        return null;
    }
    const files = items.filter(({ type }) => type === TYPE_FILE);
    return isOpen = { isOpen };
    parentSelector = {}();
};
parentElement;
portalClassName = {} `${CLASS_MODAL} be-modal-preview`;
className = { CLASS_MODAL_CONTENT_FULL_BLEED };
overlayClassName = { CLASS_MODAL_OVERLAY };
contentLabel = { intl, : .formatMessage(messages.preview) };
onRequestClose = { onCancel };
appElement = { appElement }
    >
        Object.assign({}, contentPreviewProps);
fileId = { item, : .id };
apiHost = { apiHost };
appHost = { appHost };
staticHost = { staticHost };
cache = { cache };
token = { token };
hasHeader;
autoFocus;
collection = { files };
onLoad = { onLoad };
onClose = { onCancel };
onDownload = { onDownload };
canDownload = { canDownload };
sharedLink = { sharedLink };
sharedLinkPassword = { sharedLinkPassword };
contentPreviewProps = { contentPreviewProps };
requestInterceptor = { requestInterceptor };
responseInterceptor = { responseInterceptor }
    /  >
    /Modal>;
;
;
export default injectIntl(PreviewDialog);
//# sourceMappingURL=PreviewDialog.js.map