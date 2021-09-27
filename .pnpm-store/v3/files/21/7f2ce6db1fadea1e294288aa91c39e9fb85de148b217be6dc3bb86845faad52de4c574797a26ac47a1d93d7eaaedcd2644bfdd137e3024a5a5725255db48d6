'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
var React = require('react');
var useForkRef = require('reakit-utils/useForkRef');
require('reakit-utils/isButton');
require('reakit-warning');
var useLiveRef = require('reakit-utils/useLiveRef');
require('reakit-utils/isSelfTarget');
require('reakit-utils/useIsomorphicEffect');
var hasFocusWithin = require('reakit-utils/hasFocusWithin');
require('reakit-utils/isPortalEvent');
require('reakit-utils/dom');
require('reakit-utils/tabbable');
require('../Role/Role.js');
require('../Tabbable/Tabbable.js');
require('../Clickable/Clickable.js');
require('../Button/Button.js');
require('../__keys-f41a441b.js');
require('reakit-utils/removeItemFromArray');
var MenuContext = require('../MenuContext-2d32bb3e.js');
require('../__keys-0c8e6398.js');
require('../__keys-eddd3051.js');
require('../Disclosure/Disclosure.js');
require('../Dialog/DialogDisclosure.js');
var __keys = require('../__keys-087914ef.js');
var Popover_PopoverDisclosure = require('../Popover/PopoverDisclosure.js');
var findVisibleSubmenu = require('../findVisibleSubmenu-d8b7eeab.js');

var noop = function noop() {};

var useMenuButton = createHook.createHook({
  name: "MenuButton",
  compose: Popover_PopoverDisclosure.usePopoverDisclosure,
  keys: __keys.MENU_BUTTON_KEYS,
  propsAreEqual: function propsAreEqual(prev, next) {
    var prevPopoverStyles = prev.unstable_popoverStyles,
        prevArrowStyles = prev.unstable_arrowStyles,
        prevCurrentId = prev.currentId,
        prevMoves = prev.unstable_moves,
        prevProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(prev, ["unstable_popoverStyles", "unstable_arrowStyles", "currentId", "unstable_moves"]);

    var nextPopoverStyles = next.unstable_popoverStyles,
        nextArrowStyles = next.unstable_arrowStyles,
        nextCurrentId = next.currentId,
        nextMoves = next.unstable_moves,
        nextProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(next, ["unstable_popoverStyles", "unstable_arrowStyles", "currentId", "unstable_moves"]);

    return Popover_PopoverDisclosure.usePopoverDisclosure.unstable_propsAreEqual(prevProps, nextProps);
  },
  useProps: function useProps(options, _ref) {
    var htmlRef = _ref.ref,
        htmlOnClick = _ref.onClick,
        htmlOnKeyDown = _ref.onKeyDown,
        htmlOnFocus = _ref.onFocus,
        htmlOnMouseEnter = _ref.onMouseEnter,
        htmlOnMouseDown = _ref.onMouseDown,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["ref", "onClick", "onKeyDown", "onFocus", "onMouseEnter", "onMouseDown"]);

    var parent = React.useContext(MenuContext.MenuContext);
    var ref = React.useRef(null);
    var hasPressedMouse = React.useRef(false);

    var _options$placement$sp = options.placement.split("-"),
        dir = _options$placement$sp[0];

    var hasParent = !!parent;
    var parentIsMenuBar = (parent === null || parent === void 0 ? void 0 : parent.role) === "menubar";
    var disabled = options.disabled || htmlProps["aria-disabled"];
    var onClickRef = useLiveRef.useLiveRef(htmlOnClick);
    var onKeyDownRef = useLiveRef.useLiveRef(htmlOnKeyDown);
    var onFocusRef = useLiveRef.useLiveRef(htmlOnFocus);
    var onMouseEnterRef = useLiveRef.useLiveRef(htmlOnMouseEnter);
    var onMouseDownRef = useLiveRef.useLiveRef(htmlOnMouseDown);
    var onKeyDown = React.useCallback(function (event) {
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
    var onMouseEnter = React.useCallback(function (event) {
      var _onMouseEnterRef$curr;

      (_onMouseEnterRef$curr = onMouseEnterRef.current) === null || _onMouseEnterRef$curr === void 0 ? void 0 : _onMouseEnterRef$curr.call(onMouseEnterRef, event);
      if (event.defaultPrevented) return; // MenuButton's don't do anything on mouse over when they aren't
      // cointained within a Menu/MenuBar

      if (!parent) return;
      var element = event.currentTarget;

      if (parentIsMenuBar) {
        // if MenuButton is an item inside a MenuBar, it'll only open
        // if there's already another sibling expanded MenuButton
        if (findVisibleSubmenu.findVisibleSubmenu(parent.children)) {
          element.focus();
        }
      } else {
        // If it's in a Menu, open after a short delay
        // TODO: Make the delay a prop?
        setTimeout(function () {
          if (hasFocusWithin.hasFocusWithin(element)) {
            var _options$show2;

            (_options$show2 = options.show) === null || _options$show2 === void 0 ? void 0 : _options$show2.call(options);
          }
        }, 200);
      }
    }, [parent, parentIsMenuBar, options.show]);
    var onMouseDown = React.useCallback(function (event) {
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
    var onFocus = React.useCallback(function (event) {
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

    var onClick = React.useCallback(function (event) {
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
    return _rollupPluginBabelHelpers._objectSpread2({
      ref: useForkRef.useForkRef(ref, htmlRef),
      "aria-haspopup": "menu",
      onKeyDown: onKeyDown,
      onMouseEnter: onMouseEnter,
      onMouseDown: onMouseDown,
      onFocus: onFocus,
      onClick: onClick
    }, htmlProps);
  },
  useComposeOptions: function useComposeOptions(options) {
    return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, options), {}, {
      // Toggling is handled by MenuButton
      toggle: noop
    });
  }
});
var MenuButton = createComponent.createComponent({
  as: "button",
  memo: true,
  useHook: useMenuButton
});

exports.MenuButton = MenuButton;
exports.useMenuButton = useMenuButton;
