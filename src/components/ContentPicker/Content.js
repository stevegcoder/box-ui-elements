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
const Content = ({ view, rootId, isSmall, rootElement, focusedRow, hasHitSelectionLimit, selectableType, currentCollection, tableRef, canSetShareAccess, onItemClick, onItemSelect, onShareAccessChange, onFocusChange, extensionsWhitelist, }) => className = "bcp-content" >
    { view } === VIEW_ERROR || view === VIEW_SELECTED ? null : percent = { currentCollection, : .percentLoaded } /  >
;
{
    isEmpty(view, currentCollection) ? view = { view } : ;
    isLoading = { currentCollection, : .percentLoaded !== 100 } /  >
    ;
    view = { view };
    rootId = { rootId };
    isSmall = { isSmall };
    rootElement = { rootElement };
    focusedRow = { focusedRow };
    currentCollection = { currentCollection };
    tableRef = { tableRef };
    canSetShareAccess = { canSetShareAccess };
    hasHitSelectionLimit = { hasHitSelectionLimit };
    selectableType = { selectableType };
    onItemSelect = { onItemSelect };
    onItemClick = { onItemClick };
    onFocusChange = { onFocusChange };
    onShareAccessChange = { onShareAccessChange };
    extensionsWhitelist = { extensionsWhitelist }
        /  >
    ;
}
/div>;
;
export default Content;
//# sourceMappingURL=Content.js.map