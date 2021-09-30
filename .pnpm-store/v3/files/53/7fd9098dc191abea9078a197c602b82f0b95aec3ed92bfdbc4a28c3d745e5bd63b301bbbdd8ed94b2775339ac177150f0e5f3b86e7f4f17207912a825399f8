import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useForkRef } from 'reakit-utils/useForkRef';
import 'reakit-utils/isButton';
import { useWarning } from 'reakit-warning';
import 'reakit-utils/useLiveRef';
import 'reakit-utils/isSelfTarget';
import 'reakit-utils/useIsomorphicEffect';
import 'reakit-utils/hasFocusWithin';
import 'reakit-utils/isPortalEvent';
import 'reakit-utils/dom';
import 'reakit-utils/tabbable';
import '../Role/Role.js';
import '../Tabbable/Tabbable.js';
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
import { useComposite } from '../Composite/Composite.js';
import 'reakit-utils/removeItemFromArray';
import { u as useMenuContext } from '../MenuContext-6af6cf92.js';
import { closest } from 'reakit-utils/closest';
import { b as MENU_BAR_KEYS } from '../__keys-f74df4e0.js';

function useShortcuts(menuRef, _ref, timeout) {
  var items = _ref.items,
      move = _ref.move;

  if (timeout === void 0) {
    timeout = 500;
  }

  var _React$useState = useState(""),
      keys = _React$useState[0],
      setKeys = _React$useState[1];

  useEffect(function () {
    if (!keys) return undefined;
    var timeoutId = setTimeout(function () {
      return setKeys("");
    }, timeout);
    var stop = items.find(function (s) {
      return Boolean(s.ref.current && s.ref.current.textContent && s.ref.current.textContent.toLowerCase().startsWith(keys));
    });

    if (stop) {
      move(stop.id);
    }

    return function () {
      return clearTimeout(timeoutId);
    };
  }, [keys, items, move, timeout]);
  useEffect(function () {
    var menu = menuRef.current;
    if (!menu) return undefined;

    var onKeyDown = function onKeyDown(event) {
      var _target$getAttribute;

      if (event.key.length > 1) return;
      if (event.shiftKey) return;
      if (event.metaKey) return;
      if (event.ctrlKey) return;
      if (event.altKey) return;
      var target = event.target;
      var role = (_target$getAttribute = target.getAttribute) === null || _target$getAttribute === void 0 ? void 0 : _target$getAttribute.call(target, "role");
      var targetIsMenu = target === menu;
      var targetIsMenuItem = role && role.indexOf("menuitem") !== -1 && closest(target, "[role=menu],[role=menubar]") === menu;
      if (!targetIsMenu && !targetIsMenuItem) return;

      if (/^[a-z0-9_-]$/i.test(event.key)) {
        event.stopPropagation();
        event.preventDefault();
        setKeys(function (k) {
          return "" + k + event.key;
        });
      }
    }; // https://github.com/facebook/react/issues/11387#issuecomment-524113945


    menu.addEventListener("keydown", onKeyDown);
    return function () {
      return menu.removeEventListener("keydown", onKeyDown);
    };
  }, [menuRef, setKeys]);
}

var useMenuBar = createHook({
  name: "MenuBar",
  compose: useComposite,
  keys: MENU_BAR_KEYS,
  useProps: function useProps(options, _ref) {
    var htmlRef = _ref.ref,
        htmlWrapElement = _ref.wrapElement,
        _ref$role = _ref.role,
        role = _ref$role === void 0 ? "menubar" : _ref$role,
        htmlProps = _objectWithoutPropertiesLoose(_ref, ["ref", "wrapElement", "role"]);

    var ref = useRef(null);
    var wrap = useMenuContext(ref, role, options);
    useShortcuts(ref, options);
    var wrapElement = useCallback(function (element) {
      element = wrap(element);

      if (htmlWrapElement) {
        return htmlWrapElement(element);
      }

      return element;
    }, [wrap, htmlWrapElement]);
    return _objectSpread2({
      ref: useForkRef(ref, htmlRef),
      role: role,
      "aria-orientation": options.orientation,
      wrapElement: wrapElement
    }, htmlProps);
  }
});
var MenuBar = createComponent({
  as: "div",
  useHook: useMenuBar,
  useCreateElement: function useCreateElement$1(type, props, children) {
    process.env.NODE_ENV !== "production" ? useWarning(!props["aria-label"] && !props["aria-labelledby"] && props.role !== "menubar", "You should provide either `aria-label` or `aria-labelledby` props.", "See https://reakit.io/docs/menu") : void 0;
    return useCreateElement(type, props, children);
  }
});

export { MenuBar, useMenuBar };
