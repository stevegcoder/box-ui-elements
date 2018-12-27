/**
 * @was-flow
 * @file Function to render the checkbox table cell
 * @author Box
 */
import isRowSelectable from './cellRendererHelper';
export default (onItemSelect, selectableType, extensionsWhitelist, hasHitSelectionLimit) => ({ rowData }) => {
    const { name, selected = false } = rowData;
    if (!isRowSelectable(selectableType, extensionsWhitelist, hasHitSelectionLimit, rowData)) {
        return />;;
    }
    return hideLabel;
    label = { name };
    name = { name };
    isChecked = { selected };
    onChange = {}();
    onItemSelect(rowData);
};
/>;;
;
//# sourceMappingURL=checkboxCellRenderer.js.map