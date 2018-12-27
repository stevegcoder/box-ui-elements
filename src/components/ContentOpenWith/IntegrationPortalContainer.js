/**
 * @was-flow
 * @file integration portal container
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
import { FormattedMessage } from 'react-intl';
import messages from '../messages';
const IntegrationPortalContainer = ({ hasError, integrationWindow }) => integrationWindow = { integrationWindow } >
    className;
"be bcow bcow-portal-container" >
    { hasError(, ErrorMask, errorHeader = {} < FormattedMessage, _a) { var messages = __rest(_a, []); }, : .executeIntegrationOpenWithErrorHeader } /  > ;
errorSubHeader = {} < FormattedMessage;
{
    messages.executeIntegrationOpenWithErrorSubHeader;
}
/>}
    /  >
;
className = "bcow-portal-loading-indicator";
size = "large" /  >
;
/div>
    < /IntegrationPortal>;
;
export default IntegrationPortalContainer;
//# sourceMappingURL=IntegrationPortalContainer.js.map