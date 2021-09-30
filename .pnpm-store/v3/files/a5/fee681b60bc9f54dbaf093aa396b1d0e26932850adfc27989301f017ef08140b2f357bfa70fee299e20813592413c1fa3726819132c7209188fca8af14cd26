import * as React from "react";
import { getDocument } from "reakit-utils/getDocument";
import { isEmpty } from "reakit-utils/isEmpty";
import { getActiveElement } from "reakit-utils/getActiveElement";
import { DialogOptions } from "../Dialog";

/**
 * When the focused child gets removed from the DOM, we make sure to move focus
 * to the dialog.
 */
export function useFocusOnChildUnmount(
  dialogRef: React.RefObject<HTMLElement>,
  options: DialogOptions
) {
  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!options.visible || !dialog) return undefined;

    const observer = new MutationObserver((mutations) => {
      const [{ target }] = mutations;
      // If target is not this dialog, then this observer was triggered by a
      // nested dialog, so we just ignore it here and let the nested dialog
      // handle it there.
      if (target !== dialog) return;
      const document = getDocument(dialog);
      const activeElement = getActiveElement(dialog);
      // We can check if the current focused element is the document body. On
      // IE 11, it's an empty object when the current document is in a frame or
      // iframe.
      if (activeElement === document.body || isEmpty(activeElement)) {
        dialog.focus();
      }
    });

    observer.observe(dialog, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
    };
  }, [options.visible, dialogRef]);
}
