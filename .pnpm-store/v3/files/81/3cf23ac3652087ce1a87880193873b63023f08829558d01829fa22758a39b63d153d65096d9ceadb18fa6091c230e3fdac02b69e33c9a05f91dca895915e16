import * as React from "react";
import { useWarning } from "reakit-warning";
import { createComponent } from "reakit-system/createComponent";
import { useCreateElement } from "reakit-system/useCreateElement";
import { createHook } from "reakit-system/createHook";
import { useForkRef } from "reakit-utils/useForkRef";
import {
  CompositeOptions,
  CompositeHTMLProps,
  useComposite,
} from "../Composite/Composite";
import { useShortcuts } from "./__utils/useShortcuts";
import { useMenuContext } from "./__utils/MenuContext";
import { MenuStateReturn } from "./MenuState";
import { MENU_BAR_KEYS } from "./__keys";

export type MenuBarOptions = CompositeOptions &
  Pick<Partial<MenuStateReturn>, "orientation"> &
  Pick<MenuStateReturn, "items" | "move" | "next" | "previous">;

export type MenuBarHTMLProps = CompositeHTMLProps;

export type MenuBarProps = MenuBarOptions & MenuBarHTMLProps;

export const useMenuBar = createHook<MenuBarOptions, MenuBarHTMLProps>({
  name: "MenuBar",
  compose: useComposite,
  keys: MENU_BAR_KEYS,

  useProps(
    options,
    {
      ref: htmlRef,
      wrapElement: htmlWrapElement,
      role = "menubar",
      ...htmlProps
    }
  ) {
    const ref = React.useRef<HTMLElement>(null);
    const wrap = useMenuContext(ref, role, options);

    useShortcuts(ref, options);

    const wrapElement = React.useCallback(
      (element: React.ReactNode) => {
        element = wrap(element);
        if (htmlWrapElement) {
          return htmlWrapElement(element);
        }
        return element;
      },
      [wrap, htmlWrapElement]
    );

    return {
      ref: useForkRef(ref, htmlRef),
      role,
      "aria-orientation": options.orientation,
      wrapElement,
      ...htmlProps,
    };
  },
});

export const MenuBar = createComponent({
  as: "div",
  useHook: useMenuBar,
  useCreateElement: (type, props, children) => {
    useWarning(
      !props["aria-label"] &&
        !props["aria-labelledby"] &&
        props.role !== "menubar",
      "You should provide either `aria-label` or `aria-labelledby` props.",
      "See https://reakit.io/docs/menu"
    );

    return useCreateElement(type, props, children);
  },
});
