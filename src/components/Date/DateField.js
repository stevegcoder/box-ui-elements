/**
 * @was-flow
 * @file Function to render the date table cell
 * @author Box
 */
import { injectIntl } from 'react-intl';
import { isToday, isYesterday } from 'box-react-ui/lib/utils/datetime';
import messages from '../messages';
import './DateField.scss';
const DEFAULT_DATE_FORMAT = {
    weekday: 'short',
    month: 'short',
    year: 'numeric',
    day: 'numeric',
};
const DateField = ({ date, dateFormat = DEFAULT_DATE_FORMAT, omitCommas = false, intl, relative = true, capitalize = false, }) => {
    const d = new Date(date);
    const isTodaysDate = isToday(d);
    const isYesterdaysDate = isYesterday(d);
    if (relative && (isTodaysDate || isYesterdaysDate)) {
        let Message = Object.assign({}, messages.today) /  > ;
        if (isYesterdaysDate) {
            Message = Object.assign({}, messages.yesterday) /  > ;
        }
        if (capitalize) {
            return className;
            "be-date-capitalize" > { Message } < /span>;;
        }
        return Message;
    }
    let formattedDate = intl.formatDate(d, dateFormat);
    formattedDate = omitCommas ? formattedDate.replace(/,/g, '') : formattedDate;
    return formattedDate;
};
export default injectIntl(DateField);
//# sourceMappingURL=DateField.js.map