import { a as _objectSpread2, _ as _objectWithoutPropertiesLoose } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { useContext, useMemo, useCallback } from 'react';
import 'reakit-utils/useForkRef';
import 'reakit-utils/isButton';
import { useWarning } from 'reakit-warning';
import { useLiveRef } from 'reakit-utils/useLiveRef';
import 'reakit-utils/isSelfTarget';
import 'reakit-utils/useIsomorphicEffect';
import 'reakit-utils/hasFocusWithin';
import { isPortalEvent } from 'reakit-utils/isPortalEvent';
import 'reakit-utils/dom';
import 'reakit-utils/tabbable';
import '../Role/Role.js';
import '../Tabbable/Tabbable.js';
import 'reakit-utils/useUpdateEffect';
import { useCreateElement } from 'reakit-system/useCreateElement';
import 'reakit-utils/getDocument';
import 'reakit-utils/fireBlurEvent';
import 'reakit-utils/fireKeyboardEvent';
import 'reakit-utils/canUseDOM';
import 'reakit-utils/getNextActiveElementOnBlur';
import '../reverse-30eaa122.js';
import '../getCurrentId-5aa9849e.js';
import '../findEnabledItemById-8ddca752.js';
import '../__keys-6742f591.js';
import '../userFocus-e16425e3.js';
import '../Composite/Composite.js';
import 'reakit-utils/ensureFocus';
import '../__keys-e6a5cfbe.js';
import '../Disclosure/DisclosureContent.js';
import 'react-dom';
import '../Portal/Portal.js';
import 'reakit-utils/removeItemFromArray';
import { M as MenuContext } from '../MenuContext-6af6cf92.js';
import '../Dialog/Dialog.js';
import 'body-scroll-lock';
import 'reakit-utils/closest';
import 'reakit-utils/getActiveElement';
import 'reakit-utils/contains';
import '../DialogBackdropContext-8775f78b.js';
import 'reakit-utils/isEmpty';
import '../__keys-ed7b48af.js';
import '../__keys-26bb1730.js';
import { usePopover } from '../Popover/Popover.js';
import { useMenuBar } from './MenuBar.js';
import { M as MENU_KEYS } from '../__keys-f74df4e0.js';

function usePlacementDir(placement) {
  return useMemo(function () {
    var _placement$split;

    return placement === null || placement === void 0 ? void 0 : (_placement$split = placement.split("-")) === null || _placement$split === void 0 ? void 0 : _placement$split[0];
  }, [placement]);
}

var useMenu = createHook({
  name: "Menu",
  compose: [useMenuBar, usePopover],
  keys: MENU_KEYS,
  useOptions: function useOptions(options) {
    var parent = useContext(MenuContext);
    var parentIsMenuBar = (parent === null || parent === void 0 ? void 0 : parent.role) === "menubar";
    return _objectSpread2(_objectSpread2({
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
        htmlProps = _objectWithoutPropertiesLoose(_ref, ["onKeyDown"]);

    var onKeyDownRef = useLiveRef(htmlOnKeyDown);
    var parent = useContext(MenuContext);
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
    var onKeyDown = useCallback(function (event) {
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
      } else if (hasParent && !isPortalEvent(event)) {
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
    return _objectSpread2({
      role: "menu",
      onKeyDown: onKeyDown
    }, htmlProps);
  }
});
var Menu = createComponent({
  as: "div",
  useHook: useMenu,
  useCreateElement: function useCreateElement$1(type, props, children) {
    process.env.NODE_ENV !== "production" ? useWarning(!props["aria-label"] && !props["aria-labelledby"], "You should provide either `aria-label` or `aria-labelledby` props.", "See https://reakit.io/docs/menu") : void 0;
    return useCreateElement(type, props, children);
  }
});

export { Menu, useMenu };
