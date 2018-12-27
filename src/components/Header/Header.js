/**
 * @was-flow
 * @file Header bar
 * @author Box
 */
import { injectIntl } from 'react-intl';
import messages from '../messages';
import { VIEW_FOLDER, VIEW_SEARCH } from '../../constants';
import './Header.scss';
const Header = ({ view, isSmall, searchQuery, onSearch, logoUrl, intl }) => {
    const search = ({ currentTarget }) => onSearch(currentTarget.value);
    const isFolder = view === VIEW_FOLDER;
    const isSearch = view === VIEW_SEARCH;
    return className = "be-header" >
        url;
    {
        logoUrl;
    }
    isSmall = { isSmall } /  >
        className;
    "be-search" >
        type;
    "search";
    disabled = {};
    isFolder && !isSearch;
};
placeholder = { intl, : .formatMessage(messages.searchPlaceholder) };
value = { searchQuery };
onChange = { search }
    /  >
    /div>
    < /div>;
;
;
export default injectIntl(Header);
//# sourceMappingURL=Header.js.map