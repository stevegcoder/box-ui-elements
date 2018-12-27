import { shallow } from 'enzyme';
describe('components/ContentSidebar/Skills/Keywords/ReadOnlyKeywords', () => {
    test('should correctly render with no keyword selected', () => {
        const props = {
            keywords: [{ text: 'foo', appears: [{ start: 1 }] }, { text: 'bar', appears: [{ start: 5 }] }],
        };
        const wrapper = shallow(Object.assign({}, props) /  > );
        expect(wrapper).toMatchSnapshot();
    });
    test('should correctly render timeline with keyword selected', () => {
        const props = {
            keywords: [{ text: 'foo', appears: [{ start: 1 }] }, { text: 'bar', appears: [{ start: 5 }] }],
        };
        const wrapper = shallow(Object.assign({}, props) /  > );
        wrapper.setState({ selected: { text: 'foo', value: 1 } });
        expect(wrapper).toMatchSnapshot();
    });
});
//# sourceMappingURL=ReadOnlyKeywords-test.js.map