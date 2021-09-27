import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import {
  PopoverArrowOptions,
  PopoverArrowHTMLProps,
  usePopoverArrow,
} from "../Popover/PopoverArrow";
import { MENU_ARROW_KEYS } from "./__keys";

export type MenuArrowOptions = PopoverArrowOptions;

export type MenuArrowHTMLProps = PopoverArrowHTMLProps;

export type MenuArrowProps = MenuArrowOptions & MenuArrowHTMLProps;

export const useMenuArrow = createHook<MenuArrowOptions, MenuArrowHTMLProps>({
  name: "MenuArrow",
  compose: usePopoverArrow,
  keys: MENU_ARROW_KEYS,
});

export const MenuArrow = createComponent({
  as: "div",
  memo: true,
  useHook: useMenuArrow,
});
