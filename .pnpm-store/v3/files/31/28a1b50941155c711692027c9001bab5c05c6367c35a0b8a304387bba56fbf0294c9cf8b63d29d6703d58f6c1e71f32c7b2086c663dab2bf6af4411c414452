'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-8f9a8751.js');
var React = require('react');
var Popover_PopoverState = require('./Popover/PopoverState.js');

function useComboboxPopoverState(combobox, _ref) {
  if (_ref === void 0) {
    _ref = {};
  }

  var _ref2 = _ref,
      _ref2$gutter = _ref2.gutter,
      gutter = _ref2$gutter === void 0 ? 0 : _ref2$gutter,
      _ref2$placement = _ref2.placement,
      placement = _ref2$placement === void 0 ? "bottom-start" : _ref2$placement,
      initialState = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref2, ["gutter", "placement"]);

  var popover = Popover_PopoverState.usePopoverState(_rollupPluginBabelHelpers._objectSpread2({
    gutter: gutter,
    placement: placement
  }, initialState));
  var visible = popover.visible && combobox.inputValue.length >= combobox.minValueLength;
  React.useEffect(function () {
    if (!visible) {
      // We need to reset combobox.moves
      combobox.reset();
    }
  }, [visible, combobox.reset]);
  return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, combobox), popover), {}, {
    visible: visible
  });
}

exports.useComboboxPopoverState = useComboboxPopoverState;
