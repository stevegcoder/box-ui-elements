/**

 * @file Upload state component
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
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';
import { VIEW_ERROR, VIEW_UPLOAD_EMPTY } from '../../constants';
import './UploadState.scss';
const UploadState = ({ canDrop, hasItems, isOver, isTouch, view, onSelect, isFolderUploadEnabled }) => {
    let icon;
    let content;
    switch (view) {
        case VIEW_ERROR:
            icon = />;;
            content = message;
            {
                (Object.assign({}, messages.uploadError) /  > );
            }
            />;;
            break;
        case VIEW_UPLOAD_EMPTY:
            icon = />;;
            /* eslint-disable no-nested-ternary */
            content =
                canDrop && hasItems ? message = {} < FormattedMessage : ;
            {
                messages.uploadInProgress;
            }
            />} / >
            ;
    }
};
isTouch ? fileInputLabel = {} < FormattedMessage : ;
{
    messages.uploadNoDragDrop;
}
/>};
useButton;
onChange = { onSelect }
    /  >
;
fileInputLabel = {} < FormattedMessage;
{
    messages.uploadEmptyFileInput;
}
/>};
folderInputLabel = {
    isFolderUploadEnabled
} && Object.assign({}, messages.uploadEmptyFolderInput) /  >
;
message = {
    isFolderUploadEnabled(, FormattedMessage, _a) { var messages = __rest(_a, []); }, : .uploadEmptyWithFolderUploadEnabled
} /  >
;
(Object.assign({}, messages.uploadEmptyWithFolderUploadDisabled) /  >
);
onChange = { onSelect }
    /  >
;
;
/* eslint-enable no-nested-ternary */
break;
VIEW_UPLOAD_IN_PROGRESS: icon = />;;
content = message;
{
    (Object.assign({}, messages.uploadInProgress) /  > );
}
/>;;
break;
VIEW_UPLOAD_SUCCESS: icon = />;;
content = fileInputLabel = {} < FormattedMessage;
{
    messages.uploadSuccessFileInput;
}
/>};
folderInputLabel = {
    isFolderUploadEnabled
} && Object.assign({}, messages.uploadSuccessFolderInput) /  >
;
message = {} < FormattedMessage;
{
    messages.uploadSuccess;
}
/>};
useButton = { isTouch };
onChange = { onSelect }
    /  >
;
;
break;
break;
const className = classNames('bcu-upload-state', {
    'bcu-is-droppable': isOver && canDrop,
    'bcu-is-not-droppable': isOver && !canDrop,
    'bcu-has-items': hasItems,
});
return className = { className } >
    { icon };
{
    content;
}
/div>
    < div;
className = "bcu-drag-drop-overlay" /  >
    /div>;
;
;
export default UploadState;
//# sourceMappingURL=UploadState.js.map