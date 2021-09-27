import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import 'reakit-utils/shallowEqual';
import { useContext, useEffect } from 'react';
import 'reakit-warning';
import 'reakit-utils/useIsomorphicEffect';
import 'reakit-utils/dom';
import { useSealedState } from 'reakit-utils/useSealedState';
import 'reakit-utils/getDocument';
import '../reverse-30eaa122.js';
import '../getCurrentId-5aa9849e.js';
import '../findEnabledItemById-8ddca752.js';
import '../Id/IdProvider.js';
import 'reakit-utils/applyState';
import '../Id/IdState.js';
import '../Composite/CompositeState.js';
import '@popperjs/core';
import '../Disclosure/DisclosureState.js';
import '../Dialog/DialogState.js';
import { usePopoverState } from '../Popover/PopoverState.js';
import 'reakit-utils/removeItemFromArray';
import { M as MenuContext } from '../MenuContext-6af6cf92.js';
import { useMenuBarState } from './MenuBarState.js';

function useMenuState(initialState) {
  if (initialState === void 0) {
    initialState = {};
  }

  var parent = useContext(MenuContext);

  var _useSealedState = useSealedState(initialState),
      _useSealedState$orien = _useSealedState.orientation,
      orientation = _useSealedState$orien === void 0 ? "vertical" : _useSealedState$orien,
      _useSealedState$gutte = _useSealedState.gutter,
      gutter = _useSealedState$gutte === void 0 ? 0 : _useSealedState$gutte,
      sealed = _objectWithoutPropertiesLoose(_useSealedState, ["orientation", "gutter"]);

  var placement = sealed.placement || (parent && parent.orientation === "vertical" ? "right-start" : "bottom-start");
  var menuBar = useMenuBarState(_objectSpread2(_objectSpread2({}, sealed), {}, {
    orientation: orientation
  }));
  var popover = usePopoverState(_objectSpread2(_objectSpread2({}, sealed), {}, {
    placement: placement,
    gutter: gutter
  }));
  useEffect(function () {
    if (!popover.visible) {
      menuBar.reset();
    }
  }, [popover.visible, menuBar.reset]);
  return _objectSpread2(_objectSpread2({}, menuBar), popover);
}

export { useMenuState };
