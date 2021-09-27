import * as React from "react";
import { warning } from "reakit-warning";
import { getFirstTabbableIn, getLastTabbableIn } from "reakit-utils/tabbable";
import { getDocument } from "reakit-utils/getDocument";
import { DialogOptions } from "../Dialog";
import { usePortalRef } from "./usePortalRef";

function removeFromDOM(element: Element) {
  if (element.parentNode == null) return;
  element.parentNode.removeChild(element);
}

const focusTrapClassName = "__reakit-focus-trap";

export function isFocusTrap(element: Element) {
  return element.classList?.contains(focusTrapClassName);
}

export function useFocusTrap(
  dialogRef: React.RefObject<HTMLElement>,
  visibleModals: Array<React.RefObject<HTMLElement>>,
  options: DialogOptions
) {
  const portalRef = usePortalRef(dialogRef, options);
  const shouldTrap = options.visible && options.modal;
  const beforeElement = React.useRef<HTMLElement | null>(null);
  const afterElement = React.useRef<HTMLElement | null>(null);

  // Create before and after elements
  // https://github.com/w3c/aria-practices/issues/545
  React.useEffect(() => {
    if (!shouldTrap) return undefined;
    const portal = portalRef.current;

    if (!portal) {
      warning(
        true,
        "Can't trap focus within modal dialog because either `ref` wasn't passed to component or the component wasn't rendered within a portal",
        "See https://reakit.io/docs/dialog"
      );
      return undefined;
    }

    if (!beforeElement.current) {
      const document = getDocument(portal);
      beforeElement.current = document.createElement("div");
      beforeElement.current.className = focusTrapClassName;
      beforeElement.current.tabIndex = 0;
      beforeElement.current.style.position = "fixed";
      beforeElement.current.setAttribute("aria-hidden", "true");
    }

    if (!afterElement.current) {
      afterElement.current = beforeElement.current.cloneNode() as HTMLElement;
    }

    portal.insertAdjacentElement("beforebegin", beforeElement.current);
    portal.insertAdjacentElement("afterend", afterElement.current);

    return () => {
      if (beforeElement.current) removeFromDOM(beforeElement.current);
      if (afterElement.current) removeFromDOM(afterElement.current);
    };
  }, [portalRef, shouldTrap]);

  // Focus trap
  React.useEffect(() => {
    const before = beforeElement.current;
    const after = afterElement.current;
    if (!shouldTrap || !before || !after) return undefined;

    const handleFocus = (event: FocusEvent) => {
      const dialog = dialogRef.current;
      if (!dialog || visibleModals.length) return;

      event.preventDefault();

      const isAfter = event.target === after;

      const tabbable = isAfter
        ? getFirstTabbableIn(dialog)
        : getLastTabbableIn(dialog);

      if (tabbable) {
        tabbable.focus();
      } else {
        // fallback to dialog
        dialog.focus();
      }
    };

    before.addEventListener("focus", handleFocus);
    after.addEventListener("focus", handleFocus);
    return () => {
      before.removeEventListener("focus", handleFocus);
      after.removeEventListener("focus", handleFocus);
    };
  }, [dialogRef, visibleModals, shouldTrap]);
}
