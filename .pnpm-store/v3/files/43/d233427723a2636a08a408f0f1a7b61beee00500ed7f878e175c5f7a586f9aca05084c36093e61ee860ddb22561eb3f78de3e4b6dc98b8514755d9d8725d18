import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { useState, useCallback } from 'react';
import 'reakit-utils/useForkRef';
import { isButton } from 'reakit-utils/isButton';
import 'reakit-warning';
import { useLiveRef } from 'reakit-utils/useLiveRef';
import { isSelfTarget } from 'reakit-utils/isSelfTarget';
import 'reakit-utils/useIsomorphicEffect';
import 'reakit-utils/hasFocusWithin';
import 'reakit-utils/isPortalEvent';
import 'reakit-utils/dom';
import 'reakit-utils/tabbable';
import '../Role/Role.js';
import { useTabbable } from '../Tabbable/Tabbable.js';

// Automatically generated
var CLICKABLE_KEYS = ["unstable_clickOnEnter", "unstable_clickOnSpace"];

function isNativeClick(event) {
  var element = event.currentTarget;
  if (!event.isTrusted) return false; // istanbul ignore next: can't test trusted events yet

  return isButton(element) || element.tagName === "INPUT" || element.tagName === "TEXTAREA" || element.tagName === "A" || element.tagName === "SELECT";
}

var useClickable = createHook({
  name: "Clickable",
  compose: useTabbable,
  keys: CLICKABLE_KEYS,
  useOptions: function useOptions(_ref) {
    var _ref$unstable_clickOn = _ref.unstable_clickOnEnter,
        unstable_clickOnEnter = _ref$unstable_clickOn === void 0 ? true : _ref$unstable_clickOn,
        _ref$unstable_clickOn2 = _ref.unstable_clickOnSpace,
        unstable_clickOnSpace = _ref$unstable_clickOn2 === void 0 ? true : _ref$unstable_clickOn2,
        options = _objectWithoutPropertiesLoose(_ref, ["unstable_clickOnEnter", "unstable_clickOnSpace"]);

    return _objectSpread2({
      unstable_clickOnEnter: unstable_clickOnEnter,
      unstable_clickOnSpace: unstable_clickOnSpace
    }, options);
  },
  useProps: function useProps(options, _ref2) {
    var htmlOnKeyDown = _ref2.onKeyDown,
        htmlOnKeyUp = _ref2.onKeyUp,
        htmlProps = _objectWithoutPropertiesLoose(_ref2, ["onKeyDown", "onKeyUp"]);

    var _React$useState = useState(false),
        active = _React$useState[0],
        setActive = _React$useState[1];

    var onKeyDownRef = useLiveRef(htmlOnKeyDown);
    var onKeyUpRef = useLiveRef(htmlOnKeyUp);
    var onKeyDown = useCallback(function (event) {
      var _onKeyDownRef$current;

      (_onKeyDownRef$current = onKeyDownRef.current) === null || _onKeyDownRef$current === void 0 ? void 0 : _onKeyDownRef$current.call(onKeyDownRef, event);
      if (event.defaultPrevented) return;
      if (options.disabled) return;
      if (event.metaKey) return;
      if (!isSelfTarget(event)) return;
      var isEnter = options.unstable_clickOnEnter && event.key === "Enter";
      var isSpace = options.unstable_clickOnSpace && event.key === " ";

      if (isEnter || isSpace) {
        if (isNativeClick(event)) return;
        event.preventDefault();

        if (isEnter) {
          event.currentTarget.click();
        } else if (isSpace) {
          setActive(true);
        }
      }
    }, [options.disabled, options.unstable_clickOnEnter, options.unstable_clickOnSpace]);
    var onKeyUp = useCallback(function (event) {
      var _onKeyUpRef$current;

      (_onKeyUpRef$current = onKeyUpRef.current) === null || _onKeyUpRef$current === void 0 ? void 0 : _onKeyUpRef$current.call(onKeyUpRef, event);
      if (event.defaultPrevented) return;
      if (options.disabled) return;
      if (event.metaKey) return;
      var isSpace = options.unstable_clickOnSpace && event.key === " ";

      if (active && isSpace) {
        setActive(false);
        event.currentTarget.click();
      }
    }, [options.disabled, options.unstable_clickOnSpace, active]);
    return _objectSpread2({
      "data-active": active || undefined,
      onKeyDown: onKeyDown,
      onKeyUp: onKeyUp
    }, htmlProps);
  }
});
var Clickable = createComponent({
  as: "button",
  memo: true,
  useHook: useClickable
});

export { Clickable, useClickable };
