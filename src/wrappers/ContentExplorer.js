/**
 * @was-flow
 * @file Base class for the Content Explorer ES6 wrapper
 * @author Box
 */
import { render } from 'react-dom';
import ES6Wrapper from './ES6Wrapper';
class ContentExplorer extends ES6Wrapper {
    constructor() {
        super(...arguments);
        /**
         * Callback for selecting files
         *
         * @param {Array} data - chosen box items
         * @return {void}
         */
        this.onSelect = (data) => {
            this.emit('select', data);
        };
        /**
         * Callback for navigating into a folder
         *
         * @param {Object} data - chosen box items
         * @return {void}
         */
        this.onNavigate = (data) => {
            this.emit('navigate', data);
        };
        /**
         * Callback for renaming file
         *
         * @return {void}
         */
        this.onRename = (data) => {
            this.emit('rename', data);
        };
        /**
         * Callback for previewing a file
         *
         * @return {void}
         */
        this.onPreview = (data) => {
            this.emit('preview', data);
        };
        /**
         * Callback for downloading a file
         *
         * @return {void}
         */
        this.onDownload = (data) => {
            this.emit('download', data);
        };
        /**
         * Callback for deleting a file
         *
         * @return {void}
         */
        this.onDelete = (data) => {
            this.emit('delete', data);
        };
        /**
         * Callback for uploading a file
         *
         * @return {void}
         */
        this.onUpload = (data) => {
            this.emit('upload', data);
        };
        /**
         * Callback for creating a folder
         *
         * @return {void}
         */
        this.onCreate = (data) => {
            this.emit('create', data);
        };
    }
    /**
     * Helper to programatically navigate
     *
     * @param {string} id - string folder id
     * @return {void}
     */
    navigateTo(id) {
        const component = this.getComponent();
        if (component && typeof component.clearCache === 'function') {
            component.fetchFolder(id);
        }
    }
    /** @inheritdoc */
    render() {
        render(language, { this: .language }, messages = { this: .messages }, rootFolderId = { this: .id }, token = { this: .token }, componentRef = { this: .setComponent }, onDelete = { this: .onDelete }, onDownload = { this: .onDownload }, onPreview = { this: .onPreview }, onRename = { this: .onRename }, onSelect = { this: .onSelect }, onUpload = { this: .onUpload }, onCreate = { this: .onCreate }, onNavigate = { this: .onNavigate }, onInteraction = { this: .onInteraction }, Object.assign({}, this.options) /  > , this.container);
    }
}
global.Box = global.Box || {};
global.Box.ContentExplorer = ContentExplorer;
export default ContentExplorer;
//# sourceMappingURL=ContentExplorer.js.map