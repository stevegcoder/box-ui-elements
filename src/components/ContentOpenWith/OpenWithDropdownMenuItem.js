/**
 * @was-flow
 * @file Open With dropdown menu item
 * @author Box
 */
import IconFileDefault from 'box-react-ui/lib/icons/file/IconFileDefault';
import ICON_FILE_MAP from './IconFileMap';
const OpenWithDropdownMenuItem = ({ integration, onClick }) => {
    const { displayName, displayDescription } = integration;
    const Icon = ICON_FILE_MAP[displayName] || IconFileDefault;
    return onClick = {}();
};
onClick(integration);
 >
    />
    < span >
    className;
"bcow-menu-item-title" > { displayName } < /p>
    < p;
className = "bcow-menu-item-description" > { displayDescription } < /p>
    < /span>
    < /MenuItem>;
;
;
export default OpenWithDropdownMenuItem;
//# sourceMappingURL=OpenWithDropdownMenuItem.js.map