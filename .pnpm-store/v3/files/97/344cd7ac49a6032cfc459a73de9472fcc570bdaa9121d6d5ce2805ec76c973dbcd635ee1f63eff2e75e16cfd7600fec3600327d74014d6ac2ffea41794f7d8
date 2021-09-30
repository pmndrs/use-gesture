import { getDocument } from "./getDocument";
import { getWindow } from "./getWindow";

function createKeyboardEvent(
  element: HTMLElement,
  type: string,
  eventInit: KeyboardEventInit = {}
): KeyboardEvent {
  if (typeof KeyboardEvent === "function") {
    return new KeyboardEvent(type, eventInit);
  }
  // IE 11 doesn't support Event constructors
  const event = getDocument(element).createEvent("KeyboardEvent");
  (event as any).initKeyboardEvent(
    type,
    eventInit.bubbles,
    eventInit.cancelable,
    getWindow(element),
    eventInit.key,
    eventInit.location,
    eventInit.ctrlKey,
    eventInit.altKey,
    eventInit.shiftKey,
    eventInit.metaKey
  );
  return event;
}

/**
 * Creates and dispatches `KeyboardEvent` in a way that also works on IE 11.
 *
 * @example
 * import { fireKeyboardEvent } from "reakit-utils";
 *
 * fireKeyboardEvent(document.getElementById("id"), "keydown", {
 *   key: "ArrowDown",
 *   shiftKey: true,
 * });
 */
export function fireKeyboardEvent(
  element: HTMLElement,
  type: string,
  eventInit: KeyboardEventInit
) {
  return element.dispatchEvent(createKeyboardEvent(element, type, eventInit));
}
