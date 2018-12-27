/**

 * @file Footer component
 */
import PrimaryButton from 'box-react-ui/lib/components/primary-button/PrimaryButton';
import messages from '../messages';
import { ERROR_CODE_UPLOAD_FILE_LIMIT } from '../../constants';
import './Footer.scss';
const Footer = ({ isLoading, hasFiles, errorCode, onCancel, onClose, onUpload, fileLimit }) => {
    let message;
    switch (errorCode) {
        case ERROR_CODE_UPLOAD_FILE_LIMIT:
            message = Object.assign({}, messages.uploadErrorTooManyFiles);
            values = {};
            {
                fileLimit;
            }
    }
    />;;
    break;
};
return className = "bcu-footer" >
    className;
"bcu-footer-left" >
    {}
    < /div>;
{
    message && className;
    "bcu-footer-message" > { message } < /div>}
        < div;
    className = "bcu-footer-right" >
        type;
    "button";
    isDisabled = {};
    hasFiles;
}
onClick = { onCancel } >
    Object.assign({}, messages.cancelUploads) /  >
    /Button>
    < PrimaryButton;
type = "button";
isDisabled = {};
hasFiles;
isLoading = { isLoading };
onClick = { onUpload } >
    Object.assign({}, messages.upload) /  >
    /PrimaryButton>
    < /div>
    < /div>;
;
;
export default Footer;
//# sourceMappingURL=Footer.js.map