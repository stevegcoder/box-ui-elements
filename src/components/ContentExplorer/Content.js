/**
 * @was-flow
 * @file File picker header and list component
 * @author Box
 */
import { VIEW_ERROR, VIEW_SELECTED } from '../../constants';
import './Content.scss';
/**
 * Determines if we should show the empty state
 *
 * @param {string} view the current view
 * @param {Object} currentCollection the current collection
 * @return {boolean} empty or not
 */
function isEmpty(view, currentCollection) {
    const { items = [] } = currentCollection;
    return view === VIEW_ERROR || items.length === 0;
}
const Content = ({ view, isSmall, isMedium, isTouch, rootId, rootElement, currentCollection, tableRef, focusedRow, canDownload, canDelete, canRename, canShare, canPreview, onItemClick, onItemSelect, onItemDelete, onItemDownload, onItemRename, onItemShare, onItemPreview, onSortChange, }) => className = "bce-content" >
    { view } === VIEW_ERROR || view === VIEW_SELECTED ? null : percent = { currentCollection, : .percentLoaded } /  >
;
{
    isEmpty(view, currentCollection) ? view = { view } : ;
    isLoading = { currentCollection, : .percentLoaded !== 100 } /  >
    ;
    view = { view };
    isSmall = { isSmall };
    isMedium = { isMedium };
    isTouch = { isTouch };
    rootId = { rootId };
    rootElement = { rootElement };
    focusedRow = { focusedRow };
    currentCollection = { currentCollection };
    tableRef = { tableRef };
    canShare = { canShare };
    canPreview = { canPreview };
    canDelete = { canDelete };
    canRename = { canRename };
    canDownload = { canDownload };
    onItemClick = { onItemClick };
    onItemSelect = { onItemSelect };
    onItemDelete = { onItemDelete };
    onItemDownload = { onItemDownload };
    onItemRename = { onItemRename };
    onItemShare = { onItemShare };
    onItemPreview = { onItemPreview };
    onSortChange = { onSortChange }
        /  >
    ;
}
/div>;
;
export default Content;
//# sourceMappingURL=Content.js.map