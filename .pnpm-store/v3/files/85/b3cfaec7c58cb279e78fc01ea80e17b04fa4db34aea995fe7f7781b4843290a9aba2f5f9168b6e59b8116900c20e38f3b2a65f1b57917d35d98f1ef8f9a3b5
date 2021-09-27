import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { useRole } from '../Role/Role.js';

// Automatically generated
var SEPARATOR_KEYS = ["orientation"];

var useSeparator = createHook({
  name: "Separator",
  compose: useRole,
  keys: SEPARATOR_KEYS,
  useOptions: function useOptions(_ref) {
    var _ref$orientation = _ref.orientation,
        orientation = _ref$orientation === void 0 ? "horizontal" : _ref$orientation,
        options = _objectWithoutPropertiesLoose(_ref, ["orientation"]);

    return _objectSpread2({
      orientation: orientation
    }, options);
  },
  useProps: function useProps(options, htmlProps) {
    return _objectSpread2({
      role: "separator",
      "aria-orientation": options.orientation
    }, htmlProps);
  }
});
var Separator = createComponent({
  as: "hr",
  memo: true,
  useHook: useSeparator
});

export { Separator, useSeparator };
