import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { useWarning } from "reakit-warning";
import { useCreateElement } from "reakit-system/useCreateElement";
import {
  PopoverOptions,
  PopoverHTMLProps,
  usePopover,
} from "../Popover/Popover";
import { COMBOBOX_POPOVER_KEYS } from "./__keys";
import {
  unstable_ComboboxListOptions as ComboboxListOptions,
  unstable_ComboboxListHTMLProps as ComboboxListHTMLProps,
  unstable_useComboboxList as useComboboxList,
} from "./ComboboxList";
import { ComboboxPopoverStateReturn } from "./__utils/ComboboxPopoverState";

export const unstable_useComboboxPopover = createHook<
  unstable_ComboboxPopoverOptions,
  unstable_ComboboxPopoverHTMLProps
>({
  name: "ComboboxPopover",
  compose: [useComboboxList, usePopover],
  keys: COMBOBOX_POPOVER_KEYS,

  useOptions(options) {
    return {
      ...options,
      unstable_disclosureRef: options.unstable_referenceRef,
      unstable_autoFocusOnShow: false,
      unstable_autoFocusOnHide: false,
    };
  },

  useComposeProps(options, { tabIndex, ...htmlProps }) {
    htmlProps = useComboboxList(options, htmlProps, true);
    htmlProps = usePopover(options, htmlProps, true);
    return {
      ...htmlProps,
      tabIndex: tabIndex ?? undefined,
    };
  },
});

export const unstable_ComboboxPopover = createComponent({
  as: "div",
  useHook: unstable_useComboboxPopover,
  useCreateElement: (type, props, children) => {
    useWarning(
      !props["aria-label"] && !props["aria-labelledby"],
      "You should provide either `aria-label` or `aria-labelledby` props.",
      "See https://reakit.io/docs/combobox"
    );
    return useCreateElement(type, props, children);
  },
});

export type unstable_ComboboxPopoverOptions = ComboboxListOptions &
  Omit<
    PopoverOptions,
    | "unstable_disclosureRef"
    | "unstable_autoFocusOnHide"
    | "unstable_autoFocusOnShow"
  > &
  Pick<Partial<ComboboxPopoverStateReturn>, "unstable_referenceRef">;

export type unstable_ComboboxPopoverHTMLProps = PopoverHTMLProps &
  ComboboxListHTMLProps;

export type unstable_ComboboxPopoverProps = unstable_ComboboxPopoverOptions &
  unstable_ComboboxPopoverHTMLProps;
