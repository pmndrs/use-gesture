import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { RoleOptions, RoleHTMLProps, useRole } from "../Role/Role";
import { MENU_GROUP_KEYS } from "./__keys";

export type MenuGroupOptions = RoleOptions;

export type MenuGroupHTMLProps = RoleHTMLProps;

export type MenuGroupProps = MenuGroupOptions & MenuGroupHTMLProps;

export const useMenuGroup = createHook<MenuGroupOptions, MenuGroupHTMLProps>({
  name: "MenuGroup",
  compose: useRole,
  keys: MENU_GROUP_KEYS,

  useProps(_, htmlProps) {
    return { role: "group", ...htmlProps };
  },
});

export const MenuGroup = createComponent({
  as: "div",
  useHook: useMenuGroup,
});
