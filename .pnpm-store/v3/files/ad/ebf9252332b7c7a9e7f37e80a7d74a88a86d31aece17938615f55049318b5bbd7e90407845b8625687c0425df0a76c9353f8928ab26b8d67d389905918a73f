import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import {
  CompositeItemOptions,
  CompositeItemHTMLProps,
  useCompositeItem,
} from "../Composite/CompositeItem";
import { COMBOBOX_OPTION_KEYS } from "./__keys";
import {
  unstable_ComboboxItemOptions as ComboboxItemOptions,
  unstable_ComboboxItemHTMLProps as ComboboxItemHTMLProps,
  unstable_useComboboxItem as useComboboxItem,
} from "./ComboboxItem";

export const unstable_useComboboxOption = createHook<
  unstable_ComboboxOptionOptions,
  unstable_ComboboxOptionHTMLProps
>({
  name: "ComboboxOption",
  compose: [useComboboxItem, useCompositeItem],
  keys: COMBOBOX_OPTION_KEYS,

  useProps(_, htmlProps) {
    return { role: "option", ...htmlProps };
  },
});

export const unstable_ComboboxOption = createComponent({
  as: "div",
  memo: true,
  useHook: unstable_useComboboxOption,
});

export type unstable_ComboboxOptionOptions = CompositeItemOptions &
  ComboboxItemOptions;

export type unstable_ComboboxOptionHTMLProps = CompositeItemHTMLProps &
  ComboboxItemHTMLProps;

export type unstable_ComboboxOptionProps = unstable_ComboboxOptionOptions &
  unstable_ComboboxOptionHTMLProps;
