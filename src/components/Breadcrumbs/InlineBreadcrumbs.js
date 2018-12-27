/**
 * @was-flow
 * @file Component for the details for the item name
 * @author Box
 */
import messages from '../messages';
import { DELIMITER_SLASH } from '../../constants';
import './InlineBreadcrumbs.scss';
const InlineBreadcrumbs = ({ rootId, item, onItemClick }) => {
    const { path_collection } = item;
    const { entries: breadcrumbs = [] } = path_collection || {};
    return className = "be-inline-breadcrumbs" >
        Object.assign({}, messages.in) /  >
        & nbsp;
    rootId;
    {
        rootId;
    }
    crumbs = { breadcrumbs };
    onCrumbClick = { onItemClick };
    delimiter = { DELIMITER_SLASH } /  >
        /span>;
};
;
;
export default InlineBreadcrumbs;
//# sourceMappingURL=InlineBreadcrumbs.js.map