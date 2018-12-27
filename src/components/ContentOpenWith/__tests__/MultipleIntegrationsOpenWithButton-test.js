import { shallow } from 'enzyme';
describe('components/ContentOpenWith/MultipleIntegrationsOpenWithButton', () => {
    const getWrapper = props => shallow(Object.assign({}, props) /  > );
    test('should render button', () => {
        const wrapper = getWrapper({});
        expect(wrapper).toMatchSnapshot();
    });
    test('should pass down props to the button', () => {
        const wrapper = getWrapper({ width: 50 });
        expect(wrapper).toMatchSnapshot();
    });
});
//# sourceMappingURL=MultipleIntegrationsOpenWithButton-test.js.map