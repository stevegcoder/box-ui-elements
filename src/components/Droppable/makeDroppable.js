/**
 * @was-flow
 * @file HOC for drag drop
 * @author Box
 */
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
/* eslint-disable no-plusplus */
const makeDroppable = ({ dropValidator, onDrop }) => (Wrapped) => { var _a; return _a = class DroppableComponent extends PureComponent {
        /**
         * [constructor]
         *
         * @param {*} props
         * @return {DroppableComponent}
         */
        constructor(props) {
            super(props);
            /**
             * Bind drag and drop event handlers to the droppableEl
             */
            this.bindDragDropHandlers = () => {
                const droppableEl = findDOMNode(this); // eslint-disable-line react/no-find-dom-node
                if (!droppableEl || !(droppableEl instanceof Element)) {
                    return;
                }
                // add event listeners directly on the element
                droppableEl.addEventListener('dragenter', this.handleDragEnter);
                droppableEl.addEventListener('dragover', this.handleDragOver);
                droppableEl.addEventListener('dragleave', this.handleDragLeave);
                droppableEl.addEventListener('drop', this.handleDrop);
                this.droppableEl = droppableEl;
            };
            /**
             * Function that gets called when an item is dragged into the drop zone
             *
             * @param {SyntheticEvent} event - The dragenter event
             * @return {void}
             */
            this.handleDragEnter = (event) => {
                // This allows onDrop to be fired
                event.preventDefault();
                // Use this to track the number of drag enters and leaves.
                // This is used to normalize enters/leaves between parent/child elements
                // we only want to do things in dragenter when the counter === 1
                if (++this.enterLeaveCounter === 1) {
                    const { dataTransfer } = event;
                    // if we don't have a dropValidator, we just default canDrop to true
                    const canDrop = dropValidator ? dropValidator(this.props, dataTransfer) : true;
                    this.setState({
                        isOver: true,
                        canDrop,
                    });
                }
            };
            /**
             * Function that gets called when an item is dragged over the drop zone
             *
             * @param {DragEvent} event - The dragover event
             * @return {void}
             */
            this.handleDragOver = (event) => {
                // This allows onDrop to be fired
                event.preventDefault();
                const { canDrop } = this.state;
                const { dataTransfer } = event;
                if (!dataTransfer) {
                    return;
                }
                if (!canDrop) {
                    dataTransfer.dropEffect = 'none';
                }
                else if (dataTransfer.effectAllowed) {
                    // Set the drop effect if it was defined
                    dataTransfer.dropEffect = dataTransfer.effectAllowed;
                }
            };
            /**
             * Function that gets called when an item is drop onto the drop zone
             *
             * @param {DragEvent} event - The drop event
             * @return {void}
             */
            this.handleDrop = (event) => {
                event.preventDefault();
                // reset enterLeaveCounter
                this.enterLeaveCounter = 0;
                const { canDrop } = this.state;
                this.setState({
                    canDrop: false,
                    isDragging: false,
                    isOver: false,
                });
                if (canDrop && onDrop) {
                    onDrop(event, this.props);
                }
            };
            /**
             * Function that gets called when an item is dragged out of the drop zone
             *
             * @param {DragEvent} event - The dragleave event
             * @return {void}
             */
            this.handleDragLeave = (event) => {
                event.preventDefault();
                // if enterLeaveCounter is zero, it means that we're actually leaving the item
                if (--this.enterLeaveCounter > 0) {
                    return;
                }
                this.setState({
                    canDrop: false,
                    isDragging: false,
                    isOver: false,
                });
            };
            this.enterLeaveCounter = 0;
            this.state = {
                canDrop: false,
                isDragging: false,
                isOver: false,
            };
        }
        /**
         * Adds event listeners once the component mounts
         * @inheritdoc
         */
        componentDidMount() {
            this.bindDragDropHandlers();
        }
        componentDidUpdate() {
            if (this.droppableEl) {
                return;
            }
            this.bindDragDropHandlers();
        }
        /**
         * Removes event listeners when the component is going to unmount
         * @inheritdoc
         */
        componentWillUnmount() {
            if (!this.droppableEl || !(this.droppableEl instanceof Element)) {
                return;
            }
            this.droppableEl.removeEventListener('dragenter', this.handleDragEnter);
            this.droppableEl.removeEventListener('dragover', this.handleDragOver);
            this.droppableEl.removeEventListener('dragleave', this.handleDragLeave);
            this.droppableEl.removeEventListener('drop', this.handleDrop);
        }
        /**
         * Renders the HOC
         *
         * @private
         * @inheritdoc
         * @return {Element}
         */
        render() {
            const _a = this.props, { className } = _a, rest = __rest(_a, ["className"]);
            const { canDrop, isOver } = this.state;
            const classes = classNames(className, {
                'is-droppable': canDrop,
                'is-over': isOver,
            });
            const mergedProps = Object.assign({}, rest, this.state, { className: classes });
            return Object.assign({}, mergedProps) /  > ;
        }
    },
    _a.defaultProps = {
        className: '',
    },
    _a; };
export default makeDroppable;
//# sourceMappingURL=makeDroppable.js.map