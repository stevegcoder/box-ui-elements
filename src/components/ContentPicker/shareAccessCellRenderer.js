/**
 * @was-flow
 * @file Function to render the share access table cell
 * @author Box
 */
import isRowSelectable from './cellRendererHelper';
export default (onChange, canSetShareAccess, selectableType, extensionsWhitelist, hasHitSelectionLimit) => ({ rowData }) => {
    if (!isRowSelectable(selectableType, extensionsWhitelist, hasHitSelectionLimit, rowData)) {
        return />;;
    }
    return className = "bcp-shared-access-select";
    canSetShareAccess = { canSetShareAccess };
    onChange = { onChange };
    item = { rowData }
        /  >
    ;
    ;
};
//# sourceMappingURL=shareAccessCellRenderer.js.map