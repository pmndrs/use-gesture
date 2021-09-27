'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
var React = require('react');
var useForkRef = require('reakit-utils/useForkRef');
require('reakit-utils/useLiveRef');
require('reakit-utils/isSelfTarget');
require('../Role/Role.js');
require('../Id/IdProvider.js');
var Id_Id = require('../Id/Id.js');
require('../__keys-f41a441b.js');
var Disclosure_DisclosureContent = require('../Disclosure/DisclosureContent.js');
var __keys = require('../__keys-f590d919.js');

function getTabsWithoutPanel(tabs, panels) {
  var panelsTabIds = panels.map(function (panel) {
    return panel.groupId;
  }).filter(Boolean);
  return tabs.filter(function (item) {
    return panelsTabIds.indexOf(item.id || undefined) === -1;
  });
}

function getPanelIndex(panels, panel) {
  var panelsWithoutTabId = panels.filter(function (p) {
    return !p.groupId;
  });
  return panelsWithoutTabId.indexOf(panel);
}
/**
 * When <TabPanel> is used without tabId:
 *
 *   - First render: getTabId will return undefined because options.panels
 * doesn't contain the current panel yet (registerPanel wasn't called yet).
 * Thus registerPanel will be called without groupId (tabId).
 *
 *   - Second render: options.panels already contains the current panel
 * (because registerPanel was called in the previous render). This means that
 * we'll be able to get the related tabId with the tab panel index. Basically,
 * we filter out all the tabs and panels that have already matched. In this
 * phase, registerPanel will be called again with the proper groupId (tabId).
 *
 *   - In the third render, panel.groupId will be already defined, so we just
 * return it. registerPanel is not called.
 */


function getTabId(options) {
  var _options$panels, _tabsWithoutPanel$pan;

  var panel = (_options$panels = options.panels) === null || _options$panels === void 0 ? void 0 : _options$panels.find(function (p) {
    return p.id === options.id;
  });
  var tabId = options.tabId || (panel === null || panel === void 0 ? void 0 : panel.groupId);

  if (tabId || !panel || !options.panels || !options.items) {
    return tabId;
  }

  var panelIndex = getPanelIndex(options.panels, panel);
  var tabsWithoutPanel = getTabsWithoutPanel(options.items, options.panels);
  return ((_tabsWithoutPanel$pan = tabsWithoutPanel[panelIndex]) === null || _tabsWithoutPanel$pan === void 0 ? void 0 : _tabsWithoutPanel$pan.id) || undefined;
}

var useTabPanel = createHook.createHook({
  name: "TabPanel",
  compose: [Id_Id.unstable_useId, Disclosure_DisclosureContent.useDisclosureContent],
  keys: __keys.TAB_PANEL_KEYS,
  useProps: function useProps(options, _ref) {
    var htmlRef = _ref.ref,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["ref"]);

    var ref = React.useRef(null);
    var tabId = getTabId(options);
    var id = options.id,
        registerPanel = options.registerPanel,
        unregisterPanel = options.unregisterPanel;
    React.useEffect(function () {
      if (!id) return undefined;
      registerPanel === null || registerPanel === void 0 ? void 0 : registerPanel({
        id: id,
        ref: ref,
        groupId: tabId
      });
      return function () {
        unregisterPanel === null || unregisterPanel === void 0 ? void 0 : unregisterPanel(id);
      };
    }, [tabId, id, registerPanel, unregisterPanel]);
    return _rollupPluginBabelHelpers._objectSpread2({
      ref: useForkRef.useForkRef(ref, htmlRef),
      role: "tabpanel",
      tabIndex: 0,
      "aria-labelledby": tabId
    }, htmlProps);
  },
  useComposeOptions: function useComposeOptions(options) {
    var tabId = getTabId(options);
    return _rollupPluginBabelHelpers._objectSpread2({
      visible: tabId ? options.selectedId === tabId : false
    }, options);
  }
});
var TabPanel = createComponent.createComponent({
  as: "div",
  useHook: useTabPanel
});

exports.TabPanel = TabPanel;
exports.useTabPanel = useTabPanel;
