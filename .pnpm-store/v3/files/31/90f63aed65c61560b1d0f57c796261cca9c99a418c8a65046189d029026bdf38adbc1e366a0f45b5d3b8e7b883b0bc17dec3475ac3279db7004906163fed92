import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import {
  SeparatorOptions,
  SeparatorHTMLProps,
  useSeparator,
} from "../Separator/Separator";
import { MENU_SEPARATOR_KEYS } from "./__keys";

export type MenuSeparatorOptions = SeparatorOptions;

export type MenuSeparatorHTMLProps = SeparatorHTMLProps;

export type MenuSeparatorProps = MenuSeparatorOptions & MenuSeparatorHTMLProps;

export const useMenuSeparator = createHook<
  MenuSeparatorOptions,
  MenuSeparatorHTMLProps
>({
  name: "MenuSeparator",
  compose: useSeparator,
  keys: MENU_SEPARATOR_KEYS,

  useOptions({ orientation = "vertical", ...options }) {
    return {
      orientation: orientation === "vertical" ? "horizontal" : "vertical",
      ...options,
    };
  },
});

export const MenuSeparator = createComponent({
  as: "hr",
  memo: true,
  useHook: useMenuSeparator,
});
