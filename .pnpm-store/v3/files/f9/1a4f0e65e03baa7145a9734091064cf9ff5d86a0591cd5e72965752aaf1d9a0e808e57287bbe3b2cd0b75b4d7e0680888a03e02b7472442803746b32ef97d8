'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Transforms `arg` into an array if it's not already.
 *
 * @example
 * import { toArray } from "reakit-utils";
 *
 * toArray("a"); // ["a"]
 * toArray(["a"]); // ["a"]
 */
function toArray(arg) {
  if (Array.isArray(arg)) {
    return arg;
  }

  return typeof arg !== "undefined" ? [arg] : [];
}

exports.toArray = toArray;
