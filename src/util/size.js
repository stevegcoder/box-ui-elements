/**
 * @was-flow
 * @file Function to create size in words out of number
 * @author Box
 */
/**
 * Gets the size in words
 *
 * @param {number} size in bytes
 * @return {string} size in words
 */
export default function (size) {
    if (!size)
        return '0 Byte';
    const kilo = 1024;
    const decimals = 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const exp = Math.floor(Math.log(size) / Math.log(kilo));
    return `${parseFloat((size / Math.pow(kilo, exp)).toFixed(decimals))} ${sizes[exp]}`;
}
//# sourceMappingURL=size.js.map