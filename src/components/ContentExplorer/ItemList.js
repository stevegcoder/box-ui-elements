/**
 * @was-flow
 * @file Item list component
 * @author Box
 */
import classNames from 'classnames';
import { injectIntl } from 'react-intl';
import headerCellRenderer from './headerCellRenderer';
import sizeCellRenderer from './sizeCellRenderer';
import dateCellRenderer from './dateCellRenderer';
import nameCellRenderer from '../Item/nameCellRenderer';
import iconCellRenderer from '../Item/iconCellRenderer';
import moreOptionsCellRenderer from './moreOptionsCellRenderer';
import { focus } from '../../util/dom';
import messages from '../messages';
import { FIELD_DATE, FIELD_ID, FIELD_NAME, FIELD_SIZE, VIEW_FOLDER, VIEW_RECENTS } from '../../constants';
import './ItemList.scss';
const ItemList = ({ view, isSmall, isMedium, isTouch, rootId, rootElement, canShare, canDownload, canDelete, canPreview, canRename, onItemClick, onItemSelect, onItemDelete, onItemDownload, onItemRename, onItemShare, onItemPreview, onSortChange, currentCollection, tableRef, focusedRow, intl, }) => {
    const nameCell = nameCellRenderer(rootId, view, onItemClick, onItemSelect, canPreview, isSmall, // shows details if false
    isTouch);
    const iconCell = iconCellRenderer();
    const dateCell = dateCellRenderer();
    const sizeAccessCell = sizeCellRenderer();
    const moreOptionsCell = moreOptionsCellRenderer(canPreview, canShare, canDownload, canDelete, canRename, onItemSelect, onItemDelete, onItemDownload, onItemRename, onItemShare, onItemPreview, isSmall);
    const isRecents = view === VIEW_RECENTS;
    const hasSort = view === VIEW_FOLDER;
    const { id, items = [], sortBy, sortDirection } = currentCollection;
    const rowCount = items.length;
    const rowClassName = ({ index }) => {
        if (index === -1) {
            return 'bce-item-header-row';
        }
        const { selected } = items[index];
        return classNames(`bce-item-row bce-item-row-${index}`, {
            'bce-item-row-selected': selected,
        });
    };
    const sort = ({ sortBy: by, sortDirection: direction }) => {
        onSortChange(by, direction);
    };
    return id = { id };
    items = { items };
    columnCount = { 1:  };
    rowCount = { rowCount };
    className = "bce-item-grid";
    onRename = { onItemRename };
    onShare = { onItemShare };
    onDownload = { onItemDownload };
    onOpen = { onItemClick };
    onSelect = { onItemSelect };
    onDelete = { onItemDelete };
    scrollToRow = { focusedRow };
    onScrollToChange = {}({ scrollToRow });
};
focus(rootElement, `.bce-item-row-${scrollToRow}`);
    >
        {}({ onSectionRendered, scrollToRow, focusOnRender });
({}({ width, height }));
width = { width };
height = { height };
headerHeight = { isSmall, 0: 40 };
rowHeight = { 50:  };
rowCount = { rowCount };
rowGetter = {}({ index });
items[index];
ref = { tableRef };
rowClassName = { rowClassName };
scrollToIndex = { scrollToRow };
sort = { sort };
sortBy = { sortBy };
sortDirection = { sortDirection };
onRowClick = {}({ rowData });
onItemSelect(rowData);
onRowsRendered = {}({ startIndex, stopIndex });
{
    onSectionRendered({
        rowStartIndex: startIndex,
        rowStopIndex: stopIndex,
    });
    if (focusOnRender) {
        focus(rootElement, `.bce-item-row-${scrollToRow}`);
    }
}
    >
        disableSort;
dataKey = { FIELD_ID };
cellRenderer = { iconCell };
width = { isSmall, 30: 50 };
flexShrink = { 0:  }
    /  >
    disableSort;
{
    !hasSort;
}
label = { intl, : .formatMessage(messages.name) };
dataKey = { FIELD_NAME };
cellRenderer = { nameCell };
headerRenderer = { headerCellRenderer };
width = { 300:  };
flexGrow = { 1:  }
    /  >
    { isSmall, null: className = "bce-item-coloumn",
        disableSort = {}, hasSort };
label = {
    isRecents, intl, : .formatMessage(messages.interacted),
    intl, : .formatMessage(messages.modified)
};
dataKey = { FIELD_DATE };
cellRenderer = { dateCell };
headerRenderer = { headerCellRenderer };
width = { isRecents, 120: 300 };
flexGrow = { 1:  }
    /  >
;
{
    isSmall || isMedium ? null : className = "bce-item-coloumn";
    disableSort;
    label = { intl, : .formatMessage(messages.size) };
    dataKey = { FIELD_SIZE };
    cellRenderer = { sizeAccessCell };
    headerRenderer = { headerCellRenderer };
    width = { 80:  };
    flexShrink = { 0:  }
        /  >
    ;
}
disableSort;
dataKey = { FIELD_ID };
cellRenderer = { moreOptionsCell };
width = { isSmall } || !canShare ? 58 : 140;
flexShrink = { 0:  }
    /  >
    /Table>;
/AutoSizer>;
/KeyBinder>;
;
;
export default injectIntl(ItemList);
//# sourceMappingURL=ItemList.js.map