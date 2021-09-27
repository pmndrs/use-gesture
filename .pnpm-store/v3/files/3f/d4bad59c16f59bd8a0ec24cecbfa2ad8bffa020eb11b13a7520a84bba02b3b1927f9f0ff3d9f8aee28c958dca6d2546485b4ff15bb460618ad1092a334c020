import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { useCallback } from 'react';
import { useForkRef } from 'reakit-utils/useForkRef';
import { useLiveRef } from 'reakit-utils/useLiveRef';
import { useRole } from '../Role/Role.js';
import { b as TOOLTIP_REFERENCE_KEYS } from '../__keys-d101cb3b.js';

var useTooltipReference = createHook({
  name: "TooltipReference",
  compose: useRole,
  keys: TOOLTIP_REFERENCE_KEYS,
  useProps: function useProps(options, _ref) {
    var htmlRef = _ref.ref,
        htmlOnFocus = _ref.onFocus,
        htmlOnBlur = _ref.onBlur,
        htmlOnMouseEnter = _ref.onMouseEnter,
        htmlOnMouseLeave = _ref.onMouseLeave,
        htmlProps = _objectWithoutPropertiesLoose(_ref, ["ref", "onFocus", "onBlur", "onMouseEnter", "onMouseLeave"]);

    var onFocusRef = useLiveRef(htmlOnFocus);
    var onBlurRef = useLiveRef(htmlOnBlur);
    var onMouseEnterRef = useLiveRef(htmlOnMouseEnter);
    var onMouseLeaveRef = useLiveRef(htmlOnMouseLeave);
    var onFocus = useCallback(function (event) {
      var _onFocusRef$current, _options$show;

      (_onFocusRef$current = onFocusRef.current) === null || _onFocusRef$current === void 0 ? void 0 : _onFocusRef$current.call(onFocusRef, event);
      if (event.defaultPrevented) return;
      (_options$show = options.show) === null || _options$show === void 0 ? void 0 : _options$show.call(options);
    }, [options.show]);
    var onBlur = useCallback(function (event) {
      var _onBlurRef$current, _options$hide;

      (_onBlurRef$current = onBlurRef.current) === null || _onBlurRef$current === void 0 ? void 0 : _onBlurRef$current.call(onBlurRef, event);
      if (event.defaultPrevented) return;
      (_options$hide = options.hide) === null || _options$hide === void 0 ? void 0 : _options$hide.call(options);
    }, [options.hide]);
    var onMouseEnter = useCallback(function (event) {
      var _onMouseEnterRef$curr, _options$show2;

      (_onMouseEnterRef$curr = onMouseEnterRef.current) === null || _onMouseEnterRef$curr === void 0 ? void 0 : _onMouseEnterRef$curr.call(onMouseEnterRef, event);
      if (event.defaultPrevented) return;
      (_options$show2 = options.show) === null || _options$show2 === void 0 ? void 0 : _options$show2.call(options);
    }, [options.show]);
    var onMouseLeave = useCallback(function (event) {
      var _onMouseLeaveRef$curr, _options$hide2;

      (_onMouseLeaveRef$curr = onMouseLeaveRef.current) === null || _onMouseLeaveRef$curr === void 0 ? void 0 : _onMouseLeaveRef$curr.call(onMouseLeaveRef, event);
      if (event.defaultPrevented) return;
      (_options$hide2 = options.hide) === null || _options$hide2 === void 0 ? void 0 : _options$hide2.call(options);
    }, [options.hide]);
    return _objectSpread2({
      ref: useForkRef(options.unstable_referenceRef, htmlRef),
      tabIndex: 0,
      onFocus: onFocus,
      onBlur: onBlur,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
      "aria-describedby": options.baseId
    }, htmlProps);
  }
});
var TooltipReference = createComponent({
  as: "div",
  useHook: useTooltipReference
});

export { TooltipReference, useTooltipReference };
