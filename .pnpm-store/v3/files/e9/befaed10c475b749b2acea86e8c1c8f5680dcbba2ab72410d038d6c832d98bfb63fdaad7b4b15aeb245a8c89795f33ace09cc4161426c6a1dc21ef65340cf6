import * as React from "react";
import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { useForkRef } from "reakit-utils/useForkRef";
import {
  DisclosureContentOptions,
  DisclosureContentHTMLProps,
  useDisclosureContent,
} from "../Disclosure/DisclosureContent";
import {
  unstable_useId,
  unstable_IdOptions,
  unstable_IdHTMLProps,
} from "../Id/Id";
import { TabStateReturn } from "./TabState";
import { TAB_PANEL_KEYS } from "./__keys";

export type TabPanelOptions = DisclosureContentOptions &
  unstable_IdOptions &
  Pick<
    TabStateReturn,
    "selectedId" | "registerPanel" | "unregisterPanel" | "panels" | "items"
  > & {
    /**
     * Tab's id
     */
    tabId?: string;
  };

export type TabPanelHTMLProps = DisclosureContentHTMLProps &
  unstable_IdHTMLProps;

export type TabPanelProps = TabPanelOptions & TabPanelHTMLProps;

function getTabsWithoutPanel(
  tabs: TabPanelOptions["items"],
  panels: TabPanelOptions["panels"]
) {
  const panelsTabIds = panels.map((panel) => panel.groupId).filter(Boolean);
  return tabs.filter(
    (item) => panelsTabIds.indexOf(item.id || undefined) === -1
  );
}

function getPanelIndex(
  panels: TabPanelOptions["panels"],
  panel: typeof panels[number]
) {
  const panelsWithoutTabId = panels.filter((p) => !p.groupId);
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
function getTabId(options: TabPanelOptions) {
  const panel = options.panels?.find((p) => p.id === options.id);
  const tabId = options.tabId || panel?.groupId;
  if (tabId || !panel || !options.panels || !options.items) {
    return tabId;
  }
  const panelIndex = getPanelIndex(options.panels, panel);
  const tabsWithoutPanel = getTabsWithoutPanel(options.items, options.panels);
  return tabsWithoutPanel[panelIndex]?.id || undefined;
}

export const useTabPanel = createHook<TabPanelOptions, TabPanelHTMLProps>({
  name: "TabPanel",
  compose: [unstable_useId, useDisclosureContent],
  keys: TAB_PANEL_KEYS,

  useProps(options, { ref: htmlRef, ...htmlProps }) {
    const ref = React.useRef<HTMLElement>(null);
    const tabId = getTabId(options);
    const { id, registerPanel, unregisterPanel } = options;

    React.useEffect(() => {
      if (!id) return undefined;
      registerPanel?.({ id, ref, groupId: tabId });
      return () => {
        unregisterPanel?.(id);
      };
    }, [tabId, id, registerPanel, unregisterPanel]);

    return {
      ref: useForkRef(ref, htmlRef),
      role: "tabpanel",
      tabIndex: 0,
      "aria-labelledby": tabId,
      ...htmlProps,
    };
  },

  useComposeOptions(options) {
    const tabId = getTabId(options);
    return {
      visible: tabId ? options.selectedId === tabId : false,
      ...options,
    };
  },
});

export const TabPanel = createComponent({
  as: "div",
  useHook: useTabPanel,
});
