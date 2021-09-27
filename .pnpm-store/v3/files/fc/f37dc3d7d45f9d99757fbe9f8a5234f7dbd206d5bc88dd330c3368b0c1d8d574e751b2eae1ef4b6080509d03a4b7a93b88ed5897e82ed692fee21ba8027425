'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
var React = require('react');
var useForkRef = require('reakit-utils/useForkRef');
var Role_Role = require('../Role/Role.js');
var __keys = require('../__keys-eddd3051.js');

var usePopoverArrow = createHook.createHook({
  name: "PopoverArrow",
  compose: Role_Role.useRole,
  keys: __keys.POPOVER_ARROW_KEYS,
  useOptions: function useOptions(_ref) {
    var _ref$size = _ref.size,
        size = _ref$size === void 0 ? 30 : _ref$size,
        options = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["size"]);

    return _rollupPluginBabelHelpers._objectSpread2({
      size: size
    }, options);
  },
  useProps: function useProps(options, _ref2) {
    var _objectSpread2;

    var htmlRef = _ref2.ref,
        htmlStyle = _ref2.style,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref2, ["ref", "style"]);

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
    var children = React.useMemo(function () {
      return /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 30 30",
        style: {
          transform: transform
        }
      }, /*#__PURE__*/React.createElement("path", {
        className: "stroke",
        d: "M23.7,27.1L17,19.9C16.5,19.3,15.8,19,15,19s-1.6,0.3-2.1,0.9l-6.6,7.2C5.3,28.1,3.4,29,2,29h26 C26.7,29,24.6,28.1,23.7,27.1z"
      }), /*#__PURE__*/React.createElement("path", {
        className: "fill",
        d: "M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z"
      }));
    }, [transform]);
    return _rollupPluginBabelHelpers._objectSpread2({
      ref: useForkRef.useForkRef(options.unstable_arrowRef, htmlRef),
      style: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, arrowStyles), {}, (_objectSpread2 = {
        fontSize: options.size,
        width: "1em",
        height: "1em",
        pointerEvents: "none"
      }, _objectSpread2[placement] = "100%", _objectSpread2), htmlStyle),
      children: children
    }, htmlProps);
  }
});
var PopoverArrow = createComponent.createComponent({
  as: "div",
  memo: true,
  useHook: usePopoverArrow
});

exports.PopoverArrow = PopoverArrow;
exports.usePopoverArrow = usePopoverArrow;
