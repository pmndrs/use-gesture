'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
require('reakit-utils/shallowEqual');
var React = require('react');
require('reakit-warning');
require('reakit-utils/useIsomorphicEffect');
require('reakit-utils/dom');
var useSealedState = require('reakit-utils/useSealedState');
require('reakit-utils/getDocument');
require('../reverse-4756a49e.js');
require('../getCurrentId-eade2850.js');
require('../findEnabledItemById-03112678.js');
require('../Id/IdProvider.js');
require('reakit-utils/applyState');
require('../Id/IdState.js');
require('../Composite/CompositeState.js');
require('@popperjs/core');
require('../Disclosure/DisclosureState.js');
require('../Dialog/DialogState.js');
var Popover_PopoverState = require('../Popover/PopoverState.js');
require('reakit-utils/removeItemFromArray');
var MenuContext = require('../MenuContext-2d32bb3e.js');
var Menu_MenuBarState = require('./MenuBarState.js');

function useMenuState(initialState) {
  if (initialState === void 0) {
    initialState = {};
  }

  var parent = React.useContext(MenuContext.MenuContext);

  var _useSealedState = useSealedState.useSealedState(initialState),
      _useSealedState$orien = _useSealedState.orientation,
      orientation = _useSealedState$orien === void 0 ? "vertical" : _useSealedState$orien,
      _useSealedState$gutte = _useSealedState.gutter,
      gutter = _useSealedState$gutte === void 0 ? 0 : _useSealedState$gutte,
      sealed = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_useSealedState, ["orientation", "gutter"]);

  var placement = sealed.placement || (parent && parent.orientation === "vertical" ? "right-start" : "bottom-start");
  var menuBar = Menu_MenuBarState.useMenuBarState(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, sealed), {}, {
    orientation: orientation
  }));
  var popover = Popover_PopoverState.usePopoverState(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, sealed), {}, {
    placement: placement,
    gutter: gutter
  }));
  React.useEffect(function () {
    if (!popover.visible) {
      menuBar.reset();
    }
  }, [popover.visible, menuBar.reset]);
  return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, menuBar), popover);
}

exports.useMenuState = useMenuState;
