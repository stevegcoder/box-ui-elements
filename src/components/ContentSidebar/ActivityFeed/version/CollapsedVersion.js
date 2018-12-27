/**
 * @was-flow
 * @file Collapsed Version component
 */
import { injectIntl } from 'react-intl';
import messages from '../../../messages';
import { ACTIVITY_TARGETS } from '../../../../interactionTargets';
import './Version.scss';
function getMessageForAction(action, collaborators, version_start, version_end) {
    // We only support collapsing for multiple upload versions
    if (action !== 'upload') {
        return null;
    }
    const collaboratorIDs = Object.keys(collaborators);
    const numberOfCollaborators = collaboratorIDs.length;
    const versionRange = className = "bcs-version-range" >
        { version_start } - { version_end }
        < /span>;
    ;
    if (numberOfCollaborators === 1) {
        const collaborator = collaborators[collaboratorIDs[0]];
        return Object.assign({}, messages.versionUploadCollapsed);
        values = {};
        {
            name: ({ collaborator, : .name } < /strong>,);
            versions: versionRange,
            ;
        }
    }
    />;
    ;
}
return Object.assign({}, messages.versionMultipleUsersUploaded);
values = {};
{
    numberOfCollaborators,
        versions;
    versionRange,
    ;
}
/>;
;
const CollapsedVersion = ({ action, collaborators, intl, onInfo, versions, version_start, version_end, }) => className = "bcs-collapsed-version" >
    className;
"bcs-version-message" >
    {}
    < /span>;
{
    onInfo ? className = "bcs-version-actions" >
        aria - label : ;
    {
        intl.formatMessage(messages.getVersionInfo);
    }
    className = "bcs-version-info";
    onClick = {}();
    {
        onInfo({ versions });
    }
}
type = "button";
data - resin - target;
{
    ACTIVITY_TARGETS.VERSION_CARD;
}
    >
        height;
{
    16;
}
width = { 16:  } /  >
    /PlainButton>
    < /span>;
null;
/div>;
;
export { CollapsedVersion as CollapsedVersionBase };
export default injectIntl(CollapsedVersion);
//# sourceMappingURL=CollapsedVersion.js.map