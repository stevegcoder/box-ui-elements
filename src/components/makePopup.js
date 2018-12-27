/**
 * @was-flow
 * @file HOC to make popup-able Box UI Elements
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
import Modal from 'react-modal';
import noop from 'lodash/noop';
import omit from 'lodash/omit';
import { CLIENT_NAME_CONTENT_PICKER, CLIENT_NAME_CONTENT_UPLOADER } from '../constants';
const makePopup = (kit) => (Wrapped) => class Wrapper extends PureComponent {
    /**
     * [constructor]
     *
     * @param {*} props
     * @return {Wrapper}
     */
    constructor(props) {
        super(props);
        /**
         * Callback for clicking
         *
         * @param {*} data - any callback data
         * @return {void}
         */
        this.onClick = (data) => {
            const { onClick = noop } = this.props;
            this.close(onClick, data);
        };
        /**
         * Callback for pressing close
         *
         * @param {*} data - any callback data
         * @return {void}
         */
        this.onClose = (data) => {
            const { onClose = noop } = this.props;
            this.close(onClose, data);
        };
        /**
         * Callback for pressing cancel
         *
         * @param {*} data - any callback data
         * @return {void}
         */
        this.onCancel = (data) => {
            const { onCancel = noop } = this.props;
            this.close(onCancel, data);
        };
        /**
         * Callback for pressing choose
         *
         * @param {*} data - any callback data
         * @return {void}
         */
        this.onChoose = (data) => {
            const { onChoose = noop } = this.props;
            this.close(onChoose, data);
        };
        /**
         * Button click handler
         *
         * @return {void}
         */
        this.onButtonClick = () => {
            this.setState({ isOpen: true });
        };
        this.state = {
            isOpen: false,
        };
    }
    /**
     * Hides the modal and call the callback
     *
     * @param {Function} callback - function to call
     * @return {void}
     */
    close(callback, data) {
        this.setState({ isOpen: false }, () => callback(data));
    }
    /**
     * Renders the component
     *
     * @return {void}
     */
    render() {
        const { isOpen } = this.state;
        const _a = this.props, { modal } = _a, rest = __rest(_a, ["modal"]);
        const wrappedProps = omit(rest, ['onCancel', 'onChoose', 'onClose', 'modal']);
        const { buttonLabel = 'Missing modal.buttonLabel in options', buttonClassName = 'btn btn-primary', modalClassName = 'be-modal-wrapper-content', overlayClassName = 'be-modal-wrapper-overlay', } = modal;
        switch (kit) {
            case CLIENT_NAME_CONTENT_PICKER:
                wrappedProps.onCancel = this.onCancel;
                wrappedProps.onChoose = this.onChoose;
                break;
            case CLIENT_NAME_CONTENT_UPLOADER:
                wrappedProps.onClose = this.onClose;
                break;
            default:
                throw new Error('Unknown kit type');
        }
        return type = "button";
        onClick = { this: .onButtonClick };
        className = { buttonClassName } >
            { buttonLabel }
            < /button>
            < Modal;
        isOpen = { isOpen };
        contentLabel = { kit };
        className = { modalClassName };
        overlayClassName = { overlayClassName }
            >
                Object.assign({}, wrappedProps) /  >
            /Modal>
            < /div>;
    }
};
;
;
export default makePopup;
//# sourceMappingURL=makePopup.js.map