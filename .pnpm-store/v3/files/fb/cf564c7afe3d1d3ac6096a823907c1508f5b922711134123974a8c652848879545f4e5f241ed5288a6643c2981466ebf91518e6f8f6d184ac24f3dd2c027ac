'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
var React = require('react');
require('reakit-utils/useForkRef');
var isButton = require('reakit-utils/isButton');
require('reakit-warning');
var useLiveRef = require('reakit-utils/useLiveRef');
var isSelfTarget = require('reakit-utils/isSelfTarget');
require('reakit-utils/useIsomorphicEffect');
require('reakit-utils/hasFocusWithin');
require('reakit-utils/isPortalEvent');
require('reakit-utils/dom');
require('reakit-utils/tabbable');
require('../Role/Role.js');
var Tabbable_Tabbable = require('../Tabbable/Tabbable.js');

// Automatically generated
var CLICKABLE_KEYS = ["unstable_clickOnEnter", "unstable_clickOnSpace"];

function isNativeClick(event) {
  var element = event.currentTarget;
  if (!event.isTrusted) return false; // istanbul ignore next: can't test trusted events yet

  return isButton.isButton(element) || element.tagName === "INPUT" || element.tagName === "TEXTAREA" || element.tagName === "A" || element.tagName === "SELECT";
}

var useClickable = createHook.createHook({
  name: "Clickable",
  compose: Tabbable_Tabbable.useTabbable,
  keys: CLICKABLE_KEYS,
  useOptions: function useOptions(_ref) {
    var _ref$unstable_clickOn = _ref.unstable_clickOnEnter,
        unstable_clickOnEnter = _ref$unstable_clickOn === void 0 ? true : _ref$unstable_clickOn,
        _ref$unstable_clickOn2 = _ref.unstable_clickOnSpace,
        unstable_clickOnSpace = _ref$unstable_clickOn2 === void 0 ? true : _ref$unstable_clickOn2,
        options = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["unstable_clickOnEnter", "unstable_clickOnSpace"]);

    return _rollupPluginBabelHelpers._objectSpread2({
      unstable_clickOnEnter: unstable_clickOnEnter,
      unstable_clickOnSpace: unstable_clickOnSpace
    }, options);
  },
  useProps: function useProps(options, _ref2) {
    var htmlOnKeyDown = _ref2.onKeyDown,
        htmlOnKeyUp = _ref2.onKeyUp,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref2, ["onKeyDown", "onKeyUp"]);

    var _React$useState = React.useState(false),
        active = _React$useState[0],
        setActive = _React$useState[1];

    var onKeyDownRef = useLiveRef.useLiveRef(htmlOnKeyDown);
    var onKeyUpRef = useLiveRef.useLiveRef(htmlOnKeyUp);
    var onKeyDown = React.useCallback(function (event) {
      var _onKeyDownRef$current;

      (_onKeyDownRef$current = onKeyDownRef.current) === null || _onKeyDownRef$current === void 0 ? void 0 : _onKeyDownRef$current.call(onKeyDownRef, event);
      if (event.defaultPrevented) return;
      if (options.disabled) return;
      if (event.metaKey) return;
      if (!isSelfTarget.isSelfTarget(event)) return;
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
    var onKeyUp = React.useCallback(function (event) {
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
    return _rollupPluginBabelHelpers._objectSpread2({
      "data-active": active || undefined,
      onKeyDown: onKeyDown,
      onKeyUp: onKeyUp
    }, htmlProps);
  }
});
var Clickable = createComponent.createComponent({
  as: "button",
  memo: true,
  useHook: useClickable
});

exports.Clickable = Clickable;
exports.useClickable = useClickable;
