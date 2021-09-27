'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
require('reakit-utils/shallowEqual');
var React = require('react');
require('reakit-warning');
require('reakit-utils/useIsomorphicEffect');
require('reakit-utils/dom');
var useSealedState = require('reakit-utils/useSealedState');
require('../Id/IdProvider.js');
require('../Id/IdState.js');
require('@popperjs/core');
require('../Disclosure/DisclosureState.js');
require('../Dialog/DialogState.js');
var Popover_PopoverState = require('../Popover/PopoverState.js');
var __globalState = require('../__globalState-de564b64.js');

function useTooltipState(initialState) {
  if (initialState === void 0) {
    initialState = {};
  }

  var _useSealedState = useSealedState.useSealedState(initialState),
      _useSealedState$place = _useSealedState.placement,
      placement = _useSealedState$place === void 0 ? "top" : _useSealedState$place,
      _useSealedState$unsta = _useSealedState.unstable_timeout,
      initialTimeout = _useSealedState$unsta === void 0 ? 0 : _useSealedState$unsta,
      sealed = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_useSealedState, ["placement", "unstable_timeout"]);

  var _React$useState = React.useState(initialTimeout),
      timeout = _React$useState[0],
      setTimeout = _React$useState[1];

  var showTimeout = React.useRef(null);
  var hideTimeout = React.useRef(null);

  var _usePopoverState = Popover_PopoverState.usePopoverState(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, sealed), {}, {
    placement: placement
  })),
      modal = _usePopoverState.modal,
      setModal = _usePopoverState.setModal,
      popover = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_usePopoverState, ["modal", "setModal"]);

  var clearTimeouts = React.useCallback(function () {
    if (showTimeout.current !== null) {
      window.clearTimeout(showTimeout.current);
    }

    if (hideTimeout.current !== null) {
      window.clearTimeout(hideTimeout.current);
    }
  }, []);
  var hide = React.useCallback(function () {
    clearTimeouts();
    popover.hide(); // Let's give some time so people can move from a reference to another
    // and still show tooltips immediately

    hideTimeout.current = window.setTimeout(function () {
      __globalState.globalState.hide(popover.baseId);
    }, timeout);
  }, [clearTimeouts, popover.hide, timeout, popover.baseId]);
  var show = React.useCallback(function () {
    clearTimeouts();

    if (!timeout || __globalState.globalState.currentTooltipId) {
      // If there's no timeout or a tooltip visible already, we can show this
      // immediately
      __globalState.globalState.show(popover.baseId);
      popover.show();
    } else {
      // There may be a reference with focus whose tooltip is still not visible
      // In this case, we want to update it before it gets shown.
      __globalState.globalState.show(null); // Otherwise, wait a little bit to show the tooltip

      showTimeout.current = window.setTimeout(function () {
        __globalState.globalState.show(popover.baseId);
        popover.show();
      }, timeout);
    }
  }, [clearTimeouts, timeout, popover.show, popover.baseId]);
  React.useEffect(function () {
    return __globalState.globalState.subscribe(function (id) {
      if (id !== popover.baseId) {
        clearTimeouts();

        if (popover.visible) {
          // Make sure there will be only one tooltip visible
          popover.hide();
        }
      }
    });
  }, [popover.baseId, clearTimeouts, popover.visible, popover.hide]);
  React.useEffect(function () {
    return function () {
      clearTimeouts();
      __globalState.globalState.hide(popover.baseId);
    };
  }, [clearTimeouts, popover.baseId]);
  return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, popover), {}, {
    hide: hide,
    show: show,
    unstable_timeout: timeout,
    unstable_setTimeout: setTimeout
  });
}

exports.useTooltipState = useTooltipState;
