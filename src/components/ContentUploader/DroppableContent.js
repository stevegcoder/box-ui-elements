/**
 * @file Droppable area containing upload item list
 */
import makeDroppable from '../Droppable';
import './DroppableContent.scss';
/**
 * Definition for drag and drop behavior.
 */
const dropDefinition = {
    /**
     * Validates whether a file can be dropped or not.
     */
    dropValidator: ({ allowedTypes }, { types }) => Array.from(types).some(type => allowedTypes.indexOf(type) > -1),
    /**
     * Determines what happens after a file is dropped
     */
    onDrop: (event, { addDataTransferItemsToUploadQueue }) => {
        const { dataTransfer: { items }, } = event;
        addDataTransferItemsToUploadQueue(items);
    },
};
const DroppableContent = makeDroppable(dropDefinition)(({ canDrop, isOver, isTouch, view, items, addFiles, onClick, isFolderUploadEnabled }) => {
    const handleSelectFiles = ({ target: { files } }) => addFiles(files);
    const hasItems = items.length > 0;
    return className = "bcu-droppable-content" >
        items;
    {
        items;
    }
    view = { view };
    onClick = { onClick } /  >
        canDrop;
    {
        canDrop;
    }
    hasItems = { hasItems };
    isOver = { isOver };
    isTouch = { isTouch };
    view = { view };
    onSelect = { handleSelectFiles };
    isFolderUploadEnabled = { isFolderUploadEnabled }
        /  >
        /div>;
});
;
export default DroppableContent;
//# sourceMappingURL=DroppableContent.js.map