import { shallow } from 'enzyme';
const messages = {};
describe('components/Internationalize', () => {
    test('should contains IntlProvider with correct props', () => {
        const wrapper = shallow(language, "fr-CA", messages = { messages } >
            className, "content" /  >
            /Internationalize>,);
        const intlProvider = wrapper.find('IntlProvider');
        expect(intlProvider.length).toBe(1);
        expect(intlProvider.prop('locale')).toBe('fr');
        expect(intlProvider.prop('messages')).toBe(messages);
    });
    test('should render the children component when initialized', () => {
        const wrapper = shallow(className, "content" /  >
            /Internationalize>,);
        const intlProvider = wrapper.find('IntlProvider');
        expect(intlProvider.length).toBe(0);
        expect(wrapper.contains(className, "content" /  > )).toBeTruthy();
    });
});
//# sourceMappingURL=Internationalize-test.js.map