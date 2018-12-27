/**

 * @file Upload state content component
 */
import messages from '../messages';
const UploadStateContent = ({ fileInputLabel, folderInputLabel, message, onChange, useButton = false }) => {
    const messageContent = message ? className : ;
    "bcu-upload-state-message" > { message } < /div> : null;;
    const inputLabelClass = useButton ? 'btn btn-primary be-input-btn' : 'be-input-link';
    const shouldShowFolderUploadInput = !useButton && !!folderInputLabel;
    const handleChange = (event) => {
        if (!onChange) {
            return;
        }
        onChange(event);
        const currentTarget = event.currentTarget;
        // resets the file input selection
        currentTarget.value = '';
    };
    const fileInputContent = inputLabelClass = { inputLabelClass }, inputLabel = { fileInputLabel }, handleChange = { handleChange } /  >
    ;
};
;
const folderInputContent = shouldShowFolderUploadInput ? isFolderUpload
    :
;
inputLabelClass = { inputLabelClass };
inputLabel = { folderInputLabel };
handleChange = { handleChange }
    /  >
;
null;
let inputsContent;
if (fileInputContent && folderInputContent) {
    inputsContent = Object.assign({}, messages.uploadOptions);
    values = {};
    {
        option1: fileInputContent,
            option2;
        folderInputContent,
        ;
    }
}
/>;
;
if (fileInputContent) {
    inputsContent = fileInputContent;
}
return { messageContent };
{
    inputsContent && className;
    "bcu-upload-input-container" > { inputsContent } < /div>}
        < /div>;
    ;
}
;
export default UploadStateContent;
//# sourceMappingURL=UploadStateContent.js.map