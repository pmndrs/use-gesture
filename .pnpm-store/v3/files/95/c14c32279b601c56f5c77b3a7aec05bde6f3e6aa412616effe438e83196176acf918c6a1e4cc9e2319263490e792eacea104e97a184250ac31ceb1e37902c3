import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { useState, useEffect, useCallback, useRef } from 'react';
import { warning } from 'reakit-warning';
import { useIsomorphicEffect } from 'reakit-utils/useIsomorphicEffect';
import { useSealedState } from 'reakit-utils/useSealedState';
import '../Id/IdProvider.js';
import { unstable_useIdState } from '../Id/IdState.js';

function useLastValue(value) {
  var lastValue = useRef(null);
  useIsomorphicEffect(function () {
    lastValue.current = value;
  }, [value]);
  return lastValue;
}

function useDisclosureState(initialState) {
  if (initialState === void 0) {
    initialState = {};
  }

  var _useSealedState = useSealedState(initialState),
      _useSealedState$visib = _useSealedState.visible,
      initialVisible = _useSealedState$visib === void 0 ? false : _useSealedState$visib,
      _useSealedState$anima = _useSealedState.animated,
      initialAnimated = _useSealedState$anima === void 0 ? false : _useSealedState$anima,
      sealed = _objectWithoutPropertiesLoose(_useSealedState, ["visible", "animated"]);

  var id = unstable_useIdState(sealed);

  var _React$useState = useState(initialVisible),
      visible = _React$useState[0],
      setVisible = _React$useState[1];

  var _React$useState2 = useState(initialAnimated),
      animated = _React$useState2[0],
      setAnimated = _React$useState2[1];

  var _React$useState3 = useState(false),
      animating = _React$useState3[0],
      setAnimating = _React$useState3[1];

  var lastVisible = useLastValue(visible);
  var visibleHasChanged = lastVisible.current != null && lastVisible.current !== visible;

  if (animated && !animating && visibleHasChanged) {
    // Sets animating to true when when visible is updated
    setAnimating(true);
  }

  useEffect(function () {
    if (typeof animated === "number" && animating) {
      var timeout = setTimeout(function () {
        return setAnimating(false);
      }, animated);
      return function () {
        clearTimeout(timeout);
      };
    }

    if (animated && animating && process.env.NODE_ENV === "development") {
      var _timeout = setTimeout(function () {
        process.env.NODE_ENV !== "production" ? warning(animating, "It's been 8 seconds but stopAnimation has not been called. Does the disclousure element have a CSS transition?") : void 0;
      }, 8000);

      return function () {
        clearTimeout(_timeout);
      };
    }

    return function () {};
  }, [animated, animating]);
  var show = useCallback(function () {
    return setVisible(true);
  }, []);
  var hide = useCallback(function () {
    return setVisible(false);
  }, []);
  var toggle = useCallback(function () {
    return setVisible(function (v) {
      return !v;
    });
  }, []);
  var stopAnimation = useCallback(function () {
    return setAnimating(false);
  }, []);
  return _objectSpread2(_objectSpread2({}, id), {}, {
    visible: visible,
    animated: animated,
    animating: animating,
    show: show,
    hide: hide,
    toggle: toggle,
    setVisible: setVisible,
    setAnimated: setAnimated,
    stopAnimation: stopAnimation
  });
}

export { useDisclosureState };
