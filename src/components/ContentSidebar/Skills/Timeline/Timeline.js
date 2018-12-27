/**
 * @was-flow
 * @file Timeline component
 * @author Box
 */
import PlainButton from 'box-react-ui/lib/components/plain-button/PlainButton';
import { isValidStartTime } from '../Transcript/timeSliceUtils';
import messages from '../../../messages';
import { SKILLS_TARGETS } from '../../../../interactionTargets';
import './Timeline.scss';
const Timeline = ({ text = '', duration = 0, timeslices = [], getViewer, interactionTarget }) => {
    let timeSliceIndex = -1;
    const playSegment = (index, incr = 0) => {
        const newIndex = incr > 0 ? Math.min(timeslices.length - 1, index + incr) : Math.max(0, index + incr);
        const viewer = getViewer ? getViewer() : null;
        const timeslice = timeslices[newIndex];
        const validTime = isValidStartTime(timeslice);
        if (validTime && viewer && typeof viewer.play === 'function') {
            viewer.play(timeslice.start);
            timeSliceIndex = newIndex;
        }
    };
    return className = "be-timeline" >
        { text } && className;
    "be-timeline-label" > { text } < /div>}
        < div;
    className = "be-timeline-line-wrapper" >
        className;
    "be-timeline-line" /  >
        { timeslices, : .map(({ start, end }, index) => (
            /* eslint-disable react/no-array-index-key */
            key) = { index }, index = { index }, start = { start }, end = { end }, duration = { duration }, onClick = { playSegment }, interactionTarget = { interactionTarget }
                /  >
            ), };
    /* eslint-enable react/no-array-index-key */
};
/div>
    < div;
className = "be-timeline-btns" >
    type;
"button";
onClick = {}();
playSegment(timeSliceIndex, -1);
data - resin - target;
{
    SKILLS_TARGETS.TIMELINE.PREVIOUS;
}
    >
        title;
{
    (Object.assign({}, messages.previousSegment) /  > );
}
/>
    < /PlainButton>
    < PlainButton;
type = "button";
onClick = {}();
playSegment(timeSliceIndex, 1);
data - resin - target;
{
    SKILLS_TARGETS.TIMELINE.NEXT;
}
    >
        title;
{
    (Object.assign({}, messages.nextSegment) /  > );
}
/>
    < /PlainButton>
    < /div>
    < /div>;
;
;
export default Timeline;
//# sourceMappingURL=Timeline.js.map