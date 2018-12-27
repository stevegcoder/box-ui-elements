/**

 * @file Overall uploads progress bar
 */
import messages from '../messages';
import ProgressBar from './ProgressBar';
import { VIEW_UPLOAD_IN_PROGRESS, VIEW_UPLOAD_SUCCESS, VIEW_ERROR, VIEW_UPLOAD_EMPTY } from '../../constants';
import './OverallUploadsProgressBar.scss';
/**
 * Get upload status
 *
 * @param {View} view
 * @return {FormattedMessage|string}
 */
const getUploadStatus = (view) => {
    switch (view) {
        case VIEW_UPLOAD_IN_PROGRESS:
            return Object.assign({}, messages.uploadsManagerUploadInProgress) /  > ;
        case VIEW_UPLOAD_SUCCESS:
            return Object.assign({}, messages.uploadsManagerUploadComplete) /  > ;
        case VIEW_UPLOAD_EMPTY:
            return Object.assign({}, messages.uploadsManagerUploadPrompt) /  > ;
        case VIEW_ERROR:
            return Object.assign({}, messages.uploadsManagerUploadFailed) /  > ;
        default:
            return '';
    }
};
/**
 * Get overall upload progress percentage
 *
 * @param {string} view
 * @param {number} percent
 */
const getPercent = (view, percent) => {
    switch (view) {
        case VIEW_UPLOAD_SUCCESS:
            return 100;
        case VIEW_UPLOAD_EMPTY:
        case VIEW_ERROR:
            return 0;
        default:
            return percent;
    }
};
const OverallUploadsProgressBar = ({ percent, view, onClick, onKeyDown, isDragging, isVisible }) => {
    // Show the upload prompt and set progress to 0 when the uploads manager
    // is invisible or is having files dragged to it
    const shouldShowPrompt = isDragging || !isVisible;
    const status = shouldShowPrompt ? (Object.assign({}, messages.uploadsManagerUploadPrompt) /  >
    ) : (getUploadStatus(view));
    const updatedPercent = shouldShowPrompt ? 0 : getPercent(view, percent);
    return className = "bcu-overall-progress-bar";
    onClick = { onClick };
    onKeyDown = { onKeyDown };
    role = "button";
    tabIndex = { isVisible, '0': '-1' }
        >
            className;
    "bcu-upload-status" > { status } < /span>
        < ProgressBar;
    percent = { updatedPercent } /  >
        className;
    "bcu-uploads-manager-toggle" /  >
        /div>;
};
;
;
export default OverallUploadsProgressBar;
//# sourceMappingURL=OverallUploadsProgressBar.js.map