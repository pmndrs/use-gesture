'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
var React = require('react');
require('reakit-utils/useForkRef');
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
require('reakit-utils/getDocument');
require('../getCurrentId-eade2850.js');
require('../__keys-3b597476.js');
require('../userFocus-0afea51a.js');
require('reakit-utils/isTextField');
require('reakit-utils/ensureFocus');
require('../Id/IdProvider.js');
require('../Id/Id.js');
require('reakit-utils/fireEvent');
require('../setTextFieldValue-b0584ae1.js');
var Composite_CompositeItem = require('../Composite/CompositeItem.js');
require('reakit-utils/removeItemFromArray');
var MenuContext = require('../MenuContext-2d32bb3e.js');
var contains = require('reakit-utils/contains');
var __keys = require('../__keys-087914ef.js');
var findVisibleSubmenu = require('../findVisibleSubmenu-d8b7eeab.js');

function getTriangleArea(a, b, c) {
  return Math.abs((a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y)) / 2);
}

function isPointInTriangle(point, a, b, c) {
  var A = getTriangleArea(a, b, c);
  var A1 = getTriangleArea(point, b, c);
  var A2 = getTriangleArea(a, point, c);
  var A3 = getTriangleArea(a, b, point);
  return A === A1 + A2 + A3;
}

function getSubmenuAnchorPoints(event, visibleSubmenu) {
  var _visibleSubmenu$getBo = visibleSubmenu.getBoundingClientRect(),
      top = _visibleSubmenu$getBo.top,
      right = _visibleSubmenu$getBo.right,
      bottom = _visibleSubmenu$getBo.bottom,
      left = _visibleSubmenu$getBo.left; // If left is bigger than mouse's clientX, than the submenu is visible on
  // the left side


  var x = left > event.clientX ? left : right;
  return [{
    x: x,
    y: top
  }, {
    x: x,
    y: bottom
  }];
}

function useTransitToSubmenu(menu, htmlOnMouseEnter) {
  var onMouseEnterRef = useLiveRef.useLiveRef(htmlOnMouseEnter);
  var enterPointRef = React.useRef(null);
  var submenuTopPointRef = React.useRef(null);
  var submenuBottomPointRef = React.useRef(null);
  var previousClientX = React.useRef(0);
  var previousClientY = React.useRef(0);
  var assignSubmenuAnchorPoints = React.useCallback(function (event) {
    if (!(menu !== null && menu !== void 0 && menu.children.length)) return;
    submenuTopPointRef.current = null;
    submenuBottomPointRef.current = null;
    var visibleSubmenu = findVisibleSubmenu.findVisibleSubmenu(menu.children);
    if (!visibleSubmenu) return;

    var _getSubmenuAnchorPoin = getSubmenuAnchorPoints(event, visibleSubmenu);

    submenuTopPointRef.current = _getSubmenuAnchorPoin[0];
    submenuBottomPointRef.current = _getSubmenuAnchorPoin[1];
  }, [menu === null || menu === void 0 ? void 0 : menu.children]);
  var isMouseInTransitToSubmenu = React.useCallback(function (event) {
    var isMoving = previousClientX.current !== event.clientX || previousClientY.current !== event.clientY;

    if (event.isTrusted && !isMoving) {
      // Safari sometimes triggers mousemove without a mouse movement
      return true;
    }

    var movementX = Math.abs(previousClientX.current - event.clientX);
    previousClientX.current = event.clientX;
    previousClientY.current = event.clientY;

    var hasAnchorPoints = function hasAnchorPoints() {
      return submenuTopPointRef.current && submenuBottomPointRef.current;
    };

    if (event.type === "mouseleave" && !hasAnchorPoints()) {
      assignSubmenuAnchorPoints(event);
    }

    if (!hasAnchorPoints()) return false;
    return movementX && enterPointRef.current && isPointInTriangle({
      x: event.clientX,
      y: event.clientY
    }, enterPointRef.current, submenuTopPointRef.current, submenuBottomPointRef.current);
  }, [assignSubmenuAnchorPoints]);
  var onMouseEnter = React.useCallback(function (event) {
    var _onMouseEnterRef$curr;

    (_onMouseEnterRef$curr = onMouseEnterRef.current) === null || _onMouseEnterRef$curr === void 0 ? void 0 : _onMouseEnterRef$curr.call(onMouseEnterRef, event);
    if (event.defaultPrevented) return;
    if ((menu === null || menu === void 0 ? void 0 : menu.role) === "menubar") return;
    enterPointRef.current = {
      x: event.clientX,
      y: event.clientY
    };
    assignSubmenuAnchorPoints(event);
  }, [menu === null || menu === void 0 ? void 0 : menu.role, assignSubmenuAnchorPoints]);
  return {
    onMouseEnter: onMouseEnter,
    isMouseInTransitToSubmenu: isMouseInTransitToSubmenu
  };
}

function getMouseDestination(event) {
  var relatedTarget = event.relatedTarget;

  if ((relatedTarget === null || relatedTarget === void 0 ? void 0 : relatedTarget.nodeType) === Node.ELEMENT_NODE) {
    return event.relatedTarget;
  } // IE 11


  return event.toElement || null;
}

function hoveringInside(event) {
  var nextElement = getMouseDestination(event);
  if (!nextElement) return false;
  return contains.contains(event.currentTarget, nextElement);
}

function hoveringExpandedMenu(event, children) {
  if (!(children !== null && children !== void 0 && children.length)) return false;
  var nextElement = getMouseDestination(event);
  if (!nextElement) return false;
  var visibleSubmenu = findVisibleSubmenu.findVisibleSubmenu(children);
  return visibleSubmenu && contains.contains(visibleSubmenu, nextElement);
}

function hoveringAnotherMenuItem(event, items) {
  var nextElement = getMouseDestination(event);
  if (!nextElement) return false;
  return items === null || items === void 0 ? void 0 : items.some(function (item) {
    return item.ref.current && contains.contains(item.ref.current, nextElement);
  });
}

var useMenuItem = createHook.createHook({
  name: "MenuItem",
  compose: Composite_CompositeItem.useCompositeItem,
  keys: __keys.MENU_ITEM_KEYS,
  propsAreEqual: function propsAreEqual(prev, next) {
    var prevPopoverStyles = prev.unstable_popoverStyles,
        prevArrowStyles = prev.unstable_arrowStyles,
        prevVisible = prev.visible,
        prevProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(prev, ["unstable_popoverStyles", "unstable_arrowStyles", "visible"]);

    var nextPopoverStyles = next.unstable_popoverStyles,
        nextArrowStyles = next.unstable_arrowStyles,
        nextVisible = next.visible,
        nextProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(next, ["unstable_popoverStyles", "unstable_arrowStyles", "visible"]);

    return Composite_CompositeItem.useCompositeItem.unstable_propsAreEqual(prevProps, nextProps);
  },
  useProps: function useProps(options, _ref) {
    var htmlOnMouseEnter = _ref.onMouseEnter,
        htmlOnMouseMove = _ref.onMouseMove,
        htmlOnMouseLeave = _ref.onMouseLeave,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["onMouseEnter", "onMouseMove", "onMouseLeave"]);

    var menu = React.useContext(MenuContext.MenuContext);
    var onMouseMoveRef = useLiveRef.useLiveRef(htmlOnMouseMove);
    var onMouseLeaveRef = useLiveRef.useLiveRef(htmlOnMouseLeave);

    var _useTransitToSubmenu = useTransitToSubmenu(menu, htmlOnMouseEnter),
        onMouseEnter = _useTransitToSubmenu.onMouseEnter,
        isMouseInTransitToSubmenu = _useTransitToSubmenu.isMouseInTransitToSubmenu;

    var onMouseMove = React.useCallback(function (event) {
      var _onMouseMoveRef$curre, _options$move;

      (_onMouseMoveRef$curre = onMouseMoveRef.current) === null || _onMouseMoveRef$curre === void 0 ? void 0 : _onMouseMoveRef$curre.call(onMouseMoveRef, event);
      if (event.defaultPrevented) return;
      if ((menu === null || menu === void 0 ? void 0 : menu.role) === "menubar") return;
      if (isMouseInTransitToSubmenu(event)) return;
      if (hasFocusWithin.hasFocusWithin(event.currentTarget)) return;
      (_options$move = options.move) === null || _options$move === void 0 ? void 0 : _options$move.call(options, event.currentTarget.id);
    }, [options.move]);
    var onMouseLeave = React.useCallback(function (event) {
      var _onMouseLeaveRef$curr;

      (_onMouseLeaveRef$curr = onMouseLeaveRef.current) === null || _onMouseLeaveRef$curr === void 0 ? void 0 : _onMouseLeaveRef$curr.call(onMouseLeaveRef, event);
      if (event.defaultPrevented) return;
      if ((menu === null || menu === void 0 ? void 0 : menu.role) === "menubar") return;
      if (hoveringInside(event)) return; // If this item is a menu disclosure and mouse is leaving it to focus
      // its respective submenu, we don't want to do anything.

      if (hoveringExpandedMenu(event, menu === null || menu === void 0 ? void 0 : menu.children)) return; // Move focus to menu after blurring

      if (!hoveringAnotherMenuItem(event, options.items)) {
        var _options$move2;

        if (isMouseInTransitToSubmenu(event)) return;
        (_options$move2 = options.move) === null || _options$move2 === void 0 ? void 0 : _options$move2.call(options, null);
      }
    }, [menu === null || menu === void 0 ? void 0 : menu.role, menu === null || menu === void 0 ? void 0 : menu.children, options.items, options.move]);
    return _rollupPluginBabelHelpers._objectSpread2({
      role: "menuitem",
      onMouseEnter: onMouseEnter,
      onMouseMove: onMouseMove,
      onMouseLeave: onMouseLeave
    }, htmlProps);
  }
});
var MenuItem = createComponent.createComponent({
  as: "button",
  memo: true,
  useHook: useMenuItem
});

exports.MenuItem = MenuItem;
exports.useMenuItem = useMenuItem;
