'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
var React = require('react');
var useForkRef = require('reakit-utils/useForkRef');
var useLiveRef = require('reakit-utils/useLiveRef');
var Role_Role = require('../Role/Role.js');
var __keys = require('../__keys-724ea0fe.js');

var useTooltipReference = createHook.createHook({
  name: "TooltipReference",
  compose: Role_Role.useRole,
  keys: __keys.TOOLTIP_REFERENCE_KEYS,
  useProps: function useProps(options, _ref) {
    var htmlRef = _ref.ref,
        htmlOnFocus = _ref.onFocus,
        htmlOnBlur = _ref.onBlur,
        htmlOnMouseEnter = _ref.onMouseEnter,
        htmlOnMouseLeave = _ref.onMouseLeave,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["ref", "onFocus", "onBlur", "onMouseEnter", "onMouseLeave"]);

    var onFocusRef = useLiveRef.useLiveRef(htmlOnFocus);
    var onBlurRef = useLiveRef.useLiveRef(htmlOnBlur);
    var onMouseEnterRef = useLiveRef.useLiveRef(htmlOnMouseEnter);
    var onMouseLeaveRef = useLiveRef.useLiveRef(htmlOnMouseLeave);
    var onFocus = React.useCallback(function (event) {
      var _onFocusRef$current, _options$show;

      (_onFocusRef$current = onFocusRef.current) === null || _onFocusRef$current === void 0 ? void 0 : _onFocusRef$current.call(onFocusRef, event);
      if (event.defaultPrevented) return;
      (_options$show = options.show) === null || _options$show === void 0 ? void 0 : _options$show.call(options);
    }, [options.show]);
    var onBlur = React.useCallback(function (event) {
      var _onBlurRef$current, _options$hide;

      (_onBlurRef$current = onBlurRef.current) === null || _onBlurRef$current === void 0 ? void 0 : _onBlurRef$current.call(onBlurRef, event);
      if (event.defaultPrevented) return;
      (_options$hide = options.hide) === null || _options$hide === void 0 ? void 0 : _options$hide.call(options);
    }, [options.hide]);
    var onMouseEnter = React.useCallback(function (event) {
      var _onMouseEnterRef$curr, _options$show2;

      (_onMouseEnterRef$curr = onMouseEnterRef.current) === null || _onMouseEnterRef$curr === void 0 ? void 0 : _onMouseEnterRef$curr.call(onMouseEnterRef, event);
      if (event.defaultPrevented) return;
      (_options$show2 = options.show) === null || _options$show2 === void 0 ? void 0 : _options$show2.call(options);
    }, [options.show]);
    var onMouseLeave = React.useCallback(function (event) {
      var _onMouseLeaveRef$curr, _options$hide2;

      (_onMouseLeaveRef$curr = onMouseLeaveRef.current) === null || _onMouseLeaveRef$curr === void 0 ? void 0 : _onMouseLeaveRef$curr.call(onMouseLeaveRef, event);
      if (event.defaultPrevented) return;
      (_options$hide2 = options.hide) === null || _options$hide2 === void 0 ? void 0 : _options$hide2.call(options);
    }, [options.hide]);
    return _rollupPluginBabelHelpers._objectSpread2({
      ref: useForkRef.useForkRef(options.unstable_referenceRef, htmlRef),
      tabIndex: 0,
      onFocus: onFocus,
      onBlur: onBlur,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
      "aria-describedby": options.baseId
    }, htmlProps);
  }
});
var TooltipReference = createComponent.createComponent({
  as: "div",
  useHook: useTooltipReference
});

exports.TooltipReference = TooltipReference;
exports.useTooltipReference = useTooltipReference;
