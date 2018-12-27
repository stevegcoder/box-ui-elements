/**
 * @was-flow
 * @file Preview sidebar nav component
 * @author Box
 */
import { FormattedMessage } from 'react-intl';
import { SIDEBAR_NAV_TARGETS } from '../../interactionTargets';
import { SIDEBAR_VIEW_SKILLS, SIDEBAR_VIEW_ACTIVITY, SIDEBAR_VIEW_DETAILS, SIDEBAR_VIEW_METADATA, } from '../../constants';
import './SidebarNav.scss';
const SidebarNav = ({ hasSkills, hasMetadata, hasActivityFeed, hasDetails, onToggle, selectedView }) => ({ hasActivityFeed } && tooltip) = {} < FormattedMessage, _a = void 0, { sidebarActivityTitle } = _a;
/>};
onClick = {}();
onToggle(SIDEBAR_VIEW_ACTIVITY);
interactionTarget = { SIDEBAR_NAV_TARGETS, : .ACTIVITY };
isSelected = { SIDEBAR_VIEW_ACTIVITY } === selectedView;
    >
        />
    < /SidebarNavButton>;
{
    hasDetails && tooltip;
    {
        (Object.assign({}, messages.sidebarDetailsTitle) /  > );
    }
    onClick = {}();
    onToggle(SIDEBAR_VIEW_DETAILS);
}
interactionTarget = { SIDEBAR_NAV_TARGETS, : .DETAILS };
isSelected = { SIDEBAR_VIEW_DETAILS } === selectedView;
    >
        />
    < /SidebarNavButton>;
{
    hasSkills && tooltip;
    {
        (Object.assign({}, messages.sidebarSkillsTitle) /  > );
    }
    onClick = {}();
    onToggle(SIDEBAR_VIEW_SKILLS);
}
interactionTarget = { SIDEBAR_NAV_TARGETS, : .SKILLS };
isSelected = { SIDEBAR_VIEW_SKILLS } === selectedView;
    >
        />
    < /SidebarNavButton>;
{
    hasMetadata && tooltip;
    {
        (Object.assign({}, messages.sidebarMetadataTitle) /  > );
    }
    onClick = {}();
    onToggle(SIDEBAR_VIEW_METADATA);
}
interactionTarget = { SIDEBAR_NAV_TARGETS, : .METADATA };
isSelected = { SIDEBAR_VIEW_METADATA } === selectedView;
    >
        />
    < /SidebarNavButton>;
/nav>;
;
export default SidebarNav;
//# sourceMappingURL=SidebarNav.js.map