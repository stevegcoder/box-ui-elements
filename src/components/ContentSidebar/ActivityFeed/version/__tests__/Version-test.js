import { shallow } from 'enzyme';
const translationProps = {
    intl: { formatMessage: () => { } },
};
describe('components/ContentSidebar/ActivityFeed/version/Version', () => {
    test('should correctly render version', () => {
        const version = {
            modified_at: Date.now(),
            id: '148953',
            version_number: 1,
            modified_by: { name: '50 Cent', id: 10 },
            action: 'upload',
        };
        const wrapper = shallow(Object.assign({}, version), Object.assign({}, translationProps) /  > );
        expect(wrapper.hasClass('bcs-version')).toBe(true);
    });
    test('should correctly render info icon if onInfo is passed', () => {
        const version = {
            modified_at: Date.now(),
            id: '148953',
            onInfo: () => { },
            version_number: 1,
            modified_by: { name: '50 Cent', id: 10 },
            action: 'upload',
        };
        const wrapper = shallow(Object.assign({}, version), Object.assign({}, translationProps) /  > );
        expect(wrapper.hasClass('bcs-version')).toBe(true);
        expect(wrapper.find('IconInfoInverted').length).toBe(1);
    });
    test('should correctly render delete version', () => {
        const version = {
            modified_at: Date.now(),
            id: '148953',
            version_number: 1,
            modified_by: { name: '50 Cent', id: 10 },
            action: 'delete',
        };
        const wrapper = shallow(Object.assign({}, version), Object.assign({}, translationProps) /  > );
        expect(wrapper.find('FormattedMessage').length).toEqual(1);
    });
    test('should correctly render restore version', () => {
        const version = {
            modified_at: Date.now(),
            id: '148953',
            version_number: 1,
            modified_by: { name: '50 Cent', id: 10 },
            action: 'restore',
        };
        const wrapper = shallow(Object.assign({}, version), Object.assign({}, translationProps) /  > );
        expect(wrapper.find('FormattedMessage').length).toEqual(1);
    });
    test('should correctly render restore version', () => {
        const version = {
            modified_at: Date.now(),
            id: '148953',
            version_number: 1,
            modified_by: { name: '50 Cent', id: 10 },
            action: 'restore',
        };
        const wrapper = shallow(Object.assign({}, version), Object.assign({}, translationProps) /  > );
        expect(wrapper.find('FormattedMessage').length).toEqual(1);
    });
});
//# sourceMappingURL=Version-test.js.map