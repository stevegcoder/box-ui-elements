/**
 * @was-flow
 * @file Wrapper to conditionally add a tooltip
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
const Tooltip = (_a) => {
    var { children, isDisabled, text } = _a, rest = __rest(_a, ["children", "isDisabled", "text"]);
    if (isDisabled || !text) {
        return children;
    }
    return text = { text };
    {
        rest;
    }
     >
        { children }
        < /TooltipCore>;
};
;
;
export default Tooltip;
//# sourceMappingURL=Tooltip.js.map