/**
 * @was-flow
 * @file avatar component
 * @author Box
 */
import * as React from 'react';
class Avatar extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            avatarUrl: null,
        };
        /**
         * Success handler for getting avatar url
         *
         * @param {string} avatarUrl the user avatar url
         */
        this.getAvatarUrlHandler = (avatarUrl) => {
            this.setState({
                avatarUrl,
            });
        };
    }
    /**
     * Gets the avatar URL for the user from the getAvatarUrl prop
     *
     * @return {Promise} a promise which resolves with the avatarUrl string
     */
    getAvatarUrl() {
        const { user, getAvatarUrl } = this.props;
        return getAvatarUrl(user.id).then(this.getAvatarUrlHandler);
    }
    componentDidMount() {
        this.getAvatarUrl();
    }
    render() {
        const { user, className } = this.props;
        const { avatarUrl } = this.state;
        if (!avatarUrl) {
            return null;
        }
        const { id, name } = user;
        return className;
        {
            className;
        }
        id = { id };
        name = { name };
        avatarUrl = { avatarUrl } /  > ;
    }
}
export default Avatar;
//# sourceMappingURL=Avatar.js.map