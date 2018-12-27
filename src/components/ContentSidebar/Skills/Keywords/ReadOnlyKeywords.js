/**
 * @was-flow
 * @file Read Only Keywords Card component
 * @author Box
 */
import * as React from 'react';
import getPills from './keywordUtils';
import { SKILLS_TARGETS, INTERACTION_TARGET } from '../../../../interactionTargets';
{
    Pill, Pills;
}
from;
'./flowTypes';
import './ReadOnlyKeywords.scss';
class ReadOnlyselecteds extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            selectedIndex: -1,
        };
        /**
         * Shows the time line by selecting the keyword
         *
         * @private
         * @param {Object} pill - keyword
         * @return {void}
         */
        this.onSelect = (pill) => {
            const { selectedIndex } = this.state;
            const newIndex = pill.value;
            this.setState({
                selectedIndex: selectedIndex === newIndex ? -1 : newIndex,
            });
        };
    }
    /**
     * Renders the keywords
     *
     * @private
     * @return {void}
     */
    render() {
        const { keywords, getViewer, duration } = this.props;
        const { selectedIndex } = this.state;
        const options = getPills(keywords);
        const selected = keywords[selectedIndex];
        const pillCloudProps = selected ? { selectedOptions: [options[selectedIndex]] } : {};
        return options = { options };
        onSelect = { this: .onSelect };
        {
            pillCloudProps;
        }
        buttonProps = {};
        {
            [INTERACTION_TARGET];
            SKILLS_TARGETS.KEYWORDS.SELECT,
            ;
        }
    }
}
/>;
{
    !!selected && Array.isArray(selected.appears) && selected.appears.length > 0 && text;
    {
        selected.text;
    }
    timeslices = { selected, : .appears };
    duration = { duration };
    getViewer = { getViewer };
    interactionTarget = { SKILLS_TARGETS, : .KEYWORDS.TIMELINE }
        /  >
    ;
}
/React.Fragment>;
;
export default ReadOnlyselecteds;
//# sourceMappingURL=ReadOnlyKeywords.js.map