import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import {
  DialogBackdropOptions,
  DialogBackdropHTMLProps,
  useDialogBackdrop,
} from "../Dialog/DialogBackdrop";
import { POPOVER_BACKDROP_KEYS } from "./__keys";

export type PopoverBackdropOptions = DialogBackdropOptions;

export type PopoverBackdropHTMLProps = DialogBackdropHTMLProps;

export type PopoverBackdropProps = PopoverBackdropOptions &
  PopoverBackdropHTMLProps;

export const usePopoverBackdrop = createHook<
  PopoverBackdropOptions,
  PopoverBackdropHTMLProps
>({
  name: "PopoverBackdrop",
  compose: useDialogBackdrop,
  keys: POPOVER_BACKDROP_KEYS,

  useOptions({ modal = false, ...options }) {
    return { modal, ...options };
  },
});

export const PopoverBackdrop = createComponent({
  as: "div",
  memo: true,
  useHook: usePopoverBackdrop,
});
