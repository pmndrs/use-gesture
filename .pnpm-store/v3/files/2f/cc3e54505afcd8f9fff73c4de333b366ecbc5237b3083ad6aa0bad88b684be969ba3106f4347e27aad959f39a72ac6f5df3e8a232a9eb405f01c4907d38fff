import { a as _objectSpread2, _ as _objectWithoutPropertiesLoose } from './_rollupPluginBabelHelpers-1f0bf8c2.js';
import { useEffect } from 'react';
import { usePopoverState } from './Popover/PopoverState.js';

function useComboboxPopoverState(combobox, _ref) {
  if (_ref === void 0) {
    _ref = {};
  }

  var _ref2 = _ref,
      _ref2$gutter = _ref2.gutter,
      gutter = _ref2$gutter === void 0 ? 0 : _ref2$gutter,
      _ref2$placement = _ref2.placement,
      placement = _ref2$placement === void 0 ? "bottom-start" : _ref2$placement,
      initialState = _objectWithoutPropertiesLoose(_ref2, ["gutter", "placement"]);

  var popover = usePopoverState(_objectSpread2({
    gutter: gutter,
    placement: placement
  }, initialState));
  var visible = popover.visible && combobox.inputValue.length >= combobox.minValueLength;
  useEffect(function () {
    if (!visible) {
      // We need to reset combobox.moves
      combobox.reset();
    }
  }, [visible, combobox.reset]);
  return _objectSpread2(_objectSpread2(_objectSpread2({}, combobox), popover), {}, {
    visible: visible
  });
}

export { useComboboxPopoverState as u };
