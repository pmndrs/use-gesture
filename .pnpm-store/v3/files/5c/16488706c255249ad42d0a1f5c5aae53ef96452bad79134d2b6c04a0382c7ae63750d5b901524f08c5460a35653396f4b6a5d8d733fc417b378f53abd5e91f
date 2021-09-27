'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
var Role_Role = require('../Role/Role.js');

// Automatically generated
var SEPARATOR_KEYS = ["orientation"];

var useSeparator = createHook.createHook({
  name: "Separator",
  compose: Role_Role.useRole,
  keys: SEPARATOR_KEYS,
  useOptions: function useOptions(_ref) {
    var _ref$orientation = _ref.orientation,
        orientation = _ref$orientation === void 0 ? "horizontal" : _ref$orientation,
        options = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["orientation"]);

    return _rollupPluginBabelHelpers._objectSpread2({
      orientation: orientation
    }, options);
  },
  useProps: function useProps(options, htmlProps) {
    return _rollupPluginBabelHelpers._objectSpread2({
      role: "separator",
      "aria-orientation": options.orientation
    }, htmlProps);
  }
});
var Separator = createComponent.createComponent({
  as: "hr",
  memo: true,
  useHook: useSeparator
});

exports.Separator = Separator;
exports.useSeparator = useSeparator;
