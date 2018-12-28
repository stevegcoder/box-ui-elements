var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { withData } from 'leche';
import MultiputPart, { PART_STATE_UPLOADED } from '../MultiputPart';
describe('api/uploads/MultiputPart', () => {
    const options = {};
    const index = 0;
    const offset = 0;
    const partSize = 1;
    const fileSize = 10;
    const sessionId = 1;
    const sessionEndpoints = {};
    const config = {};
    const getNumPartsUploading = jest.fn();
    let MultiputPartTest;
    beforeEach(() => {
        MultiputPartTest = new MultiputPart(options, index, offset, partSize, fileSize, sessionId, sessionEndpoints, config, getNumPartsUploading);
    });
    describe('upload()', () => {
        test('should throw error if sha256 is not available', () => {
            MultiputPartTest.destroyed = false;
            MultiputPartTest.blob = {};
            MultiputPartTest.xhr.uploadFile = jest.fn();
            expect(MultiputPartTest.upload.bind(MultiputPartTest)).toThrowError(/Part SHA-256 unavailable/);
            expect(MultiputPartTest.xhr.uploadFile).not.toHaveBeenCalled();
        });
        test('should throw error if blob is not available', () => {
            MultiputPartTest.destroyed = false;
            MultiputPartTest.sha256 = '123';
            MultiputPartTest.xhr.uploadFile = jest.fn();
            expect(MultiputPartTest.upload.bind(MultiputPartTest)).toThrowError(/Part blob unavailable/);
            expect(MultiputPartTest.xhr.uploadFile).not.toHaveBeenCalled();
        });
        test('should upload file properly', () => {
            MultiputPartTest.destroyed = false;
            MultiputPartTest.sha256 = '123';
            MultiputPartTest.blob = {};
            MultiputPartTest.xhr.uploadFile = jest.fn();
            MultiputPartTest.upload();
        });
    });
    describe('uploadSuccessHandler()', () => {
        test('should noop if destroyed', () => {
            MultiputPartTest.destroyed = true;
            MultiputPartTest.onSuccess = jest.fn();
            MultiputPartTest.uploadSuccessHandler({});
            expect(MultiputPartTest.onSuccess).not.toHaveBeenCalled();
        });
        test('should call onSuccess and update attributes properly', () => {
            const data = { hi: 1 };
            MultiputPartTest.destroyed = false;
            MultiputPartTest.onSuccess = jest.fn();
            MultiputPartTest.uploadSuccessHandler({ data });
            expect(MultiputPartTest.data).toBe(data);
            expect(MultiputPartTest.blob).toBeNull();
            expect(MultiputPartTest.onSuccess).toHaveBeenCalledWith(MultiputPartTest);
            expect(MultiputPartTest.state).toBe(PART_STATE_UPLOADED);
        });
    });
    describe('uploadProgressHandler()', () => {
        test('should noop if destroyed', () => {
            MultiputPartTest.destroyed = true;
            MultiputPartTest.onSuccess = jest.fn();
            MultiputPartTest.uploadProgressHandler();
            expect(MultiputPartTest.onSuccess).not.toHaveBeenCalled();
        });
        test('should call onProgress and update attributes properly', () => {
            const event = { loaded: 1 };
            MultiputPartTest.destroyed = false;
            MultiputPartTest.onProgress = jest.fn();
            MultiputPartTest.uploadProgressHandler(event);
            expect(MultiputPartTest.uploadedBytes).toBe(1);
            expect(MultiputPartTest.onProgress).toHaveBeenCalled();
        });
    });
    describe('uploadErrorHandler()', () => {
        beforeEach(() => {
            MultiputPartTest.xhr = {
                xhr: {
                    readyState: 'readyState',
                    statusText: 'statusText',
                },
            };
        });
        test('should noop if destroyed', () => {
            MultiputPartTest.destroyed = true;
            MultiputPartTest.onSuccess = jest.fn();
            MultiputPartTest.uploadErrorHandler();
            expect(MultiputPartTest.onSuccess).not.toHaveBeenCalled();
        });
        test('should log error, and call onError when retry is exhausted', () => {
            const error = { message: 'no' };
            MultiputPartTest.destroyed = false;
            MultiputPartTest.numUploadRetriesPerformed = 100;
            MultiputPartTest.config.retries = 1;
            MultiputPartTest.logEvent = jest.fn();
            MultiputPartTest.onError = jest.fn();
            MultiputPartTest.uploadErrorHandler(error);
            expect(MultiputPartTest.logEvent).toHaveBeenCalled();
            expect(MultiputPartTest.onError).toHaveBeenCalled();
        });
        test('should retry upload after delay when retry is not exhausted', () => {
            const error = { message: 'no' };
            jest.useFakeTimers();
            MultiputPart.getBoundedExpBackoffRetryDelay = jest.fn().mockReturnValueOnce(10);
            MultiputPartTest.destroyed = false;
            MultiputPartTest.numUploadRetriesPerformed = 100;
            MultiputPartTest.config.retries = 1000;
            MultiputPartTest.logEvent = jest.fn();
            MultiputPartTest.onError = jest.fn();
            MultiputPartTest.retryUpload = jest.fn();
            MultiputPartTest.uploadErrorHandler(error);
            jest.runOnlyPendingTimers();
            expect(MultiputPartTest.numUploadRetriesPerformed).toBe(101);
            expect(MultiputPartTest.logEvent).toHaveBeenCalled();
            expect(MultiputPartTest.onError).not.toHaveBeenCalled();
            jest.clearAllTimers();
        });
    });
    describe('retryUpload()', () => {
        test('should noop if destroyed', () => {
            MultiputPartTest.destroyed = true;
            MultiputPartTest.onSuccess = jest.fn();
            MultiputPartTest.retryUpload();
            expect(MultiputPartTest.onSuccess).not.toHaveBeenCalled();
        });
        test('should call upload when upload is incomplete', () => __awaiter(this, void 0, void 0, function* () {
            MultiputPartTest.destroyed = false;
            MultiputPartTest.uploadedBytes = 1;
            MultiputPartTest.size = 100;
            MultiputPartTest.numUploadRetriesPerformed = 0;
            MultiputPartTest.upload = jest.fn();
            yield MultiputPartTest.retryUpload();
            expect(MultiputPartTest.numUploadRetriesPerformed).toBe(1);
        }));
        test('should call uploadSuccessHandler when upload is already available on the server', () => __awaiter(this, void 0, void 0, function* () {
            const part = {
                offset: 1,
                part_id: 1,
            };
            const parts = [part];
            MultiputPartTest.destroyed = false;
            MultiputPartTest.uploadedBytes = 100;
            MultiputPartTest.size = 100;
            MultiputPartTest.offset = 1;
            MultiputPartTest.numUploadRetriesPerformed = 0;
            MultiputPartTest.upload = jest.fn();
            MultiputPartTest.uploadSuccessHandler = jest.fn();
            MultiputPartTest.listParts = jest.fn().mockReturnValueOnce(Promise.resolve(parts));
            yield MultiputPartTest.retryUpload();
            expect(MultiputPartTest.upload).not.toHaveBeenCalled();
            expect(MultiputPartTest.uploadSuccessHandler).toHaveBeenCalledWith({
                data: { part },
            });
        }));
        withData([
            [
                {
                    offset: 1,
                    part_id: 1,
                },
                {
                    offset: 1,
                    part_id: 1,
                },
            ],
            [
                {
                    offset: 1,
                },
            ],
            [
                {
                    offset: 2,
                    part_id: 1,
                },
            ],
        ], parts => {
            test('should call upload when upload is not available on the server', () => __awaiter(this, void 0, void 0, function* () {
                MultiputPartTest.destroyed = false;
                MultiputPartTest.uploadedBytes = 100;
                MultiputPartTest.size = 100;
                MultiputPartTest.numUploadRetriesPerformed = 0;
                MultiputPartTest.upload = jest.fn();
                MultiputPartTest.uploadSuccessHandler = jest.fn();
                MultiputPartTest.listParts = jest.fn().mockReturnValueOnce(Promise.resolve(parts));
                yield MultiputPartTest.retryUpload();
                expect(MultiputPartTest.numUploadRetriesPerformed).toBe(1);
                expect(MultiputPartTest.uploadSuccessHandler).not.toHaveBeenCalled();
            }));
        });
    });
    describe('cancel()', () => {
        test('should tear down properly', () => {
            MultiputPartTest.blob = new Blob();
            MultiputPartTest.data = { hi: 1 };
            MultiputPartTest.destroy = jest.fn();
            MultiputPartTest.cancel();
            expect(MultiputPartTest.blob).toBeNull();
            expect(MultiputPartTest.data).toEqual({});
        });
    });
    describe('listParts()', () => {
        test('should GET from correct endpoint and return entries', () => __awaiter(this, void 0, void 0, function* () {
            const endpoint = 'www.box.com';
            const entries = [1];
            MultiputPart.updateQueryParameters = jest.fn().mockReturnValueOnce(endpoint);
            MultiputPartTest.xhr = {
                get: jest.fn().mockReturnValueOnce(Promise.resolve({ entries })),
            };
            const res = yield MultiputPartTest.listParts(1, 1);
            expect(res).toBe(entries);
        }));
    });
});
//# sourceMappingURL=MultiputPart-test.js.map