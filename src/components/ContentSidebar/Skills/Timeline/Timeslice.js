/**
 * @was-flow
 * @file Timeline line component
 * @author Box
 */
import './Timeslice.scss';
const LENGTH_TEXT_ITEMLINE = 290; // match with css
const MIN_WIDTH = 6; // Need at least some width to be clickable
const Timeslice = ({ start, end, duration, onClick, index, interactionTarget }) => {
    if (typeof start !== 'number' || !duration || start >= duration) {
        return null;
    }
    const barLength = LENGTH_TEXT_ITEMLINE;
    let startLeft = Math.round((start * barLength) / duration);
    const minEnding = startLeft + MIN_WIDTH; // Need at least some width to be clickable
    const ending = typeof end === 'number' ? Math.max(minEnding, (end * barLength) / duration) : minEnding;
    const endLeft = Math.round(Math.min(barLength, ending));
    let width = endLeft - startLeft;
    // If width is too small re-adjust the left position
    // to get to at least 6px wide for clickability
    if (width < MIN_WIDTH) {
        startLeft -= MIN_WIDTH - width;
        width = MIN_WIDTH;
    }
    return type = "button";
    className = "be-timeline-time";
    style = {};
    {
        left: `${startLeft}px`,
            width;
        `${width}px`,
        ;
    }
};
onClick = {}();
onClick(index);
data - resin - target;
{
    interactionTarget;
}
/>;
;
;
export default Timeslice;
//# sourceMappingURL=Timeslice.js.map