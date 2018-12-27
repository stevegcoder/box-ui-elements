/**
 * @was-flow
 * @file Function to render the date table cell
 * @author Box
 */
import messages from '../messages';
import { FIELD_INTERACTED_AT } from '../../constants';
export default () => ({ dataKey, rowData }) => {
    const { modified_at = '', interacted_at = '', modified_by } = rowData;
    const modifiedBy = modified_by ? modified_by.name || '' : '';
    const isRecents = dataKey === FIELD_INTERACTED_AT;
    const date = isRecents ? interacted_at || modified_at : modified_at;
    const DateValue = date, { date }, capitalize, omitCommas;
    />;;
    if (isRecents || !modifiedBy) {
        return DateValue;
    }
    return Object.assign({}, messages.nameDate);
    values = {};
    {
        date: DateValue,
            name;
        modifiedBy,
        ;
    }
};
/>;
;
;
//# sourceMappingURL=dateCellRenderer.js.map