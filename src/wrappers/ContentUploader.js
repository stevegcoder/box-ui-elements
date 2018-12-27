/**
 * @was-flow
 * @file Base class for the Content Uploader ES6 wrapper
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
import { render } from 'react-dom';
import ES6Wrapper from './ES6Wrapper';
import ContentUploaderPopup from '../components/ContentUploader/ContentUploaderPopup';
import WrappedContentUploaderComponent from '../components/ContentUploader/ContentUploader';
class ContentUploader extends ES6Wrapper {
    constructor() {
        super(...arguments);
        /**
         * Callback on closing uploader. Emits 'close' event.
         *
         * @return {void}
         */
        this.onClose = () => {
            this.emit('close');
        };
        /**
         * Callback when all files finish uploading. Emits 'complete' event with Box File objects of uploaded items as data.
         *
         * @param {Array} data - Completed upload items
         * @return {void}
         */
        this.onComplete = (data) => {
            this.emit('complete', data);
        };
        /**
         * Callback on a single upload error. Emits 'uploaderror' event with information about the failed upload.
         *
         * @param {Object} data - File and error info about failed upload
         * @return {void}
         */
        this.onError = (data) => {
            this.emit('error', data);
        };
        /**
         * Callback on a single successful upload. Emits 'uploadsuccess' event with Box File object of uploaded item.
         *
         * @param {BoxItem} data - Successfully uploaded item
         * @return {void}
         */
        this.onUpload = (data) => {
            this.emit('upload', data);
        };
    }
    /** @inheritdoc */
    render() {
        const _a = this.options, { modal } = _a, rest = __rest(_a, ["modal"]);
        const UploaderComponent = modal ? ContentUploaderPopup : WrappedContentUploaderComponent;
        render(language, { this: .language }, messages = { this: .messages }, componentRef = { this: .setComponent }, rootFolderId = { this: .id }, token = { this: .token }, onClose = { this: .onClose }, onComplete = { this: .onComplete }, onError = { this: .onError }, onUpload = { this: .onUpload }, modal = {}((modal) => ));
    }
}
{
    rest;
}
/>,;
this.container,
;
;
global.Box = global.Box || {};
global.Box.ContentUploader = ContentUploader;
export default ContentUploader;
//# sourceMappingURL=ContentUploader.js.map