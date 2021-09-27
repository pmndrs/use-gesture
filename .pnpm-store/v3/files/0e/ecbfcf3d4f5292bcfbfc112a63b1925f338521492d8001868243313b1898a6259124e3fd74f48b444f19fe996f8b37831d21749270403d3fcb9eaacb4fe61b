import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from './_rollupPluginBabelHelpers-1f0bf8c2.js';
import './isObject.js';
import { isPlainObject } from './isPlainObject.js';

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

  if (!isPlainObject(props.state)) {
    return __deprecatedSplitProps(props, keys);
  }

  var _deprecatedSplitProp = __deprecatedSplitProps(props, [].concat(keys, ["state"])),
      picked = _deprecatedSplitProp[0],
      omitted = _deprecatedSplitProp[1];

  var state = picked.state,
      restPicked = _objectWithoutPropertiesLoose(picked, ["state"]);

  return [_objectSpread2(_objectSpread2({}, state), restPicked), omitted];
}

export { splitProps };
