/**
 * @file Typescript types
 * @author Box
 */

import { MessageDescriptor, InjectIntlProvidedProps } from 'react-intl';
import { $AxiosError, Axios, CancelTokenSource } from 'axios';
import FolderAPI from '../src/api/Folder';
import FileAPI from '../src/api/File';
import WebLinkAPI from '../src/api/WebLink';
import MultiputUploadAPI from '../src/api/uploads/MultiputUpload';
import PlainUploadAPI from '../src/api/uploads/PlainUpload';
import APICache from '../src/util/Cache';
import { ContentSidebarProps } from '../src/components/ContentSidebar';
import { ContentOpenWithProps } from '../src/components/ContentOpenWithProps';
import { ContentPreviewProps } from '../src/components/ContentPreview';

import {
    ACCESS_OPEN,
    ACCESS_COLLAB,
    ACCESS_COMPANY,
    APP_INTEGRATION,
    VIEW_SEARCH,
    VIEW_FOLDER,
    VIEW_ERROR,
    VIEW_SELECTED,
    VIEW_RECENTS,
    VIEW_UPLOAD_EMPTY,
    VIEW_UPLOAD_IN_PROGRESS,
    VIEW_UPLOAD_SUCCESS,
    SORT_ASC,
    SORT_DESC,
    TYPE_FILE,
    TYPE_FOLDER,
    TYPE_WEBLINK,
    STATUS_PENDING,
    STATUS_IN_PROGRESS,
    STATUS_COMPLETE,
    STATUS_ERROR,
    DELIMITER_SLASH,
    DELIMITER_CARET,
    SIZE_SMALL,
    SIZE_LARGE,
    FIELD_DATE,
    FIELD_NAME,
    FIELD_RELEVANCE,
    DEFAULT_VIEW_RECENTS,
    DEFAULT_VIEW_FILES,
    SKILLS_KEYWORD,
    SKILLS_TIMELINE,
    SKILLS_TRANSCRIPT,
    SKILLS_FACE,
    SKILLS_STATUS,
    SIZE_MEDIUM,
    SIDEBAR_VIEW_SKILLS,
    SIDEBAR_VIEW_ACTIVITY,
    SIDEBAR_VIEW_DETAILS,
    SIDEBAR_VIEW_METADATA,
    HTTP_GET,
    HTTP_POST,
    HTTP_PUT,
    HTTP_DELETE,
    HTTP_OPTIONS,
    HTTP_HEAD,
    ORIGIN_CONTENT_SIDEBAR,
    ORIGIN_PREVIEW,
    ORIGIN_CONTENT_PREVIEW,
    ORIGIN_DETAILS_SIDEBAR,
    ORIGIN_ACTIVITY_SIDEBAR,
    ORIGIN_SKILLS_SIDEBAR,
    ORIGIN_METADATA_SIDEBAR,
} from '../src/constants';


export type Method =
    | typeof HTTP_DELETE
    | typeof HTTP_GET
    | typeof HTTP_POST
    | typeof HTTP_OPTIONS
    | typeof HTTP_HEAD
    | typeof HTTP_PUT;
export type Token = null | typeof undefined | string | Function;
export type TokenReadWrite = { read: string, write?: string };
export type TokenLiteral = null | typeof undefined | string | TokenReadWrite;
export type ClassComponent<P, S> = Class<React$Component<P, S>>;
export type StringMap = { [string]: string };
export type StringAnyMap = { [string]: any };
export type StringBooleanMap = { [string]: boolean };
export type NumberBooleanMap = { [number]: boolean };
export type ItemAPI = FolderAPI | FileAPI | WebLinkAPI;
export type Access = typeof ACCESS_COLLAB | typeof ACCESS_COMPANY | typeof ACCESS_OPEN;
export type DefaultView = typeof DEFAULT_VIEW_RECENTS | typeof DEFAULT_VIEW_FILES;
export type View =
    | typeof VIEW_ERROR
    | typeof VIEW_SELECTED
    | typeof VIEW_RECENTS
    | typeof VIEW_FOLDER
    | typeof VIEW_SEARCH
    | typeof VIEW_UPLOAD_EMPTY
    | typeof VIEW_UPLOAD_IN_PROGRESS
    | typeof VIEW_UPLOAD_SUCCESS;
export type SortBy = typeof FIELD_DATE | typeof FIELD_NAME | typeof FIELD_RELEVANCE;
export type SortDirection = typeof SORT_ASC | typeof SORT_DESC;
export type ItemType = typeof TYPE_FILE | typeof TYPE_FOLDER | typeof TYPE_WEBLINK;
export type UploadStatus = typeof STATUS_PENDING | typeof STATUS_IN_PROGRESS | typeof STATUS_COMPLETE | typeof STATUS_ERROR;
export type Delimiter = typeof DELIMITER_SLASH | typeof DELIMITER_CARET;
export type Size = typeof SIZE_SMALL | typeof SIZE_LARGE | typeof SIZE_MEDIUM;

export type SharedLink = {
    url: string,
    access: Access,
};

export type Order = {
    by: SortBy,
    direction: SortDirection,
};

export type BoxItemPermission = {
    can_comment?: boolean,
    can_edit_comment?: boolean,
    can_delete_comment?: boolean,
    can_preview?: boolean,
    can_rename?: boolean,
    can_download?: boolean,
    can_delete?: boolean,
    can_upload?: boolean,
    can_share?: boolean,
    can_set_share_access?: boolean,
};

export type User = {
    type: 'user',
    id: string,
    name: string,
    login?: string,
    email?: string,
    avatar_url?: string,
};

export type UserCollection = {
    total_count?: number,
    entries?: Array<User>,
    order?: Array<Order>,
    isLoaded?: boolean,
    limit?: number,
    offset?: number,
    previous_marker?: string,
    next_marker?: string,
};

export type SelectorItem = {
    id: string,
    name: string,
    item: Object,
    value?: any,
};

export type SelectorItems = Array<SelectorItem>;

export type ActionItemError = {
    title: MessageDescriptor,
    message: MessageDescriptor,
    action?: {
        text: MessageDescriptor,
        onAction: Function,
    },
};

export type OptionItem = {
    text: string,
    value: number | string,
};

export type OptionItems = Array<OptionItem>;

export type SkillCardType =
    | typeof SKILLS_KEYWORD
    | typeof SKILLS_TIMELINE
    | typeof SKILLS_TRANSCRIPT
    | typeof SKILLS_FACE
    | typeof SKILLS_STATUS;

export type SkillCardEntryType = 'text' | 'image';

export type SkillCardLocalizableType = {
    code?: string,
    message?: string,
};

export type SkillCardEntryTimeSlice = {
    start: number,
    end?: number,
};

export type SkillCardEntry = {
    type?: SkillCardEntryType,
    text?: string,
    label?: string,
    image_url?: string,
    appears?: Array<SkillCardEntryTimeSlice>,
};

export type SkillCard = {
    type: 'skill_card',
    id?: string,
    file_version: BoxItemVersion,
    status?: SkillCardLocalizableType,
    skill_card_title: SkillCardLocalizableType,
    skill_card_type: SkillCardType,
    title?: string,
    duration?: number,
    entries: Array<SkillCardEntry>,
    error?: string,
};

export type SkillCards = {
    cards: Array<SkillCard>,
};

export type MetadataSkillsTemplate = {
    boxSkillsCards?: SkillCards,
};

export type MetadataType = {
    global?: MetadataSkillsTemplate,
};

export type MetadataEditorTemplate = {
    id: string,
    scope: string,
    templateKey: string,
    hidden: boolean,
};

export type MetadataEditorInstance = {
    id: string,
    data: Object,
    canEdit: boolean,
};

export type MetadataInstance = {
    $id: string,
    $template: string,
    $canEdit: boolean,
    $scope: string,
    $parent: string,
    $type: string,
    $typeVersion: number,
    $version: number,
};

export type MetadataEditor = {
    hasError?: boolean,
    instance: MetadataEditorInstance,
    isDirty?: boolean,
    template: MetadataEditorTemplate,
};

export type BoxItemVersion = {
    id: string,
    type: string,
    sha1?: string,
    name?: string,
    size?: number,
    created_at: string,
    modified_at?: string,
    modified_by: User,
    trashed_at: ?string,
    action: 'upload' | 'delete' | 'restore',
    versions?: Array<BoxItemVersion>,
    version_number: string,
    version_start?: number,
    version_end?: number,
    collaborators?: Object,
};

export type BoxItem = {
    id: string,
    name?: string,
    size?: number,
    type?: ItemType,
    parent?: BoxItem,
    extension?: string,
    description?: string,
    permissions?: BoxItemPermission,
    item_collection?: BoxItemCollection,
    path_collection?: BoxPathCollection,
    interacted_at?: string,
    modified_at?: string,
    created_at?: string,
    shared_link?: SharedLink,
    allowed_shared_link_access_levels?: Array<Access>,
    has_collaborations?: boolean,
    is_externally_owned?: boolean,
    download_url?: string,
    url?: string,
    owned_by?: User,
    modified_by?: User,
    created_by?: User,
    selected?: boolean,
    metadata?: MetadataType,
    file_version?: BoxItemVersion,
    is_download_available?: boolean,
    version_number?: string,
    restored_from?: BoxItemVersion,
};

export type BoxItemCollection = {
    total_count?: number,
    entries?: Array<BoxItem>,
    order?: Array<Order>,
    isLoaded?: boolean,
    limit?: number,
    offset?: number,
    previous_marker?: string,
    next_marker?: string,
};

export type FlattenedBoxItem = {
    id?: string,
    name?: string,
    size?: number,
    type?: ItemType,
    parent?: BoxItem,
    extension?: string,
    description?: string,
    permissions?: BoxItemPermission,
    item_collection?: FlattenedBoxItemCollection,
    path_collection?: BoxPathCollection,
    interacted_at?: string,
    modified_at?: string,
    created_at?: string,
    shared_link?: SharedLink,
    allowed_shared_link_access_levels?: Array<Access>,
    has_collaborations?: boolean,
    is_externally_owned?: boolean,
    download_url?: string,
    url?: string,
    owned_by?: User,
    modified_by?: User,
    created_by?: User,
    selected?: boolean,
    metadata?: MetadataType,
    file_version?: BoxItemVersion,
};

export type FlattenedBoxItemCollection = {
    total_count?: number,
    entries?: Array<string>,
    order?: Array<Order>,
    isLoaded?: boolean,
    limit?: number,
    offset?: number,
    previous_marker?: string,
    next_marker?: string,
};

export type BoxPathCollection = {
    total_count: number,
    entries: Array<Crumb>,
};

export type Collection = {
    id?: string,
    name?: string,
    permissions?: BoxItemPermission,
    breadcrumbs?: Array<Crumb>,
    offset?: number,
    percentLoaded?: number,
    sortBy?: SortBy,
    sortDirection?: SortDirection,
    items?: Array<BoxItem>,
    boxItem?: FlattenedBoxItem,
    totalCount?: number,
};

export type UploadItem = {
    api: PlainUploadAPI | MultiputUploadAPI,
    boxFile?: BoxItem,
    error?: Object,
    extension: string,
    file: UploadFile,
    name: string,
    progress: number,
    size: number,
    status: UploadStatus,
    options?: UploadItemAPIOptions,
    isFolder?: boolean,
};

export type UploadItemAPIOptions = {
    apiHost?: string,
    fileId?: string,
    folderId?: string,
    token?: Token,
    uploadInitTimestamp?: number,
};

export type UploadFileWithAPIOptions = {
    file: UploadFile,
    options?: UploadItemAPIOptions,
};

export type ModalOptions = {
    buttonLabel: string,
    buttonClassName: string,
    modalClassName: string,
    overlayClassName: string,
};

export type IconType = {
    color?: string,
    secondaryColor?: string,
    className?: string,
    width?: number,
    height?: number,
};

export type Crumb = {
    id?: string,
    name: string,
};

export type Options = {
    id?: string,
    token: Token,
    clientName?: string,
    version?: string,
    sharedLink?: string,
    sharedLinkPassword?: string,
    cache?: APICache,
    apiHost?: string,
    uploadHost?: string,
    responseInterceptor?: Function,
    requestInterceptor?: Function,
    consoleLog?: boolean,
    consoleError?: boolean,
};

export type Recent = {
    interacted_at: string,
    item: BoxItem,
};

export type RecentCollection = {
    order: Order,
    entries: Array<Recent>,
};

export type MultiputConfig = {
    digestReadahead: number,
    initialRetryDelayMs: number,
    maxRetryDelayMs: number,
    parallelism: number,
    requestTimeoutMs: number,
    retries: number,
};

export type MultiputPart = {
    offset: number,
    part_id: string,
    sha1: string,
    size: number,
};

export type MultiputData = {
    part?: MultiputPart,
};

export type FileVersions = {
    total_count: number,
    entries: Array<BoxItemVersion>,
};

export type MaskError = {
    errorHeader: MessageDescriptor,
    errorSubHeader?: MessageDescriptor,
};

export type InlineError = {
    title: MessageDescriptor,
    content: MessageDescriptor,
};

export type Errors = {
    maskError?: MaskError,
    inlineError?: InlineError,
    error?: MessageDescriptor,
};

export type FileAccessStats = {
    preview_count?: number,
    download_count?: number,
    comment_count?: number,
    edit_count?: number,
    has_count_overflowed: boolean,
};

export type TaskAssignment = {
    type: 'task_assignment',
    id: string,
    assigned_to: User,
    resolution_state: string,
    message: string,
};

export type TaskAssignments = {
    total_count: number,
    entries: Array<TaskAssignment>,
};

export type Task = {
    type: 'task',
    id: string,
    created_at: string,
    created_by: User,
    due_at?: string,
    message: string,
    task_assignment_collection: TaskAssignments,
};

export type Tasks = {
    total_count: number,
    entries: Array<Task>,
};

export type Comment = {
    type: 'comment',
    id: string,
    is_reply_comment?: boolean,
    tagged_message: string,
    message?: string,
    created_by: User,
    created_at: string,
    modified_at: string,
};

export type Comments = {
    total_count: number,
    entries: Array<Comment>,
};

export type FeedItems = Array<Comment | Task | BoxItemVersion>;

export type Collaborators = {
    next_marker: 'string' | null,
    entries: Array<SelectorItem>,
};

export type Translations = {
    translationEnabled?: boolean,
    onTranslate?: Function,
};

export type OpenWithAPI = {
    default_app_integration?: AppIntegrationAPIMiniItem,
    disabled_reasons?: Array<string>,
    is_disabled?: boolean,
    items: Array<OpenWithAPIItem>,
    should_show_consent_popup?: boolean,
};

export type OpenWithAPIItem = {
    app_integration: AppIntegrationAPIMiniItem,
    disabled_reasons: Array<string>,
    display_description: string,
    display_name: string,
    display_order: number,
    is_disabled: boolean,
    should_show_consent_popup: boolean,
};

export type AppIntegrationAPIMiniItem = {
    id: string,
    type: APP_INTEGRATION,
};

export type ExecuteAPIParam = {
    key: string,
    value: string,
};

export type ExecuteAPI = {
    url: string,
    params: ?Array<ExecuteAPIParam>,
    integration_type: string,
    method: HTTP_POST | HTTP_GET,
};

export type Integration = {
    appIntegrationId: string,
    disabledReasons: Array<string>,
    displayDescription: string,
    displayName: string,
    displayOrder: number,
    isDefault: boolean,
    isDisabled: boolean,
    requiresConsent: boolean,
    type: APP_INTEGRATION,
};

export type JsonPatch = {
    op: 'add' | 'remove' | 'replace' | 'test',
    path: string,
    value?: Object,
};

export type JsonPatchData = Array<JsonPatch>;

export type SidebarView =
    | typeof SIDEBAR_VIEW_SKILLS
    | typeof SIDEBAR_VIEW_DETAILS
    | typeof SIDEBAR_VIEW_METADATA
    | typeof SIDEBAR_VIEW_ACTIVITY;

export type FileSystemFileEntry = {
    createReader: Function,
    file: Function,
    isDirectory: boolean,
    isFile: boolean,
    name: string,
};

export type UploadDataTransferItemWithAPIOptions = {
    item: DataTransferItem,
    options?: UploadItemAPIOptions,
};

export type UploadFile = File & { webkitRelativePath?: string };

export type DirectoryReader = {
    readEntries: (Function, Function) => void,
};

export type FetchOptions = {
    fields?: Array<string>,
    forceFetch?: boolean,
    refreshCache?: boolean,
};

export type ErrorResponseData = {
    code: string,
    help_url: string,
    message: string,
    context_info: Object,
    request_id: string,
    status: number,
    type: 'error',
};

export type ElementsXhrError = $AxiosError<any> | ErrorResponseData;

export type ErrorOrigins =
    | ORIGIN_CONTENT_SIDEBAR
    | ORIGIN_CONTENT_PREVIEW
    | ORIGIN_PREVIEW
    | ORIGIN_DETAILS_SIDEBAR
    | ORIGIN_ACTIVITY_SIDEBAR
    | ORIGIN_SKILLS_SIDEBAR
    | ORIGIN_METADATA_SIDEBAR;

export type ElementsError = {
    type: 'error',
    code: string,
    message: string,
    origin: ErrorOrigins,
    context_info: Object,
};

export type ErrorContextProps = {
    onError: (
        error: ElementsXhrError | Error,
        code: string,
        contextInfo?: Object,
        origin: ErrorOrigins,
    ) => void,
};

export type ElementsErrorCallback = (e: ElementsXhrError, code: string, contextInfo?: Object) => void;

export type ClassificationInfo = {
    Box__Security__Classification__Key?: string
} & MetadataInstance;
