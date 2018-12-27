import noop from 'lodash/noop';
import { shallow } from 'enzyme';
describe('components/ContentUploader/UploadInput', () => {
    const getWrapper = props => shallow(handleChange, { noop }, Object.assign({}, props) /  > );
    test('should render correctly when inputLabel is available', () => {
        const wrapper = getWrapper({
            inputLabelClass: 'inputLabelClass',
            inputLabel: 'yo',
        });
        expect(wrapper).toMatchSnapshot();
    });
    test('should render correctly when inputLabel is not available', () => {
        const wrapper = getWrapper({});
        expect(wrapper).toMatchSnapshot();
    });
    test('should render correctly when isFolderUpload is true', () => {
        const wrapper = getWrapper({
            inputLabel: 'yo',
            isFolderUpload: true,
        });
        expect(wrapper).toMatchSnapshot();
    });
});
//# sourceMappingURL=UploadInput-test.js.map