'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
require('../Role/Role.js');
var Separator_Separator = require('../Separator/Separator.js');
var __keys = require('../__keys-403ff944.js');

var useToolbarSeparator = createHook.createHook({
  name: "ToolbarSeparator",
  compose: Separator_Separator.useSeparator,
  keys: __keys.TOOLBAR_SEPARATOR_KEYS,
  useOptions: function useOptions(_ref) {
    var _ref$orientation = _ref.orientation,
        orientation = _ref$orientation === void 0 ? "vertical" : _ref$orientation,
        options = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["orientation"]);

    return _rollupPluginBabelHelpers._objectSpread2({
      orientation: orientation === "vertical" ? "horizontal" : "vertical"
    }, options);
  }
});
var ToolbarSeparator = createComponent.createComponent({
  as: "hr",
  memo: true,
  useHook: useToolbarSeparator
});

exports.ToolbarSeparator = ToolbarSeparator;
exports.useToolbarSeparator = useToolbarSeparator;
