'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var getDocument = require('./getDocument.js');

/**
 * Creates an `Event` in a way that also works on IE 11.
 *
 * @example
 * import { createEvent } from "reakit-utils";
 *
 * const el = document.getElementById("id");
 * el.dispatchEvent(createEvent(el, "blur", { bubbles: false }));
 */

function createEvent(element, type, eventInit) {
  if (typeof Event === "function") {
    return new Event(type, eventInit);
  } // IE 11 doesn't support Event constructors


  var event = getDocument.getDocument(element).createEvent("Event");
  event.initEvent(type, eventInit === null || eventInit === void 0 ? void 0 : eventInit.bubbles, eventInit === null || eventInit === void 0 ? void 0 : eventInit.cancelable);
  return event;
}

exports.createEvent = createEvent;
