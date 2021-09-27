'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var shallowEqual = require('reakit-utils/shallowEqual');
var React = require('react');
require('reakit-warning');
var useIsomorphicEffect = require('reakit-utils/useIsomorphicEffect');
var dom = require('reakit-utils/dom');
var useSealedState = require('reakit-utils/useSealedState');
require('../Id/IdProvider.js');
require('../Id/IdState.js');
var core = require('@popperjs/core');
require('../Disclosure/DisclosureState.js');
var Dialog_DialogState = require('../Dialog/DialogState.js');

var isSafari = dom.isUA("Mac") && !dom.isUA("Chrome") && dom.isUA("Safari");

function applyStyles(styles) {
  return function (prevStyles) {
    if (styles && !shallowEqual.shallowEqual(prevStyles, styles)) {
      return styles;
    }

    return prevStyles;
  };
}

function usePopoverState(initialState) {
  if (initialState === void 0) {
    initialState = {};
  }

  var _useSealedState = useSealedState.useSealedState(initialState),
      _useSealedState$gutte = _useSealedState.gutter,
      gutter = _useSealedState$gutte === void 0 ? 12 : _useSealedState$gutte,
      _useSealedState$place = _useSealedState.placement,
      sealedPlacement = _useSealedState$place === void 0 ? "bottom" : _useSealedState$place,
      _useSealedState$unsta = _useSealedState.unstable_flip,
      flip = _useSealedState$unsta === void 0 ? true : _useSealedState$unsta,
      sealedOffset = _useSealedState.unstable_offset,
      _useSealedState$unsta2 = _useSealedState.unstable_preventOverflow,
      preventOverflow = _useSealedState$unsta2 === void 0 ? true : _useSealedState$unsta2,
      _useSealedState$unsta3 = _useSealedState.unstable_fixed,
      fixed = _useSealedState$unsta3 === void 0 ? false : _useSealedState$unsta3,
      _useSealedState$modal = _useSealedState.modal,
      modal = _useSealedState$modal === void 0 ? false : _useSealedState$modal,
      sealed = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_useSealedState, ["gutter", "placement", "unstable_flip", "unstable_offset", "unstable_preventOverflow", "unstable_fixed", "modal"]);

  var popper = React.useRef(null);
  var referenceRef = React.useRef(null);
  var popoverRef = React.useRef(null);
  var arrowRef = React.useRef(null);

  var _React$useState = React.useState(sealedPlacement),
      originalPlacement = _React$useState[0],
      place = _React$useState[1];

  var _React$useState2 = React.useState(sealedPlacement),
      placement = _React$useState2[0],
      setPlacement = _React$useState2[1];

  var _React$useState3 = React.useState(sealedOffset || [0, gutter]),
      offset = _React$useState3[0];

  var _React$useState4 = React.useState({
    position: "fixed",
    left: "100%",
    top: "100%"
  }),
      popoverStyles = _React$useState4[0],
      setPopoverStyles = _React$useState4[1];

  var _React$useState5 = React.useState({}),
      arrowStyles = _React$useState5[0],
      setArrowStyles = _React$useState5[1];

  var dialog = Dialog_DialogState.useDialogState(_rollupPluginBabelHelpers._objectSpread2({
    modal: modal
  }, sealed));
  var update = React.useCallback(function () {
    if (popper.current) {
      popper.current.forceUpdate();
      return true;
    }

    return false;
  }, []);
  var updateState = React.useCallback(function (state) {
    if (state.placement) {
      setPlacement(state.placement);
    }

    if (state.styles) {
      setPopoverStyles(applyStyles(state.styles.popper));

      if (arrowRef.current) {
        setArrowStyles(applyStyles(state.styles.arrow));
      }
    }
  }, []);
  useIsomorphicEffect.useIsomorphicEffect(function () {
    if (referenceRef.current && popoverRef.current) {
      popper.current = core.createPopper(referenceRef.current, popoverRef.current, {
        // https://popper.js.org/docs/v2/constructors/#options
        placement: originalPlacement,
        strategy: fixed ? "fixed" : "absolute",
        // Safari needs styles to be applied in the first render, otherwise
        // hovering over the popover when it gets visible for the first time
        // will change its dimensions unexpectedly.
        onFirstUpdate: isSafari ? updateState : undefined,
        modifiers: [{
          // https://popper.js.org/docs/v2/modifiers/event-listeners/
          name: "eventListeners",
          enabled: dialog.visible
        }, {
          // https://popper.js.org/docs/v2/modifiers/apply-styles/
          name: "applyStyles",
          enabled: false
        }, {
          // https://popper.js.org/docs/v2/modifiers/flip/
          name: "flip",
          enabled: flip,
          options: {
            padding: 8
          }
        }, {
          // https://popper.js.org/docs/v2/modifiers/offset/
          name: "offset",
          options: {
            offset: offset
          }
        }, {
          // https://popper.js.org/docs/v2/modifiers/prevent-overflow/
          name: "preventOverflow",
          enabled: preventOverflow,
          options: {
            tetherOffset: function tetherOffset() {
              var _arrowRef$current;

              return ((_arrowRef$current = arrowRef.current) === null || _arrowRef$current === void 0 ? void 0 : _arrowRef$current.clientWidth) || 0;
            }
          }
        }, {
          // https://popper.js.org/docs/v2/modifiers/arrow/
          name: "arrow",
          enabled: !!arrowRef.current,
          options: {
            element: arrowRef.current
          }
        }, {
          // https://popper.js.org/docs/v2/modifiers/#custom-modifiers
          name: "updateState",
          phase: "write",
          requires: ["computeStyles"],
          enabled: dialog.visible && process.env.NODE_ENV !== "test",
          fn: function fn(_ref) {
            var state = _ref.state;
            return updateState(state);
          }
        }]
      });
    }

    return function () {
      if (popper.current) {
        popper.current.destroy();
        popper.current = null;
      }
    };
  }, [originalPlacement, fixed, dialog.visible, flip, offset, preventOverflow]); // Ensure that the popover will be correctly positioned with an additional
  // update.

  React.useEffect(function () {
    if (!dialog.visible) return undefined;
    var id = window.requestAnimationFrame(function () {
      var _popper$current;

      (_popper$current = popper.current) === null || _popper$current === void 0 ? void 0 : _popper$current.forceUpdate();
    });
    return function () {
      window.cancelAnimationFrame(id);
    };
  }, [dialog.visible]);
  return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, dialog), {}, {
    unstable_referenceRef: referenceRef,
    unstable_popoverRef: popoverRef,
    unstable_arrowRef: arrowRef,
    unstable_popoverStyles: popoverStyles,
    unstable_arrowStyles: arrowStyles,
    unstable_update: update,
    unstable_originalPlacement: originalPlacement,
    placement: placement,
    place: place
  });
}

exports.usePopoverState = usePopoverState;
