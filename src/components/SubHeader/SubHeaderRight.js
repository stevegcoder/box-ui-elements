/**
 * @was-flow
 * @file Content sub header component
 * @author Box
 */
import { VIEW_FOLDER } from '../../constants';
import './SubHeaderRight.scss';
const SubHeaderRight = ({ view, onUpload, onCreate, canUpload, canCreateNewFolder, currentCollection, onSortChange, }) => {
    const { sortBy, sortDirection, percentLoaded, items = [] } = currentCollection;
    const isFolder = view === VIEW_FOLDER;
    const isLoaded = percentLoaded === 100;
    const showSort = isFolder && items.length > 0;
    const showAdd = (!!canUpload || !!canCreateNewFolder) && isFolder;
    return className = "be-sub-header-right" >
        { showSort } && !!sortBy && !!sortDirection && isLoaded;
    {
        isLoaded;
    }
    onSortChange = { onSortChange };
    sortBy = { sortBy };
    sortDirection = { sortDirection } /  >
    ;
};
{
    showAdd && showUpload;
    {
        canUpload;
    }
    showCreate = { canCreateNewFolder };
    onUpload = { onUpload };
    onCreate = { onCreate };
    isDisabled = {};
    isFolder;
}
isLoaded = { isLoaded }
    /  >
;
/div>;
;
;
export default SubHeaderRight;
//# sourceMappingURL=SubHeaderRight.js.map