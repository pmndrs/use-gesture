import './getDocument.js';
import { createEvent } from './createEvent.js';

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

function fireEvent(element, type, eventInit) {
  return element.dispatchEvent(createEvent(element, type, eventInit));
}

export { fireEvent };
