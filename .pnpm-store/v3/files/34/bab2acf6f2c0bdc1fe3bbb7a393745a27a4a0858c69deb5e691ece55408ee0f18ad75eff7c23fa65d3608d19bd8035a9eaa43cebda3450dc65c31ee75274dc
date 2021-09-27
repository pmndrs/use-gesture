import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import {
  unstable_GridRowOptions as GridRowOptions,
  unstable_GridRowHTMLProps as GridRowHTMLProps,
  unstable_useGridRow as useGridRow,
} from "../Grid/GridRow";
import { COMBOBOX_GRID_ROW_KEYS } from "./__keys";

export const unstable_useComboboxGridRow = createHook<
  unstable_ComboboxGridRowOptions,
  unstable_ComboboxGridRowHTMLProps
>({
  name: "ComboboxGridRow",
  compose: useGridRow,
  keys: COMBOBOX_GRID_ROW_KEYS,
});

export const unstable_ComboboxGridRow = createComponent({
  as: "div",
  useHook: unstable_useComboboxGridRow,
});

export type unstable_ComboboxGridRowOptions = GridRowOptions;

export type unstable_ComboboxGridRowHTMLProps = GridRowHTMLProps;

export type unstable_ComboboxGridRowProps = unstable_ComboboxGridRowOptions &
  unstable_ComboboxGridRowHTMLProps;
