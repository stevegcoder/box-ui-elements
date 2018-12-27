/**
 * @was-flow
 * @file Inline Edit component
 */
import * as React from 'react';
import { injectIntl } from 'react-intl';
import messages from '../../../messages';
import { ACTIVITY_TARGETS } from '../../../../interactionTargets';
class InlineEdit extends React.Component {
    constructor() {
        super(...arguments);
        this.onEdit = () => {
            const { id, toEdit } = this.props;
            toEdit({ id });
        };
    }
    render() {
        const { onEdit } = this;
        return className = "bcs-comment-edit-container" >
            aria - label;
        {
            this.props.intl.formatMessage(messages.editLabel);
        }
        className = "bcs-comment-edit";
        onClick = { onEdit };
        type = "button";
        data - resin - target;
        {
            ACTIVITY_TARGETS.INLINE_EDIT;
        }
            >
                />
            < /PlainButton>
            < /div>;
        ;
    }
}
export { InlineEdit as InlineEditBase };
export default injectIntl(InlineEdit);
//# sourceMappingURL=InlineEdit.js.map