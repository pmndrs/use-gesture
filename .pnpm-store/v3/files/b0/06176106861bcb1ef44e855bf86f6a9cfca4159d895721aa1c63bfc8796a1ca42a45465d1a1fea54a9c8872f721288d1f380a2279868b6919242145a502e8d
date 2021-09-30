import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { useMemo, useCallback } from 'react';
import 'reakit-utils/useForkRef';
import 'reakit-utils/isButton';
import 'reakit-warning';
import { useLiveRef } from 'reakit-utils/useLiveRef';
import 'reakit-utils/isSelfTarget';
import 'reakit-utils/useIsomorphicEffect';
import 'reakit-utils/hasFocusWithin';
import 'reakit-utils/isPortalEvent';
import 'reakit-utils/dom';
import 'reakit-utils/tabbable';
import '../Role/Role.js';
import '../Tabbable/Tabbable.js';
import '../Clickable/Clickable.js';
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
import { useCompositeItem } from '../Composite/CompositeItem.js';
import { T as TAB_KEYS } from '../__keys-3c0b2243.js';

function useTabPanelId(options) {
  return useMemo(function () {
    var _options$panels, _options$panels$find;

    return ((_options$panels = options.panels) === null || _options$panels === void 0 ? void 0 : (_options$panels$find = _options$panels.find(function (panel) {
      return panel.groupId === options.id;
    })) === null || _options$panels$find === void 0 ? void 0 : _options$panels$find.id) || undefined;
  }, [options.panels, options.id]);
}

var useTab = createHook({
  name: "Tab",
  compose: useCompositeItem,
  keys: TAB_KEYS,
  useOptions: function useOptions(_ref) {
    var _ref$focusable = _ref.focusable,
        focusable = _ref$focusable === void 0 ? true : _ref$focusable,
        options = _objectWithoutPropertiesLoose(_ref, ["focusable"]);

    return _objectSpread2({
      focusable: focusable
    }, options);
  },
  useProps: function useProps(options, _ref2) {
    var htmlOnClick = _ref2.onClick,
        htmlOnFocus = _ref2.onFocus,
        htmlProps = _objectWithoutPropertiesLoose(_ref2, ["onClick", "onFocus"]);

    var selected = options.selectedId === options.id;
    var tabPanelId = useTabPanelId(options);
    var onClickRef = useLiveRef(htmlOnClick);
    var onFocusRef = useLiveRef(htmlOnFocus);
    var onClick = useCallback(function (event) {
      var _onClickRef$current, _options$select;

      (_onClickRef$current = onClickRef.current) === null || _onClickRef$current === void 0 ? void 0 : _onClickRef$current.call(onClickRef, event);
      if (event.defaultPrevented) return;
      if (options.disabled) return;
      if (!options.id) return;
      if (selected) return;
      (_options$select = options.select) === null || _options$select === void 0 ? void 0 : _options$select.call(options, options.id);
    }, [options.disabled, selected, options.select, options.id]);
    var onFocus = useCallback(function (event) {
      var _onFocusRef$current, _options$select2;

      (_onFocusRef$current = onFocusRef.current) === null || _onFocusRef$current === void 0 ? void 0 : _onFocusRef$current.call(onFocusRef, event);
      if (event.defaultPrevented) return;
      if (options.disabled) return;
      if (options.manual) return;
      if (!options.id) return;
      if (selected) return;
      (_options$select2 = options.select) === null || _options$select2 === void 0 ? void 0 : _options$select2.call(options, options.id);
    }, [options.id, options.disabled, options.manual, selected, options.select]);
    return _objectSpread2({
      role: "tab",
      "aria-selected": selected,
      "aria-controls": tabPanelId,
      onClick: onClick,
      onFocus: onFocus
    }, htmlProps);
  }
});
var Tab = createComponent({
  as: "button",
  memo: true,
  useHook: useTab
});

export { Tab, useTab };
