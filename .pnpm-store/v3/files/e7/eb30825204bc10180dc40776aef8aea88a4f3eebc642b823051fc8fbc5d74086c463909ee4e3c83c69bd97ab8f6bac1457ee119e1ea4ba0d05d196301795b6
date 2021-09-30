/**
 * Checks whether `arg` is an integer or not.
 *
 * @example
 * import { isInteger } from "reakit-utils";
 *
 * isInteger(1); // true
 * isInteger(1.5); // false
 * isInteger("1"); // true
 * isInteger("1.5"); // false
 */
function isInteger(arg) {
  if (typeof arg === "number") {
    return Math.floor(arg) === arg;
  }

  return String(Math.floor(Number(arg))) === arg;
}

export { isInteger };
