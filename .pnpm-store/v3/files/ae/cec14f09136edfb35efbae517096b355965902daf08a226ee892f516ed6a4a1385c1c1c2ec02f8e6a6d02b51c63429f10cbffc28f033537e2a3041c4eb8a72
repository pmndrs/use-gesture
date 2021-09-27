import * as React from "react";
import { useLiveRef } from "reakit-utils/useLiveRef";
import { warning } from "reakit-warning";
import { getDocument } from "reakit-utils/getDocument";
import { contains } from "reakit-utils/contains";
import { isFocusTrap } from "./useFocusTrap";

function dialogContains(target: Element) {
  return (dialogRef: React.RefObject<HTMLElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return false;
    if (contains(dialog, target)) return true;
    const document = getDocument(dialog);
    const backdrop = document.querySelector(`[data-dialog-ref="${dialog.id}"]`);
    if (backdrop) {
      return contains(backdrop, target);
    }
    return false;
  };
}

function isDisclosure(target: Element, disclosure: HTMLElement) {
  return contains(disclosure, target);
}

function isInDocument(target: Element) {
  const document = getDocument(target);
  if (target.tagName === "HTML") {
    return true;
  }
  return contains(document.body, target);
}

export function useEventListenerOutside(
  containerRef: React.RefObject<HTMLElement>,
  disclosureRef: React.RefObject<HTMLElement>,
  nestedDialogs: Array<React.RefObject<HTMLElement>>,
  eventType: string,
  listener?: (e: Event) => void,
  shouldListen?: boolean,
  capture?: boolean
) {
  const listenerRef = useLiveRef(listener);

  React.useEffect(() => {
    if (!shouldListen) return undefined;

    const onEvent = (event: Event) => {
      if (!listenerRef.current) return;
      const container = containerRef.current;
      const disclosure = disclosureRef.current;
      const target = event.target as Element;
      if (!container) {
        warning(
          true,
          "Can't detect events outside dialog because `ref` wasn't passed to component.",
          "See https://reakit.io/docs/dialog"
        );
        return;
      }
      // When an element is unmounted right after it receives focus, the focus
      // event is triggered after that, when the element isn't part of the
      // current document anymore. So we ignore it.
      if (!isInDocument(target)) return;
      // Event inside dialog
      if (contains(container, target)) return;
      // Event on disclosure
      if (disclosure && isDisclosure(target, disclosure)) return;
      // Event inside a nested dialog or focus trap
      if (isFocusTrap(target) || nestedDialogs.some(dialogContains(target))) {
        return;
      }
      listenerRef.current(event);
    };

    const document = getDocument(containerRef.current);
    document.addEventListener(eventType, onEvent, capture);
    return () => document.removeEventListener(eventType, onEvent, capture);
  }, [
    containerRef,
    disclosureRef,
    nestedDialogs,
    eventType,
    shouldListen,
    listenerRef,
  ]);
}
