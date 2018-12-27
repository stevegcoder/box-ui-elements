import { mount, shallow } from 'enzyme';
describe('components/ContentSidebar/ActivityFeed/comment/InlineEdit', () => {
    const intl = { formatMessage: () => { } };
    test('should correctly render comment', () => {
        const wrapper = shallow(id, "123", intl = { intl }, toEdit = {}());
        { }
    }, />);, expect(wrapper).toMatchSnapshot());
});
test('should call toEdit handler when comment deletion is confirmed', () => {
    const toEditSpy = jest.fn();
    const wrapper = mount(id, "123", intl = { intl }, toEdit = { toEditSpy } /  > );
    const editBtn = wrapper.find('.bcs-comment-edit').hostNodes();
    editBtn.simulate('click');
    expect(toEditSpy).toHaveBeenCalledWith({ id: '123' });
});
;
//# sourceMappingURL=InlineEdit-test.js.map