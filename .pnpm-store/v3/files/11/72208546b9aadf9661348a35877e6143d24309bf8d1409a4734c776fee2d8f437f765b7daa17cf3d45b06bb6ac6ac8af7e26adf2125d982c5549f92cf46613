'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
var shallowEqual = require('reakit-utils/shallowEqual');

// Automatically generated
var ROLE_KEYS = ["unstable_system"];

var useRole = createHook.createHook({
  name: "Role",
  keys: ROLE_KEYS,
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
var Role = createComponent.createComponent({
  as: "div",
  useHook: useRole
});

exports.Role = Role;
exports.useRole = useRole;
