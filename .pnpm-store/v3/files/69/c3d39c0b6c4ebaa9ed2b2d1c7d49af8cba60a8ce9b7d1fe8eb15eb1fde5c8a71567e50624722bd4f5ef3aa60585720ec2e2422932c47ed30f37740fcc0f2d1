import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { useRole } from '../Role/Role.js';

// Automatically generated
var VISUALLY_HIDDEN_KEYS = [];

var useVisuallyHidden = createHook({
  name: "VisuallyHidden",
  compose: useRole,
  keys: VISUALLY_HIDDEN_KEYS,
  useProps: function useProps(_, _ref) {
    var htmlStyle = _ref.style,
        htmlProps = _objectWithoutPropertiesLoose(_ref, ["style"]);

    return _objectSpread2({
      style: _objectSpread2({
        border: 0,
        clip: "rect(0 0 0 0)",
        height: "1px",
        margin: "-1px",
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        whiteSpace: "nowrap",
        width: "1px"
      }, htmlStyle)
    }, htmlProps);
  }
});
var VisuallyHidden = createComponent({
  as: "span",
  memo: true,
  useHook: useVisuallyHidden
});

export { VisuallyHidden, useVisuallyHidden };
