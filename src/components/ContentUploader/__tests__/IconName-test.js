import { shallow } from 'enzyme';
describe('components/ContentUploader/IconName', () => {
    const getWrapper = props => shallow(name, "hi", extension = "pdf", Object.assign({}, props) /  > );
    test('should render file IconName correctly', () => {
        const wrapper = getWrapper();
        expect(wrapper).toMatchSnapshot();
    });
    test('should render folder IconName correctly', () => {
        const wrapper = getWrapper({ isFolder: true });
        expect(wrapper).toMatchSnapshot();
    });
});
//# sourceMappingURL=IconName-test.js.map