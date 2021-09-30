import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import {
  PopoverArrowOptions,
  PopoverArrowHTMLProps,
  usePopoverArrow,
} from "../Popover/PopoverArrow";
import { TOOLTIP_ARROW_KEYS } from "./__keys";

export type TooltipArrowOptions = PopoverArrowOptions;

export type TooltipArrowHTMLProps = PopoverArrowHTMLProps;

export type TooltipArrowProps = TooltipArrowOptions & TooltipArrowHTMLProps;

export const useTooltipArrow = createHook<
  TooltipArrowOptions,
  TooltipArrowHTMLProps
>({
  name: "TooltipArrow",
  compose: usePopoverArrow,
  keys: TOOLTIP_ARROW_KEYS,

  useOptions({ size = 16, ...options }) {
    return { size, ...options };
  },
});

export const TooltipArrow = createComponent({
  as: "div",
  memo: true,
  useHook: useTooltipArrow,
});
