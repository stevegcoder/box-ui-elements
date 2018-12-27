/**
 * @was-flow
 * @file Inline Delete component
 */
import * as React from 'react';
import { injectIntl } from 'react-intl';
import { Overlay } from 'box-react-ui/lib/components/flyout';
import messages from '../../../messages';
import { ACTIVITY_TARGETS } from '../../../../interactionTargets';
class InlineDelete extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isConfirming: false,
        };
        this.onDeleteConfirmedHandler = () => {
            const { id, onDelete, permissions } = this.props;
            onDelete({ id, permissions });
        };
        this.handleFlyoutOpen = () => {
            this.setState({ isConfirming: true });
        };
        this.handleFlyoutClose = () => {
            this.setState({ isConfirming: false });
        };
    }
    render() {
        const { intl, message } = this.props;
        return className = { classNames(, { 'bcs-is-confirming': , this:  }) { }, : .state.isConfirming,
        };
    }
}
    >
        onClose;
{
    this.handleFlyoutClose;
}
onOpen = { this: .handleFlyoutOpen };
position = "middle-left" >
    aria - label;
{
    intl.formatMessage(messages.deleteLabel);
}
className = "bcs-comment-delete";
data - resin - target;
{
    ACTIVITY_TARGETS.INLINE_DELETE;
}
    >
        />
    < /PlainButton>
    < Overlay >
    { message } < /b>
    < div >
    className;
"lnk bcs-comment-delete-yes";
onClick = { this: .onDeleteConfirmedHandler };
type = "button"
    >
        Object.assign({}, messages.commentDeleteConfirm) /  >
    /PlainButton>;
{
    ' / ';
}
className;
"lnk bcs-comment-delete-no";
type = "button" >
    Object.assign({}, messages.commentDeleteCancel) /  >
    /PlainButton>
    < /div>
    < /Overlay>
    < /Flyout>
    < /div>;
;
export { InlineDelete as InlineDeleteBase };
export default injectIntl(InlineDelete);
//# sourceMappingURL=InlineDelete.js.map