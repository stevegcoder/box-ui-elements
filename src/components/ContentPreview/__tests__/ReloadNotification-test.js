import { shallow } from 'enzyme';
const getWrapper = () => shallow(/>);, describe('components/ContentPreview/ReloadNotification', () => {
    describe('render()', () => {
        test('should render correctly', () => {
            const wrapper = getWrapper();
            expect(wrapper).toMatchSnapshot();
        });
    });
}));
//# sourceMappingURL=ReloadNotification-test.js.map