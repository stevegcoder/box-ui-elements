/**
 * @was-flow
 * @file Utility for sidebar
 * @author Box
 */
import { hasSkills as hasSkillsData } from './Skills/skillUtils';
{
    MetadataSidebarProps;
}
from;
'./MetadataSidebar';
class SidebarUtils {
    /**
     * Determines if we can render the details sidebar.
     * Only relies on props.
     *
     * @param {ContentSidebarProps} props - User passed in props
     * @return {Boolean} true if we should render
     */
    static canHaveDetailsSidebar({ detailsSidebarProps = {} }) {
        const { hasProperties, hasAccessStats, hasClassification, hasVersions, hasNotices } = detailsSidebarProps;
        return !!hasProperties || !!hasAccessStats || !!hasClassification || !!hasVersions || !!hasNotices;
    }
    /**
     * Determines if we can render the metadata sidebar.
     * Only relies on props.
     *
     * @param {ContentSidebarProps} props - User passed in props
     * @return {Boolean} true if we should render
     */
    static canHaveMetadataSidebar(props) {
        return !!props.hasMetadata;
    }
    /**
     * Determines if we can render the activity sidebar.
     * Only relies on props.
     *
     * @param {ContentSidebarProps} props - User passed in props
     * @return {Boolean} true if we should render
     */
    static canHaveActivitySidebar(props) {
        return !!props.hasActivityFeed;
    }
    /**
     * Determines if we can render the skills sidebar.
     * Only relies on props.
     *
     * @param {ContentSidebarProps} props - User passed in props
     * @return {Boolean} true if we should render
     */
    static canHaveSkillsSidebar(props) {
        return !!props.hasSkills;
    }
    /**
     * Determines if we can render the sidebar.
     * Only relies on props.
     *
     * @param {ContentSidebarProps} props - User passed in props
     * @return {Boolean} true if we should have a sidebar
     */
    static canHaveSidebar(props) {
        return (SidebarUtils.canHaveDetailsSidebar(props) ||
            SidebarUtils.canHaveActivitySidebar(props) ||
            SidebarUtils.canHaveSkillsSidebar(props) ||
            SidebarUtils.canHaveMetadataSidebar(props));
    }
    /**
     * Determines if we should bother rendering the skills sidebar.
     * Relies on props and file data.
     *
     * @private
     * @param {ContentSidebarProps} props - User passed in props
     * @param {BoxItem} file - box file
     * @return {Boolean} true if we should render
     */
    static shouldRenderSkillsSidebar(props, file) {
        return !!file && SidebarUtils.canHaveSkillsSidebar(props) && hasSkillsData(file);
    }
    /**
     * Determines if we should bother rendering the metadata sidebar.
     * Relies on props and metadata data and feature enabled or not.
     *
     * @private
     * @param {ContentSidebarProps} props - User passed in props
     * @param {Array<MetadataEditor>} editors - metadata editors
     * @param {Boolean} isMetadataEnabled - metadata feature
     * @return {Boolean} true if we should render
     */
    static shouldRenderMetadataSidebar(props, editors) {
        const { metadataSidebarProps = {} } = props;
        const { isFeatureEnabled = true } = metadataSidebarProps;
        return (SidebarUtils.canHaveMetadataSidebar(props) &&
            (isFeatureEnabled || (Array.isArray(editors) && editors.length > 0)));
    }
    /**
     * Determines if we should bother rendering the sidebar.
     * Relies on props and file data.
     *
     * @param {ContentSidebarProps} props - User passed in props
     * @param {BoxItem} file - box file
     * @return {Boolean} true if we should fetch or render
     */
    static shouldRenderSidebar(props, file, editors) {
        return (!!file &&
            (SidebarUtils.canHaveDetailsSidebar(props) ||
                SidebarUtils.shouldRenderSkillsSidebar(props, file) ||
                SidebarUtils.canHaveActivitySidebar(props) ||
                SidebarUtils.shouldRenderMetadataSidebar(props, editors)));
    }
}
export default SidebarUtils;
//# sourceMappingURL=SidebarUtils.js.map