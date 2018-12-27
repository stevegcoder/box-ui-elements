/**
 * @was-flow
 * @file File Keywords SkillCard component
 * @author Box
 */
import { PureComponent } from 'react';
import './Keywords.scss';
class Keywords extends PureComponent {
    /**
     * [constructor]
     *
     * @public
     * @return {Keywords}
     */
    constructor(props) {
        super(props);
        /**
         * Toggles the edit mode
         *
         * @private
         * @return {void}
         */
        this.toggleIsEditing = () => {
            this.setState(prevState => ({
                isEditing: !prevState.isEditing,
            }));
        };
        /**
         * Adds a new keyword.
         * Iterates over the transcript to find locations
         *
         * @private
         * @return {void}
         */
        this.onAdd = (keyword) => {
            const { transcript } = this.props;
            const { adds } = this.state;
            const locations = [];
            const regex = new RegExp(`\\b${((keyword.text)), any), string;
        };
        this.state = {
            keywords: props.card.entries,
            adds: [],
            removes: [],
            isEditing: props.hasError,
            hasError: props.hasError,
            isLoading: false,
        };
    }
    /**
     * Helper to reset the state
     *
     * @private
     * @param {Object} props - component props
     * @return {void}
     */
    resetState(props) {
        this.setState({
            keywords: props.card.entries,
            adds: [],
            removes: [],
            isEditing: false,
            hasError: false,
            isLoading: false,
        });
    }
}
`, 'i');

        if (transcript && Array.isArray(transcript.entries)) {
            transcript.entries.forEach(
                ({ text, appears }: SkillCardEntry): void => {
                    if (text && regex.test(text) && Array.isArray(appears) && appears.length > 0) {
                        locations.push(appears[0]);
                    }
                },
            );
        }

        keyword.appears = locations;
        adds.push(keyword);
        this.setState({ adds: adds.slice(0) });
    };

    /**
     * Deletes a keyword
     *
     * @private
     * @return {void}
     */
    onDelete = (keyword: SkillCardEntry): void => {
        const { adds, removes } = this.state;
        const addedIndex = adds.findIndex(added => added === keyword);
        if (addedIndex > -1) {
            adds.splice(addedIndex, 1);
            this.setState({ adds: adds.slice(0) });
        } else {
            removes.push(keyword);
            this.setState({ removes: removes.slice(0) });
        }
    };

    /**
     * Saves the new card data
     *
     * @private
     * @return {void}
     */
    onSave = (): void => {
        const { onSkillChange }: Props = this.props;
        const { removes, adds }: State = this.state;
        this.toggleIsEditing();
        if (removes.length > 0 || adds.length > 0) {
            this.setState({ isLoading: true });
            onSkillChange(removes, adds);
        }
    };

    /**
     * Cancels editing
     *
     * @private
     * @return {void}
     */
    onCancel = (): void => {
        this.resetState(this.props);
    };

    /**
     * Renders the keywords
     *
     * @private
     * @return {void}
     */
    render() {
        const { card, getViewer, isEditable }: Props = this.props;
        const { duration }: SkillCard = card;
        const { isEditing, isLoading, hasError, keywords, removes, adds }: State = this.state;
        const hasKeywords = keywords.length > 0;
        const entries = keywords.filter((face: SkillCardEntry) => !removes.includes(face)).concat(adds);
        const editClassName = classNames('be-keyword-edit', {
            'be-keyword-is-editing': isEditing,
        });

        return (
            <LoadingIndicatorWrapper isLoading={isLoading} className="be-keywords">
                {hasKeywords && isEditable && !isLoading && (
                    <Tooltip text={<FormattedMessage {...messages.editLabel} />}>
                        <PlainButton
                            type="button"
                            className={editClassName}
                            onClick={this.toggleIsEditing}
                            data-resin-target={SKILLS_TARGETS.KEYWORDS.EDIT}
                        >
                            <IconEdit />
                        </PlainButton>
                    </Tooltip>
                )}
                {hasError && (
                    <InlineError title={<FormattedMessage {...messages.sidebarSkillsErrorTitle} />}>
                        <FormattedMessage {...messages.sidebarSkillsErrorContent} />
                    </InlineError>
                )}
                {isEditing && (
                    <EditableKeywords
                        keywords={entries}
                        onSave={this.onSave}
                        onAdd={this.onAdd}
                        onDelete={this.onDelete}
                        onCancel={this.onCancel}
                    />
                )}
                {!isEditing && hasKeywords && (
                    <ReadOnlyKeywords keywords={entries} duration={duration} getViewer={getViewer} />
                )}
                {!isEditing && !hasKeywords && <FormattedMessage {...messages.skillNoInfoFoundError} />}
            </LoadingIndicatorWrapper>
        );
    }
}

export default Keywords;
;
//# sourceMappingURL=Keywords.js.map