import { shallow } from 'enzyme';
describe('components/ContentUploader/UploadStateContent', () => {
    const getWrapper = props => shallow(fileInputLabel, "file", folderInputLabel = "folder", Object.assign({}, props) /  > );
    test('should render correctly when both folder and file inputs are available', () => {
        const wrapper = getWrapper();
        expect(wrapper).toMatchSnapshot();
    });
    test('should render correctly when only file input is available', () => {
        const wrapper = getWrapper({
            folderInputLabel: undefined,
        });
        expect(wrapper).toMatchSnapshot();
    });
});
//# sourceMappingURL=UploadStateContent-test.js.map