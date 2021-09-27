import * as React from "react";
import { useUpdateEffect } from "reakit-utils/useUpdateEffect";
import { warning } from "reakit-warning";
import { isTabbable } from "reakit-utils/tabbable";
import { getActiveElement } from "reakit-utils/getActiveElement";
import { contains } from "reakit-utils/contains";
import { ensureFocus } from "reakit-utils/ensureFocus";
import { getDocument } from "reakit-utils/getDocument";
import { DialogOptions } from "../Dialog";

function hidByFocusingAnotherElement(dialogRef: React.RefObject<HTMLElement>) {
  const dialog = dialogRef.current;
  if (!dialog) return false;

  const activeElement = getActiveElement(dialog);

  if (!activeElement) return false;
  if (contains(dialog, activeElement)) return false;
  if (isTabbable(activeElement)) return true;
  if (activeElement.getAttribute("data-dialog") === "true") return true;

  return false;
}

export function useFocusOnHide(
  dialogRef: React.RefObject<HTMLElement>,
  disclosureRef: React.RefObject<HTMLElement>,
  options: DialogOptions
) {
  const shouldFocus = options.unstable_autoFocusOnHide && !options.visible;
  const animating = !!(options.animated && options.animating);

  useUpdateEffect(() => {
    if (!shouldFocus) return;
    if (animating) return;
    // Hide was triggered by a click/focus on a tabbable element outside
    // the dialog or on another dialog. We won't change focus then.
    if (hidByFocusingAnotherElement(dialogRef)) {
      return;
    }
    const finalFocusEl =
      options.unstable_finalFocusRef?.current || disclosureRef.current;

    if (finalFocusEl) {
      if (finalFocusEl.id) {
        const document = getDocument(finalFocusEl);
        const compositeElement = document.querySelector<HTMLElement>(
          `[aria-activedescendant='${finalFocusEl.id}']`
        );
        if (compositeElement) {
          ensureFocus(compositeElement);
          return;
        }
      }
      ensureFocus(finalFocusEl);
      return;
    }
    warning(
      true,
      "Can't return focus after closing dialog. Either render a disclosure component or provide a `unstable_finalFocusRef` prop.",
      "See https://reakit.io/docs/dialog",
      dialogRef.current
    );
  }, [shouldFocus, animating, dialogRef, disclosureRef]);
}
