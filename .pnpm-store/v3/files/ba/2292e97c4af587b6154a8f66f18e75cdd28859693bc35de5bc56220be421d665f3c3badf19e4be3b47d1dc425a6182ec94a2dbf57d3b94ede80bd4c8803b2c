'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
require('../Role/Role.js');
var __keys = require('../__keys-087914ef.js');
var Separator_Separator = require('../Separator/Separator.js');

var useMenuSeparator = createHook.createHook({
  name: "MenuSeparator",
  compose: Separator_Separator.useSeparator,
  keys: __keys.MENU_SEPARATOR_KEYS,
  useOptions: function useOptions(_ref) {
    var _ref$orientation = _ref.orientation,
        orientation = _ref$orientation === void 0 ? "vertical" : _ref$orientation,
        options = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["orientation"]);

    return _rollupPluginBabelHelpers._objectSpread2({
      orientation: orientation === "vertical" ? "horizontal" : "vertical"
    }, options);
  }
});
var MenuSeparator = createComponent.createComponent({
  as: "hr",
  memo: true,
  useHook: useMenuSeparator
});

exports.MenuSeparator = MenuSeparator;
exports.useMenuSeparator = useMenuSeparator;
