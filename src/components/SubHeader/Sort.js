/**
 * @was-flow
 * @file Content sub header component
 * @author Box
 */
import { FormattedMessage } from 'react-intl';
import Menu from 'box-react-ui/lib/components/menu/Menu';
import messages from '../messages';
import { FIELD_NAME, FIELD_DATE, SORT_ASC, SORT_DESC } from '../../constants';
import './Sort.scss';
const SORT_ITEMS = [
    [FIELD_NAME, SORT_ASC],
    [FIELD_NAME, SORT_DESC],
    [FIELD_DATE, SORT_ASC],
    [FIELD_DATE, SORT_DESC],
];
const Sort = ({ isLoaded, sortBy, sortDirection, onSortChange }) => isRightAligned, constrainToScrollParent;
 >
    type;
"button";
isDisabled = {};
isLoaded;
className = "be-btn-sort" >
    />
    < /Button>
    < Menu;
className = "be-menu-sort" >
    { SORT_ITEMS, : .map(([sortByValue, sortDirectionValue]) => {
            const isSelected = sortByValue === sortBy && sortDirectionValue === sortDirection;
            const sortItemKey = `${sortByValue}${sortDirectionValue}`;
            return key = { sortItemKey };
            onClick = {}();
            onSortChange(sortByValue, sortDirectionValue);
        },  >
            className, "be-sort-selected" > { isSelected } && width, { 16:  }, height = { 16:  } /  > ) } < /div>
    < FormattedMessage;
{
    messages[sortItemKey];
}
/>
    < /MenuItem>;
;
/Menu>
    < /DropdownMenu>;
;
export default Sort;
//# sourceMappingURL=Sort.js.map