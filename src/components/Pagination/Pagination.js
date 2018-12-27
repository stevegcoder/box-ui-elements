/**
 * @was-flow
 * @file Pagination component
 * @author Box
 */
import { FormattedMessage } from 'react-intl';
import noop from 'lodash/noop';
import Button from 'box-react-ui/lib/components/button';
import ButtonGroup from 'box-react-ui/lib/components/button-group';
import Tooltip from '../Tooltip';
import messages from '../messages';
import { DEFAULT_PAGE_SIZE } from '../../constants';
import './Pagination.scss';
const PAGE_ICON_STYLE = {
    height: 9,
    width: 6,
};
const Pagination = ({ offset = 0, onChange = noop, pageSize = DEFAULT_PAGE_SIZE, totalCount = 0 }) => {
    const pageCount = Math.ceil(totalCount / pageSize);
    if (pageCount <= 1)
        return null;
    const pageByOffset = Math.floor(offset / pageSize) + 1;
    const pageNumber = pageByOffset > 0 ? Math.min(pageCount, pageByOffset) : 1;
    const hasNextPage = pageNumber < pageCount;
    const hasPreviousPage = pageNumber > 1;
    const updateOffset = (newPageNumber) => {
        let newOffset = (newPageNumber - 1) * pageSize;
        if (newOffset <= 0) {
            newOffset = 0;
        }
        if (newOffset >= totalCount) {
            newOffset = totalCount - pageSize;
        }
        onChange(newOffset);
    };
    const handleNextClick = () => {
        updateOffset(pageNumber + 1);
    };
    const handlePreviousClick = () => {
        updateOffset(pageNumber - 1);
    };
    return className = "be-pagination" >
        className;
    "be-pagination-count" >
        onPageClick;
    {
        updateOffset;
    }
    pageCount = { pageCount };
    pageNumber = { pageNumber } /  >
        /div>
        < ButtonGroup >
        isDisabled;
    {
        !hasPreviousPage;
    }
    text = {} < FormattedMessage;
    {
        messages.previousPage;
    }
    />}>
        < Button;
    onClick = { handlePreviousClick };
    isDisabled = {};
    hasPreviousPage;
};
 >
    Object.assign({}, PAGE_ICON_STYLE) /  >
    /Button>
    < /Tooltip>
    < Tooltip;
isDisabled = {};
hasNextPage;
text = {} < FormattedMessage;
{
    messages.nextPage;
}
/>}>
    < Button;
onClick = { handleNextClick };
isDisabled = {};
hasNextPage;
 >
    Object.assign({}, PAGE_ICON_STYLE) /  >
    /Button>
    < /Tooltip>
    < /ButtonGroup>
    < /div>;
;
;
export default Pagination;
//# sourceMappingURL=Pagination.js.map