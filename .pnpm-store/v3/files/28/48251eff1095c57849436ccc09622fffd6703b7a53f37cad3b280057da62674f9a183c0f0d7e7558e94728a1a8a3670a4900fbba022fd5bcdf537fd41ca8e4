import * as React from "react";
import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { useForkRef } from "reakit-utils/useForkRef";
import { useLiveRef } from "reakit-utils/useLiveRef";
import { RoleOptions, RoleHTMLProps, useRole } from "../Role/Role";
import { TooltipStateReturn } from "./TooltipState";
import { TOOLTIP_REFERENCE_KEYS } from "./__keys";

export type TooltipReferenceOptions = RoleOptions &
  Pick<Partial<TooltipStateReturn>, "unstable_referenceRef" | "baseId"> &
  Pick<TooltipStateReturn, "show" | "hide">;

export type TooltipReferenceHTMLProps = RoleHTMLProps;

export type TooltipReferenceProps = TooltipReferenceOptions &
  TooltipReferenceHTMLProps;

export const useTooltipReference = createHook<
  TooltipReferenceOptions,
  TooltipReferenceHTMLProps
>({
  name: "TooltipReference",
  compose: useRole,
  keys: TOOLTIP_REFERENCE_KEYS,

  useProps(
    options,
    {
      ref: htmlRef,
      onFocus: htmlOnFocus,
      onBlur: htmlOnBlur,
      onMouseEnter: htmlOnMouseEnter,
      onMouseLeave: htmlOnMouseLeave,
      ...htmlProps
    }
  ) {
    const onFocusRef = useLiveRef(htmlOnFocus);
    const onBlurRef = useLiveRef(htmlOnBlur);
    const onMouseEnterRef = useLiveRef(htmlOnMouseEnter);
    const onMouseLeaveRef = useLiveRef(htmlOnMouseLeave);

    const onFocus = React.useCallback(
      (event: React.FocusEvent) => {
        onFocusRef.current?.(event);
        if (event.defaultPrevented) return;
        options.show?.();
      },
      [options.show]
    );

    const onBlur = React.useCallback(
      (event: React.FocusEvent) => {
        onBlurRef.current?.(event);
        if (event.defaultPrevented) return;
        options.hide?.();
      },
      [options.hide]
    );

    const onMouseEnter = React.useCallback(
      (event: React.MouseEvent) => {
        onMouseEnterRef.current?.(event);
        if (event.defaultPrevented) return;
        options.show?.();
      },
      [options.show]
    );

    const onMouseLeave = React.useCallback(
      (event: React.MouseEvent) => {
        onMouseLeaveRef.current?.(event);
        if (event.defaultPrevented) return;
        options.hide?.();
      },
      [options.hide]
    );

    return {
      ref: useForkRef(options.unstable_referenceRef, htmlRef),
      tabIndex: 0,
      onFocus,
      onBlur,
      onMouseEnter,
      onMouseLeave,
      "aria-describedby": options.baseId,
      ...htmlProps,
    };
  },
});

export const TooltipReference = createComponent({
  as: "div",
  useHook: useTooltipReference,
});
