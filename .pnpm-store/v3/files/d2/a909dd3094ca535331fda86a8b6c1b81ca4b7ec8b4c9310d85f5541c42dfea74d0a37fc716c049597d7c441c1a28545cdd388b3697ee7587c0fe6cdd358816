'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
var React = require('react');
var useForkRef = require('reakit-utils/useForkRef');
require('reakit-utils/isButton');
var reakitWarning = require('reakit-warning');
require('reakit-utils/useLiveRef');
require('reakit-utils/isSelfTarget');
require('reakit-utils/useIsomorphicEffect');
require('reakit-utils/hasFocusWithin');
require('reakit-utils/isPortalEvent');
require('reakit-utils/dom');
require('reakit-utils/tabbable');
require('../Role/Role.js');
require('../Tabbable/Tabbable.js');
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
var Composite_Composite = require('../Composite/Composite.js');
require('reakit-utils/removeItemFromArray');
var MenuContext = require('../MenuContext-2d32bb3e.js');
var closest = require('reakit-utils/closest');
var __keys = require('../__keys-087914ef.js');

function useShortcuts(menuRef, _ref, timeout) {
  var items = _ref.items,
      move = _ref.move;

  if (timeout === void 0) {
    timeout = 500;
  }

  var _React$useState = React.useState(""),
      keys = _React$useState[0],
      setKeys = _React$useState[1];

  React.useEffect(function () {
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
  React.useEffect(function () {
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
      var targetIsMenuItem = role && role.indexOf("menuitem") !== -1 && closest.closest(target, "[role=menu],[role=menubar]") === menu;
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

var useMenuBar = createHook.createHook({
  name: "MenuBar",
  compose: Composite_Composite.useComposite,
  keys: __keys.MENU_BAR_KEYS,
  useProps: function useProps(options, _ref) {
    var htmlRef = _ref.ref,
        htmlWrapElement = _ref.wrapElement,
        _ref$role = _ref.role,
        role = _ref$role === void 0 ? "menubar" : _ref$role,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["ref", "wrapElement", "role"]);

    var ref = React.useRef(null);
    var wrap = MenuContext.useMenuContext(ref, role, options);
    useShortcuts(ref, options);
    var wrapElement = React.useCallback(function (element) {
      element = wrap(element);

      if (htmlWrapElement) {
        return htmlWrapElement(element);
      }

      return element;
    }, [wrap, htmlWrapElement]);
    return _rollupPluginBabelHelpers._objectSpread2({
      ref: useForkRef.useForkRef(ref, htmlRef),
      role: role,
      "aria-orientation": options.orientation,
      wrapElement: wrapElement
    }, htmlProps);
  }
});
var MenuBar = createComponent.createComponent({
  as: "div",
  useHook: useMenuBar,
  useCreateElement: function useCreateElement$1(type, props, children) {
    process.env.NODE_ENV !== "production" ? reakitWarning.useWarning(!props["aria-label"] && !props["aria-labelledby"] && props.role !== "menubar", "You should provide either `aria-label` or `aria-labelledby` props.", "See https://reakit.io/docs/menu") : void 0;
    return useCreateElement.useCreateElement(type, props, children);
  }
});

exports.MenuBar = MenuBar;
exports.useMenuBar = useMenuBar;
