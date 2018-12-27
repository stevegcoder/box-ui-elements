/**
 * @was-flow
 * @file Versions sidebar component
 * @author Box
 */
import { DETAILS_TARGETS } from '../../interactionTargets';
import { isBoxNote } from '../../util/file';
const SidebarVersions = ({ onVersionHistoryClick, file }) => {
    const { version_number } = file;
    const versionNumber = parseInt(version_number, 10);
    if (isBoxNote(file) || !versionNumber || versionNumber <= 1) {
        return null;
    }
    return (data - resin - target) = { DETAILS_TARGETS, : .VERSION_HISTORY };
    onClick = { onVersionHistoryClick };
    versionCount = { versionNumber }
        /  >
    ;
};
;
;
export default SidebarVersions;
//# sourceMappingURL=SidebarVersions.js.map