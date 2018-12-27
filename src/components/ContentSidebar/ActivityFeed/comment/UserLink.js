/**
 * @was-flow
 * @file UserLink component
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
import * as React from 'react';
class UserLink extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {};
        /**
         * Success handler for getting profile url
         *
         * @param {string} profileUrl the user profile url
         */
        this.getProfileUrlHandler = (profileUrl) => {
            this.setState({
                profileUrl,
            });
        };
    }
    /**
     * Gets the profile URL for the user from the getUserProfileUrl prop
     *
     * @return {Promise} a promise which resolves with the profileUrl string
     */
    getUserProfileUrl() {
        const { id, getUserProfileUrl } = this.props;
        if (!getUserProfileUrl) {
            return Promise.resolve();
        }
        return getUserProfileUrl(id).then(this.getProfileUrlHandler);
    }
    componentDidMount() {
        this.getUserProfileUrl();
    }
    render() {
        const _a = this.props, { name, getUserProfileUrl } = _a, rest = __rest(_a, ["name", "getUserProfileUrl"]);
        const { profileUrl } = this.state;
        return profileUrl ? Object.assign({}, rest) : ;
        href = { profileUrl } >
            { name }
            < /Link>;
        (Object.assign({}, rest) > { name } < /div>);
    }
}
export default UserLink;
//# sourceMappingURL=UserLink.js.map