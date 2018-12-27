/**
 * @was-flow
 * @file PaginationMenu component
 * @author Box
 */
import { Menu } from 'box-react-ui/lib/components/menu';
import messages from '../messages';
import './PaginationMenu.scss';
const PaginationMenu = ({ onPageClick, pageCount = 0, pageNumber = 0 }) => className = "be-pagination-dropdown", constrainToWindow, isRightAligned;
 >
    className;
"be-pagination-toggle" >
    Object.assign({}, messages.pageStatus);
values = {};
{
    pageNumber, pageCount;
}
/>
    < /Button>
    < Menu;
className = "be-pagination-dropdown-menu" >
    { range(, pageCount) { } } + 1;
map(page => key = { page }, isDisabled = { page } === pageNumber, onClick = {}(), onPageClick(page),  >
    { page }
    < /MenuItem>);
/Menu>
    < /DropdownMenu>;
;
export default PaginationMenu;
//# sourceMappingURL=PaginationMenu.js.map