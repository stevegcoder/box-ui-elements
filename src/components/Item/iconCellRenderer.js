/**
 * @was-flow
 * @file Function to render the icon table cell
 * @author Box
 */
import { TYPE_FOLDER, TYPE_FILE, TYPE_WEBLINK } from '../../constants';
import './IconCell.scss';
export function getIcon(dimension, rowData) {
    const { type, extension, has_collaborations, is_externally_owned } = rowData;
    switch (type) {
        case TYPE_FOLDER:
            return dimension;
            {
                dimension;
            }
            isCollab = { has_collaborations };
            isExternal = { is_externally_owned } /  > ;
        case TYPE_FILE:
            return dimension;
            {
                dimension;
            }
            extension = { extension } /  > ;
        case TYPE_WEBLINK:
            return width;
            {
                dimension;
            }
            />;;
        default:
            throw new Error('Unsupported item type!');
    }
}
export default (dimension = 32) => ({ rowData }) => className = "be-item-icon" > {} < /div>;
;
//# sourceMappingURL=iconCellRenderer.js.map