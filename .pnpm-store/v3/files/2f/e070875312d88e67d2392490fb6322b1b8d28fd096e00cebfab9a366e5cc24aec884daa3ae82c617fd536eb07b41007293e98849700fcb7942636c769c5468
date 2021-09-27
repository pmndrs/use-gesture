import * as React from "react";
import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { useLiveRef } from "reakit-utils/useLiveRef";
import {
  CompositeItemOptions,
  CompositeItemHTMLProps,
  useCompositeItem,
} from "../Composite/CompositeItem";
import { TabStateReturn } from "./TabState";
import { TAB_KEYS } from "./__keys";

export type TabOptions = CompositeItemOptions &
  Pick<Partial<TabStateReturn>, "manual"> &
  Pick<TabStateReturn, "panels" | "selectedId" | "select">;

export type TabHTMLProps = CompositeItemHTMLProps;

export type TabProps = TabOptions & TabHTMLProps;

function useTabPanelId(options: TabOptions) {
  return React.useMemo(
    () =>
      options.panels?.find((panel) => panel.groupId === options.id)?.id ||
      undefined,
    [options.panels, options.id]
  );
}

export const useTab = createHook<TabOptions, TabHTMLProps>({
  name: "Tab",
  compose: useCompositeItem,
  keys: TAB_KEYS,

  useOptions({ focusable = true, ...options }) {
    return { focusable, ...options };
  },

  useProps(
    options,
    { onClick: htmlOnClick, onFocus: htmlOnFocus, ...htmlProps }
  ) {
    const selected = options.selectedId === options.id;
    const tabPanelId = useTabPanelId(options);
    const onClickRef = useLiveRef(htmlOnClick);
    const onFocusRef = useLiveRef(htmlOnFocus);

    const onClick = React.useCallback(
      (event: React.MouseEvent) => {
        onClickRef.current?.(event);
        if (event.defaultPrevented) return;
        if (options.disabled) return;
        if (!options.id) return;
        if (selected) return;
        options.select?.(options.id);
      },
      [options.disabled, selected, options.select, options.id]
    );

    const onFocus = React.useCallback(
      (event: React.FocusEvent) => {
        onFocusRef.current?.(event);
        if (event.defaultPrevented) return;
        if (options.disabled) return;
        if (options.manual) return;
        if (!options.id) return;
        if (selected) return;
        options.select?.(options.id);
      },
      [options.id, options.disabled, options.manual, selected, options.select]
    );

    return {
      role: "tab",
      "aria-selected": selected,
      "aria-controls": tabPanelId,
      onClick,
      onFocus,
      ...htmlProps,
    };
  },
});

export const Tab = createComponent({
  as: "button",
  memo: true,
  useHook: useTab,
});
