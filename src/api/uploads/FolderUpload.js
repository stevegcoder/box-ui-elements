/**
 * @was-flow
 * @file Folder upload bootstrapping
 * @author Box
 */
import FolderUploadNode from './FolderUploadNode';
import {
    getEntryFromDataTransferItem,
    getFile,
    getFileAPIOptions,
    getDataTransferItem,
    getDataTransferItemAPIOptions,
} from '../../util/uploads';

const __awaiter =
    (this && this.__awaiter) ||
    function(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))((resolve, reject) => {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator.throw(value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : new P(resolve => {
                          resolve(result.value);
                      }).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
const PATH_DELIMITER = '/';
class FolderUpload {
    /**
     * [constructor]
     *
     * @param {Function} addFilesToUploadQueue
     * @param {string} destinationFolderId
     * @param {Function} addFolderToUploadQueue
     * @param {Object} baseAPIOptions
     * @return {void}
     */
    constructor(addFilesToUploadQueue, destinationFolderId, addFolderToUploadQueue, baseAPIOptions) {
        this.files = [];
        this.addFilesToUploadQueue = addFilesToUploadQueue;
        this.destinationFolderId = destinationFolderId;
        this.addFolderToUploadQueue = addFolderToUploadQueue;
        this.baseAPIOptions = baseAPIOptions;
    }

    /**
     * Create a folder tree from fileList wekbkitRelativePath
     *
     * @public
     * @param  {Array} Array<UploadFileWithAPIOptions | UploadFile> | FileList
     * @returns {void}
     */
    buildFolderTreeFromWebkitRelativePath(fileList) {
        Array.from(fileList).forEach(fileData => {
            const file = getFile(fileData);
            const { webkitRelativePath } = file;
            if (!webkitRelativePath) {
                return;
            }
            const fileAPIOptions = getFileAPIOptions(fileData);
            const pathArray = webkitRelativePath.split(PATH_DELIMITER).slice(0, -1);
            if (pathArray.length <= 0) {
                return;
            }
            // Since only 1 folder tree can be uploaded a time with using webkitRelativePath, the root folder name
            // of all the files should be the same.
            if (!this.folder) {
                const rootFolderName = pathArray[0];
                this.folder = this.createFolderUploadNode(rootFolderName, fileAPIOptions);
            }
            // Add file to the root folder
            if (pathArray.length === 1) {
                this.folder.files.push(file);
            }
            let subTree = this.folder.folders;
            // Walk the path after the root folder
            const pathArryAfterRoot = pathArray.slice(1);
            pathArryAfterRoot.forEach((folderName, index) => {
                // Create new child folder
                if (!subTree[folderName]) {
                    subTree[folderName] = this.createFolderUploadNode(folderName, fileAPIOptions);
                }
                if (index === pathArryAfterRoot.length - 1) {
                    // end of path, push the file
                    subTree[folderName].files.push(file);
                } else {
                    // walk the tree
                    subTree = subTree[folderName].folders;
                }
            });
        });
    }

    /**
     * Build folder tree from dataTransferItem, which can only represent 1 folder tree
     *
     * @param {DataTransferItem | UploadDataTransferItemWithAPIOptions} dataTransferItem
     * @returns {Promise<any>}
     */
    buildFolderTreeFromDataTransferItem(dataTransferItem) {
        return __awaiter(this, void 0, void 0, function*() {
            const item = getDataTransferItem(dataTransferItem);
            const apiOptions = getDataTransferItemAPIOptions(dataTransferItem);
            const entry = getEntryFromDataTransferItem(item);
            const { name } = entry;
            this.folder = this.createFolderUploadNode(name, apiOptions, entry);
        });
    }

    /**
     * Create a FolderUploadNode instance
     *
     * @param {string} name
     * @param {Object} apiOptions
     * @param {FileSystemFileEntry} [entry]
     * @returns {FolderUploadNode}
     */
    createFolderUploadNode(name, apiOptions, entry) {
        return new FolderUploadNode(
            name,
            this.addFilesToUploadQueue,
            this.addFolderToUploadQueue,
            apiOptions,
            Object.assign({}, this.baseAPIOptions, apiOptions),
            entry,
        );
    }

    /**
     * Upload folders
     *
     * @public
     * @param {Object} Options
     * @param {Function} options.errorCallback
     * @returns {Promise<any>}
     */
    upload({ errorCallback, successCallback }) {
        return __awaiter(this, void 0, void 0, function*() {
            yield this.folder.upload(this.destinationFolderId, errorCallback, true);
            // Simulate BoxItem
            successCallback([
                {
                    id: this.folder.folderId,
                },
            ]);
        });
    }

    /**
     * Noop cancel
     *
     * @public
     */
    cancel() {}
}
export default FolderUpload;
// # sourceMappingURL=FolderUpload.js.map
