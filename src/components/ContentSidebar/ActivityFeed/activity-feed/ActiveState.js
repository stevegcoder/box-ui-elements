import getProp from 'lodash/get';
import withErrorHandling from '../../withErrorHandling';
const ActiveState = ({ currentUser, items, onCommentDelete, onTaskDelete, onTaskEdit, onTaskAssignmentUpdate, onVersionInfo, translations, getAvatarUrl, getUserProfileUrl, getMentionWithQuery, mentionSelectorContacts, }) => className = "bcs-activity-feed-active-state" >
    { items, : .map((item) => {
            const { type, id, versions, permissions } = item;
            switch (type) {
                case 'comment':
                    return className = "bcs-activity-feed-comment";
                    key = { type } + id;
            }
             >
                Object.assign({}, item);
            currentUser = { currentUser };
            onDelete = { onCommentDelete };
            translations = { translations };
            getAvatarUrl = { getAvatarUrl };
            getUserProfileUrl = { getUserProfileUrl };
            permissions = {};
            {
                can_delete: getProp(permissions, 'can_delete', false),
                    can_edit;
                getProp(permissions, 'can_edit', false),
                ;
            }
        }, />
            < /li>),
        case: 'task',
        return: item.task_assignment_collection.total_count ? className = "bcs-activity-feed-task" : , key = { type } + id } >
    Object.assign({}, item);
currentUser = { currentUser };
onDelete = { onTaskDelete };
onEdit = { onTaskEdit };
onAssignmentUpdate = { onTaskAssignmentUpdate };
translations = { translations };
getAvatarUrl = { getAvatarUrl };
getUserProfileUrl = { getUserProfileUrl };
mentionSelectorContacts = { mentionSelectorContacts };
getMentionWithQuery = { getMentionWithQuery };
// permissions are not part of task API so hard code to true
permissions = {};
{
    can_delete: true,
        can_edit;
    true,
    ;
}
/>
    < /li>;
null;
'file_version';
return className = "bcs-version-item";
key = { type } + id;
 > Object.assign({}, item);
onInfo = { onVersionInfo } /  >
;
/li>;
;
'keywords';
return className = "bcs-keywords-item";
key = { type } + id;
 >
    Object.assign({}, item) /  >
    /li>;
;
return null;
/ul>;
;
export { ActiveState as ActiveStateComponent };
export default withErrorHandling(ActiveState);
//# sourceMappingURL=ActiveState.js.map