/**
 * @was-flow
 * @file Wraps a component in an IntlProvider
 * @author Box
 */
const Internationalize = ({ language, messages, children }) => {
    const shouldInternationalize = !!language && !!messages;
    if (shouldInternationalize) {
        const locale = language && language.substr(0, language.indexOf('-'));
        return locale = { locale };
        messages = { messages } >
            { children }
            < /IntlProvider>;
    }
};
;
return Children.only(children);
;
export default Internationalize;
//# sourceMappingURL=Internationalize.js.map