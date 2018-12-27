/**

 * @file Input element for folder/file upload
 * @author Box
 */
const UploadInput = ({ isMultiple = true, isFolderUpload = false, inputLabelClass = '', inputLabel, handleChange, }) => inputLabel ? (
// eslint-disable-next-line jsx-a11y/label-has-for
className) = { inputLabelClass } >
    { inputLabel }
    < input
    :
;
multiple = { isMultiple };
type = "file";
onChange = { handleChange };
directory = { isFolderUpload, '': undefined };
webkitdirectory = { isFolderUpload, '': undefined }
    /  >
    /label>;
null;
export default UploadInput;
//# sourceMappingURL=UploadInput.js.map