// Extremely small optimisation, reduces runtime prototype traversal
const baseHasOwnProperty = Object.prototype.hasOwnProperty;
/** @private */
export function isObject(val) {
    return typeof val === 'object' && val !== null;
}
/** @private */
export function isAsyncIterable(val) {
    return typeof Object(val)[Symbol.asyncIterator] === 'function';
}
/** @private */
export function areGraphQLErrors(obj) {
    return (Array.isArray(obj) &&
        // must be at least one error
        obj.length > 0 &&
        // error has at least a message
        obj.every((ob) => 'message' in ob));
}
/** @private */
export function hasOwnProperty(obj, prop) {
    return baseHasOwnProperty.call(obj, prop);
}
/** @private */
export function hasOwnObjectProperty(obj, prop) {
    return baseHasOwnProperty.call(obj, prop) && isObject(obj[prop]);
}
/** @private */
export function hasOwnArrayProperty(obj, prop) {
    return baseHasOwnProperty.call(obj, prop) && Array.isArray(obj[prop]);
}
/** @private */
export function hasOwnStringProperty(obj, prop) {
    return baseHasOwnProperty.call(obj, prop) && typeof obj[prop] === 'string';
}
