import { shallow } from 'enzyme';
describe('components/ContentOpenWith/IntegrationPortalContainer', () => {
    const getWrapper = props => shallow(Object.assign({}, props) /  > );
    it('should render an error mask if an error occurs', () => {
        const wrapper = getWrapper({
            hasError: true,
            integrationWindow: 'window',
        });
        expect(wrapper).toMatchSnapshot();
    });
    it('should render a loading indicator', () => {
        const wrapper = getWrapper({
            hasError: false,
            integrationWindow: 'window',
        });
        expect(wrapper).toMatchSnapshot();
    });
});
//# sourceMappingURL=IntegrationPortalContainer-test.js.map