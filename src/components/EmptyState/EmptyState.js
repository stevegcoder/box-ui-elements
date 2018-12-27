/**
 * @was-flow
 * @file Empty state component
 * @author Box
 */
import messages from '../messages';
import { VIEW_ERROR, VIEW_FOLDER, VIEW_SEARCH, VIEW_SELECTED } from '../../constants';
import './EmptyState.scss';
const EmptyState = ({ view, isLoading }) => {
    let type;
    const message = isLoading && view === VIEW_FOLDER ? (Object.assign({}, messages.loadingState) /  >
    ) : (Object.assign({}, messages[`${view}State`]) /  >
    );
    switch (view) {
        case VIEW_ERROR:
            type = />;;
            break;
        case VIEW_SELECTED:
            type = />;;
            break;
        case VIEW_SEARCH:
            type = />;;
            break;
        default:
            type = />;;
            break;
    }
    return className = "be-empty" >
        { type }
        < div > { message } < /div>
        < /div>;
};
;
;
export default EmptyState;
//# sourceMappingURL=EmptyState.js.map