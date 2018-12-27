import { shallow } from 'enzyme';
import { ERROR_CODE_UNEXPECTED_EXCEPTION } from '../../../constants';
describe('components/ErrorBoundary', () => {
    const WrappedComponent = () => Test < /div>;;
    const wrappedError = new Error('ERROR');
    const getWrapper = props => shallow(Object.assign({}, props) >
        />
        < /ErrorBoundary>,);
    const simulateError = wrapper => {
        wrapper.find(WrappedComponent).simulateError(wrappedError);
    };
    describe('render()', () => {
        test('should render the wrapped component when no error is thrown', () => {
            const wrapper = getWrapper();
            expect(wrapper).toMatchSnapshot();
        });
        test('should render default error component an error is thrown', () => {
            const wrapper = getWrapper();
            simulateError(wrapper);
            expect(wrapper.find('DefaultError').exists()).toBe(true);
        });
        test('should render the component specified when an error is thrown', () => {
            const ErrorComponent = () => Error < /div>;;
            const wrapper = getWrapper({
                errorComponent: ErrorComponent,
            });
            simulateError(wrapper);
            expect(wrapper.find(ErrorComponent).exists()).toBe(true);
        });
    });
    describe('componentDidCatch()', () => {
        const origin = 'some_component';
        test('should set the error state and call the onError callback', () => {
            const onError = jest.fn();
            const wrapper = getWrapper({
                onError,
                errorOrigin: origin,
            });
            simulateError(wrapper);
            expect(onError).toHaveBeenCalledWith({
                type: 'error',
                code: ERROR_CODE_UNEXPECTED_EXCEPTION,
                message: wrappedError.message,
                origin,
                context_info: expect.objectContaining({
                    isErrorDisplayed: true,
                }),
            });
        });
    });
});
//# sourceMappingURL=ErrorBoundary-test.js.map