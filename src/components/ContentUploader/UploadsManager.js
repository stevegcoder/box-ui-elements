/**

 * @file Uploads manager
 */
import './UploadsManager.scss';
import { STATUS_ERROR } from '../../constants';
const UploadsManager = ({ items, view, onItemActionClick, toggleUploadsManager, isExpanded, isVisible, isDragging, }) => {
    /**
     * Keydown handler for progress bar
     *
     * @param {SyntheticKeyboardEvent} event
     * @return {void}
     */
    const handleProgressBarKeyDown = (event) => {
        switch (event.key) {
            case 'Enter':
            case 'Space':
                toggleUploadsManager();
                break;
            default:
            // noop
        }
    };
    const totalSize = items.reduce((updatedSize, item) => (item.status === STATUS_ERROR || item.isFolder ? updatedSize : updatedSize + item.size), 0);
    const totalUploaded = items.reduce((updatedSize, item) => item.status === STATUS_ERROR || item.isFolder
        ? updatedSize
        : updatedSize + (item.size * item.progress) / 100.0, 0);
    const percent = (totalUploaded / totalSize) * 100;
    return className = {}
        >
            isVisible;
    {
        isVisible;
    }
    isDragging = { isDragging };
    percent = { percent };
    onClick = { toggleUploadsManager };
    onKeyDown = { handleProgressBarKeyDown };
    view = { view }
        /  >
        className;
    "bcu-uploads-manager-item-list" >
        items;
    {
        items;
    }
    view = { view };
    onClick = { onItemActionClick } /  >
        /div>
        < /div>;
};
;
;
export default UploadsManager;
//# sourceMappingURL=UploadsManager.js.map