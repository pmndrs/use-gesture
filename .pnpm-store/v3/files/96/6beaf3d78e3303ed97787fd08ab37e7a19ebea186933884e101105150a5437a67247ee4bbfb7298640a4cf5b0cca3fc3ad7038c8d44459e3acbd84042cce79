import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import {
  SeparatorOptions,
  SeparatorHTMLProps,
  useSeparator,
} from "../Separator/Separator";
import { TOOLBAR_SEPARATOR_KEYS } from "./__keys";

export type ToolbarSeparatorOptions = SeparatorOptions;

export type ToolbarSeparatorHTMLProps = SeparatorHTMLProps;

export type ToolbarSeparatorProps = ToolbarSeparatorOptions &
  ToolbarSeparatorHTMLProps;

export const useToolbarSeparator = createHook<
  ToolbarSeparatorOptions,
  ToolbarSeparatorHTMLProps
>({
  name: "ToolbarSeparator",
  compose: useSeparator,
  keys: TOOLBAR_SEPARATOR_KEYS,

  useOptions({ orientation = "vertical", ...options }) {
    return {
      orientation: orientation === "vertical" ? "horizontal" : "vertical",
      ...options,
    };
  },
});

export const ToolbarSeparator = createComponent({
  as: "hr",
  memo: true,
  useHook: useToolbarSeparator,
});
