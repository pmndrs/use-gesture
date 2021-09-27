'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
var shallowEqual = require('reakit-utils/shallowEqual');

// Automatically generated
var BOX_KEYS = ["unstable_system"];

var useBox = createHook.createHook({
  name: "Box",
  keys: BOX_KEYS,
  propsAreEqual: function propsAreEqual(prev, next) {
    var prevSystem = prev.unstable_system,
        prevProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(prev, ["unstable_system"]);

    var nextSystem = next.unstable_system,
        nextProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(next, ["unstable_system"]);

    if (prevSystem !== nextSystem && !shallowEqual.shallowEqual(prevSystem, nextSystem)) {
      return false;
    }

    return shallowEqual.shallowEqual(prevProps, nextProps);
  }
});
var Box = createComponent.createComponent({
  as: "div",
  useHook: useBox
});

exports.Box = Box;
exports.useBox = useBox;
