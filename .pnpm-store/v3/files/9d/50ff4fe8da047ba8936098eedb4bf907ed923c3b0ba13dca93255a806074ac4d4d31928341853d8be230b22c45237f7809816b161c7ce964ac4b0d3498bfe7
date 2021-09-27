import * as React from "react";
import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { useLiveRef } from "reakit-utils/useLiveRef";
import { useButton, ButtonOptions, ButtonHTMLProps } from "../Button/Button";
import { DisclosureStateReturn } from "./DisclosureState";
import { DISCLOSURE_KEYS } from "./__keys";

export type DisclosureOptions = ButtonOptions &
  Pick<Partial<DisclosureStateReturn>, "visible"> &
  Pick<DisclosureStateReturn, "toggle" | "baseId">;

export type DisclosureHTMLProps = ButtonHTMLProps;

export type DisclosureProps = DisclosureOptions & DisclosureHTMLProps;

export const useDisclosure = createHook<DisclosureOptions, DisclosureHTMLProps>(
  {
    name: "Disclosure",
    compose: useButton,
    keys: DISCLOSURE_KEYS,

    useProps(
      options,
      { onClick: htmlOnClick, "aria-controls": ariaControls, ...htmlProps }
    ) {
      const onClickRef = useLiveRef(htmlOnClick);

      const controls = ariaControls
        ? `${ariaControls} ${options.baseId}`
        : options.baseId;

      const onClick = React.useCallback(
        (event: React.MouseEvent) => {
          onClickRef.current?.(event);
          if (event.defaultPrevented) return;
          options.toggle?.();
        },
        [options.toggle]
      );

      return {
        "aria-expanded": !!options.visible,
        "aria-controls": controls,
        onClick,
        ...htmlProps,
      };
    },
  }
);

export const Disclosure = createComponent({
  as: "button",
  memo: true,
  useHook: useDisclosure,
});
