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
var __keys = require('../__keys-f41a441b.js');

var useDisclosureContent = createHook.createHook({
  name: "DisclosureContent",
  compose: Role_Role.useRole,
  keys: __keys.DISCLOSURE_CONTENT_KEYS,
  useProps: function useProps(options, _ref) {
    var htmlOnTransitionEnd = _ref.onTransitionEnd,
        htmlOnAnimationEnd = _ref.onAnimationEnd,
        htmlStyle = _ref.style,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["onTransitionEnd", "onAnimationEnd", "style"]);

    var animating = options.animated && options.animating;

    var _React$useState = React.useState(null),
        transition = _React$useState[0],
        setTransition = _React$useState[1];

    var hidden = !options.visible && !animating;
    var style = hidden ? _rollupPluginBabelHelpers._objectSpread2({
      display: "none"
    }, htmlStyle) : htmlStyle;
    var onTransitionEndRef = useLiveRef.useLiveRef(htmlOnTransitionEnd);
    var onAnimationEndRef = useLiveRef.useLiveRef(htmlOnAnimationEnd);
    var raf = React.useRef(0);
    React.useEffect(function () {
      if (!options.animated) return undefined; // Double RAF is needed so the browser has enough time to paint the
      // default styles before processing the `data-enter` attribute. Otherwise
      // it wouldn't be considered a transition.
      // See https://github.com/reakit/reakit/issues/643

      raf.current = window.requestAnimationFrame(function () {
        raf.current = window.requestAnimationFrame(function () {
          if (options.visible) {
            setTransition("enter");
          } else if (animating) {
            setTransition("leave");
          } else {
            setTransition(null);
          }
        });
      });
      return function () {
        return window.cancelAnimationFrame(raf.current);
      };
    }, [options.animated, options.visible, animating]);
    var onEnd = React.useCallback(function (event) {
      if (!isSelfTarget.isSelfTarget(event)) return;
      if (!animating) return; // Ignores number animated

      if (options.animated === true) {
        var _options$stopAnimatio;

        (_options$stopAnimatio = options.stopAnimation) === null || _options$stopAnimatio === void 0 ? void 0 : _options$stopAnimatio.call(options);
      }
    }, [options.animated, animating, options.stopAnimation]);
    var onTransitionEnd = React.useCallback(function (event) {
      var _onTransitionEndRef$c;

      (_onTransitionEndRef$c = onTransitionEndRef.current) === null || _onTransitionEndRef$c === void 0 ? void 0 : _onTransitionEndRef$c.call(onTransitionEndRef, event);
      onEnd(event);
    }, [onEnd]);
    var onAnimationEnd = React.useCallback(function (event) {
      var _onAnimationEndRef$cu;

      (_onAnimationEndRef$cu = onAnimationEndRef.current) === null || _onAnimationEndRef$cu === void 0 ? void 0 : _onAnimationEndRef$cu.call(onAnimationEndRef, event);
      onEnd(event);
    }, [onEnd]);
    return _rollupPluginBabelHelpers._objectSpread2({
      id: options.baseId,
      "data-enter": transition === "enter" ? "" : undefined,
      "data-leave": transition === "leave" ? "" : undefined,
      onTransitionEnd: onTransitionEnd,
      onAnimationEnd: onAnimationEnd,
      hidden: hidden,
      style: style
    }, htmlProps);
  }
});
var DisclosureContent = createComponent.createComponent({
  as: "div",
  useHook: useDisclosureContent
});

exports.DisclosureContent = DisclosureContent;
exports.useDisclosureContent = useDisclosureContent;
