import { withData } from 'leche';
import BaseMultiput from '../BaseMultiput';

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

describe('api/uploads/BaseMultiput', () => {
    let BaseMultiputTest;
    beforeEach(() => {
        BaseMultiputTest = new BaseMultiput(
            {
                consoleLog: true,
            },
            {},
            {},
        );
    });
    describe('logEvent()', () => {
        const event_type = 'event_type';
        const event_info = 'event_info';
        withData(
            [
                [
                    null,
                    {
                        event_type,
                    },
                ],
                [
                    event_info,
                    {
                        event_type,
                        event_info,
                    },
                ],
            ],
            (eventInfo, expectedData) => {
                test('should POST to the correct endpoint', () =>
                    __awaiter(this, void 0, void 0, function*() {
                        BaseMultiputTest.sessionEndpoints.logEvent = 'logEvent';
                        BaseMultiputTest.xhr.post = jest.fn().mockReturnValueOnce('expected');
                        expect(yield BaseMultiputTest.logEvent(event_type, eventInfo)).toBe('expected');
                        expect(BaseMultiputTest.xhr.post).toHaveBeenCalledWith({
                            url: 'logEvent',
                            data: expectedData,
                        });
                    }));
            },
        );
    });
});
// # sourceMappingURL=BaseMultiput-test.js.map
