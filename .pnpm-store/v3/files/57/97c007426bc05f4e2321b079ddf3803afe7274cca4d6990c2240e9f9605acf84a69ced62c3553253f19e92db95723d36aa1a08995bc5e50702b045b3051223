import * as React from "react";
import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import {
  CheckboxOptions,
  useCheckbox,
  CheckboxHTMLProps,
} from "../Checkbox/Checkbox";
import { MenuItemOptions, MenuItemHTMLProps, useMenuItem } from "./MenuItem";
import { MenuStateReturn } from "./MenuState";
import { MENU_ITEM_CHECKBOX_KEYS } from "./__keys";

export type MenuItemCheckboxOptions = CheckboxOptions &
  MenuItemOptions &
  Pick<MenuStateReturn, "unstable_values" | "unstable_setValue"> & {
    /**
     * MenuItemCheckbox's name as in `menu.values`.
     */
    name: string;
  };

export type MenuItemCheckboxHTMLProps = CheckboxHTMLProps & MenuItemHTMLProps;

export type MenuItemCheckboxProps = MenuItemCheckboxOptions &
  MenuItemCheckboxHTMLProps;

export const useMenuItemCheckbox = createHook<
  MenuItemCheckboxOptions,
  MenuItemCheckboxHTMLProps
>({
  name: "MenuItemCheckbox",
  compose: [useMenuItem, useCheckbox],
  keys: MENU_ITEM_CHECKBOX_KEYS,

  propsAreEqual(prev, next) {
    if (prev.name !== next.name) {
      return useMenuItem.unstable_propsAreEqual(prev, next);
    }
    const { unstable_values: prevValues, ...prevProps } = prev;
    const { unstable_values: nextValues, ...nextProps } = next;
    if (prevValues[next.name] !== nextValues[next.name]) {
      return false;
    }
    return useMenuItem.unstable_propsAreEqual(prevProps, nextProps);
  },

  useOptions(options) {
    const setState = React.useCallback(
      (value) => options.unstable_setValue(options.name, value),
      [options.unstable_setValue, options.name]
    );
    return {
      ...options,
      state: options.unstable_values[options.name],
      setState,
    };
  },

  useProps(options, htmlProps) {
    return {
      role: "menuitemcheckbox",
      name: options.name,
      ...htmlProps,
    };
  },
});

export const MenuItemCheckbox = createComponent({
  as: "button",
  memo: true,
  useHook: useMenuItemCheckbox,
});
