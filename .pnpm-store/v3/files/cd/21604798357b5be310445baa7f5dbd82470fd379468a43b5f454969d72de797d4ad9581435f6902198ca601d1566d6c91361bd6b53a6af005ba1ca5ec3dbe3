'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Omits specific keys from an object.
 *
 * @example
 * import { omit } from "reakit-utils";
 *
 * omit({ a: "a", b: "b" }, ["a"]); // { b: "b" }
 */
function omit(object, paths) {
  var keys = Object.keys(object);
  var result = {};

  for (var i = 0; i < keys.length; i += 1) {
    var key = keys[i];

    if (paths.indexOf(key) === -1) {
      result[key] = object[key];
    }
  }

  return result;
}

exports.omit = omit;
