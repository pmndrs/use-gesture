'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../../_rollupPluginBabelHelpers-8f9a8751.js');
var toArray = require('reakit-utils/toArray');
var isInteger = require('reakit-utils/isInteger');

function unstable_setIn(object, path, value) {
  var _objectSpread2;

  var pathArray = toArray.toArray(path);
  var key = pathArray[0],
      keys = pathArray.slice(1);
  if (key == null) return object;
  var obj = isInteger.isInteger(key) ? object || [] : object || {};
  var result = keys.length ? unstable_setIn(obj[key], keys, value) : value;

  if (isInteger.isInteger(key)) {
    if (object) {
      return [].concat(object.slice(0, Number(key)), [result], object.slice(Number(key) + 1));
    }

    return [result];
  }

  return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, object), {}, (_objectSpread2 = {}, _objectSpread2[key] = result, _objectSpread2));
}

exports.unstable_setIn = unstable_setIn;
