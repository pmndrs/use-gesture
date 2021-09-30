import * as React from "react";
import { getDocument } from "reakit-utils/getDocument";
import { DialogOptions } from "../Dialog";
import { useEventListenerOutside } from "./useEventListenerOutside";

function useMouseDownRef(
  dialogRef: React.RefObject<HTMLElement>,
  options: DialogOptions
) {
  const mouseDownRef = React.useRef<EventTarget | null>();

  React.useEffect(() => {
    if (!options.visible) return undefined;
    if (!options.hideOnClickOutside) return undefined;
    const document = getDocument(dialogRef.current);
    const onMouseDown = (event: MouseEvent) => {
      mouseDownRef.current = event.target;
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [options.visible, options.hideOnClickOutside, dialogRef]);

  return mouseDownRef;
}

export function useHideOnClickOutside(
  dialogRef: React.RefObject<HTMLElement>,
  disclosureRef: React.RefObject<HTMLElement>,
  nestedDialogs: Array<React.RefObject<HTMLElement>>,
  options: DialogOptions
) {
  const mouseDownRef = useMouseDownRef(dialogRef, options);

  useEventListenerOutside(
    dialogRef,
    disclosureRef,
    nestedDialogs,
    "click",
    (event) => {
      // Make sure the element that has been clicked is the same that last
      // triggered the mousedown event. This prevents the dialog from closing
      // by dragging the cursor (for example, selecting some text inside the
      // dialog and releasing the mouse outside of it).
      if (mouseDownRef.current === event.target) {
        options.hide?.();
      }
    },
    options.visible && options.hideOnClickOutside
  );

  useEventListenerOutside(
    dialogRef,
    disclosureRef,
    nestedDialogs,
    "focusin",
    (event) => {
      const document = getDocument(dialogRef.current);
      // Fix for https://github.com/reakit/reakit/issues/619
      // On IE11, calling element.blur() triggers the focus event on
      // document.body, so we make sure to ignore it as well.
      if (event.target !== document && event.target !== document.body) {
        options.hide?.();
      }
    },
    options.visible && options.hideOnClickOutside
  );
}
