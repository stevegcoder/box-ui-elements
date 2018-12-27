/**
 * @was-flow
 * @file Utilities for keywords skill
 * @author Box
 */
{
    Pill;
}
from;
'./flowTypes';
/**
 * Converts skill card entries into pills
 *
 * @private
 * @param {Array<Object>} props - keyword entries
 * @return {Array<Object>} pills
 */
const getPills = (keywords = []) => keywords.map((keyword, index) => ({
    value: index,
    text: ((keyword.text)), any
}), string);
;
export default getPills;
//# sourceMappingURL=keywordUtils.js.map