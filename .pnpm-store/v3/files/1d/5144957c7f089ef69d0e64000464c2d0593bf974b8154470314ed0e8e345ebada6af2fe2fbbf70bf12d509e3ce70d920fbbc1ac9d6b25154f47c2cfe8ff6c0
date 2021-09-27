import { isObject } from './isObject.js';

/**
 * Checks whether `arg` is empty or not.
 *
 * @example
 * import { isEmpty } from "reakit-utils";
 *
 * isEmpty([]); // true
 * isEmpty(["a"]); // false
 * isEmpty({}); // true
 * isEmpty({ a: "a" }); // false
 * isEmpty(); // true
 * isEmpty(null); // true
 * isEmpty(undefined); // true
 * isEmpty(""); // true
 */

function isEmpty(arg) {
  if (Array.isArray(arg)) return !arg.length;
  if (isObject(arg)) return !Object.keys(arg).length;
  if (arg == null) return true;
  if (arg === "") return true;
  return false;
}

export { isEmpty };
