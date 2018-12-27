/**
 * @was-flow
 * @file Base class for the Open With ES6 wrapper
 * @author Box
 */
import 'regenerator-runtime/runtime';
import { render } from 'react-dom';
import ES6Wrapper from './ES6Wrapper';
class ContentOpenWith extends ES6Wrapper {
    constructor() {
        super(...arguments);
        /**
         * Callback for executing an integration
         *
         * @return {void}
         */
        this.onExecute = (appIntegrationId) => {
            this.emit('execute', appIntegrationId);
        };
        /**
         * Callback when an error occurs while loading or executing integrations
         *
         * @return {void}
         */
        this.onError = (error) => {
            this.emit('error', error);
        };
    }
    /** @inheritdoc */
    render() {
        render(language, { this: .language }, messages = { this: .messages }, fileId = { this: .id }, token = { this: .token }, componentRef = { this: .setComponent }, onInteraction = { this: .onInteraction }, Object.assign({}, this.options), onExecute = { this: .onExecute }, onError = { this: .onError }
            /  > , this.container);
    }
}
global.Box = global.Box || {};
global.Box.ContentOpenWith = ContentOpenWith;
export default ContentOpenWith;
//# sourceMappingURL=ContentOpenWith.js.map