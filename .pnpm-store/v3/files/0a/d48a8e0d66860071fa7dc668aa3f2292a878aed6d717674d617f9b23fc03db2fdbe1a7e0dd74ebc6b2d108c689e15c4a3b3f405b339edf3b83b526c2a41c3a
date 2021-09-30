import * as React from "react";
import { useWarning } from "reakit-warning";
import { createHook } from "reakit-system/createHook";
import { createComponent } from "reakit-system/createComponent";
import { useCreateElement } from "reakit-system/useCreateElement";
import { useLiveRef } from "reakit-utils/useLiveRef";
import { isPortalEvent } from "reakit-utils/isPortalEvent";
import {
  PopoverOptions,
  PopoverHTMLProps,
  usePopover,
} from "../Popover/Popover";
import { MenuBarOptions, MenuBarHTMLProps, useMenuBar } from "./MenuBar";
import { MenuStateReturn } from "./MenuState";
import { MenuContext, MenuContextType } from "./__utils/MenuContext";
import { MENU_KEYS } from "./__keys";

export type MenuOptions = Omit<PopoverOptions, "hideOnEsc"> &
  Pick<MenuStateReturn, "placement"> &
  MenuBarOptions;

export type MenuHTMLProps = PopoverHTMLProps & MenuBarHTMLProps;

export type MenuProps = MenuOptions & MenuHTMLProps;

function usePlacementDir(placement?: string) {
  return React.useMemo(() => placement?.split("-")?.[0], [placement]);
}

export const useMenu = createHook<MenuOptions, MenuHTMLProps>({
  name: "Menu",
  compose: [useMenuBar, usePopover],
  keys: MENU_KEYS,

  useOptions(options) {
    const parent = React.useContext(MenuContext);
    const parentIsMenuBar = parent?.role === "menubar";

    return {
      unstable_autoFocusOnHide: !parentIsMenuBar,
      modal: false,
      ...options,
      // will be handled by MenuButton
      unstable_autoFocusOnShow: false,
      // will be handled differently from usePopover/useDialog
      hideOnEsc: false,
    };
  },

  useProps(options, { onKeyDown: htmlOnKeyDown, ...htmlProps }) {
    const onKeyDownRef = useLiveRef(htmlOnKeyDown);
    const parent = React.useContext(MenuContext);
    const hasParent = !!parent;
    let ancestorMenuBar: MenuContextType | undefined | null = parent;

    while (ancestorMenuBar && ancestorMenuBar.role !== "menubar") {
      ancestorMenuBar = ancestorMenuBar.parent;
    }

    const { next, previous, orientation } = ancestorMenuBar || {};
    const ancestorIsHorizontal = orientation === "horizontal";
    const dir = usePlacementDir(options.placement);

    const onKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLElement>) => {
        onKeyDownRef.current?.(event);
        if (event.defaultPrevented) return;
        if (event.key === "Escape") {
          if (!hasParent) {
            // On Esc, only stop propagation if there's no parent menu.
            // Otherwise, pressing Esc should close all menus
            event.stopPropagation();
          }
          options.hide?.();
        } else if (hasParent && !isPortalEvent(event)) {
          // Moves to the next menu button in a horizontal menu bar or close
          // the menu if it's a sub menu
          const ArrowRight =
            ancestorIsHorizontal && dir !== "left"
              ? next
              : dir === "left" && options.hide;
          const ArrowLeft =
            ancestorIsHorizontal && dir !== "right"
              ? previous
              : dir === "right" && options.hide;
          const keyMap = { ArrowRight, ArrowLeft };
          const action = keyMap[event.key as keyof typeof keyMap];
          if (action) {
            event.preventDefault();
            if (hasParent) {
              event.stopPropagation();
            }
            action();
          }
        }
      },
      [hasParent, ancestorIsHorizontal, next, previous, dir, options.hide]
    );

    return { role: "menu", onKeyDown, ...htmlProps };
  },
});

export const Menu = createComponent({
  as: "div",
  useHook: useMenu,
  useCreateElement: (type, props, children) => {
    useWarning(
      !props["aria-label"] && !props["aria-labelledby"],
      "You should provide either `aria-label` or `aria-labelledby` props.",
      "See https://reakit.io/docs/menu"
    );
    return useCreateElement(type, props, children);
  },
});
