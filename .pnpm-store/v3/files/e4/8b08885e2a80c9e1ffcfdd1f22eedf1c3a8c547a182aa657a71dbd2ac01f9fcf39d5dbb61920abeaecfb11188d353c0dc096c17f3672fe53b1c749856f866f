import { removeIndexFromArray } from './removeIndexFromArray.js';

/**
 * Immutably removes an item from an array.
 *
 * @example
 * import { removeItemFromArray } from "reakit-utils";
 *
 * removeItemFromArray(["a", "b", "c"], "b"); // ["a", "c"]
 *
 * // This only works by reference
 * const obj = {};
 * removeItemFromArray([obj], {}); // [obj]
 * removeItemFromArray([obj], obj); // []
 *
 * @returns {Array} A new array without the passed item.
 */

function removeItemFromArray(array, item) {
  var index = array.indexOf(item);
  return removeIndexFromArray(array, index);
}

export { removeItemFromArray };
