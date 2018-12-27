/**
 * @was-flow
 * @file Content sub header component
 * @author Box
 */
import { injectIntl } from 'react-intl';
import messages from '../messages';
import { VIEW_SEARCH, VIEW_FOLDER, VIEW_RECENTS, DELIMITER_CARET } from '../../constants';
const SubHeaderLeft = ({ view, isSmall, rootId, rootName, currentCollection, onItemClick, intl }) => {
    let crumbs;
    if (view === VIEW_FOLDER || view === VIEW_SEARCH) {
        const { id, name = '', breadcrumbs = [] } = currentCollection;
        crumbs = breadcrumbs.concat({ id, name });
        // Search results are specific to the current folder
        // hence the breadcrumb is added to the end of the list
        if (view === VIEW_SEARCH) {
            crumbs = crumbs.concat({
                id: undefined,
                name: intl.formatMessage(messages.searchBreadcrumb),
            });
        }
    }
    else {
        crumbs = [
            {
                id: undefined,
                name: intl.formatMessage(messages[`${view}Breadcrumb`]),
            },
        ];
        if (view !== VIEW_RECENTS) {
            crumbs.unshift({
                id: rootId,
                name: rootName || intl.formatMessage(messages.rootBreadcrumb),
            });
        }
    }
    return isSmall = { isSmall };
    rootId = { rootId };
    crumbs = { crumbs };
    onCrumbClick = { onItemClick };
    delimiter = { DELIMITER_CARET }
        /  >
    ;
};
;
;
export default injectIntl(SubHeaderLeft);
//# sourceMappingURL=SubHeaderLeft.js.map