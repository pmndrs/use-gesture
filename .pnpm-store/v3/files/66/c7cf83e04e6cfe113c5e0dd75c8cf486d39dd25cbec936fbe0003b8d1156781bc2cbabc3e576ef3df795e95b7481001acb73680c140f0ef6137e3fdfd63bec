import { getDocument } from './getDocument.js';
import { getWindow } from './getWindow.js';

function createKeyboardEvent(element, type, eventInit) {
  if (eventInit === void 0) {
    eventInit = {};
  }

  if (typeof KeyboardEvent === "function") {
    return new KeyboardEvent(type, eventInit);
  } // IE 11 doesn't support Event constructors


  var event = getDocument(element).createEvent("KeyboardEvent");
  event.initKeyboardEvent(type, eventInit.bubbles, eventInit.cancelable, getWindow(element), eventInit.key, eventInit.location, eventInit.ctrlKey, eventInit.altKey, eventInit.shiftKey, eventInit.metaKey);
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


function fireKeyboardEvent(element, type, eventInit) {
  return element.dispatchEvent(createKeyboardEvent(element, type, eventInit));
}

export { fireKeyboardEvent };
