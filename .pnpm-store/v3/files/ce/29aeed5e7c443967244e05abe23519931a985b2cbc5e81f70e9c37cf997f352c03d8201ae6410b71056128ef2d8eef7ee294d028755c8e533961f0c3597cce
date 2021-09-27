import { createEvent } from "./createEvent";

function createFocusEvent(
  element: HTMLElement,
  type: string,
  eventInit: FocusEventInit = {}
): Event {
  if (typeof FocusEvent === "function") {
    return new FocusEvent(type, eventInit);
  }
  return createEvent(element, type, eventInit);
}

/**
 * Creates and dispatches a blur event in a way that also works on IE 11.
 *
 * @example
 * import { fireBlurEvent } from "reakit-utils";
 *
 * fireBlurEvent(document.getElementById("id"));
 */
export function fireBlurEvent(
  element: HTMLElement,
  eventInit?: FocusEventInit
) {
  const event = createFocusEvent(element, "blur", eventInit);
  const defaultAllowed = element.dispatchEvent(event);
  const bubbleInit = { ...eventInit, bubbles: true };
  element.dispatchEvent(createFocusEvent(element, "focusout", bubbleInit));
  return defaultAllowed;
}
