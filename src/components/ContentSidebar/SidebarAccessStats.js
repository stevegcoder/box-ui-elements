/**
 * @was-flow
 * @file Versions sidebar component
 * @author Box
 */
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from '../messages';
import { INTERACTION_TARGET, SECTION_TARGETS, DETAILS_TARGETS } from '../../interactionTargets';
import { isBoxNote } from '../../util/file';
import withErrorHandling from './withErrorHandling';
const SidebarAccessStats = ({ onAccessStatsClick, accessStats = {
    has_count_overflowed: false,
}, file, error, intl, }) => {
    const { preview_count, comment_count, download_count, edit_count } = accessStats;
    if (!Number.isFinite(preview_count) &&
        !Number.isFinite(comment_count) &&
        !Number.isFinite(download_count) &&
        !Number.isFinite(edit_count) &&
        !error) {
        return null;
    }
    const errorMessage = error ? intl.formatMessage(error) : undefined;
    return interactionTarget = { SECTION_TARGETS, : .ACCESS_STATS };
    title = {} < FormattedMessage;
    {
        messages.sidebarAccessStats;
    }
    />}
        >
            errorMessage;
    {
        errorMessage;
    }
    commentCount = { comment_count };
    commentStatButtonProps = {};
    {
        [INTERACTION_TARGET];
        DETAILS_TARGETS.ACCESS_STATS.COMMENTS,
        ;
    }
};
downloadCount = { download_count };
downloadStatButtonProps = {};
{
    [INTERACTION_TARGET];
    DETAILS_TARGETS.ACCESS_STATS.DOWNLOADS,
    ;
}
previewCount = { preview_count };
previewStatButtonProps = {};
{
    [INTERACTION_TARGET];
    DETAILS_TARGETS.ACCESS_STATS.PREVIEWS,
    ;
}
viewStatButtonProps = {};
{
    [INTERACTION_TARGET];
    DETAILS_TARGETS.ACCESS_STATS.VIEWS,
    ;
}
editCount = { edit_count };
editStatButtonProps = {};
{
    [INTERACTION_TARGET];
    DETAILS_TARGETS.ACCESS_STATS.EDITS,
    ;
}
openAccessStatsModal = { onAccessStatsClick };
isBoxNote = {};
viewMoreButtonProps = {};
{
    [INTERACTION_TARGET];
    DETAILS_TARGETS.ACCESS_STATS.VIEW_DETAILS,
    ;
}
/>
    < /SidebarSection>;
;
;
export { SidebarAccessStats as SidebarAccessStatsComponent };
export default withErrorHandling(injectIntl(SidebarAccessStats));
//# sourceMappingURL=SidebarAccessStats.js.map