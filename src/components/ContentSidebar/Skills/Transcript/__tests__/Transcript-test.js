import { shallow } from 'enzyme';
describe('components/ContentSidebar/Skills/Transcript/Transcript', () => {
    test('should correctly render read only Transcript when not editable', () => {
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
    test('should correctly render expand button', () => {
        const props = {
            card: {
                duration: 100,
                entries: [
                    { text: 'foo' },
                    { text: 'bar' },
                    { text: 'bar1' },
                    { text: 'bar2' },
                    { text: 'bar3' },
                    { text: 'bar4' },
                ],
            },
            transcript: { duration: 100 },
            isEditable: true,
            onSkillChange: jest.fn(),
        };
        const wrapper = shallow(Object.assign({}, props) /  > );
        expect(wrapper).toMatchSnapshot();
    });
    test('should correctly render error mask when no Transcript', () => {
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
    test('should correctly render editable Transcript when editable and editmode', () => {
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
//# sourceMappingURL=Transcript-test.js.map