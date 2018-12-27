/**
 * @was-flow
 * @file Preview details sidebar notices component
 * @author Box
 */
import getProp from 'lodash/get';
import { addTime } from 'box-react-ui/lib/utils/datetime';
const ONE_MINUTE_IN_MS = 60000;
const NOTICE_DATE_FORMAT = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
};
const SidebarNotices = ({ file }) => {
    const itemExpiration = getProp(file, 'expires_at');
    const sharedLinkExpiration = getProp(file, 'shared_link.unshared_at');
    if (!itemExpiration && !sharedLinkExpiration) {
        return null;
    }
    return {};
    itemExpiration && expiration;
    {
        date;
        {
            addTime(new Date(itemExpiration), ONE_MINUTE_IN_MS);
        }
        dateFormat = { NOTICE_DATE_FORMAT };
        relative = { false:  }
            /  >
        ;
    }
    itemType = "file"
        /  >
    ;
};
{
    !!sharedLinkExpiration && expiration;
    {
        date;
        {
            addTime(new Date(sharedLinkExpiration), ONE_MINUTE_IN_MS);
        }
        dateFormat = { NOTICE_DATE_FORMAT };
        relative = { false:  }
            /  >
        ;
    }
    />;
}
/React.Fragment>;
;
;
export default SidebarNotices;
//# sourceMappingURL=SidebarNotices.js.map