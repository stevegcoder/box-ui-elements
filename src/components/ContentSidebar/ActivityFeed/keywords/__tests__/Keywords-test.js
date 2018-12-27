import { shallow } from 'enzyme';
describe('components/ContentSidebar/ActivityFeed/keywords/Keywords', () => {
    test('should correctly render keywords', () => {
        const props = {
            action: 'applied',
            words: 'cartoon font logo brand clip art illustration line artwork',
        };
        const wrapper = shallow(Object.assign({}, props) /  > );
        expect(wrapper).toMatchSnapshot();
    });
    test('should not render info icon if words are not passed', () => {
        const props = { action: 'applied', words: '' };
        const wrapper = shallow(Object.assign({}, props) /  > );
        expect(wrapper).toMatchSnapshot();
    });
    test('should correctly render info icon', () => {
        const wrapper = shallow(action, "applied", words = "cartoon font logo" /  > );
        const info = shallow(wrapper.find('Info').getElement());
        expect(info).toMatchSnapshot();
    });
});
//# sourceMappingURL=Keywords-test.js.map