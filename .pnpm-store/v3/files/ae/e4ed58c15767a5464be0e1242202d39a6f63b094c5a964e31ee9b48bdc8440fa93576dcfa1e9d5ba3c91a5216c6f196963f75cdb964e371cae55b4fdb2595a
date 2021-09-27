import * as React from "react";
import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { useForkRef } from "reakit-utils/useForkRef";
import { RoleOptions, RoleHTMLProps, useRole } from "../Role/Role";
import { PopoverStateReturn } from "./PopoverState";
import { POPOVER_ARROW_KEYS } from "./__keys";

export type PopoverArrowOptions = RoleOptions &
  Pick<
    Partial<PopoverStateReturn>,
    "unstable_arrowRef" | "unstable_arrowStyles"
  > &
  Pick<PopoverStateReturn, "placement"> & {
    /** Arrow's size */
    size?: number | string;
  };

export type PopoverArrowHTMLProps = RoleHTMLProps;

export type PopoverArrowProps = PopoverArrowOptions & PopoverArrowHTMLProps;

export const usePopoverArrow = createHook<
  PopoverArrowOptions,
  PopoverArrowHTMLProps
>({
  name: "PopoverArrow",
  compose: useRole,
  keys: POPOVER_ARROW_KEYS,

  useOptions({ size = 30, ...options }) {
    return { size, ...options };
  },

  useProps(options, { ref: htmlRef, style: htmlStyle, ...htmlProps }) {
    const [placement] = options.placement.split("-");
    const transformMap: Record<string, string> = {
      top: "rotateZ(180deg)",
      right: "rotateZ(-90deg)",
      bottom: "rotateZ(360deg)",
      left: "rotateZ(90deg)",
    };
    const { unstable_arrowStyles: arrowStyles } = options;
    const transform = transformMap[placement];

    const children = React.useMemo(
      () => (
        <svg viewBox="0 0 30 30" style={{ transform }}>
          <path
            className="stroke"
            d="M23.7,27.1L17,19.9C16.5,19.3,15.8,19,15,19s-1.6,0.3-2.1,0.9l-6.6,7.2C5.3,28.1,3.4,29,2,29h26
        C26.7,29,24.6,28.1,23.7,27.1z"
          />
          <path
            className="fill"
            d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z"
          />
        </svg>
      ),
      [transform]
    );

    return {
      ref: useForkRef(options.unstable_arrowRef, htmlRef),
      style: {
        ...arrowStyles,
        fontSize: options.size,
        width: "1em",
        height: "1em",
        pointerEvents: "none",
        [placement]: "100%",
        ...htmlStyle,
      },
      children,
      ...htmlProps,
    };
  },
});

export const PopoverArrow = createComponent({
  as: "div",
  memo: true,
  useHook: usePopoverArrow,
});
