'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-8f9a8751.js');
require('./isObject.js');
var isPlainObject = require('./isPlainObject.js');

/**
 * Splits an object (`props`) into a tuple where the first item is an object
 * with the passed `keys`, and the second item is an object with these keys
 * omitted.
 *
 * @deprecated will be removed in version 2
 *
 * @example
 * import { splitProps } from "reakit-utils";
 *
 * splitProps({ a: "a", b: "b" }, ["a"]); // [{ a: "a" }, { b: "b" }]
 */

function __deprecatedSplitProps(props, keys) {
  var propsKeys = Object.keys(props);
  var picked = {};
  var omitted = {};

  for (var _i = 0, _propsKeys = propsKeys; _i < _propsKeys.length; _i++) {
    var key = _propsKeys[_i];

    if (keys.indexOf(key) >= 0) {
      picked[key] = props[key];
    } else {
      omitted[key] = props[key];
    }
  }

  return [picked, omitted];
}
/**
 * Splits an object (`props`) into a tuple where the first item
 * is the `state` property, and the second item is the rest of the properties.
 *
 * It is also backward compatible with version 1. If `keys` are passed then
 * splits an object (`props`) into a tuple where the first item is an object
 * with the passed `keys`, and the second item is an object with these keys
 * omitted.
 *
 * @example
 * import { splitProps } from "reakit-utils";
 *
 * splitProps({ a: "a", b: "b" }, ["a"]); // [{ a: "a" }, { b: "b" }]
 *
 * @example
 * import { splitProps } from "reakit-utils";
 *
 * splitProps({ state: { a: "a" }, b: "b" }); // [{ a: "a" }, { b: "b" }]
 */


function splitProps(props, keys) {
  if (keys === void 0) {
    keys = [];
  }

  if (!isPlainObject.isPlainObject(props.state)) {
    return __deprecatedSplitProps(props, keys);
  }

  var _deprecatedSplitProp = __deprecatedSplitProps(props, [].concat(keys, ["state"])),
      picked = _deprecatedSplitProp[0],
      omitted = _deprecatedSplitProp[1];

  var state = picked.state,
      restPicked = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(picked, ["state"]);

  return [_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, state), restPicked), omitted];
}

exports.splitProps = splitProps;
