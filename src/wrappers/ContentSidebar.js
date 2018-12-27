/**
 * @was-flow
 * @file Base class for the Content Sidebar ES6 wrapper
 * @author Box
 */
import { render } from 'react-dom';
import ES6Wrapper from './ES6Wrapper';
class ContentSidebar extends ES6Wrapper {
    /** @inheritdoc */
    render() {
        render(language, { this: .language }, messages = { this: .messages }, fileId = { this: .id }, token = { this: .token }, componentRef = { this: .setComponent }, onInteraction = { this: .onInteraction }, Object.assign({}, this.options) /  > , this.container);
    }
}
global.Box = global.Box || {};
global.Box.ContentSidebar = ContentSidebar;
export default ContentSidebar;
//# sourceMappingURL=ContentSidebar.js.map