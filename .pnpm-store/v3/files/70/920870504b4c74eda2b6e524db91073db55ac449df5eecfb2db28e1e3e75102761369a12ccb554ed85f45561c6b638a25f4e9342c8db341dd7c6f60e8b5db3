import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import {
  CompositeItemOptions,
  CompositeItemHTMLProps,
  useCompositeItem,
} from "../Composite/CompositeItem";
import { TOOLBAR_ITEM_KEYS } from "./__keys";

export type ToolbarItemOptions = CompositeItemOptions;

export type ToolbarItemHTMLProps = CompositeItemHTMLProps;

export type ToolbarItemProps = ToolbarItemOptions & ToolbarItemHTMLProps;

export const useToolbarItem = createHook<
  ToolbarItemOptions,
  ToolbarItemHTMLProps
>({
  name: "ToolbarItem",
  compose: useCompositeItem,
  keys: TOOLBAR_ITEM_KEYS,
});

export const ToolbarItem = createComponent({
  as: "button",
  memo: true,
  useHook: useToolbarItem,
});
