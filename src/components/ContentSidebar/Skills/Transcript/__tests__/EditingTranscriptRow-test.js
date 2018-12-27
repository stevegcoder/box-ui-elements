import { shallow } from 'enzyme';
describe('components/ContentSidebar/Skills/Transcript/TranscriptRow', () => {
    test('should correctly render with time', () => {
        const wrapper = shallow(time, "123" /  > );
        expect(wrapper).toMatchSnapshot();
    });
    test('should correctly render without time', () => {
        const wrapper = shallow(/>);, expect(wrapper).toMatchSnapshot());
    });
});
//# sourceMappingURL=EditingTranscriptRow-test.js.map