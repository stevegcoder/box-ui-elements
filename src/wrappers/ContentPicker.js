/**
 * @was-flow
 * @file Base class for the Content Picker ES6 wrapper
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
import ContentPickerPopup from '../components/ContentPicker/ContentPickerPopup';
import ContentPickerReactComponent from '../components/ContentPicker/ContentPicker';
import { TYPE_FOLDER, TYPE_FILE, TYPE_WEBLINK, CLIENT_NAME_CONTENT_PICKER } from '../constants';
class ContentPicker extends ES6Wrapper {
    constructor() {
        super(...arguments);
        /**
         * Callback for pressing choose
         *
         * @param {Array} data - chosen box items
         * @return {void}
         */
        this.onChoose = (data) => {
            this.emit('choose', data);
        };
        /**
         * Callback for pressing cancel
         *
         * @return {void}
         */
        this.onCancel = () => {
            this.emit('cancel');
        };
    }
    /**
     * Returns the type of content picker
     *
     * @return {void}
     */
    getType() {
        const { type } = this.options || {};
        return type || `${TYPE_FOLDER},${TYPE_FILE},${TYPE_WEBLINK}`;
    }
    /**
     * Returns the name for content picker
     *
     * @return {void}
     */
    getClientName() {
        return CLIENT_NAME_CONTENT_PICKER;
    }
    /** @inheritdoc */
    render() {
        const _a = this.options, { modal } = _a, rest = __rest(_a, ["modal"]);
        const PickerComponent = modal ? ContentPickerPopup : ContentPickerReactComponent;
        render(language, { this: .language }, messages = { this: .messages }, clientName = { this: .getClientName() }, componentRef = { this: .setComponent }, rootFolderId = { this: .id }, token = { this: .token }, type = { this: .getType() }, onCancel = { this: .onCancel }, onChoose = { this: .onChoose }, modal = {}((modal) => ));
    }
}
{
    rest;
}
/>,;
this.container,
;
;
export default ContentPicker;
//# sourceMappingURL=ContentPicker.js.map