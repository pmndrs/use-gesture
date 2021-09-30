import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { useMemo, createElement } from 'react';
import { useForkRef } from 'reakit-utils/useForkRef';
import { useRole } from '../Role/Role.js';
import { a as POPOVER_ARROW_KEYS } from '../__keys-26bb1730.js';

var usePopoverArrow = createHook({
  name: "PopoverArrow",
  compose: useRole,
  keys: POPOVER_ARROW_KEYS,
  useOptions: function useOptions(_ref) {
    var _ref$size = _ref.size,
        size = _ref$size === void 0 ? 30 : _ref$size,
        options = _objectWithoutPropertiesLoose(_ref, ["size"]);

    return _objectSpread2({
      size: size
    }, options);
  },
  useProps: function useProps(options, _ref2) {
    var _objectSpread2$1;

    var htmlRef = _ref2.ref,
        htmlStyle = _ref2.style,
        htmlProps = _objectWithoutPropertiesLoose(_ref2, ["ref", "style"]);

    var _options$placement$sp = options.placement.split("-"),
        placement = _options$placement$sp[0];

    var transformMap = {
      top: "rotateZ(180deg)",
      right: "rotateZ(-90deg)",
      bottom: "rotateZ(360deg)",
      left: "rotateZ(90deg)"
    };
    var arrowStyles = options.unstable_arrowStyles;
    var transform = transformMap[placement];
    var children = useMemo(function () {
      return /*#__PURE__*/createElement("svg", {
        viewBox: "0 0 30 30",
        style: {
          transform: transform
        }
      }, /*#__PURE__*/createElement("path", {
        className: "stroke",
        d: "M23.7,27.1L17,19.9C16.5,19.3,15.8,19,15,19s-1.6,0.3-2.1,0.9l-6.6,7.2C5.3,28.1,3.4,29,2,29h26 C26.7,29,24.6,28.1,23.7,27.1z"
      }), /*#__PURE__*/createElement("path", {
        className: "fill",
        d: "M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z"
      }));
    }, [transform]);
    return _objectSpread2({
      ref: useForkRef(options.unstable_arrowRef, htmlRef),
      style: _objectSpread2(_objectSpread2({}, arrowStyles), {}, (_objectSpread2$1 = {
        fontSize: options.size,
        width: "1em",
        height: "1em",
        pointerEvents: "none"
      }, _objectSpread2$1[placement] = "100%", _objectSpread2$1), htmlStyle),
      children: children
    }, htmlProps);
  }
});
var PopoverArrow = createComponent({
  as: "div",
  memo: true,
  useHook: usePopoverArrow
});

export { PopoverArrow, usePopoverArrow };
