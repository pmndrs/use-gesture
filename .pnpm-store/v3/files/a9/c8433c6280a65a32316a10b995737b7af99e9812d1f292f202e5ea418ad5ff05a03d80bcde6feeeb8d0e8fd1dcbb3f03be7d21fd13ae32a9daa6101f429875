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
require('reakit-utils/useLiveRef');
require('reakit-utils/isSelfTarget');
require('reakit-utils/useIsomorphicEffect');
require('reakit-utils/hasFocusWithin');
require('reakit-utils/isPortalEvent');
require('reakit-utils/dom');
require('reakit-utils/tabbable');
require('../Role/Role.js');
require('../Tabbable/Tabbable.js');
require('../Clickable/Clickable.js');
require('reakit-utils/createEvent');
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
require('../Composite/CompositeItem.js');
require('reakit-utils/removeItemFromArray');
require('../MenuContext-2d32bb3e.js');
require('reakit-utils/contains');
require('reakit-warning/warning');
require('../__keys-a6d5cee4.js');
var Radio_Radio = require('../Radio/Radio.js');
var __keys = require('../__keys-087914ef.js');
require('../findVisibleSubmenu-d8b7eeab.js');
var Menu_MenuItem = require('./MenuItem.js');

var useMenuItemRadio = createHook.createHook({
  name: "MenuItemRadio",
  compose: [Menu_MenuItem.useMenuItem, Radio_Radio.useRadio],
  keys: __keys.MENU_ITEM_RADIO_KEYS,
  propsAreEqual: function propsAreEqual(prev, next) {
    if (prev.name !== next.name) {
      return Menu_MenuItem.useMenuItem.unstable_propsAreEqual(prev, next);
    }

    var prevValues = prev.unstable_values,
        prevProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(prev, ["unstable_values"]);

    var nextValues = next.unstable_values,
        nextProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(next, ["unstable_values"]);

    if (prevValues[next.name] !== nextValues[next.name]) {
      return false;
    }

    return Menu_MenuItem.useMenuItem.unstable_propsAreEqual(prevProps, nextProps);
  },
  useOptions: function useOptions(options) {
    var setState = React.useCallback(function (value) {
      return options.unstable_setValue(options.name, value);
    }, [options.unstable_setValue, options.name]);
    return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, options), {}, {
      unstable_checkOnFocus: false,
      state: options.unstable_values[options.name],
      setState: setState
    });
  },
  useProps: function useProps(_, htmlProps) {
    return _rollupPluginBabelHelpers._objectSpread2({
      role: "menuitemradio"
    }, htmlProps);
  }
});
var MenuItemRadio = createComponent.createComponent({
  as: "button",
  memo: true,
  useHook: useMenuItemRadio
});

exports.MenuItemRadio = MenuItemRadio;
exports.useMenuItemRadio = useMenuItemRadio;
