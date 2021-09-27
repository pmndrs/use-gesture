import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { useRef, useEffect } from 'react';
import { useForkRef } from 'reakit-utils/useForkRef';
import 'reakit-utils/useLiveRef';
import 'reakit-utils/isSelfTarget';
import '../Role/Role.js';
import '../Id/IdProvider.js';
import { unstable_useId } from '../Id/Id.js';
import '../__keys-e6a5cfbe.js';
import { useDisclosureContent } from '../Disclosure/DisclosureContent.js';
import { b as TAB_PANEL_KEYS } from '../__keys-3c0b2243.js';

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

var useTabPanel = createHook({
  name: "TabPanel",
  compose: [unstable_useId, useDisclosureContent],
  keys: TAB_PANEL_KEYS,
  useProps: function useProps(options, _ref) {
    var htmlRef = _ref.ref,
        htmlProps = _objectWithoutPropertiesLoose(_ref, ["ref"]);

    var ref = useRef(null);
    var tabId = getTabId(options);
    var id = options.id,
        registerPanel = options.registerPanel,
        unregisterPanel = options.unregisterPanel;
    useEffect(function () {
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
    return _objectSpread2({
      ref: useForkRef(ref, htmlRef),
      role: "tabpanel",
      tabIndex: 0,
      "aria-labelledby": tabId
    }, htmlProps);
  },
  useComposeOptions: function useComposeOptions(options) {
    var tabId = getTabId(options);
    return _objectSpread2({
      visible: tabId ? options.selectedId === tabId : false
    }, options);
  }
});
var TabPanel = createComponent({
  as: "div",
  useHook: useTabPanel
});

export { TabPanel, useTabPanel };
