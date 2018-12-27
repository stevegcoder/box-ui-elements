/**

 * @file Item action component
 */
import { injectIntl } from 'react-intl';
import messages from '../messages';
import { STATUS_PENDING, STATUS_IN_PROGRESS, STATUS_COMPLETE, STATUS_ERROR } from '../../constants';
import './ItemAction.scss';
const ICON_CHECK_COLOR = '#26C281';
const ItemAction = ({ status, onClick, intl, isFolder = false }) => {
    let icon = />;;
    let tooltip = intl.formatMessage(messages.uploadsCancelButtonTooltip);
    if (isFolder && status !== STATUS_PENDING) {
        return null;
    }
    switch (status) {
        case STATUS_COMPLETE:
            icon = color;
            {
                ICON_CHECK_COLOR;
            }
            />;;
            tooltip = intl.formatMessage(messages.remove);
            break;
        case STATUS_ERROR:
            icon = />;;
            tooltip = intl.formatMessage(messages.retry);
            break;
        case STATUS_IN_PROGRESS:
            icon = />;;
            break;
        case STATUS_PENDING:
        default:
        // empty
    }
    return className = "bcu-item-action" >
        text;
    {
        tooltip;
    }
    position = "top-left" >
        type;
    "button";
    onClick = { onClick } >
        { icon }
        < /PlainButton>
        < /Tooltip>
        < /div>;
};
;
;
export { ItemAction as ItemActionForTesting };
export default injectIntl(ItemAction);
//# sourceMappingURL=ItemAction.js.map