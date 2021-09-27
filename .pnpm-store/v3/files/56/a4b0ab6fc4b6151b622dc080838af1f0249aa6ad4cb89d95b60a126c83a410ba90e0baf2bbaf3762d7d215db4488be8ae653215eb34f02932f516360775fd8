import { useWarning } from "reakit-warning";
import { createComponent } from "reakit-system/createComponent";
import { useCreateElement } from "reakit-system/useCreateElement";
import { createHook } from "reakit-system/createHook";
import { useForkRef } from "reakit-utils/useForkRef";
import { DialogOptions, DialogHTMLProps, useDialog } from "../Dialog/Dialog";
import { PopoverStateReturn } from "./PopoverState";
import { POPOVER_KEYS } from "./__keys";

export type PopoverOptions = DialogOptions &
  Pick<
    Partial<PopoverStateReturn>,
    "unstable_popoverRef" | "unstable_popoverStyles"
  >;

export type PopoverHTMLProps = DialogHTMLProps;

export type PopoverProps = PopoverOptions & PopoverHTMLProps;

export const usePopover = createHook<PopoverOptions, PopoverHTMLProps>({
  name: "Popover",
  compose: useDialog,
  keys: POPOVER_KEYS,

  useOptions({ modal = false, ...options }) {
    return { modal, ...options };
  },

  useProps(options, { ref: htmlRef, style: htmlStyle, ...htmlProps }) {
    return {
      ref: useForkRef(options.unstable_popoverRef, htmlRef),
      style: { ...options.unstable_popoverStyles, ...htmlStyle },
      ...htmlProps,
    };
  },
});

export const Popover = createComponent({
  as: "div",
  useHook: usePopover,
  useCreateElement: (type, props, children) => {
    useWarning(
      !props["aria-label"] && !props["aria-labelledby"],
      "You should provide either `aria-label` or `aria-labelledby` props.",
      "See https://reakit.io/docs/popover"
    );
    return useCreateElement(type, props, children);
  },
});
