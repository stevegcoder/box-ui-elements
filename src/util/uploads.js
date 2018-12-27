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
 * @file Utility functions for uploads
 * @author Box
 */
import getProp from 'lodash/get';
const DEFAULT_API_OPTIONS = {};
/**
 * Returns true if file contains API options
 *
 * @param {UploadFile | UploadFileWithAPIOptions} item
 * @returns {boolean}
 */
function doesFileContainAPIOptions(file) {
    // $FlowFixMe UploadFileWithAPIOptions has `file` and `options` properties
    return !!(file.options && file.file);
}
/**
 * Returns true if item contains API options
 *
 * @param {DataTransferItem | UploadDataTransferItemWithAPIOptions} item
 * @returns {boolean}
 */
function doesDataTransferItemContainAPIOptions(item) {
    // $FlowFixMe UploadDataTransferItemWithAPIOptions has `item` and `options` properties
    return !!(item.options && item.item);
}
/**
 * Converts UploadFile or UploadFileWithAPIOptions to UploadFile
 *
 * @param {UploadFile | UploadFileWithAPIOptions} file
 * @returns {UploadFile}
 */
function getFile(file) {
    if (doesFileContainAPIOptions(file)) {
        return ((file) => ).file;
    }
    return ((file) => );
}
/**
 * Converts DataTransferItem or UploadDataTransferItemWithAPIOptions to DataTransferItem
 *
 * @param {DataTransferItem | UploadDataTransferItemWithAPIOptions} item
 * @returns {DataTransferItem}
 */
function getDataTransferItem(item) {
    if (doesDataTransferItemContainAPIOptions(item)) {
        return ((item) => ).item;
    }
    return ((item) => );
}
/**
 * Get API Options from file
 *
 * @param {UploadFile | UploadFileWithAPIOptions} file
 * @returns {UploadItemAPIOptions}
 */
function getFileAPIOptions(file) {
    if (doesFileContainAPIOptions(file)) {
        return ((file) => ).options || DEFAULT_API_OPTIONS;
    }
    return DEFAULT_API_OPTIONS;
}
/**
 * Get API Options from item
 *
 * @param {DataTransferItem | UploadDataTransferItemWithAPIOptions} item
 * @returns {UploadItemAPIOptions}
 */
function getDataTransferItemAPIOptions(item) {
    if (doesDataTransferItemContainAPIOptions(item)) {
        return ((item) => ).options || DEFAULT_API_OPTIONS;
    }
    return DEFAULT_API_OPTIONS;
}
/**
 * Returns true if the given object is a Date instance encoding a valid date
 * (i.e. new Date('this is not a timestamp') should return false).
 *
 * Code adapted from
 * http://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
 *
 * @param {Date} date
 * @return {boolean}
 */
function isValidDateObject(date) {
    return Object.prototype.toString.call(date) === '[object Date]' && !Number.isNaN(date.getTime());
}
/**
 * Remove milliseconds from date time string
 *
 * @param {Date} date
 * @return {string}
 */
function toISOStringNoMS(date) {
    return date.toISOString().replace(/\.[0-9]{3}/, '');
}
/**
 * Returns the file's last modified date as an ISO string with no MS component (e.g.
 * '2017-04-18T17:14:27Z'), or null if no such date can be extracted from the file object.
 * (Nothing on the Internet guarantees that the file object has this info.)
 *
 * @param {UploadFile} file
 * @return {?string}
 */
function getFileLastModifiedAsISONoMSIfPossible(file) {
    if (
    // $FlowFixMe https://github.com/facebook/flow/issues/6131
    file.lastModified &&
        (typeof file.lastModified === 'string' ||
            typeof file.lastModified === 'number' ||
            file.lastModified instanceof Date)) {
        const lastModifiedDate = new Date(file.lastModified);
        if (isValidDateObject(lastModifiedDate)) {
            return toISOStringNoMS(lastModifiedDate);
        }
    }
    return null;
}
/**
 * If maybeJson is valid JSON string, return the result of calling JSON.parse
 * on it.  Otherwise, return null.
 *
 * @param {string} maybeJson
 * @return {?Object}
 */
function tryParseJson(maybeJson) {
    try {
        return JSON.parse(maybeJson);
    }
    catch (e) {
        return null;
    }
}
/**
 * Get bounded exponential backoff retry delay
 *
 * @param {number} initialRetryDelay
 * @param {number} maxRetryDelay
 * @param {number} retryNum - Current retry number (first retry will have value of 0).
 * @return {number}
 */
function getBoundedExpBackoffRetryDelay(initialRetryDelay, maxRetryDelay, retryNum) {
    const delay = initialRetryDelay * Math.pow(retryNum, 2);
    return delay > maxRetryDelay ? maxRetryDelay : delay;
}
/**
 * Get entry from dataTransferItem
 *
 * @param {DataTransferItem} item
 * @returns {FileSystemFileEntry}
 */
function getEntryFromDataTransferItem(item) {
    const entry = 
    // $FlowFixMe
    item.webkitGetAsEntry || item.mozGetAsEntry || item.getAsEntry;
    return entry.call(item);
}
/**
 * Check if a dataTransferItem is a folder
 *
 * @param {UploadDataTransferItemWithAPIOptions | DataTransferItem} itemData
 * @returns {boolean}
 */
function isDataTransferItemAFolder(itemData) {
    const item = getDataTransferItem(itemData);
    const entry = getEntryFromDataTransferItem(((item) => ));
    if (!entry) {
        return false;
    }
    return entry.isDirectory;
}
/**
 * Get file from FileSystemFileEntry
 *
 * @param {FileSystemFileEntry} entry
 * @returns {Promise<UploadFile>}
 */
function getFileFromEntry(entry) {
    return new Promise(resolve => {
        entry.file(file => {
            resolve(file);
        });
    });
}
/**
 * Get file from DataTransferItem or UploadDataTransferItemWithAPIOptions
 *
 * @param {UploadDataTransferItemWithAPIOptions | DataTransferItem} itemData
 * @returns {Promise<UploadFile | UploadFileWithAPIOptions | null>}
 */
function getFileFromDataTransferItem(itemData) {
    return __awaiter(this, void 0, void 0, function* () {
        const item = getDataTransferItem(itemData);
        const entry = getEntryFromDataTransferItem(((item) => ));
        if (!entry) {
            return null;
        }
        const file = yield getFileFromEntry(entry);
        if (doesDataTransferItemContainAPIOptions(itemData)) {
            return {
                file: ((file) => ),
                options: getDataTransferItemAPIOptions(itemData),
            };
        }
        return file;
    });
}
/**
 * Generates file id based on file properties
 *
 * When folderId or uploadInitTimestamp is missing from file options, file name is returned as file id.
 * Otherwise, fileName_folderId_uploadInitTimestamp is used as file id.
 *
 * @param {UploadFileWithAPIOptions | UploadFile} file
 * @param {string} rootFolderId
 * @returns {string}
 */
function getFileId(file, rootFolderId) {
    if (!doesFileContainAPIOptions(file)) {
        return ((file) => ).name;
    }
    const fileWithOptions = ((file) => );
    const folderId = getProp(fileWithOptions, 'options.folderId', rootFolderId);
    const uploadInitTimestamp = getProp(fileWithOptions, 'options.uploadInitTimestamp', Date.now());
    const fileName = fileWithOptions.file.webkitRelativePath || fileWithOptions.file.name;
    return `${fileName}_${folderId}_${uploadInitTimestamp}`;
}
/**
 * Generates item id based on item properties
 * E.g., folder1_0_123124124
 *
 * @param {DataTransferItem | UploadDataTransferItemWithAPIOptions} itemData
 * @param {string} rootFolderId
 * @returns {string}
 */
function getDataTransferItemId(itemData, rootFolderId) {
    const item = getDataTransferItem(itemData);
    const { name } = getEntryFromDataTransferItem(item);
    const { folderId = rootFolderId, uploadInitTimestamp = Date.now() } = getDataTransferItemAPIOptions(itemData);
    return `${name}_${folderId}_${uploadInitTimestamp}`;
}
/**
 * Multiput uploads require the use of crypto, which is only supported in secure contexts
 */
function isMultiputSupported() {
    const cryptoObj = window.crypto || window.msCrypto;
    return window.location.protocol === 'https:' && cryptoObj && cryptoObj.subtle;
}
export { DEFAULT_API_OPTIONS, doesDataTransferItemContainAPIOptions, doesFileContainAPIOptions, getBoundedExpBackoffRetryDelay, getDataTransferItem, getDataTransferItemAPIOptions, getDataTransferItemId, getEntryFromDataTransferItem, getFile, getFileAPIOptions, getFileFromDataTransferItem, getFileFromEntry, getFileId, getFileLastModifiedAsISONoMSIfPossible, isDataTransferItemAFolder, isMultiputSupported, toISOStringNoMS, tryParseJson, };
//# sourceMappingURL=uploads.js.map