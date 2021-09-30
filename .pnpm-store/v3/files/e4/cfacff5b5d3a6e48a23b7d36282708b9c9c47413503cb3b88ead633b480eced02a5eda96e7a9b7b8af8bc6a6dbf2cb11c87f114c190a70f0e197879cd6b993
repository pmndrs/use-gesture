import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import 'reakit-utils/shallowEqual';
import { useState, useRef, useCallback, useEffect } from 'react';
import 'reakit-warning';
import 'reakit-utils/useIsomorphicEffect';
import 'reakit-utils/dom';
import { useSealedState } from 'reakit-utils/useSealedState';
import '../Id/IdProvider.js';
import '../Id/IdState.js';
import '@popperjs/core';
import '../Disclosure/DisclosureState.js';
import '../Dialog/DialogState.js';
import { usePopoverState } from '../Popover/PopoverState.js';
import { g as globalState } from '../__globalState-300469f0.js';

function useTooltipState(initialState) {
  if (initialState === void 0) {
    initialState = {};
  }

  var _useSealedState = useSealedState(initialState),
      _useSealedState$place = _useSealedState.placement,
      placement = _useSealedState$place === void 0 ? "top" : _useSealedState$place,
      _useSealedState$unsta = _useSealedState.unstable_timeout,
      initialTimeout = _useSealedState$unsta === void 0 ? 0 : _useSealedState$unsta,
      sealed = _objectWithoutPropertiesLoose(_useSealedState, ["placement", "unstable_timeout"]);

  var _React$useState = useState(initialTimeout),
      timeout = _React$useState[0],
      setTimeout = _React$useState[1];

  var showTimeout = useRef(null);
  var hideTimeout = useRef(null);

  var _usePopoverState = usePopoverState(_objectSpread2(_objectSpread2({}, sealed), {}, {
    placement: placement
  })),
      modal = _usePopoverState.modal,
      setModal = _usePopoverState.setModal,
      popover = _objectWithoutPropertiesLoose(_usePopoverState, ["modal", "setModal"]);

  var clearTimeouts = useCallback(function () {
    if (showTimeout.current !== null) {
      window.clearTimeout(showTimeout.current);
    }

    if (hideTimeout.current !== null) {
      window.clearTimeout(hideTimeout.current);
    }
  }, []);
  var hide = useCallback(function () {
    clearTimeouts();
    popover.hide(); // Let's give some time so people can move from a reference to another
    // and still show tooltips immediately

    hideTimeout.current = window.setTimeout(function () {
      globalState.hide(popover.baseId);
    }, timeout);
  }, [clearTimeouts, popover.hide, timeout, popover.baseId]);
  var show = useCallback(function () {
    clearTimeouts();

    if (!timeout || globalState.currentTooltipId) {
      // If there's no timeout or a tooltip visible already, we can show this
      // immediately
      globalState.show(popover.baseId);
      popover.show();
    } else {
      // There may be a reference with focus whose tooltip is still not visible
      // In this case, we want to update it before it gets shown.
      globalState.show(null); // Otherwise, wait a little bit to show the tooltip

      showTimeout.current = window.setTimeout(function () {
        globalState.show(popover.baseId);
        popover.show();
      }, timeout);
    }
  }, [clearTimeouts, timeout, popover.show, popover.baseId]);
  useEffect(function () {
    return globalState.subscribe(function (id) {
      if (id !== popover.baseId) {
        clearTimeouts();

        if (popover.visible) {
          // Make sure there will be only one tooltip visible
          popover.hide();
        }
      }
    });
  }, [popover.baseId, clearTimeouts, popover.visible, popover.hide]);
  useEffect(function () {
    return function () {
      clearTimeouts();
      globalState.hide(popover.baseId);
    };
  }, [clearTimeouts, popover.baseId]);
  return _objectSpread2(_objectSpread2({}, popover), {}, {
    hide: hide,
    show: show,
    unstable_timeout: timeout,
    unstable_setTimeout: setTimeout
  });
}

export { useTooltipState };
