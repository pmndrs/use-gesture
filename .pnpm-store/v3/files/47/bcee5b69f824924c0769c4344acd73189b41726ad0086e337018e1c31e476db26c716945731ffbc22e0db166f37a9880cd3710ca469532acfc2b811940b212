'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
require('react');
require('reakit-utils/useForkRef');
require('../Role/Role.js');
require('../__keys-eddd3051.js');
var Popover_PopoverArrow = require('../Popover/PopoverArrow.js');
var __keys = require('../__keys-724ea0fe.js');

var useTooltipArrow = createHook.createHook({
  name: "TooltipArrow",
  compose: Popover_PopoverArrow.usePopoverArrow,
  keys: __keys.TOOLTIP_ARROW_KEYS,
  useOptions: function useOptions(_ref) {
    var _ref$size = _ref.size,
        size = _ref$size === void 0 ? 16 : _ref$size,
        options = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["size"]);

    return _rollupPluginBabelHelpers._objectSpread2({
      size: size
    }, options);
  }
});
var TooltipArrow = createComponent.createComponent({
  as: "div",
  memo: true,
  useHook: useTooltipArrow
});

exports.TooltipArrow = TooltipArrow;
exports.useTooltipArrow = useTooltipArrow;
