import { shallow } from 'enzyme';
describe('components/ContentSidebar/ActivityFeed/icons/IconActivityFeedEmptyState', () => {
    test('should correctly add class if passed', () => {
        const wrapper = shallow(className, "test" /  > );
        expect(wrapper).toMatchSnapshot();
    });
    test('should correctly render icon with specified width and height', () => {
        const width = 16;
        const height = 17;
        const wrapper = shallow(width, { width }, height = { height } /  > );
        expect(wrapper).toMatchSnapshot();
    });
});
//# sourceMappingURL=IconActivityFeedEmptyState-test.js.map