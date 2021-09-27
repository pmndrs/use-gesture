'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
var React = require('react');
var useForkRef = require('reakit-utils/useForkRef');
var isButton = require('reakit-utils/isButton');
var reakitWarning = require('reakit-warning');
var useLiveRef = require('reakit-utils/useLiveRef');
var useIsomorphicEffect = require('reakit-utils/useIsomorphicEffect');
var hasFocusWithin = require('reakit-utils/hasFocusWithin');
var isPortalEvent = require('reakit-utils/isPortalEvent');
var dom = require('reakit-utils/dom');
var tabbable = require('reakit-utils/tabbable');
var Role_Role = require('../Role/Role.js');

// Automatically generated
var TABBABLE_KEYS = ["disabled", "focusable"];

var isSafariOrFirefoxOnMac = dom.isUA("Mac") && !dom.isUA("Chrome") && (dom.isUA("Safari") || dom.isUA("Firefox"));

function focusIfNeeded(element) {
  if (!hasFocusWithin.hasFocusWithin(element) && tabbable.isFocusable(element)) {
    element.focus();
  }
}

function isNativeTabbable(element) {
  return element.tagName === "BUTTON" || element.tagName === "INPUT" || element.tagName === "SELECT" || element.tagName === "TEXTAREA" || element.tagName === "A";
}

function supportsDisabledAttribute(element) {
  return element.tagName === "BUTTON" || element.tagName === "INPUT" || element.tagName === "SELECT" || element.tagName === "TEXTAREA";
}

function getTabIndex(trulyDisabled, nativeTabbable, supportsDisabled, htmlTabIndex) {
  if (trulyDisabled) {
    if (nativeTabbable && !supportsDisabled) {
      // Anchor, audio and video tags don't support the `disabled` attribute.
      // We must pass tabIndex={-1} so they don't receive focus on tab.
      return -1;
    } // Elements that support the `disabled` attribute don't need tabIndex.


    return undefined;
  }

  if (nativeTabbable) {
    // If the element is enabled and it's natively tabbable, we don't need to
    // specify a tabIndex attribute unless it's explicitly set by the user.
    return htmlTabIndex;
  } // If the element is enabled and is not natively tabbable, we have to
  // fallback tabIndex={0}.


  return htmlTabIndex || 0;
}

function useDisableEvent(htmlEventRef, disabled) {
  return React.useCallback(function (event) {
    var _htmlEventRef$current;

    (_htmlEventRef$current = htmlEventRef.current) === null || _htmlEventRef$current === void 0 ? void 0 : _htmlEventRef$current.call(htmlEventRef, event);
    if (event.defaultPrevented) return;

    if (disabled) {
      event.stopPropagation();
      event.preventDefault();
    }
  }, [htmlEventRef, disabled]);
}

var useTabbable = createHook.createHook({
  name: "Tabbable",
  compose: Role_Role.useRole,
  keys: TABBABLE_KEYS,
  useOptions: function useOptions(options, _ref) {
    var disabled = _ref.disabled;
    return _rollupPluginBabelHelpers._objectSpread2({
      disabled: disabled
    }, options);
  },
  useProps: function useProps(options, _ref2) {
    var htmlRef = _ref2.ref,
        htmlTabIndex = _ref2.tabIndex,
        htmlOnClickCapture = _ref2.onClickCapture,
        htmlOnMouseDownCapture = _ref2.onMouseDownCapture,
        htmlOnMouseDown = _ref2.onMouseDown,
        htmlOnKeyPressCapture = _ref2.onKeyPressCapture,
        htmlStyle = _ref2.style,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref2, ["ref", "tabIndex", "onClickCapture", "onMouseDownCapture", "onMouseDown", "onKeyPressCapture", "style"]);

    var ref = React.useRef(null);
    var onClickCaptureRef = useLiveRef.useLiveRef(htmlOnClickCapture);
    var onMouseDownCaptureRef = useLiveRef.useLiveRef(htmlOnMouseDownCapture);
    var onMouseDownRef = useLiveRef.useLiveRef(htmlOnMouseDown);
    var onKeyPressCaptureRef = useLiveRef.useLiveRef(htmlOnKeyPressCapture);
    var trulyDisabled = !!options.disabled && !options.focusable;

    var _React$useState = React.useState(true),
        nativeTabbable = _React$useState[0],
        setNativeTabbable = _React$useState[1];

    var _React$useState2 = React.useState(true),
        supportsDisabled = _React$useState2[0],
        setSupportsDisabled = _React$useState2[1];

    var style = options.disabled ? _rollupPluginBabelHelpers._objectSpread2({
      pointerEvents: "none"
    }, htmlStyle) : htmlStyle;
    useIsomorphicEffect.useIsomorphicEffect(function () {
      var tabbable = ref.current;

      if (!tabbable) {
        process.env.NODE_ENV !== "production" ? reakitWarning.warning(true, "Can't determine if the element is a native tabbable element because `ref` wasn't passed to the component.", "See https://reakit.io/docs/tabbable") : void 0;
        return;
      }

      if (!isNativeTabbable(tabbable)) {
        setNativeTabbable(false);
      }

      if (!supportsDisabledAttribute(tabbable)) {
        setSupportsDisabled(false);
      }
    }, []);
    var onClickCapture = useDisableEvent(onClickCaptureRef, options.disabled);
    var onMouseDownCapture = useDisableEvent(onMouseDownCaptureRef, options.disabled);
    var onKeyPressCapture = useDisableEvent(onKeyPressCaptureRef, options.disabled);
    var onMouseDown = React.useCallback(function (event) {
      var _onMouseDownRef$curre;

      (_onMouseDownRef$curre = onMouseDownRef.current) === null || _onMouseDownRef$curre === void 0 ? void 0 : _onMouseDownRef$curre.call(onMouseDownRef, event);
      var element = event.currentTarget;
      if (event.defaultPrevented) return; // Safari and Firefox on MacOS don't focus on buttons on mouse down
      // like other browsers/platforms. Instead, they focus on the closest
      // focusable ancestor element, which is ultimately the body element. So
      // we make sure to give focus to the tabbable element on mouse down so
      // it works consistently across browsers.

      if (!isSafariOrFirefoxOnMac) return;
      if (isPortalEvent.isPortalEvent(event)) return;
      if (!isButton.isButton(element)) return; // We can't focus right away after on mouse down, otherwise it would
      // prevent drag events from happening. So we schedule the focus to the
      // next animation frame.

      var raf = requestAnimationFrame(function () {
        element.removeEventListener("mouseup", focusImmediately, true);
        focusIfNeeded(element);
      }); // If mouseUp happens before the next animation frame (which is common
      // on touch screens or by just tapping the trackpad on MacBook's), we
      // cancel the animation frame and immediately focus on the element.

      var focusImmediately = function focusImmediately() {
        cancelAnimationFrame(raf);
        focusIfNeeded(element);
      }; // By listening to the event in the capture phase, we make sure the
      // focus event is fired before the onMouseUp and onMouseUpCapture React
      // events, which is aligned with the default browser behavior.


      element.addEventListener("mouseup", focusImmediately, {
        once: true,
        capture: true
      });
    }, []);
    return _rollupPluginBabelHelpers._objectSpread2({
      ref: useForkRef.useForkRef(ref, htmlRef),
      style: style,
      tabIndex: getTabIndex(trulyDisabled, nativeTabbable, supportsDisabled, htmlTabIndex),
      disabled: trulyDisabled && supportsDisabled ? true : undefined,
      "aria-disabled": options.disabled ? true : undefined,
      onClickCapture: onClickCapture,
      onMouseDownCapture: onMouseDownCapture,
      onMouseDown: onMouseDown,
      onKeyPressCapture: onKeyPressCapture
    }, htmlProps);
  }
});
var Tabbable = createComponent.createComponent({
  as: "div",
  useHook: useTabbable
});

exports.Tabbable = Tabbable;
exports.useTabbable = useTabbable;
