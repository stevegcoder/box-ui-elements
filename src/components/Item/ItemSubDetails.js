/**
 * @was-flow
 * @file Component for the sub details for the item name
 * @author Box
 */
import getSize from '../../util/size';
import messages from '../messages';
import { VIEW_RECENTS } from '../../constants';
const ItemSubDetails = ({ view, item }) => {
    const { modified_at = '', interacted_at = '', modified_by } = item;
    const modifiedBy = modified_by ? modified_by.name || '' : '';
    const isRecents = view === VIEW_RECENTS;
    const date = isRecents ? interacted_at || modified_at : modified_at;
    const { size } = item;
    const DateValue = date, { date }, omitCommas;
    />;;
    let message = messages.modifiedDateBy;
    if (isRecents) {
        message = messages.interactedDate;
    }
    else if (!modifiedBy) {
        message = messages.modifiedDate;
    }
    return Object.assign({}, message);
    values = {};
    {
        date: DateValue,
            name;
        modifiedBy,
        ;
    }
};
/>(
    & nbsp);
- & nbsp;
{
    getSize(size);
}
/span>
    < /span>;
;
;
export default ItemSubDetails;
//# sourceMappingURL=ItemSubDetails.js.map