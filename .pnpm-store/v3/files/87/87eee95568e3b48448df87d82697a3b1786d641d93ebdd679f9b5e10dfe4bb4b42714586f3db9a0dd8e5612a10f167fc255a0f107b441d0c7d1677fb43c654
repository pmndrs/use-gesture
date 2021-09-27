const buttonInputTypes = [
  "button",
  "color",
  "file",
  "image",
  "reset",
  "submit",
];

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
export function isButton(
  element: Element
): element is HTMLButtonElement | HTMLInputElement {
  if (element.tagName === "BUTTON") return true;
  if (element.tagName === "INPUT") {
    const input = element as HTMLInputElement;
    return buttonInputTypes.indexOf(input.type) !== -1;
  }
  return false;
}
