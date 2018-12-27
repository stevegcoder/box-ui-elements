import { shallow } from 'enzyme';
const intl = { formatMessage: () => { } };
const translationProps = {
    intl,
};
describe('components/ContentSidebar/ActivityFeed/comment/InlineDelete', () => {
    const id = '123';
    const render = (props = {}) => shallow(Object.assign({}, translationProps), id = { id }, message = "test", onDelete = {}());
    { }
}, Object.assign({}, props) /  > );
test('should correctly render comment', () => {
    const wrapper = render();
    expect(wrapper).toMatchSnapshot();
});
test('should set bcs-is-confirming class when confirm flyout is open', () => {
    const wrapper = render();
    const flyout = wrapper.find('Flyout');
    expect(wrapper.hasClass('bcs-is-confirming')).toBe(false);
    flyout.prop('onOpen')();
    wrapper.update();
    expect(wrapper.hasClass('bcs-is-confirming')).toBe(true);
    flyout.prop('onClose')();
    wrapper.update();
    expect(wrapper.hasClass('bcs-is-confirming')).toBe(false);
});
test('should call onDelete handler when comment deletion is confirmed', () => {
    const onDeleteSpy = jest.fn();
    const permissions = {
        can_edit: true,
        can_delete: false,
    };
    const wrapper = render({ onDelete: onDeleteSpy, permissions });
    const yesBtn = wrapper.find('.bcs-comment-delete-yes');
    yesBtn.simulate('click');
    expect(onDeleteSpy).toHaveBeenCalledWith({ id, permissions });
});
;
//# sourceMappingURL=InlineDelete-test.js.map