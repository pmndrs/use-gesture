'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
var React = require('react');
var useLiveRef = require('reakit-utils/useLiveRef');
var isSelfTarget = require('reakit-utils/isSelfTarget');
var Role_Role = require('../Role/Role.js');
var getDocument = require('reakit-utils/getDocument');
var __keys = require('../__keys-3b597476.js');
var isTextField = require('reakit-utils/isTextField');
require('reakit-utils/fireEvent');
var setTextFieldValue = require('../setTextFieldValue-b0584ae1.js');

function focusCurrentItem(widget, currentId) {
  if (currentId) {
    var _getDocument$getEleme;

    (_getDocument$getEleme = getDocument.getDocument(widget).getElementById(currentId)) === null || _getDocument$getEleme === void 0 ? void 0 : _getDocument$getEleme.focus();
  }
}

function getTextFieldValue(element) {
  return element.value;
}

var unstable_useCompositeItemWidget = createHook.createHook({
  name: "CompositeItemWidget",
  compose: Role_Role.useRole,
  keys: __keys.COMPOSITE_ITEM_WIDGET_KEYS,
  useProps: function useProps(options, _ref) {
    var htmlOnFocus = _ref.onFocus,
        htmlOnBlur = _ref.onBlur,
        htmlOnKeyDown = _ref.onKeyDown,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["onFocus", "onBlur", "onKeyDown"]);

    var initialValue = React.useRef("");
    var onFocusRef = useLiveRef.useLiveRef(htmlOnFocus);
    var onBlurRef = useLiveRef.useLiveRef(htmlOnBlur);
    var onKeyDownRef = useLiveRef.useLiveRef(htmlOnKeyDown);
    var onFocus = React.useCallback(function (event) {
      var _onFocusRef$current, _options$unstable_set;

      (_onFocusRef$current = onFocusRef.current) === null || _onFocusRef$current === void 0 ? void 0 : _onFocusRef$current.call(onFocusRef, event);
      (_options$unstable_set = options.unstable_setHasActiveWidget) === null || _options$unstable_set === void 0 ? void 0 : _options$unstable_set.call(options, true);

      if (isTextField.isTextField(event.currentTarget)) {
        initialValue.current = getTextFieldValue(event.currentTarget);
      }
    }, [options.unstable_setHasActiveWidget]);
    var onBlur = React.useCallback(function (event) {
      var _onBlurRef$current, _options$unstable_set2;

      (_onBlurRef$current = onBlurRef.current) === null || _onBlurRef$current === void 0 ? void 0 : _onBlurRef$current.call(onBlurRef, event);
      (_options$unstable_set2 = options.unstable_setHasActiveWidget) === null || _options$unstable_set2 === void 0 ? void 0 : _options$unstable_set2.call(options, false);
    }, [options.unstable_setHasActiveWidget]);
    var onKeyDown = React.useCallback(function (event) {
      var _onKeyDownRef$current;

      (_onKeyDownRef$current = onKeyDownRef.current) === null || _onKeyDownRef$current === void 0 ? void 0 : _onKeyDownRef$current.call(onKeyDownRef, event);
      if (event.defaultPrevented) return;
      if (!isSelfTarget.isSelfTarget(event)) return;
      if (event.nativeEvent.isComposing) return;
      var element = event.currentTarget;

      if (event.key === "Enter") {
        if (isTextField.isTextField(element)) {
          var isMultilineTextField = element.tagName === "TEXTAREA"; // Make sure we can create new lines using Shift+Enter

          if (isMultilineTextField && event.shiftKey) return; // Make sure it'll not trigger a click on the parent button

          event.preventDefault();
          focusCurrentItem(element, options.currentId);
        }
      } else if (event.key === "Escape") {
        focusCurrentItem(element, options.currentId);

        if (isTextField.isTextField(element)) {
          setTextFieldValue.setTextFieldValue(element, initialValue.current);
        }
      }
    }, [options.currentId]);
    return _rollupPluginBabelHelpers._objectSpread2({
      tabIndex: options.unstable_hasActiveWidget ? 0 : -1,
      "data-composite-item-widget": true,
      onFocus: onFocus,
      onBlur: onBlur,
      onKeyDown: onKeyDown
    }, htmlProps);
  }
});
var unstable_CompositeItemWidget = createComponent.createComponent({
  as: "div",
  useHook: unstable_useCompositeItemWidget
});

exports.unstable_CompositeItemWidget = unstable_CompositeItemWidget;
exports.unstable_useCompositeItemWidget = unstable_useCompositeItemWidget;
