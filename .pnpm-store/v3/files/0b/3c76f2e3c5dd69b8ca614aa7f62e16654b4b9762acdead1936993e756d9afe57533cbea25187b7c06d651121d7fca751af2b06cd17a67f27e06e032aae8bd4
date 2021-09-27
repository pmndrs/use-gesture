import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { useContext, useRef, useCallback } from 'react';
import { useForkRef } from 'reakit-utils/useForkRef';
import 'reakit-utils/isButton';
import 'reakit-warning';
import { useLiveRef } from 'reakit-utils/useLiveRef';
import 'reakit-utils/isSelfTarget';
import 'reakit-utils/useIsomorphicEffect';
import { hasFocusWithin } from 'reakit-utils/hasFocusWithin';
import 'reakit-utils/isPortalEvent';
import 'reakit-utils/dom';
import 'reakit-utils/tabbable';
import '../Role/Role.js';
import '../Tabbable/Tabbable.js';
import '../Clickable/Clickable.js';
import '../Button/Button.js';
import '../__keys-e6a5cfbe.js';
import 'reakit-utils/removeItemFromArray';
import { M as MenuContext } from '../MenuContext-6af6cf92.js';
import '../__keys-ed7b48af.js';
import '../__keys-26bb1730.js';
import '../Disclosure/Disclosure.js';
import '../Dialog/DialogDisclosure.js';
import { c as MENU_BUTTON_KEYS } from '../__keys-f74df4e0.js';
import { usePopoverDisclosure } from '../Popover/PopoverDisclosure.js';
import { f as findVisibleSubmenu } from '../findVisibleSubmenu-1553e354.js';

var noop = function noop() {};

var useMenuButton = createHook({
  name: "MenuButton",
  compose: usePopoverDisclosure,
  keys: MENU_BUTTON_KEYS,
  propsAreEqual: function propsAreEqual(prev, next) {
    var prevPopoverStyles = prev.unstable_popoverStyles,
        prevArrowStyles = prev.unstable_arrowStyles,
        prevCurrentId = prev.currentId,
        prevMoves = prev.unstable_moves,
        prevProps = _objectWithoutPropertiesLoose(prev, ["unstable_popoverStyles", "unstable_arrowStyles", "currentId", "unstable_moves"]);

    var nextPopoverStyles = next.unstable_popoverStyles,
        nextArrowStyles = next.unstable_arrowStyles,
        nextCurrentId = next.currentId,
        nextMoves = next.unstable_moves,
        nextProps = _objectWithoutPropertiesLoose(next, ["unstable_popoverStyles", "unstable_arrowStyles", "currentId", "unstable_moves"]);

    return usePopoverDisclosure.unstable_propsAreEqual(prevProps, nextProps);
  },
  useProps: function useProps(options, _ref) {
    var htmlRef = _ref.ref,
        htmlOnClick = _ref.onClick,
        htmlOnKeyDown = _ref.onKeyDown,
        htmlOnFocus = _ref.onFocus,
        htmlOnMouseEnter = _ref.onMouseEnter,
        htmlOnMouseDown = _ref.onMouseDown,
        htmlProps = _objectWithoutPropertiesLoose(_ref, ["ref", "onClick", "onKeyDown", "onFocus", "onMouseEnter", "onMouseDown"]);

    var parent = useContext(MenuContext);
    var ref = useRef(null);
    var hasPressedMouse = useRef(false);

    var _options$placement$sp = options.placement.split("-"),
        dir = _options$placement$sp[0];

    var hasParent = !!parent;
    var parentIsMenuBar = (parent === null || parent === void 0 ? void 0 : parent.role) === "menubar";
    var disabled = options.disabled || htmlProps["aria-disabled"];
    var onClickRef = useLiveRef(htmlOnClick);
    var onKeyDownRef = useLiveRef(htmlOnKeyDown);
    var onFocusRef = useLiveRef(htmlOnFocus);
    var onMouseEnterRef = useLiveRef(htmlOnMouseEnter);
    var onMouseDownRef = useLiveRef(htmlOnMouseDown);
    var onKeyDown = useCallback(function (event) {
      var _onKeyDownRef$current;

      if (event.key === "Escape") {
        var _options$hide;

        // Doesn't prevent default on Escape, otherwise we can't close
        // dialogs when MenuButton is focused
        (_options$hide = options.hide) === null || _options$hide === void 0 ? void 0 : _options$hide.call(options);
      } else if (!disabled) {
        // setTimeout prevents scroll jump
        var first = options.first && function () {
          return setTimeout(options.first);
        };

        var last = options.last && function () {
          return setTimeout(options.last);
        };

        var keyMap = {
          Enter: first,
          " ": first,
          ArrowUp: (dir === "top" || dir === "bottom") && last,
          ArrowRight: dir === "right" && first,
          ArrowDown: (dir === "bottom" || dir === "top") && first,
          ArrowLeft: dir === "left" && first
        };
        var action = keyMap[event.key];

        if (action) {
          var _options$show;

          event.preventDefault();
          event.stopPropagation();
          (_options$show = options.show) === null || _options$show === void 0 ? void 0 : _options$show.call(options);
          action();
          return;
        }
      }

      (_onKeyDownRef$current = onKeyDownRef.current) === null || _onKeyDownRef$current === void 0 ? void 0 : _onKeyDownRef$current.call(onKeyDownRef, event);
    }, [disabled, options.hide, options.first, options.last, dir, options.show]);
    var onMouseEnter = useCallback(function (event) {
      var _onMouseEnterRef$curr;

      (_onMouseEnterRef$curr = onMouseEnterRef.current) === null || _onMouseEnterRef$curr === void 0 ? void 0 : _onMouseEnterRef$curr.call(onMouseEnterRef, event);
      if (event.defaultPrevented) return; // MenuButton's don't do anything on mouse over when they aren't
      // cointained within a Menu/MenuBar

      if (!parent) return;
      var element = event.currentTarget;

      if (parentIsMenuBar) {
        // if MenuButton is an item inside a MenuBar, it'll only open
        // if there's already another sibling expanded MenuButton
        if (findVisibleSubmenu(parent.children)) {
          element.focus();
        }
      } else {
        // If it's in a Menu, open after a short delay
        // TODO: Make the delay a prop?
        setTimeout(function () {
          if (hasFocusWithin(element)) {
            var _options$show2;

            (_options$show2 = options.show) === null || _options$show2 === void 0 ? void 0 : _options$show2.call(options);
          }
        }, 200);
      }
    }, [parent, parentIsMenuBar, options.show]);
    var onMouseDown = useCallback(function (event) {
      var _onMouseDownRef$curre;

      // When in menu bar, the menu button can be activated either by focus
      // or click, but we don't want both to trigger sequentially.
      // Otherwise, onClick would toggle (hide) the menu right after it got
      // shown on focus.
      // This is also useful so we know if the menu button has been clicked
      // using mouse or keyboard. On mouse click, we don't automatically
      // focus the first menu item.
      hasPressedMouse.current = true;
      (_onMouseDownRef$curre = onMouseDownRef.current) === null || _onMouseDownRef$curre === void 0 ? void 0 : _onMouseDownRef$curre.call(onMouseDownRef, event);
    }, []);
    var onFocus = useCallback(function (event) {
      var _onFocusRef$current;

      (_onFocusRef$current = onFocusRef.current) === null || _onFocusRef$current === void 0 ? void 0 : _onFocusRef$current.call(onFocusRef, event);
      if (event.defaultPrevented) return;
      if (disabled) return;

      if (parentIsMenuBar && !hasPressedMouse.current) {
        var _options$show3;

        (_options$show3 = options.show) === null || _options$show3 === void 0 ? void 0 : _options$show3.call(options);
      }
    }, [parentIsMenuBar, disabled, options.show]); // If disclosure is rendered as a menu bar item, it's toggable
    // That is, you can click on the expanded disclosure to close its menu.

    var onClick = useCallback(function (event) {
      var _onClickRef$current;

      (_onClickRef$current = onClickRef.current) === null || _onClickRef$current === void 0 ? void 0 : _onClickRef$current.call(onClickRef, event);
      if (event.defaultPrevented) return; // If menu button is a menu item inside a menu (not menu bar), you
      // can't close it by clicking on it again.

      if (hasParent && !parentIsMenuBar) {
        var _options$show4;

        (_options$show4 = options.show) === null || _options$show4 === void 0 ? void 0 : _options$show4.call(options);
      } else {
        var _options$toggle;

        // Otherwise, if menu button is a menu bar item or an orphan menu
        // button, it's toggable.
        (_options$toggle = options.toggle) === null || _options$toggle === void 0 ? void 0 : _options$toggle.call(options); // Focus the menu popover when it's opened with mouse click.

        if (hasPressedMouse.current && !parentIsMenuBar && !options.visible) {
          var _options$move;

          (_options$move = options.move) === null || _options$move === void 0 ? void 0 : _options$move.call(options, null);
        }
      }

      hasPressedMouse.current = false;
    }, [hasParent, parentIsMenuBar, options.show, options.toggle, options.visible, options.move]);
    return _objectSpread2({
      ref: useForkRef(ref, htmlRef),
      "aria-haspopup": "menu",
      onKeyDown: onKeyDown,
      onMouseEnter: onMouseEnter,
      onMouseDown: onMouseDown,
      onFocus: onFocus,
      onClick: onClick
    }, htmlProps);
  },
  useComposeOptions: function useComposeOptions(options) {
    return _objectSpread2(_objectSpread2({}, options), {}, {
      // Toggling is handled by MenuButton
      toggle: noop
    });
  }
});
var MenuButton = createComponent({
  as: "button",
  memo: true,
  useHook: useMenuButton
});

export { MenuButton, useMenuButton };
