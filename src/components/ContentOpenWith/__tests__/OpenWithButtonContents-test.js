import { shallow } from 'enzyme';
describe('components/ContentOpenWith/MultipleIntegrationsOpenWithButton', () => {
    const getWrapper = props => shallow(Object.assign({}, props) /  > );
    test('should render contents', () => {
        const wrapper = getWrapper({});
        expect(wrapper).toMatchSnapshot();
    });
    test('should render children if provided', () => {
        const wrapper = getWrapper({ children: /> });,
            expect(wrapper) { }, : .toMatchSnapshot()
        });
    });
});
//# sourceMappingURL=OpenWithButtonContents-test.js.map