/**
 * @was-flow
 * @file Metadata sidebar component
 * @author Box
 */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';
import { withAPIContext } from '../APIContext';
import { withErrorBoundary } from '../ErrorBoundary';
import { ORIGIN_METADATA_SIDEBAR } from '../../constants';
import './MetadataSidebar.scss';
class MetadataSidebar extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            isLoading: false,
            hasError: false,
        };
        /**
         * Sets the error state to true
         *
         * @return {void}
         */
        this.errorCallback = () => {
            this.setState({ isLoading: false, hasError: true });
        };
        /**
         * Fetches the metadata editors
         *
         * @return {void}
         */
        this.getMetadataEditors = () => {
            const { api, file, getMetadata, isFeatureEnabled = true } = this.props;
            api.getMetadataAPI(true).getEditors(file, ({ editors, templates }) => {
                this.setState({
                    templates,
                    editors: editors.slice(0),
                    isLoading: false,
                    hasError: false,
                });
            }, this.errorCallback, getMetadata, isFeatureEnabled);
        };
        /**
         * Instance remove handler
         *
         * @param {number} id - instance id
         * @return {void}
         */
        this.onRemove = (id) => {
            const { api, file } = this.props;
            const editor = this.getEditor(id);
            if (!editor) {
                return;
            }
            api.getMetadataAPI(false).deleteMetadata(file, editor.template, () => this.onRemoveSuccessHandler(editor), this.errorCallback);
        };
        /**
         * Instance add success handler
         *
         * @param {number} id - instance id
         * @return {void}
         */
        this.onAddSuccessHandler = (editor) => {
            const { editors = [] } = this.state;
            const clone = editors.slice(0);
            clone.push(editor);
            this.setState({ editors: clone, isLoading: false });
        };
        /**
         * Instance add handler
         *
         * @param {Object} template - instance template
         * @return {void}
         */
        this.onAdd = (template) => {
            const { api, file } = this.props;
            this.setState({ isLoading: true });
            api.getMetadataAPI(false).createMetadata(file, template, this.onAddSuccessHandler, this.errorCallback);
        };
        /**
         * Instance save handler
         *
         * @param {number} id - instance id
         * @param {Array} ops - json patch ops
         * @return {void}
         */
        this.onSave = (id, ops) => {
            const { api, file } = this.props;
            const oldEditor = this.getEditor(id);
            if (!oldEditor) {
                return;
            }
            api.getMetadataAPI(false).updateMetadata(file, oldEditor.template, ops, (newEditor) => {
                this.onSaveSuccessHandler(oldEditor, newEditor);
            }, this.errorCallback);
        };
        /**
         * Instance dirty handler
         *
         * @param {number} id - instance id
         * @param {boolean} isDirty - instance dirty state
         * @return {void}
         */
        this.onModification = (id, isDirty) => {
            const { editors = [] } = this.state;
            const index = editors.findIndex(({ instance }) => instance.id === id);
            if (index === -1) {
                return;
            }
            const editor = Object.assign({}, editors[index]);
            editor.isDirty = isDirty;
            const clone = editors.slice(0);
            clone.splice(index, 1, editor);
            this.setState({ editors: clone });
        };
    }
    componentDidMount() {
        this.getMetadataEditors();
    }
    /**
     * Checks upload permission
     *
     * @return {boolean} - true if metadata can be edited
     */
    canEdit() {
        const { file } = this.props;
        const { permissions = {} } = file;
        const { can_upload } = permissions;
        return !!can_upload;
    }
    /**
     * Editor we are changing
     *
     * @param {number} id - instance id
     * @return {Object} editor instance
     */
    getEditor(id) {
        const { editors = [] } = this.state;
        return editors.find(({ instance }) => instance.id === id);
    }
    /**
     * Instance remove success handler
     *
     * @param {Object} editor - the editor to remove
     * @return {void}
     */
    onRemoveSuccessHandler(editor) {
        const { editors = [] } = this.state;
        const clone = editors.slice(0);
        clone.splice(editors.indexOf(editor), 1);
        this.setState({ editors: clone });
    }
    /**
     * Instance save success handler
     *
     * @param {Object} oldEditor - prior editor
     * @param {Object} newEditor - updated editor
     * @return {void}
     */
    onSaveSuccessHandler(oldEditor, newEditor) {
        const { editors = [] } = this.state;
        const clone = editors.slice(0);
        clone.splice(editors.indexOf(oldEditor), 1, newEditor);
        this.setState({ editors: clone });
    }
    render() {
        const { editors, templates, isLoading, hasError } = this.state;
        const showEditor = !!templates && !!editors;
        const showLoadingIndicator = !hasError && !showEditor;
        const canEdit = this.canEdit();
        const showTemplateDropdown = showEditor && canEdit;
        const showEmptyContent = showEditor && ((editors) => ).length === 0;
        return title = {} < FormattedMessage;
        {
            messages.sidebarMetadataTitle;
        }
        />};
        actions = {};
        isDropdownBusy = { false:  };
        onAdd = { this: .onAdd };
        templates = { templates };
        usedTemplates = { editors } && editors.map(editor => editor.template);
    }
}
/>;
null;
    >
        { hasError } && title;
{
    (Object.assign({}, messages.sidebarMetadataErrorTitle) /  > );
}
 >
    Object.assign({}, messages.sidebarMetadataErrorContent) /  >
    /InlineError>;
{
    showLoadingIndicator && />};
    {
        showEditor && className;
        "metadata-instance-editor";
        isLoading = { isLoading } >
            {
                : .onModification };
        onSave = { this: .onSave };
        onRemove = { this: .onRemove }
            /  >
        ;
    }
    /LoadingIndicatorWrapper>;
}
/SidebarContent>;
;
export { MetadataSidebar as MetadataSidebarComponent };
export default withErrorBoundary(ORIGIN_METADATA_SIDEBAR)(withAPIContext(MetadataSidebar));
//# sourceMappingURL=MetadataSidebar.js.map