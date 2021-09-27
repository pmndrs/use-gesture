import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { useCallback } from 'react';
import 'reakit-utils/useForkRef';
import 'reakit-utils/isButton';
import 'reakit-warning';
import 'reakit-utils/useLiveRef';
import 'reakit-utils/isSelfTarget';
import 'reakit-utils/useIsomorphicEffect';
import 'reakit-utils/hasFocusWithin';
import 'reakit-utils/isPortalEvent';
import 'reakit-utils/dom';
import 'reakit-utils/tabbable';
import '../Role/Role.js';
import '../Tabbable/Tabbable.js';
import '../Clickable/Clickable.js';
import 'reakit-utils/createEvent';
import 'reakit-utils/getDocument';
import '../getCurrentId-5aa9849e.js';
import '../__keys-6742f591.js';
import '../userFocus-e16425e3.js';
import 'reakit-utils/isTextField';
import 'reakit-utils/ensureFocus';
import '../Id/IdProvider.js';
import '../Id/Id.js';
import 'reakit-utils/fireEvent';
import '../setTextFieldValue-0a221f4e.js';
import '../Composite/CompositeItem.js';
import 'reakit-utils/removeItemFromArray';
import '../MenuContext-6af6cf92.js';
import 'reakit-utils/contains';
import 'reakit-warning/warning';
import '../__keys-d251e56b.js';
import { useRadio } from '../Radio/Radio.js';
import { g as MENU_ITEM_RADIO_KEYS } from '../__keys-f74df4e0.js';
import '../findVisibleSubmenu-1553e354.js';
import { useMenuItem } from './MenuItem.js';

var useMenuItemRadio = createHook({
  name: "MenuItemRadio",
  compose: [useMenuItem, useRadio],
  keys: MENU_ITEM_RADIO_KEYS,
  propsAreEqual: function propsAreEqual(prev, next) {
    if (prev.name !== next.name) {
      return useMenuItem.unstable_propsAreEqual(prev, next);
    }

    var prevValues = prev.unstable_values,
        prevProps = _objectWithoutPropertiesLoose(prev, ["unstable_values"]);

    var nextValues = next.unstable_values,
        nextProps = _objectWithoutPropertiesLoose(next, ["unstable_values"]);

    if (prevValues[next.name] !== nextValues[next.name]) {
      return false;
    }

    return useMenuItem.unstable_propsAreEqual(prevProps, nextProps);
  },
  useOptions: function useOptions(options) {
    var setState = useCallback(function (value) {
      return options.unstable_setValue(options.name, value);
    }, [options.unstable_setValue, options.name]);
    return _objectSpread2(_objectSpread2({}, options), {}, {
      unstable_checkOnFocus: false,
      state: options.unstable_values[options.name],
      setState: setState
    });
  },
  useProps: function useProps(_, htmlProps) {
    return _objectSpread2({
      role: "menuitemradio"
    }, htmlProps);
  }
});
var MenuItemRadio = createComponent({
  as: "button",
  memo: true,
  useHook: useMenuItemRadio
});

export { MenuItemRadio, useMenuItemRadio };
