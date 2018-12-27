/**
 * @was-flow
 * @file Keywords components
 */
import messages from '../../../messages';
import './Keywords.scss';
function getMessageForAction(action) {
    switch (action) {
        case 'applied':
            return Object.assign({}, messages.keywordsApplied) /  > ;
        default:
            return null;
    }
}
const Keywords = ({ action, words }) => className = "bcs-keywords" >
    className;
"bcs-keywords-message" > {} < /span>;
{
    words ? words : ;
    {
        words;
    }
    /> : null}
        < /div>;
    ;
    export default Keywords;
}
//# sourceMappingURL=Keywords.js.map