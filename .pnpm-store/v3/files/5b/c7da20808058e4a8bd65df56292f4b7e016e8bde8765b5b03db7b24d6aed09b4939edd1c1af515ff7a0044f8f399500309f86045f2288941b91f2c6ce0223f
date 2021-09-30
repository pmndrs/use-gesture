'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Similar to `Element.prototype.contains`, but a little bit faster when
 * `element` is the same as `child`.
 *
 * @example
 * import { contains } from "reakit-utils";
 *
 * contains(document.getElementById("parent"), document.getElementById("child"));
 */
function contains(parent, child) {
  return parent === child || parent.contains(child);
}

exports.contains = contains;
