import { shallow } from 'enzyme';
import MenuItem from 'box-react-ui/lib/components/menu/MenuItem';
describe('components/Pagination/PaginationMenu', () => {
    test.each([1, 5, 10])('should render a button and menu with %i menu items', pageCount => {
        const wrapper = shallow(onPageClick, { jest, : .fn() }, pageCount = { pageCount }, pageNumber = { 1:  } /  > );
        expect(wrapper).toMatchSnapshot();
    });
    describe('page click handler', () => {
        test('should return the page number when an item is clicked', () => {
            const onClick = jest.fn();
            const wrapper = shallow(onPageClick, { onClick }, pageCount = { 10:  }, pageNumber = { 1:  } /  > );
            wrapper
                .find(MenuItem)
                .at(2)
                .simulate('click');
            expect(onClick).toBeCalledWith(3);
        });
    });
});
//# sourceMappingURL=PaginationMenu-test.js.map