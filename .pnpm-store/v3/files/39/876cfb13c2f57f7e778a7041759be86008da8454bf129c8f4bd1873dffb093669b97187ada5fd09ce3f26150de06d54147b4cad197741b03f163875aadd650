import * as React from "react";
import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { useForkRef } from "reakit-utils/useForkRef";
import { useIsomorphicEffect } from "reakit-utils/useIsomorphicEffect";
import { useLiveRef } from "reakit-utils/useLiveRef";
import { warning } from "reakit-warning";
import {
  DisclosureOptions,
  DisclosureHTMLProps,
  useDisclosure,
} from "../Disclosure/Disclosure";
import { DialogStateReturn } from "./DialogState";
import { DIALOG_DISCLOSURE_KEYS } from "./__keys";

export type DialogDisclosureOptions = DisclosureOptions &
  Pick<Partial<DialogStateReturn>, "unstable_disclosureRef"> &
  Pick<DialogStateReturn, "toggle">;

export type DialogDisclosureHTMLProps = DisclosureHTMLProps;

export type DialogDisclosureProps = DialogDisclosureOptions &
  DialogDisclosureHTMLProps;

export const useDialogDisclosure = createHook<
  DialogDisclosureOptions,
  DialogDisclosureHTMLProps
>({
  name: "DialogDisclosure",
  compose: useDisclosure,
  keys: DIALOG_DISCLOSURE_KEYS,

  useProps(options, { ref: htmlRef, onClick: htmlOnClick, ...htmlProps }) {
    const ref = React.useRef<HTMLElement>(null);
    const onClickRef = useLiveRef(htmlOnClick);
    const [expanded, setExpanded] = React.useState(false);
    const disclosureRef = options.unstable_disclosureRef;

    // aria-expanded may be used for styling purposes, so we useLayoutEffect
    useIsomorphicEffect(() => {
      const element = ref.current;
      warning(
        !element,
        "Can't determine whether the element is the current disclosure because `ref` wasn't passed to the component",
        "See https://reakit.io/docs/dialog"
      );
      if (disclosureRef && !disclosureRef.current) {
        disclosureRef.current = element;
      }
      const isCurrentDisclosure =
        !disclosureRef?.current || disclosureRef.current === element;
      setExpanded(!!options.visible && isCurrentDisclosure);
    }, [options.visible, disclosureRef]);

    const onClick = React.useCallback(
      (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        onClickRef.current?.(event);
        if (event.defaultPrevented) return;
        if (disclosureRef) {
          disclosureRef.current = event.currentTarget;
        }
      },
      [disclosureRef]
    );

    return {
      ref: useForkRef(ref, htmlRef),
      "aria-haspopup": "dialog",
      "aria-expanded": expanded,
      onClick,
      ...htmlProps,
    };
  },
});

export const DialogDisclosure = createComponent({
  as: "button",
  memo: true,
  useHook: useDialogDisclosure,
});
