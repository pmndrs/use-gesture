'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var buttonInputTypes = ["button", "color", "file", "image", "reset", "submit"];
/**
 * Checks whether `element` is a native HTML button element.
 *
 * @example
 * import { isButton } from "reakit-utils";
 *
 * isButton(document.querySelector("button")); // true
 * isButton(document.querySelector("input[type='button']")); // true
 * isButton(document.querySelector("div")); // false
 * isButton(document.querySelector("input[type='text']")); // false
 * isButton(document.querySelector("div[role='button']")); // false
 *
 * @returns {boolean}
 */

function isButton(element) {
  if (element.tagName === "BUTTON") return true;

  if (element.tagName === "INPUT") {
    var input = element;
    return buttonInputTypes.indexOf(input.type) !== -1;
  }

  return false;
}

exports.isButton = isButton;
