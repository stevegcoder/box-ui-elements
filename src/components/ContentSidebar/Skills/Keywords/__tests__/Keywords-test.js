import { shallow } from 'enzyme';
describe('components/ContentSidebar/Skills/Keywords/Keywords', () => {
    test('should correctly render read only keywords when not editable', () => {
        const props = {
            card: {
                duration: 100,
                entries: [{ text: 'foo' }, { text: 'bar' }],
            },
            transcript: { duration: 100 },
            isEditable: false,
            onSkillChange: jest.fn(),
        };
        const wrapper = shallow(Object.assign({}, props) /  > );
        expect(wrapper).toMatchSnapshot();
    });
    test('should correctly render keywords which are added but not the ones removed', () => {
        const props = {
            card: {
                duration: 100,
                entries: [{ text: 'foo' }, { text: 'bar' }],
            },
            transcript: { duration: 100 },
            isEditable: false,
            onSkillChange: jest.fn(),
        };
        const wrapper = shallow(Object.assign({}, props) /  > );
        wrapper.setState({
            removes: [props.card.entries[0]],
            adds: [{ text: 'baz' }],
        });
        expect(wrapper).toMatchSnapshot();
    });
    test('should correctly render edit button when editable', () => {
        const props = {
            card: {
                duration: 100,
                entries: [{ text: 'foo' }, { text: 'bar' }],
            },
            transcript: { duration: 100 },
            isEditable: true,
            onSkillChange: jest.fn(),
        };
        const wrapper = shallow(Object.assign({}, props) /  > );
        expect(wrapper).toMatchSnapshot();
    });
    test('should correctly render editable keywords when editable and editmode', () => {
        const props = {
            card: {
                duration: 100,
                entries: [{ text: 'foo' }, { text: 'bar' }],
            },
            transcript: { duration: 100 },
            isEditable: true,
            onSkillChange: jest.fn(),
        };
        const wrapper = shallow(Object.assign({}, props) /  > );
        wrapper.setState({ isEditing: true });
        expect(wrapper).toMatchSnapshot();
    });
    test('should correctly render error mask when no keywords', () => {
        const props = {
            card: {
                duration: 100,
                entries: [],
            },
            transcript: { duration: 100 },
            isEditable: true,
            onSkillChange: jest.fn(),
        };
        const wrapper = shallow(Object.assign({}, props) /  > );
        expect(wrapper).toMatchSnapshot();
    });
    test('should correctly render when isLoading is true', () => {
        const props = {
            card: {
                duration: 100,
                entries: [{ text: 'foo' }, { text: 'bar' }],
            },
            transcript: { duration: 100 },
            isEditable: true,
            onSkillChange: jest.fn(),
        };
        const wrapper = shallow(Object.assign({}, props) /  > );
        wrapper.setState({ isLoading: true });
        expect(wrapper).toMatchSnapshot();
    });
});
//# sourceMappingURL=Keywords-test.js.map