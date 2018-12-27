import { shallow } from 'enzyme';
describe('components/ContentSidebar/Skills/Transcript/TranscriptRow', () => {
    test('should correctly render read when editing', () => {
        const wrapper = shallow(isEditing /  > );
        expect(wrapper).toMatchSnapshot();
    });
    test('should correctly render read when not editing', () => {
        const wrapper = shallow(/>);, expect(wrapper).toMatchSnapshot());
    });
});
//# sourceMappingURL=TranscriptRow-test.js.map