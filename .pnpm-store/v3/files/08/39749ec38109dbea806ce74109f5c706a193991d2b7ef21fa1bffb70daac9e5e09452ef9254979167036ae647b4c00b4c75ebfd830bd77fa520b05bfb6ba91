'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
var React = require('react');
require('reakit-utils/useForkRef');
require('reakit-utils/isButton');
var reakitWarning = require('reakit-warning');
var useLiveRef = require('reakit-utils/useLiveRef');
require('reakit-utils/isSelfTarget');
require('reakit-utils/useIsomorphicEffect');
require('reakit-utils/hasFocusWithin');
var isPortalEvent = require('reakit-utils/isPortalEvent');
require('reakit-utils/dom');
require('reakit-utils/tabbable');
require('../Role/Role.js');
require('../Tabbable/Tabbable.js');
require('reakit-utils/useUpdateEffect');
var useCreateElement = require('reakit-system/useCreateElement');
require('reakit-utils/getDocument');
require('reakit-utils/fireBlurEvent');
require('reakit-utils/fireKeyboardEvent');
require('reakit-utils/canUseDOM');
require('reakit-utils/getNextActiveElementOnBlur');
require('../reverse-4756a49e.js');
require('../getCurrentId-eade2850.js');
require('../findEnabledItemById-03112678.js');
require('../__keys-3b597476.js');
require('../userFocus-0afea51a.js');
require('../Composite/Composite.js');
require('reakit-utils/ensureFocus');
require('../__keys-f41a441b.js');
require('../Disclosure/DisclosureContent.js');
require('react-dom');
require('../Portal/Portal.js');
require('reakit-utils/removeItemFromArray');
var MenuContext = require('../MenuContext-2d32bb3e.js');
require('../Dialog/Dialog.js');
require('body-scroll-lock');
require('reakit-utils/closest');
require('reakit-utils/getActiveElement');
require('reakit-utils/contains');
require('../DialogBackdropContext-b43e21d7.js');
require('reakit-utils/isEmpty');
require('../__keys-0c8e6398.js');
require('../__keys-eddd3051.js');
var Popover_Popover = require('../Popover/Popover.js');
var Menu_MenuBar = require('./MenuBar.js');
var __keys = require('../__keys-087914ef.js');

function usePlacementDir(placement) {
  return React.useMemo(function () {
    var _placement$split;

    return placement === null || placement === void 0 ? void 0 : (_placement$split = placement.split("-")) === null || _placement$split === void 0 ? void 0 : _placement$split[0];
  }, [placement]);
}

var useMenu = createHook.createHook({
  name: "Menu",
  compose: [Menu_MenuBar.useMenuBar, Popover_Popover.usePopover],
  keys: __keys.MENU_KEYS,
  useOptions: function useOptions(options) {
    var parent = React.useContext(MenuContext.MenuContext);
    var parentIsMenuBar = (parent === null || parent === void 0 ? void 0 : parent.role) === "menubar";
    return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({
      unstable_autoFocusOnHide: !parentIsMenuBar,
      modal: false
    }, options), {}, {
      // will be handled by MenuButton
      unstable_autoFocusOnShow: false,
      // will be handled differently from usePopover/useDialog
      hideOnEsc: false
    });
  },
  useProps: function useProps(options, _ref) {
    var htmlOnKeyDown = _ref.onKeyDown,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["onKeyDown"]);

    var onKeyDownRef = useLiveRef.useLiveRef(htmlOnKeyDown);
    var parent = React.useContext(MenuContext.MenuContext);
    var hasParent = !!parent;
    var ancestorMenuBar = parent;

    while (ancestorMenuBar && ancestorMenuBar.role !== "menubar") {
      ancestorMenuBar = ancestorMenuBar.parent;
    }

    var _ref2 = ancestorMenuBar || {},
        next = _ref2.next,
        previous = _ref2.previous,
        orientation = _ref2.orientation;

    var ancestorIsHorizontal = orientation === "horizontal";
    var dir = usePlacementDir(options.placement);
    var onKeyDown = React.useCallback(function (event) {
      var _onKeyDownRef$current;

      (_onKeyDownRef$current = onKeyDownRef.current) === null || _onKeyDownRef$current === void 0 ? void 0 : _onKeyDownRef$current.call(onKeyDownRef, event);
      if (event.defaultPrevented) return;

      if (event.key === "Escape") {
        var _options$hide;

        if (!hasParent) {
          // On Esc, only stop propagation if there's no parent menu.
          // Otherwise, pressing Esc should close all menus
          event.stopPropagation();
        }

        (_options$hide = options.hide) === null || _options$hide === void 0 ? void 0 : _options$hide.call(options);
      } else if (hasParent && !isPortalEvent.isPortalEvent(event)) {
        // Moves to the next menu button in a horizontal menu bar or close
        // the menu if it's a sub menu
        var ArrowRight = ancestorIsHorizontal && dir !== "left" ? next : dir === "left" && options.hide;
        var ArrowLeft = ancestorIsHorizontal && dir !== "right" ? previous : dir === "right" && options.hide;
        var keyMap = {
          ArrowRight: ArrowRight,
          ArrowLeft: ArrowLeft
        };
        var action = keyMap[event.key];

        if (action) {
          event.preventDefault();

          if (hasParent) {
            event.stopPropagation();
          }

          action();
        }
      }
    }, [hasParent, ancestorIsHorizontal, next, previous, dir, options.hide]);
    return _rollupPluginBabelHelpers._objectSpread2({
      role: "menu",
      onKeyDown: onKeyDown
    }, htmlProps);
  }
});
var Menu = createComponent.createComponent({
  as: "div",
  useHook: useMenu,
  useCreateElement: function useCreateElement$1(type, props, children) {
    process.env.NODE_ENV !== "production" ? reakitWarning.useWarning(!props["aria-label"] && !props["aria-labelledby"], "You should provide either `aria-label` or `aria-labelledby` props.", "See https://reakit.io/docs/menu") : void 0;
    return useCreateElement.useCreateElement(type, props, children);
  }
});

exports.Menu = Menu;
exports.useMenu = useMenu;
