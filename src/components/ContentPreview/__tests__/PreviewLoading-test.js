import { shallow } from 'enzyme';
const getWrapper = () => shallow(/>);, describe('components/ContentPreview/PreviewLoading', () => {
    describe('render()', () => {
        test('should render correctly', () => {
            const wrapper = getWrapper();
            expect(wrapper).toMatchSnapshot();
        });
    });
}));
//# sourceMappingURL=PreviewLoading-test.js.map