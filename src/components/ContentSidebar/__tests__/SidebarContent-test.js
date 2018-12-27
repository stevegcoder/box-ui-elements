import { shallow } from 'enzyme';
describe('components/ContentSidebar/SidebarContent', () => {
    const getWrapper = props => shallow(Object.assign({}, props) /  > );
    test('should render sidebar content component', () => {
        const wrapper = getWrapper({
            title: 'title',
            children: 'children',
        });
        expect(wrapper).toMatchSnapshot();
    });
});
//# sourceMappingURL=SidebarContent-test.js.map