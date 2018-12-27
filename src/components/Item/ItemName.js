/**
 * @was-flow
 * @file Component for the details for the item name
 * @author Box
 */
import { TYPE_FOLDER, TYPE_WEBLINK } from '../../constants';
import './ItemName.scss';
const ItemName = ({ item, onClick, onFocus, canPreview, isTouch }) => {
    const { name, type } = item;
    const onItemFocus = onFocus ? () => onFocus(item) : null;
    const onItemClick = () => onClick(item);
    return type === TYPE_FOLDER || (!isTouch && (type === TYPE_WEBLINK || canPreview)) ? type = "button" : ;
    className = "be-item-label";
    onFocus = { onItemFocus };
    onClick = { onItemClick } >
        { name }
        < /PlainButton>;
};
className = "be-item-label" > { name } < /span>;
;
;
export default ItemName;
//# sourceMappingURL=ItemName.js.map