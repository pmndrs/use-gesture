'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var React = require('react');
var reakitWarning = require('reakit-warning');
var useIsomorphicEffect = require('reakit-utils/useIsomorphicEffect');
var useSealedState = require('reakit-utils/useSealedState');
require('../Id/IdProvider.js');
var Id_IdState = require('../Id/IdState.js');

function useLastValue(value) {
  var lastValue = React.useRef(null);
  useIsomorphicEffect.useIsomorphicEffect(function () {
    lastValue.current = value;
  }, [value]);
  return lastValue;
}

function useDisclosureState(initialState) {
  if (initialState === void 0) {
    initialState = {};
  }

  var _useSealedState = useSealedState.useSealedState(initialState),
      _useSealedState$visib = _useSealedState.visible,
      initialVisible = _useSealedState$visib === void 0 ? false : _useSealedState$visib,
      _useSealedState$anima = _useSealedState.animated,
      initialAnimated = _useSealedState$anima === void 0 ? false : _useSealedState$anima,
      sealed = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_useSealedState, ["visible", "animated"]);

  var id = Id_IdState.unstable_useIdState(sealed);

  var _React$useState = React.useState(initialVisible),
      visible = _React$useState[0],
      setVisible = _React$useState[1];

  var _React$useState2 = React.useState(initialAnimated),
      animated = _React$useState2[0],
      setAnimated = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      animating = _React$useState3[0],
      setAnimating = _React$useState3[1];

  var lastVisible = useLastValue(visible);
  var visibleHasChanged = lastVisible.current != null && lastVisible.current !== visible;

  if (animated && !animating && visibleHasChanged) {
    // Sets animating to true when when visible is updated
    setAnimating(true);
  }

  React.useEffect(function () {
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
        process.env.NODE_ENV !== "production" ? reakitWarning.warning(animating, "It's been 8 seconds but stopAnimation has not been called. Does the disclousure element have a CSS transition?") : void 0;
      }, 8000);

      return function () {
        clearTimeout(_timeout);
      };
    }

    return function () {};
  }, [animated, animating]);
  var show = React.useCallback(function () {
    return setVisible(true);
  }, []);
  var hide = React.useCallback(function () {
    return setVisible(false);
  }, []);
  var toggle = React.useCallback(function () {
    return setVisible(function (v) {
      return !v;
    });
  }, []);
  var stopAnimation = React.useCallback(function () {
    return setAnimating(false);
  }, []);
  return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, id), {}, {
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

exports.useDisclosureState = useDisclosureState;
