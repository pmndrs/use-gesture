import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useLiveRef } from 'reakit-utils/useLiveRef';
import { isSelfTarget } from 'reakit-utils/isSelfTarget';
import { useRole } from '../Role/Role.js';
import { a as DISCLOSURE_CONTENT_KEYS } from '../__keys-e6a5cfbe.js';

var useDisclosureContent = createHook({
  name: "DisclosureContent",
  compose: useRole,
  keys: DISCLOSURE_CONTENT_KEYS,
  useProps: function useProps(options, _ref) {
    var htmlOnTransitionEnd = _ref.onTransitionEnd,
        htmlOnAnimationEnd = _ref.onAnimationEnd,
        htmlStyle = _ref.style,
        htmlProps = _objectWithoutPropertiesLoose(_ref, ["onTransitionEnd", "onAnimationEnd", "style"]);

    var animating = options.animated && options.animating;

    var _React$useState = useState(null),
        transition = _React$useState[0],
        setTransition = _React$useState[1];

    var hidden = !options.visible && !animating;
    var style = hidden ? _objectSpread2({
      display: "none"
    }, htmlStyle) : htmlStyle;
    var onTransitionEndRef = useLiveRef(htmlOnTransitionEnd);
    var onAnimationEndRef = useLiveRef(htmlOnAnimationEnd);
    var raf = useRef(0);
    useEffect(function () {
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
    var onEnd = useCallback(function (event) {
      if (!isSelfTarget(event)) return;
      if (!animating) return; // Ignores number animated

      if (options.animated === true) {
        var _options$stopAnimatio;

        (_options$stopAnimatio = options.stopAnimation) === null || _options$stopAnimatio === void 0 ? void 0 : _options$stopAnimatio.call(options);
      }
    }, [options.animated, animating, options.stopAnimation]);
    var onTransitionEnd = useCallback(function (event) {
      var _onTransitionEndRef$c;

      (_onTransitionEndRef$c = onTransitionEndRef.current) === null || _onTransitionEndRef$c === void 0 ? void 0 : _onTransitionEndRef$c.call(onTransitionEndRef, event);
      onEnd(event);
    }, [onEnd]);
    var onAnimationEnd = useCallback(function (event) {
      var _onAnimationEndRef$cu;

      (_onAnimationEndRef$cu = onAnimationEndRef.current) === null || _onAnimationEndRef$cu === void 0 ? void 0 : _onAnimationEndRef$cu.call(onAnimationEndRef, event);
      onEnd(event);
    }, [onEnd]);
    return _objectSpread2({
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
var DisclosureContent = createComponent({
  as: "div",
  useHook: useDisclosureContent
});

export { DisclosureContent, useDisclosureContent };
