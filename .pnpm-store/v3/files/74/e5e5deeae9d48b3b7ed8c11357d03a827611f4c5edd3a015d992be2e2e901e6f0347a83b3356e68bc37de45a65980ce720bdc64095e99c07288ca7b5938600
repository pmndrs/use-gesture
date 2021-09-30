import * as React from "react";
import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { useForkRef } from "reakit-utils/useForkRef";
import { getDocument } from "reakit-utils/getDocument";
import {
  DisclosureContentOptions,
  DisclosureContentHTMLProps,
  useDisclosureContent,
} from "../Disclosure/DisclosureContent";
import { Portal } from "../Portal/Portal";
import { TooltipStateReturn } from "./TooltipState";
import { TOOLTIP_KEYS } from "./__keys";
import globalState from "./__globalState";

export type TooltipOptions = DisclosureContentOptions &
  Pick<
    Partial<TooltipStateReturn>,
    "unstable_popoverRef" | "unstable_popoverStyles"
  > & {
    /**
     * Whether or not the tooltip should be rendered within `Portal`.
     */
    unstable_portal?: boolean;
  };

export type TooltipHTMLProps = DisclosureContentHTMLProps;

export type TooltipProps = TooltipOptions & TooltipHTMLProps;

function globallyHideTooltipOnEscape(event: KeyboardEvent) {
  if (event.defaultPrevented) return;
  if (event.key === "Escape") {
    globalState.show(null);
  }
}

export const useTooltip = createHook<TooltipOptions, TooltipHTMLProps>({
  name: "Tooltip",
  compose: useDisclosureContent,
  keys: TOOLTIP_KEYS,

  useOptions({ unstable_portal = true, ...options }) {
    return { unstable_portal, ...options };
  },

  useProps(
    options,
    {
      ref: htmlRef,
      style: htmlStyle,
      wrapElement: htmlWrapElement,
      ...htmlProps
    }
  ) {
    React.useEffect(() => {
      const document = getDocument(options.unstable_popoverRef?.current);
      document.addEventListener("keydown", globallyHideTooltipOnEscape);
    }, []);

    const wrapElement = React.useCallback(
      (element: React.ReactNode) => {
        if (options.unstable_portal) {
          element = <Portal>{element}</Portal>;
        }
        if (htmlWrapElement) {
          return htmlWrapElement(element);
        }
        return element;
      },
      [options.unstable_portal, htmlWrapElement]
    );

    return {
      ref: useForkRef(options.unstable_popoverRef, htmlRef),
      role: "tooltip",
      style: {
        ...options.unstable_popoverStyles,
        pointerEvents: "none",
        ...htmlStyle,
      },
      wrapElement,
      ...htmlProps,
    };
  },
});

export const Tooltip = createComponent({
  as: "div",
  memo: true,
  useHook: useTooltip,
});
