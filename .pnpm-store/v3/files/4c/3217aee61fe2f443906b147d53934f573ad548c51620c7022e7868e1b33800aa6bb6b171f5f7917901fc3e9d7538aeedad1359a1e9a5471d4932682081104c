import { getDocument } from "./getDocument";

/**
 * Creates an `Event` in a way that also works on IE 11.
 *
 * @example
 * import { createEvent } from "reakit-utils";
 *
 * const el = document.getElementById("id");
 * el.dispatchEvent(createEvent(el, "blur", { bubbles: false }));
 */
export function createEvent(
  element: HTMLElement,
  type: string,
  eventInit?: EventInit
): Event {
  if (typeof Event === "function") {
    return new Event(type, eventInit);
  }
  // IE 11 doesn't support Event constructors
  const event = getDocument(element).createEvent("Event");
  event.initEvent(type, eventInit?.bubbles, eventInit?.cancelable);
  return event;
}
