/**
 * @was-flow
 * @file File Key Values Skill Data component
 * @author Box
 */
import './Keyvalues.scss';
const Keyvalues = ({ card: { entries } }) => className = "be-keyvalues" >
    { Array, : .isArray(entries) &&
            entries.map(({ label, text }, index) => !!label &&
                !!text && (
            /* eslint-disable react/no-array-index-key */
            className), "be-keyvalue", key = { index } >
                { label } < /dt>
                < dd > { text } < /dd>
                < /dl>), };
/div>;
;
export default Keyvalues;
//# sourceMappingURL=Keyvalues.js.map