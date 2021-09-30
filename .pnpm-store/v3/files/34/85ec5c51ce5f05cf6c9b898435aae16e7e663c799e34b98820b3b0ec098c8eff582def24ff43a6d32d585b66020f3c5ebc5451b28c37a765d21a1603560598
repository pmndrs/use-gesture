import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { useRef, useCallback } from 'react';
import { useLiveRef } from 'reakit-utils/useLiveRef';
import { isSelfTarget } from 'reakit-utils/isSelfTarget';
import { useRole } from '../Role/Role.js';
import { getDocument } from 'reakit-utils/getDocument';
import { c as COMPOSITE_ITEM_WIDGET_KEYS } from '../__keys-6742f591.js';
import { isTextField } from 'reakit-utils/isTextField';
import 'reakit-utils/fireEvent';
import { s as setTextFieldValue } from '../setTextFieldValue-0a221f4e.js';

function focusCurrentItem(widget, currentId) {
  if (currentId) {
    var _getDocument$getEleme;

    (_getDocument$getEleme = getDocument(widget).getElementById(currentId)) === null || _getDocument$getEleme === void 0 ? void 0 : _getDocument$getEleme.focus();
  }
}

function getTextFieldValue(element) {
  return element.value;
}

var unstable_useCompositeItemWidget = createHook({
  name: "CompositeItemWidget",
  compose: useRole,
  keys: COMPOSITE_ITEM_WIDGET_KEYS,
  useProps: function useProps(options, _ref) {
    var htmlOnFocus = _ref.onFocus,
        htmlOnBlur = _ref.onBlur,
        htmlOnKeyDown = _ref.onKeyDown,
        htmlProps = _objectWithoutPropertiesLoose(_ref, ["onFocus", "onBlur", "onKeyDown"]);

    var initialValue = useRef("");
    var onFocusRef = useLiveRef(htmlOnFocus);
    var onBlurRef = useLiveRef(htmlOnBlur);
    var onKeyDownRef = useLiveRef(htmlOnKeyDown);
    var onFocus = useCallback(function (event) {
      var _onFocusRef$current, _options$unstable_set;

      (_onFocusRef$current = onFocusRef.current) === null || _onFocusRef$current === void 0 ? void 0 : _onFocusRef$current.call(onFocusRef, event);
      (_options$unstable_set = options.unstable_setHasActiveWidget) === null || _options$unstable_set === void 0 ? void 0 : _options$unstable_set.call(options, true);

      if (isTextField(event.currentTarget)) {
        initialValue.current = getTextFieldValue(event.currentTarget);
      }
    }, [options.unstable_setHasActiveWidget]);
    var onBlur = useCallback(function (event) {
      var _onBlurRef$current, _options$unstable_set2;

      (_onBlurRef$current = onBlurRef.current) === null || _onBlurRef$current === void 0 ? void 0 : _onBlurRef$current.call(onBlurRef, event);
      (_options$unstable_set2 = options.unstable_setHasActiveWidget) === null || _options$unstable_set2 === void 0 ? void 0 : _options$unstable_set2.call(options, false);
    }, [options.unstable_setHasActiveWidget]);
    var onKeyDown = useCallback(function (event) {
      var _onKeyDownRef$current;

      (_onKeyDownRef$current = onKeyDownRef.current) === null || _onKeyDownRef$current === void 0 ? void 0 : _onKeyDownRef$current.call(onKeyDownRef, event);
      if (event.defaultPrevented) return;
      if (!isSelfTarget(event)) return;
      if (event.nativeEvent.isComposing) return;
      var element = event.currentTarget;

      if (event.key === "Enter") {
        if (isTextField(element)) {
          var isMultilineTextField = element.tagName === "TEXTAREA"; // Make sure we can create new lines using Shift+Enter

          if (isMultilineTextField && event.shiftKey) return; // Make sure it'll not trigger a click on the parent button

          event.preventDefault();
          focusCurrentItem(element, options.currentId);
        }
      } else if (event.key === "Escape") {
        focusCurrentItem(element, options.currentId);

        if (isTextField(element)) {
          setTextFieldValue(element, initialValue.current);
        }
      }
    }, [options.currentId]);
    return _objectSpread2({
      tabIndex: options.unstable_hasActiveWidget ? 0 : -1,
      "data-composite-item-widget": true,
      onFocus: onFocus,
      onBlur: onBlur,
      onKeyDown: onKeyDown
    }, htmlProps);
  }
});
var unstable_CompositeItemWidget = createComponent({
  as: "div",
  useHook: unstable_useCompositeItemWidget
});

export { unstable_CompositeItemWidget, unstable_useCompositeItemWidget };
