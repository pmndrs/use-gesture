import { createEvent } from "./createEvent";

/**
 * Creates and dispatches `Event` in a way that also works on IE 11.
 *
 * @example
 * import { fireEvent } from "reakit-utils";
 *
 * fireEvent(document.getElementById("id"), "blur", {
 *   bubbles: true,
 *   cancelable: true,
 * });
 */
export function fireEvent(
  element: HTMLElement,
  type: string,
  eventInit: EventInit
) {
  return element.dispatchEvent(createEvent(element, type, eventInit));
}
