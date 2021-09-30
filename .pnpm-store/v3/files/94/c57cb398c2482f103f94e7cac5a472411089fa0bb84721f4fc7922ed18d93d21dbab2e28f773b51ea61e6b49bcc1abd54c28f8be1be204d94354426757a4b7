import * as React from "react";
import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { RadioOptions, RadioHTMLProps, useRadio } from "../Radio/Radio";
import { MenuStateReturn } from "./MenuState";
import { useMenuItem, MenuItemOptions, MenuItemHTMLProps } from "./MenuItem";
import { MENU_ITEM_RADIO_KEYS } from "./__keys";

export type MenuItemRadioOptions = RadioOptions &
  MenuItemOptions &
  Pick<MenuStateReturn, "unstable_values" | "unstable_setValue"> & {
    /**
     * MenuItemRadio's name as in `menu.values`.
     */
    name: string;
  };

export type MenuItemRadioHTMLProps = RadioHTMLProps & MenuItemHTMLProps;

export type MenuItemRadioProps = MenuItemRadioOptions & MenuItemRadioHTMLProps;

export const useMenuItemRadio = createHook<
  MenuItemRadioOptions,
  MenuItemRadioHTMLProps
>({
  name: "MenuItemRadio",
  compose: [useMenuItem, useRadio],
  keys: MENU_ITEM_RADIO_KEYS,

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
      unstable_checkOnFocus: false,
      state: options.unstable_values[options.name],
      setState,
    };
  },

  useProps(_, htmlProps) {
    return { role: "menuitemradio", ...htmlProps };
  },
});

export const MenuItemRadio = createComponent({
  as: "button",
  memo: true,
  useHook: useMenuItemRadio,
});
