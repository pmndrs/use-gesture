'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Picks specific keys from an object.
 *
 * @example
 * import { pick } from "reakit-utils";
 *
 * pick({ a: "a", b: "b" }, ["a"]); // { a: "a" }
 */
function pick(object, paths) {
  var keys = Object.keys(object);
  var result = {};

  for (var i = 0; i < keys.length; i += 1) {
    var key = keys[i];

    if (paths.indexOf(key) >= 0) {
      result[key] = object[key];
    }
  }

  return result;
}

exports.pick = pick;
