/**
 * @was-flow
 * @file Version component
 */
import { injectIntl } from 'react-intl';
import messages from '../../../messages';
import { ACTIVITY_TARGETS } from '../../../../interactionTargets';
import './Version.scss';
import { VERSION_UPLOAD_ACTION, PLACEHOLDER_USER, } from '../../../../constants';
function getMessageForAction(name, action, version_number) {
    switch (action) {
        case VERSION_UPLOAD_ACTION:
            return Object.assign({}, messages.versionUploaded);
            values = {};
            {
                name: ({ name } < /strong>,);
                version_number,
                ;
            }
    }
    />;
    ;
    VERSION_DELETE_ACTION: return Object.assign({}, messages.versionDeleted);
    values = {};
    {
        name: ({ name } < /strong>,);
        version_number,
        ;
    }
}
/>;
;
VERSION_RESTORE_ACTION: return Object.assign({}, messages.versionRestored);
values = {};
{
    name: ({ name } < /strong>,);
    version_number,
    ;
}
/>;
;
return null;
const Version = ({ action, modified_by, id, intl, onInfo, version_number }) => {
    const modifiedByUser = modified_by || PLACEHOLDER_USER;
    return className = "bcs-version" >
        className;
    "bcs-version-message" >
        { getMessageForAction(modifiedByUser) { }, : .name, action, version_number }
        < /span>;
    {
        onInfo ? className = "bcs-version-actions" >
            aria - label : ;
        {
            intl.formatMessage(messages.getVersionInfo);
        }
        className = "bcs-version-info";
        onClick = {}();
    }
};
{
    onInfo({ id, version_number });
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
;
export { Version as VersionBase };
export default injectIntl(Version);
//# sourceMappingURL=Version.js.map