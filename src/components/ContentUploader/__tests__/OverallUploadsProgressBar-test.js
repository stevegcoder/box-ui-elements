import noop from 'lodash/noop';
import { shallow } from 'enzyme';
import { VIEW_UPLOAD_IN_PROGRESS, VIEW_UPLOAD_SUCCESS, VIEW_ERROR, VIEW_UPLOAD_EMPTY } from '../../../constants';
describe('components/ContentUploader/OverallUploadsProgressBar', () => {
    const getWrapper = props => shallow(isDragging, { false:  }, isVisible, view = { VIEW_UPLOAD_EMPTY }, percent = { 2:  }, onClick = { noop }, onKeyDown = { noop }, Object.assign({}, props) /  > );
    test('should render correctly when view is VIEW_UPLOAD_EMPTY', () => {
        const wrapper = getWrapper();
        expect(wrapper).toMatchSnapshot();
    });
    test('should render correctly when view is VIEW_UPLOAD_SUCCESS', () => {
        const wrapper = getWrapper({
            view: VIEW_UPLOAD_SUCCESS,
        });
        expect(wrapper).toMatchSnapshot();
    });
    test('should render correctly when view is VIEW_ERROR', () => {
        const wrapper = getWrapper({
            view: VIEW_ERROR,
        });
        expect(wrapper).toMatchSnapshot();
    });
    test('should render correctly when view is VIEW_UPLOAD_IN_PROGRESS', () => {
        const wrapper = getWrapper({
            view: VIEW_UPLOAD_IN_PROGRESS,
        });
        expect(wrapper).toMatchSnapshot();
    });
    test('should render correctly when isVisible is false', () => {
        const wrapper = getWrapper({
            isVisible: false,
            view: VIEW_UPLOAD_SUCCESS,
        });
        expect(wrapper).toMatchSnapshot();
    });
    test('should render correctly when isDragging is true', () => {
        const wrapper = getWrapper({
            view: VIEW_UPLOAD_SUCCESS,
            isDragging: true,
        });
        expect(wrapper).toMatchSnapshot();
    });
});
//# sourceMappingURL=OverallUploadsProgressBar-test.js.map