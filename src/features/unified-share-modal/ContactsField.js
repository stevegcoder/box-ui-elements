// @flow

import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import debounce from 'lodash/debounce';
import noop from 'lodash/noop';
import classNames from 'classnames';

import PillSelectorDropdown from '../../components/pill-selector-dropdown';
import ContactDatalistItem from '../../components/contact-datalist-item';
import computeSuggestedCollabs from './utils/computeSuggestedCollabs';
import parseEmails from '../../utils/parseEmails';
import commonMessages from '../../common/messages';

import messages from './messages';
import type { SuggestedCollabLookup, contactType as Contact } from './flowTypes';
import type { SelectOptionProp } from '../../components/select-field/props';

type Props = {
    disabled: boolean,
    error: string,
    fieldRef?: Object,
    getContacts: (query: string) => Promise<Array<Contact>>,
    intl: any,
    label: React.Node,
    onContactAdd: Function,
    onContactRemove: Function,
    onInput?: Function,
    onPillCreate?: (pills: Array<SelectOptionProp | Contact>) => void,
    selectedContacts: Array<Contact>,
    suggestedCollaborators?: SuggestedCollabLookup,
    validateForError: Function,
    validator: Function,
};

type State = {
    contacts: Array<Contact>,
    numSuggestedShowing: number,
    pillSelectorInputValue: string,
};

const isSubstring = (value, searchString) => {
    return value && value.toLowerCase().indexOf(searchString.toLowerCase()) !== -1;
};

class ContactsField extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            contacts: [],
            numSuggestedShowing: 0,
            pillSelectorInputValue: '',
        };
    }

    addSuggestedContacts = (contacts: Array<Contact>) => {
        const { suggestedCollaborators = {} } = this.props;
        const { pillSelectorInputValue } = this.state;

        const [suggestedOptions, otherOptions] = computeSuggestedCollabs(
            contacts,
            suggestedCollaborators,
            pillSelectorInputValue,
        );
        this.setState({ numSuggestedShowing: suggestedOptions.length });
        return [...suggestedOptions, ...otherOptions];
    };

    filterContacts = (contacts: Array<Contact>) => {
        const { pillSelectorInputValue } = this.state;
        const { selectedContacts, suggestedCollaborators } = this.props;

        if (pillSelectorInputValue && contacts) {
            let fullContacts = contacts
                .filter(
                    // filter contacts whose name or email don't match input value
                    ({ name, email }) =>
                        isSubstring(name, pillSelectorInputValue) || isSubstring(email, pillSelectorInputValue),
                )
                .filter(
                    // filter contacts who have already been selected
                    ({ email, id }) => !selectedContacts.find(({ value }) => value === email || value === id),
                );

            if (suggestedCollaborators) {
                fullContacts = this.addSuggestedContacts(fullContacts);
            }

            return fullContacts.map<Object>(({ email, id, isExternalUser, name, type }) => ({
                // map to standardized DatalistItem format
                // TODO: refactor this so inline conversions aren't required at every usage
                email,
                id,
                isExternalUser,
                text: name,
                type,
                value: email || id, // if email doesn't exist, contact is a group, use id
            }));
        }

        // return empty selector options if input value is empty
        return [];
    };

    getContactsPromise = (query: string) => {
        return this.props
            .getContacts(query)
            .then(contacts => {
                const filteredContacts = this.filterContacts(contacts);
                this.setState({ contacts: filteredContacts });
            })
            .catch(error => {
                if (error.isCanceled) {
                    // silently fail - this happens often when requests get cancelled
                    // due to overlapping requests
                    return;
                }
                throw error;
            });
    };

    debouncedGetContacts = debounce(this.getContactsPromise, 200);

    handlePillSelectorInput = (value: string) => {
        const { onInput } = this.props;
        const trimmedValue = value.trim();

        this.setState({
            pillSelectorInputValue: trimmedValue,
        });

        if (onInput) {
            onInput(value);
        }

        if (!trimmedValue) {
            this.setState({ contacts: [] });
            return;
        }

        this.debouncedGetContacts(trimmedValue);
    };

    render() {
        const {
            intl,
            disabled,
            error,
            fieldRef,
            label,
            selectedContacts,
            onContactAdd,
            onContactRemove,
            onPillCreate,
            validateForError,
            validator,
        } = this.props;
        const { contacts, numSuggestedShowing } = this.state;
        const groupLabel = <FormattedMessage {...messages.groupLabel} />;
        const shouldShowSuggested = numSuggestedShowing > 0;
        const pillSelectorOverlayClasses = classNames({
            scrollable: contacts.length > 5,
        });

        return (
            <PillSelectorDropdown
                allowCustomPills
                className={pillSelectorOverlayClasses}
                dividerIndex={shouldShowSuggested ? numSuggestedShowing : undefined}
                disabled={disabled}
                error={error}
                inputProps={{
                    autoFocus: true,
                    onChange: noop,
                }}
                label={label}
                onInput={this.handlePillSelectorInput}
                onRemove={onContactRemove}
                onSelect={onContactAdd}
                onPillCreate={onPillCreate}
                overlayTitle={shouldShowSuggested ? intl.formatMessage(messages.suggestedCollabsTitle) : undefined}
                parseItems={parseEmails}
                placeholder={intl.formatMessage(commonMessages.pillSelectorPlaceholder)}
                ref={fieldRef}
                selectedOptions={selectedContacts}
                selectorOptions={contacts}
                validateForError={validateForError}
                validator={validator}
            >
                {contacts.map(({ email, text = null, id }) => (
                    <ContactDatalistItem key={id} name={text} subtitle={email || groupLabel} title={text} />
                ))}
            </PillSelectorDropdown>
        );
    }
}

export { ContactsField as ContactsFieldBase };
export default injectIntl(ContactsField);
