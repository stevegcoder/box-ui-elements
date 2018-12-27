/**
 * @was-flow
 * @file Open With button
 * @author Box
 */
import IconOpenWith from 'box-react-ui/lib/icons/general/IconOpenWith';
import ICON_FILE_MAP from './IconFileMap';
import { CLASS_INTEGRATION_ICON } from '../../constants';
import messages from '../messages';
/**
 * Gets the tooltip text for the ContentOpenWith button
 *
 * @private
 * @return {?(string | Element)} the tooltip message
 */
export const getTooltip = (displayDescription, error, isLoading) => {
    if (isLoading) {
        return null;
    }
    if (error) {
        return Object.assign({}, messages.errorOpenWithDescription) /  > ;
    }
    if (displayDescription) {
        return displayDescription;
    }
    return Object.assign({}, messages.emptyOpenWithDescription) /  > ;
};
const OpenWithButton = ({ error, onClick, displayIntegration, isLoading }) => {
    const { displayDescription, displayName, isDisabled: isDisplayIntegrationDisabled } = displayIntegration || {};
    const isDisabled = !!isDisplayIntegrationDisabled || !displayName;
    const IntegrationIcon = displayName && ICON_FILE_MAP[displayName];
    const Icon = IntegrationIcon || IconOpenWith;
    return text = {};
    position = "bottom-center" >
        isDisabled;
    {
        isDisabled;
    }
    onClick = {}();
};
onClick(displayIntegration);
 >
    className;
{
    CLASS_INTEGRATION_ICON;
}
height = { 26:  };
width = { 26:  } /  >
    /OpenWithButtonContents>
    < /Button>
    < /Tooltip>;
;
;
export default OpenWithButton;
//# sourceMappingURL=OpenWithButton.js.map