/**

 * @file Function to render the progress table cell
 */
import { STATUS_ERROR, STATUS_IN_PROGRESS } from '../../constants';
import messages from '../messages';
/**
 * Get error message for a specific error code
 *
 * @param {string} [errorCode]
 * @returns {FormattedMessage}
 */
const getErrorMessage = (errorCode) => {
    switch (errorCode) {
        case 'file_size_limit_exceeded':
            return Object.assign({}, messages.uploadsFileSizeLimitExceededErrorMessage) /  > ;
        case 'storage_limit_exceeded':
            return Object.assign({}, messages.uploadsStorageLimitErrorMessage) /  > ;
        case 'pending_app_folder_size_limit':
            return Object.assign({}, messages.uploadsPendingFolderSizeLimitErrorMessage) /  > ;
        default:
            return Object.assign({}, messages.uploadsDefaultErrorMessage) /  > ;
    }
};
export default () => ({ rowData }) => {
    const { status, error = {}, isFolder } = rowData;
    const { code } = error;
    if (isFolder && status !== STATUS_ERROR) {
        return null;
    }
    switch (status) {
        case STATUS_IN_PROGRESS:
            return Object.assign({}, rowData) /  > ;
        case STATUS_ERROR:
            return getErrorMessage(code);
        default:
            return null;
    }
};
//# sourceMappingURL=progressCellRenderer.js.map