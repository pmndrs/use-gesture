import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import 'react';
import 'reakit-utils/useForkRef';
import '../Role/Role.js';
import '../__keys-26bb1730.js';
import { usePopoverArrow } from '../Popover/PopoverArrow.js';
import { a as TOOLTIP_ARROW_KEYS } from '../__keys-d101cb3b.js';

var useTooltipArrow = createHook({
  name: "TooltipArrow",
  compose: usePopoverArrow,
  keys: TOOLTIP_ARROW_KEYS,
  useOptions: function useOptions(_ref) {
    var _ref$size = _ref.size,
        size = _ref$size === void 0 ? 16 : _ref$size,
        options = _objectWithoutPropertiesLoose(_ref, ["size"]);

    return _objectSpread2({
      size: size
    }, options);
  }
});
var TooltipArrow = createComponent({
  as: "div",
  memo: true,
  useHook: useTooltipArrow
});

export { TooltipArrow, useTooltipArrow };
