/**
 * @was-flow
 * @file Comment Text component used by Comment component
 */
import * as React from 'react';
import noop from 'lodash/noop';
class CommentText extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isLoading: false,
            isTranslation: false,
        };
        this.handleTranslate = (event) => {
            const { id, tagged_message, onTranslate = noop, translatedTaggedMessage } = this.props;
            if (!translatedTaggedMessage) {
                this.setState({ isLoading: true });
                onTranslate({ id, tagged_message });
            }
            this.setState({ isTranslation: true });
            event.preventDefault();
        };
        this.handleShowOriginal = (event) => {
            this.setState({ isTranslation: false });
            event.preventDefault();
        };
    }
    componentWillReceiveProps(nextProps) {
        const { translatedTaggedMessage, translationFailed } = nextProps;
        if (translatedTaggedMessage || translationFailed) {
            this.setState({ isLoading: false });
        }
    }
    getButton(isTranslation) {
        let button = null;
        if (isTranslation) {
            button = handleShowOriginal;
            {
                this.handleShowOriginal;
            }
            />;;
        }
        else {
            button = handleTranslate;
            {
                this.handleTranslate;
            }
            />;;
        }
        return button;
    }
    render() {
        const { id, tagged_message, translatedTaggedMessage, translationEnabled, getUserProfileUrl } = this.props;
        const { isLoading, isTranslation } = this.state;
        const commentToDisplay = translationEnabled && isTranslation && translatedTaggedMessage ? translatedTaggedMessage : tagged_message;
        return isLoading ? className = "bcs-comment-text-loading" >
            size : ;
        "small" /  >
            /div>;
        className = "bcs-comment-text" >
            {};
        {
            translationEnabled ? this.getButton(isTranslation) : null;
        }
        /div>;
        ;
    }
}
CommentText.defaultProps = {
    translationEnabled: false,
};
export default CommentText;
//# sourceMappingURL=CommentText.js.map