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
require('reakit-utils/hasFocusWithin');
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
var __keys = require('../__keys-f590d919.js');

function useTabPanelId(options) {
  return React.useMemo(function () {
    var _options$panels, _options$panels$find;

    return ((_options$panels = options.panels) === null || _options$panels === void 0 ? void 0 : (_options$panels$find = _options$panels.find(function (panel) {
      return panel.groupId === options.id;
    })) === null || _options$panels$find === void 0 ? void 0 : _options$panels$find.id) || undefined;
  }, [options.panels, options.id]);
}

var useTab = createHook.createHook({
  name: "Tab",
  compose: Composite_CompositeItem.useCompositeItem,
  keys: __keys.TAB_KEYS,
  useOptions: function useOptions(_ref) {
    var _ref$focusable = _ref.focusable,
        focusable = _ref$focusable === void 0 ? true : _ref$focusable,
        options = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["focusable"]);

    return _rollupPluginBabelHelpers._objectSpread2({
      focusable: focusable
    }, options);
  },
  useProps: function useProps(options, _ref2) {
    var htmlOnClick = _ref2.onClick,
        htmlOnFocus = _ref2.onFocus,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref2, ["onClick", "onFocus"]);

    var selected = options.selectedId === options.id;
    var tabPanelId = useTabPanelId(options);
    var onClickRef = useLiveRef.useLiveRef(htmlOnClick);
    var onFocusRef = useLiveRef.useLiveRef(htmlOnFocus);
    var onClick = React.useCallback(function (event) {
      var _onClickRef$current, _options$select;

      (_onClickRef$current = onClickRef.current) === null || _onClickRef$current === void 0 ? void 0 : _onClickRef$current.call(onClickRef, event);
      if (event.defaultPrevented) return;
      if (options.disabled) return;
      if (!options.id) return;
      if (selected) return;
      (_options$select = options.select) === null || _options$select === void 0 ? void 0 : _options$select.call(options, options.id);
    }, [options.disabled, selected, options.select, options.id]);
    var onFocus = React.useCallback(function (event) {
      var _onFocusRef$current, _options$select2;

      (_onFocusRef$current = onFocusRef.current) === null || _onFocusRef$current === void 0 ? void 0 : _onFocusRef$current.call(onFocusRef, event);
      if (event.defaultPrevented) return;
      if (options.disabled) return;
      if (options.manual) return;
      if (!options.id) return;
      if (selected) return;
      (_options$select2 = options.select) === null || _options$select2 === void 0 ? void 0 : _options$select2.call(options, options.id);
    }, [options.id, options.disabled, options.manual, selected, options.select]);
    return _rollupPluginBabelHelpers._objectSpread2({
      role: "tab",
      "aria-selected": selected,
      "aria-controls": tabPanelId,
      onClick: onClick,
      onFocus: onFocus
    }, htmlProps);
  }
});
var Tab = createComponent.createComponent({
  as: "button",
  memo: true,
  useHook: useTab
});

exports.Tab = Tab;
exports.useTab = useTab;
