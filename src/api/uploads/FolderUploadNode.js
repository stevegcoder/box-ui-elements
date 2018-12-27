var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @was-flow
 * @file Recursively create folder and upload files
 * @author Box
 */
import noop from 'lodash/noop';
import FolderAPI from '../Folder';
import { STATUS_COMPLETE, ERROR_CODE_ITEM_NAME_IN_USE } from '../../constants';
import { getFileFromEntry } from '../../util/uploads';
class FolderUploadNode {
    /**
     * [constructor]
     *
     * @param {string} name
     * @param {Function} addFilesToUploadQueue
     * @param {Function} addFolderToUploadQueue
     * @returns {void}
     */
    constructor(name, addFilesToUploadQueue, addFolderToUploadQueue, fileAPIOptions, baseAPIOptions, entry) {
        this.files = [];
        this.folders = {};
        /**
         * Upload all child folders
         *
         * @private
         * @param {Function} errorCallback
         * @returns {Promise}
         */
        this.uploadChildFolders = (errorCallback) => __awaiter(this, void 0, void 0, function* () {
            // $FlowFixMe
            const folders = Object.values(this.folders);
            const promises = folders.map(folder => folder.upload(this.folderId, errorCallback));
            yield Promise.all(promises);
        });
        /**
         * Create folder and add it to the upload queue
         *
         * @private
         * @param {Function} errorCallback
         * @param {boolean} isRoot
         * @returns {Promise}
         */
        this.createAndUploadFolder = (errorCallback, isRoot) => __awaiter(this, void 0, void 0, function* () {
            yield this.buildCurrentFolderFromEntry();
            try {
                const data = yield this.createFolder();
                this.folderId = data.id;
            }
            catch (error) {
                // @TODO: Handle 429
                if (error.code !== ERROR_CODE_ITEM_NAME_IN_USE) {
                    errorCallback(error);
                    return;
                }
                this.folderId = error.context_info.conflicts[0].id;
            }
            // The root folder has already been added to the upload queue in ContentUploader
            if (isRoot) {
                return;
            }
            this.addFolderToUploadQueue([
                {
                    extension: '',
                    name: this.name,
                    status: STATUS_COMPLETE,
                    isFolder: true,
                    size: 1,
                    progress: 100,
                },
            ]);
        });
        /**
         * Format files to Array<UploadFileWithAPIOptions> for upload
         *
         * @private
         * @returns {Array<UploadFileWithAPIOptions>}
         */
        this.getFormattedFiles = () => this.files.map((file) => ({
            file,
            options: Object.assign({}, this.fileAPIOptions, { folderId: this.folderId, uploadInitTimestamp: Date.now() }),
        }));
        /**
         * Create FolderUploadNode instances from entries
         *
         * @private
         * @param {Array<FileSystemFileEntry>} entries
         * @returns {Promise<any>}
         */
        this.createFolderUploadNodesFromEntries = (entries) => __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(entries.map((entry) => __awaiter(this, void 0, void 0, function* () {
                const { isFile, name } = entry;
                if (isFile) {
                    const file = yield getFileFromEntry(entry);
                    this.files.push(file);
                    return;
                }
                this.folders[name] = new FolderUploadNode(name, this.addFilesToUploadQueue, this.addFolderToUploadQueue, this.fileAPIOptions, Object.assign({}, this.baseAPIOptions, this.fileAPIOptions), entry);
            })));
        });
        /**
         * Recursively read an entry
         *
         * @private
         * @param {DirectoryReader} reader
         * @param {Function} resolve
         * @returns {void}
         */
        this.readEntry = (reader, resolve) => {
            reader.readEntries((entries) => __awaiter(this, void 0, void 0, function* () {
                // Quit recursing when there are no remaining entries.
                if (!entries.length) {
                    resolve();
                    return;
                }
                yield this.createFolderUploadNodesFromEntries(entries);
                this.readEntry(reader, resolve);
            }), noop);
        };
        /**
         * Build current folder from entry
         *
         * @private
         * @returns {Promise<any>}
         */
        this.buildCurrentFolderFromEntry = () => {
            if (!this.entry) {
                return Promise.resolve();
            }
            return new Promise(resolve => {
                // $FlowFixMe entry is not empty
                const reader = this.entry.createReader();
                this.readEntry(reader, resolve);
            });
        };
        this.name = name;
        this.addFilesToUploadQueue = addFilesToUploadQueue;
        this.addFolderToUploadQueue = addFolderToUploadQueue;
        this.fileAPIOptions = fileAPIOptions;
        this.baseAPIOptions = baseAPIOptions;
        this.entry = entry;
    }
    /**
     * Upload a folder
     *
     * @public
     * @param {string} parentFolderId
     * @param {Function} errorCallback
     * @param {boolean} isRoot
     * @returns {Promise}
     */
    upload(parentFolderId, errorCallback, isRoot = false) {
        return __awaiter(this, void 0, void 0, function* () {
            this.parentFolderId = parentFolderId;
            yield this.createAndUploadFolder(errorCallback, isRoot);
            this.addFilesToUploadQueue(this.getFormattedFiles(), noop, true);
            yield this.uploadChildFolders(errorCallback);
        });
    }
    /**
     * Promisify create folder
     *
     * @private
     * @returns {Promise}
     */
    createFolder() {
        const folderAPI = new FolderAPI(Object.assign({}, this.baseAPIOptions, { id: `folder_${this.parentFolderId}` }));
        return new Promise((resolve, reject) => {
            folderAPI.create(this.parentFolderId, this.name, resolve, reject);
        });
    }
}
export default FolderUploadNode;
//# sourceMappingURL=FolderUploadNode.js.map