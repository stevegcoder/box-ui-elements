/**

 * @file Item list component
 */
import { Column } from 'react-virtualized/dist/es/Table';
import nameCellRenderer from './nameCellRenderer';
import progressCellRenderer from './progressCellRenderer';
import actionCellRenderer from './actionCellRenderer';
import './ItemList.scss';
const ItemList = ({ items, onClick }) => ({}({ width, height }));
{
    const nameCell = nameCellRenderer();
    const progressCell = progressCellRenderer();
    const actionCell = actionCellRenderer(onClick);
    return className = "bcu-item-list";
    disableHeader;
    headerHeight = { 0:  };
    height = { height };
    rowClassName = "bcu-item-row";
    rowCount = { items, : .length };
    rowGetter = {}({ index });
    items[index];
}
rowHeight = { 50:  };
width = { width }
    >
        cellRenderer;
{
    nameCell;
}
dataKey = "name";
flexGrow = { 1:  };
flexShrink = { 1:  };
width = { 300:  } /  >
    cellRenderer;
{
    progressCell;
}
dataKey = "progress";
flexGrow = { 1:  };
flexShrink = { 1:  };
width = { 300:  };
style = {};
{
    textAlign: 'right';
}
/>
    < Column;
cellRenderer = { actionCell };
dataKey = "status";
flexShrink = { 0:  };
width = { 25:  };
style = {};
{
    marginRight: 18;
}
/>
    < /Table>;
;
/AutoSizer>;
;
export default ItemList;
//# sourceMappingURL=ItemList.js.map