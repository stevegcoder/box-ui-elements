/**
 * @was-flow
 * @file Item List Key bindings
 * @author Box
 */
import { PureComponent } from 'react';
import noop from 'lodash/noop';
import { isInputElement } from '../util/dom';
class KeyBinder extends PureComponent {
    /**
     * [constructor]
     *
     * @private
     * @return {KeyBinder}
     */
    constructor(props) {
        super(props);
        /**
         * Keyboard events
         *
         * @private
         * @inheritdoc
         * @return {void}
         */
        this.onKeyDown = (event) => {
            if (isInputElement(event.target)) {
                return;
            }
            const { columnCount, rowCount, onSelect, onRename, onDownload, onShare, onDelete, onOpen, items, } = this.props;
            const { scrollToColumn: scrollToColumnPrevious, scrollToRow: scrollToRowPrevious } = this.state;
            let { scrollToColumn, scrollToRow } = this.state;
            const currentItem = items[scrollToRow];
            const ctrlMeta = event.metaKey || event.ctrlKey;
            // The above cases all prevent default event event behavior.
            // This is to keep the grid from scrolling after the snap-to update.
            switch (event.key) {
                case 'ArrowDown':
                    scrollToRow = ctrlMeta ? rowCount - 1 : Math.min(scrollToRow + 1, rowCount - 1);
                    event.stopPropagation(); // To prevent the arrow down capture of parent
                    break;
                case 'ArrowLeft':
                    scrollToColumn = ctrlMeta ? 0 : Math.max(scrollToColumn - 1, 0);
                    break;
                case 'ArrowRight':
                    scrollToColumn = ctrlMeta ? columnCount - 1 : Math.min(scrollToColumn + 1, columnCount - 1);
                    break;
                case 'ArrowUp':
                    scrollToRow = ctrlMeta ? 0 : Math.max(scrollToRow - 1, 0);
                    break;
                case 'Enter':
                    onOpen(currentItem);
                    event.preventDefault();
                    break;
                case 'Delete':
                    onDelete(currentItem);
                    event.preventDefault();
                    break;
                case 'X':
                    onSelect(currentItem);
                    event.preventDefault();
                    break;
                case 'D':
                    onDownload(currentItem);
                    event.preventDefault();
                    break;
                case 'S':
                    onShare(currentItem);
                    event.preventDefault();
                    break;
                case 'R':
                    onRename(currentItem);
                    event.preventDefault();
                    break;
                default:
                    return;
            }
            if (scrollToColumn !== scrollToColumnPrevious || scrollToRow !== scrollToRowPrevious) {
                event.preventDefault();
                this.updateScrollState({ scrollToColumn, scrollToRow });
            }
        };
        /**
         * Callback for set of rows rendered
         *
         * @private
         * @inheritdoc
         * @return {void}
         */
        this.onSectionRendered = ({ columnStartIndex, columnStopIndex, rowStartIndex, rowStopIndex, }) => {
            this.columnStartIndex = columnStartIndex;
            this.columnStopIndex = columnStopIndex;
            this.rowStartIndex = rowStartIndex;
            this.rowStopIndex = rowStopIndex;
        };
        this.state = {
            scrollToColumn: props.scrollToColumn,
            scrollToRow: props.scrollToRow,
            focusOnRender: false,
        };
        this.columnStartIndex = 0;
        this.columnStopIndex = 0;
        this.rowStartIndex = 0;
        this.rowStopIndex = 0;
    }
    /**
     * Resets scroll states and sets new states if
     * needed specially when collection changes
     *
     * @private
     * @inheritdoc
     * @return {void}
     */
    componentWillReceiveProps(nextProps) {
        const { id, scrollToColumn, scrollToRow } = nextProps;
        const { id: prevId } = this.props;
        const { scrollToColumn: prevScrollToColumn, scrollToRow: prevScrollToRow } = this.state;
        const newState = {};
        if (id !== prevId) {
            // Only when the entire collection changes
            // like folder navigate, reset the scroll states
            newState.scrollToColumn = 0;
            newState.scrollToRow = 0;
            newState.focusOnRender = false;
        }
        else if (prevScrollToColumn !== scrollToColumn && prevScrollToRow !== scrollToRow) {
            newState.scrollToColumn = scrollToColumn;
            newState.scrollToRow = scrollToRow;
        }
        else if (prevScrollToColumn !== scrollToColumn) {
            newState.scrollToColumn = scrollToColumn;
        }
        else if (prevScrollToRow !== scrollToRow) {
            newState.scrollToRow = scrollToRow;
        }
        // Only update the state if there is something to set
        if (Object.keys(newState).length) {
            this.setState(newState);
        }
    }
    /**
     * Updates the scroll states
     *
     * @private
     * @inheritdoc
     * @return {void}
     */
    updateScrollState({ scrollToColumn, scrollToRow }) {
        const { onScrollToChange } = this.props;
        onScrollToChange({ scrollToColumn, scrollToRow });
        this.setState({ scrollToColumn, scrollToRow, focusOnRender: true });
    }
    /**
     * Renders the HOC
     *
     * @private
     * @inheritdoc
     * @return {void}
     */
    render() {
        const { className, children } = this.props;
        const { scrollToColumn, scrollToRow, focusOnRender } = this.state;
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        return className = { className };
        onKeyDown = { this: .onKeyDown } >
            { children({ onSectionRendered: , this:  }) { }, : .onSectionRendered,
                scrollToColumn,
                scrollToRow,
                focusOnRender,
            };
    }
}
KeyBinder.defaultProps = {
    scrollToColumn: 0,
    scrollToRow: 0,
    onRename: noop,
    onShare: noop,
    onDownload: noop,
    onOpen: noop,
    onSelect: noop,
    onDelete: noop,
};
/div>;
;
export default KeyBinder;
//# sourceMappingURL=KeyBinder.js.map