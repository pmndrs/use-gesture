'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../../_rollupPluginBabelHelpers-8f9a8751.js');

function unstable_getIn(object, path, defaultValue) {
  if (typeof path === "string") {
    return object[path] == null ? defaultValue : object[path];
  }

  var result = object;

  for (var _iterator = _rollupPluginBabelHelpers._createForOfIteratorHelperLoose(path), _step; !(_step = _iterator()).done;) {
    var key = _step.value;
    if (!(key in result)) return defaultValue;
    result = result[key];
  }

  if (result == null) {
    return defaultValue;
  }

  return result;
}

exports.unstable_getIn = unstable_getIn;
