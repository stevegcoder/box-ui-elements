/**
 * @was-flow
 * @file Sidebar file properties component
 * @author Box
 */
import getProp from 'lodash/get';
import { injectIntl } from 'react-intl';
import withErrorHandling from './withErrorHandling';
import { KEY_CLASSIFICATION_TYPE } from '../../constants';
import { INTERACTION_TARGET, DETAILS_TARGETS } from '../../interactionTargets';
/**
 * Gets the openModal prop for ItemProperties
 *
 * @param {Object} file the box file
 * @param {Function} onClassificationClick the optional callback
 * @returns {Function|undefined} the callback function if it is passed in, and the user has permissions
 */
export const getClassificationModal = (file, onClassificationClick) => {
    // Changing classification requires edit metadata permission, which is included in can_upload
    if (onClassificationClick && getProp(file, 'permissions.can_upload', false)) {
        return onClassificationClick;
    }
    return undefined;
};
const SidebarFileProperties = ({ classification, file, onDescriptionChange, hasClassification, onClassificationClick, hasRetentionPolicy, retentionPolicy, bannerPolicy, onRetentionPolicyExtendClick, isLoading, intl, }) => {
    const classificationType = getProp(classification, KEY_CLASSIFICATION_TYPE);
    return isLoading = { isLoading } >
        createdAt;
    {
        file.created_at;
    }
    description = { file, : .description };
    modifiedAt = { file, : .modified_at };
    owner = {};
    size = { getFileSize(file) { }, : .size, intl, : .locale };
    uploader = {};
    onDescriptionChange = { getProp(file, ) { }, onDescriptionChange: undefined };
    descriptionTextareaProps = {};
    {
        [INTERACTION_TARGET];
        DETAILS_TARGETS.DESCRIPTION,
        ;
    }
};
classificationProps = {
    hasClassification
};
{
    openModal: getClassificationModal(file, onClassificationClick),
        tooltip;
    getProp(bannerPolicy, 'body'),
        value;
    classificationType,
        [INTERACTION_TARGET];
    classificationType
        ? DETAILS_TARGETS.CLASSIFICATION_EDIT
        : DETAILS_TARGETS.CLASSIFICATION_ADD,
    ;
}
{ }
retentionPolicyProps = {
    hasRetentionPolicy
};
{
    retentionPolicy,
        openModal;
    onRetentionPolicyExtendClick,
    ;
}
{ }
/>
    < /LoadingIndicatorWrapper>;
;
;
export { SidebarFileProperties as SidebarFilePropertiesComponent };
export default injectIntl(withErrorHandling(SidebarFileProperties));
//# sourceMappingURL=SidebarFileProperties.js.map