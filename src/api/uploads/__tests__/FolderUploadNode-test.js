import noop from 'lodash/noop';
import FolderUploadNode from '../FolderUploadNode';
import FolderAPI from '../../Folder';
import { ERROR_CODE_ITEM_NAME_IN_USE, STATUS_COMPLETE } from '../../../constants';

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

jest.mock('../../../api/Folder');
jest.mock('../../../util/uploads', () =>
    Object.assign({}, require.requireActual('../../../util/uploads'), { getFileFromEntry: jest.fn(entry => entry) }),
);
let folderUploadNodeInstance;
let folderCreateMock;
describe('api/uploads/FolderUploadNode', () => {
    const name = 'hi';
    beforeEach(() => {
        folderUploadNodeInstance = new FolderUploadNode(name, noop, noop, {}, {});
        folderCreateMock = jest.fn((a, b, resolve) => {
            resolve();
        });
        FolderAPI.mockClear();
        FolderAPI.mockImplementation(() => ({
            create: folderCreateMock,
        }));
    });
    describe('upload()', () => {
        test('should call createAndUploadFolder(), addFilesToUploadQueue() and uploadChildFolders()', () =>
            __awaiter(this, void 0, void 0, function*() {
                const errorCallback = () => 'errorCallback';
                const parentFolderId = '0';
                const isRoot = true;
                const files = [{ file: 1 }];
                folderUploadNodeInstance.createAndUploadFolder = jest.fn(() => Promise.resolve());
                folderUploadNodeInstance.addFilesToUploadQueue = jest.fn();
                folderUploadNodeInstance.uploadChildFolders = jest.fn();
                folderUploadNodeInstance.getFormattedFiles = jest.fn(() => files);
                yield folderUploadNodeInstance.upload(parentFolderId, errorCallback, isRoot);
                expect(folderUploadNodeInstance.createAndUploadFolder).toHaveBeenCalledWith(errorCallback, isRoot);
                expect(folderUploadNodeInstance.addFilesToUploadQueue).toHaveBeenCalledWith(
                    files,
                    expect.any(Function),
                    true,
                );
                expect(folderUploadNodeInstance.uploadChildFolders).toHaveBeenCalledWith(errorCallback);
            }));
    });
    describe('uploadChildFolders()', () => {
        test('should upload all child folders', () =>
            __awaiter(this, void 0, void 0, function*() {
                const errorCallback = () => 'errorCallback';
                const upload1 = jest.fn();
                const upload2 = jest.fn();
                folderUploadNodeInstance.folders = {
                    a: {
                        upload: upload1,
                    },
                    b: {
                        upload: upload2,
                    },
                };
                folderUploadNodeInstance.folderId = '123';
                yield folderUploadNodeInstance.uploadChildFolders(errorCallback);
                expect(upload1).toHaveBeenCalledWith(folderUploadNodeInstance.folderId, errorCallback);
            }));
    });
    describe('createAndUploadFolder()', () => {
        test('should create folder', () =>
            __awaiter(this, void 0, void 0, function*() {
                const folderId = '1';
                const errorCallback = () => 'errorCallback';
                const isRoot = true;
                folderUploadNodeInstance.createFolder = jest.fn(() => ({
                    id: folderId,
                }));
                folderUploadNodeInstance.addFolderToUploadQueue = jest.fn();
                yield folderUploadNodeInstance.createAndUploadFolder(errorCallback, isRoot);
                expect(folderUploadNodeInstance.createFolder).toHaveBeenCalledWith();
                expect(folderUploadNodeInstance.folderId).toBe(folderId);
            }));
        test('should call errorCallback when create folder fails and error code is not ITEM_NAME_IN_USE', () =>
            __awaiter(this, void 0, void 0, function*() {
                const errorCallback = jest.fn();
                const isRoot = true;
                const error = { code: 'random' };
                folderUploadNodeInstance.createFolder = jest.fn(() => Promise.reject(error));
                folderUploadNodeInstance.addFolderToUploadQueue = jest.fn();
                yield folderUploadNodeInstance.createAndUploadFolder(errorCallback, isRoot);
                expect(errorCallback).toHaveBeenCalledWith(error);
            }));
        test('should recovery correctly from ITEM_NAME_IN_USE', () =>
            __awaiter(this, void 0, void 0, function*() {
                const errorCallback = jest.fn();
                const folderId = '1';
                const isRoot = true;
                const error = {
                    code: ERROR_CODE_ITEM_NAME_IN_USE,
                    context_info: { conflicts: [{ id: folderId }] },
                };
                folderUploadNodeInstance.createFolder = jest.fn(() => Promise.reject(error));
                folderUploadNodeInstance.addFolderToUploadQueue = jest.fn();
                yield folderUploadNodeInstance.createAndUploadFolder(errorCallback, isRoot);
                expect(errorCallback).not.toHaveBeenCalledWith(error);
                expect(folderUploadNodeInstance.folderId).toBe(folderId);
            }));
        test('should call addFolderToUploadQueue when folder is created successfully for non-root folder', () =>
            __awaiter(this, void 0, void 0, function*() {
                const folderId = '1';
                const errorCallback = () => 'errorCallback';
                const isRoot = false;
                folderUploadNodeInstance.name = name;
                folderUploadNodeInstance.createFolder = jest.fn(() => ({
                    id: folderId,
                }));
                folderUploadNodeInstance.addFolderToUploadQueue = jest.fn();
                yield folderUploadNodeInstance.createAndUploadFolder(errorCallback, isRoot);
                expect(folderUploadNodeInstance.addFolderToUploadQueue).toHaveBeenCalledWith([
                    {
                        extension: '',
                        name,
                        status: STATUS_COMPLETE,
                        isFolder: true,
                        size: 1,
                        progress: 100,
                    },
                ]);
            }));
        test('should not addFolderToUploadQueue() when folder is created successfully for root folder', () =>
            __awaiter(this, void 0, void 0, function*() {
                const folderId = '1';
                const errorCallback = () => 'errorCallback';
                const isRoot = true;
                folderUploadNodeInstance.name = name;
                folderUploadNodeInstance.createFolder = jest.fn(() => ({
                    id: folderId,
                }));
                folderUploadNodeInstance.addFolderToUploadQueue = jest.fn();
                yield folderUploadNodeInstance.createAndUploadFolder(errorCallback, isRoot);
                expect(folderUploadNodeInstance.addFolderToUploadQueue).not.toHaveBeenCalled();
            }));
    });
    describe('getFormattedFiles()', () => {
        test('should return correctly formatted file', () => {
            const now = Date.now();
            Date.now = jest.fn(() => now);
            const file1 = { name: 1 };
            const file2 = { name: 2 };
            folderUploadNodeInstance.files = [file1, file2];
            folderUploadNodeInstance.folderId = '1';
            folderUploadNodeInstance.fileAPIOptions = { a: 1, b: 2 };
            const data = folderUploadNodeInstance.getFormattedFiles();
            expect(data).toEqual([
                {
                    file: file1,
                    options: Object.assign({}, folderUploadNodeInstance.fileAPIOptions, {
                        folderId: folderUploadNodeInstance.folderId,
                        uploadInitTimestamp: now,
                    }),
                },
                {
                    file: file2,
                    options: Object.assign({}, folderUploadNodeInstance.fileAPIOptions, {
                        folderId: folderUploadNodeInstance.folderId,
                        uploadInitTimestamp: now,
                    }),
                },
            ]);
        });
    });
    describe('createFolder()', () => {
        test('create folder with folderAPI', () =>
            __awaiter(this, void 0, void 0, function*() {
                const parentFolderId = '0';
                folderUploadNodeInstance.folderId = '123';
                folderUploadNodeInstance.folderId = '123';
                folderUploadNodeInstance.parentFolderId = parentFolderId;
                yield folderUploadNodeInstance.createFolder();
                expect(FolderAPI).toHaveBeenCalled();
                expect(folderCreateMock).toHaveBeenCalled();
            }));
    });
    describe('buildCurrentFolderFromEntry()', () => {
        test('should resolve when entry is empty', () =>
            __awaiter(this, void 0, void 0, function*() {
                folderUploadNodeInstance.entry = undefined;
                try {
                    yield folderUploadNodeInstance.buildCurrentFolderFromEntry();
                } catch (error) {
                    throw Error('buildCurrentFolderFromEntry throws an error');
                }
            }));
        test('should readEntry() when entry is not empty', () =>
            __awaiter(this, void 0, void 0, function*() {
                const reader = { reader: true };
                folderUploadNodeInstance.readEntry = (readerParam, resolve) => {
                    expect(readerParam).toEqual(reader);
                    resolve();
                };
                folderUploadNodeInstance.entry = {
                    createReader: () => reader,
                };
                yield folderUploadNodeInstance.buildCurrentFolderFromEntry();
            }));
    });
    describe('readEntry()', () => {
        test('should call readEntries() on the reader instance', () =>
            __awaiter(this, void 0, void 0, function*() {
                const readEntriesMock = jest.fn();
                const reader = { readEntries: readEntriesMock };
                yield folderUploadNodeInstance.readEntry(reader, noop);
                expect(readEntriesMock).toHaveBeenCalledTimes(1);
            }));
    });
    describe('createFolderUploadNodesFromEntries()', () => {
        test('should create folders and files from entries', () =>
            __awaiter(this, void 0, void 0, function*() {
                const entries = [
                    { name: '1', isFile: true },
                    { name: '2', isFile: false },
                    { name: '3', isFile: true },
                ];
                yield folderUploadNodeInstance.createFolderUploadNodesFromEntries(entries);
                expect(folderUploadNodeInstance.files).toEqual([
                    { name: '1', isFile: true },
                    { name: '3', isFile: true },
                ]);
                expect(Object.keys(folderUploadNodeInstance.folders)).toHaveLength(1);
                expect(folderUploadNodeInstance.folders['2'].name).toEqual('2');
                expect(folderUploadNodeInstance.folders['2'].entry).toEqual(entries[1]);
            }));
    });
});
// # sourceMappingURL=FolderUploadNode-test.js.map
