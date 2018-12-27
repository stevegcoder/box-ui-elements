/**
 * @was-flow
 * @file Component that creates breadcumbs for both the header and name details
 * @author Box
 */
import { DELIMITER_SLASH, DELIMITER_CARET } from '../../constants';
import './Breadcrumbs.scss';
/**
 * Filters out ancestors to root from the crumbs.
 * This is useful when the root is not All Files.
 *
 * @private
 * @param {string} rootId the root folder id
 * @param {Array} crumbs list of crumbs
 * @return {Array} crumbs
 */
function filterCrumbs(rootId, crumbs) {
    const rootIndex = crumbs.findIndex((crumb) => crumb.id === rootId);
    return rootIndex === -1 ? crumbs : crumbs.slice(rootIndex);
}
/**
 * Creates an individual breadcrumb
 *
 * @private
 * @param {Object} crumb single crumb data
 * @param {boolean} isLast is this the last crumb
 * @return {Element}
 */
function getBreadcrumb(crumbs, isLast, onCrumbClick, delimiter) {
    if (Array.isArray(crumbs)) {
        const condensed = delimiter !== DELIMITER_CARET;
        return className = "be-breadcrumb-more" >
            onCrumbClick;
        {
            onCrumbClick;
        }
        crumbs = { crumbs };
        className = { condensed, 'be-breadcrumbs-condensed': '' }
            /  >
            delimiter;
        {
            condensed ? DELIMITER_SLASH : DELIMITER_CARET;
        }
        />
            < /span>;
        ;
    }
    const { id, name } = crumbs;
    return name;
    {
        name;
    }
    onClick = {}();
    onCrumbClick(id);
}
isLast = { isLast };
delimiter = { delimiter } /  > ;
const Breadcrumbs = ({ rootId, crumbs, onCrumbClick, delimiter, isSmall = false }) => {
    if (!rootId || crumbs.length === 0) {
        return />;;
    }
    // The crumbs given may have ancestors higher than the root. We need to filter them out.
    const filteredCrumbs = filterCrumbs(rootId, crumbs);
    const { length } = filteredCrumbs;
    // Always show the last/leaf breadcrumb.
    const crumb = filteredCrumbs[length - 1];
    const onClick = crumb.id ? () => onCrumbClick(crumb.id) : undefined;
    const lastBreadcrumb = name, { crumb, name }, onClick = { onClick }, isLast;
    />;;
    // Always show the second last/parent breadcrumb when there are at least 2 crumbs.
    const secondLastBreadcrumb = length > 1 ? getBreadcrumb(filteredCrumbs[length - 2], false, onCrumbClick, delimiter) : null;
    // Only show the more dropdown when there were at least 4 crumbs.
    const moreBreadcrumbs = length > 3 ? getBreadcrumb(filteredCrumbs.slice(1, length - 2), false, onCrumbClick, delimiter) : null;
    // Only show the root breadcrumb when there are at least 3 crumbs.
    const firstBreadcrumb = length > 2 ? getBreadcrumb(filteredCrumbs[0], false, onCrumbClick, delimiter) : null;
    return className = "be-breadcrumbs" >
        { isSmall, null: firstBreadcrumb };
    {
        isSmall ? null : moreBreadcrumbs;
    }
    {
        secondLastBreadcrumb;
    }
    {
        lastBreadcrumb;
    }
    /div>;
};
;
;
export default Breadcrumbs;
//# sourceMappingURL=Breadcrumbs.js.map