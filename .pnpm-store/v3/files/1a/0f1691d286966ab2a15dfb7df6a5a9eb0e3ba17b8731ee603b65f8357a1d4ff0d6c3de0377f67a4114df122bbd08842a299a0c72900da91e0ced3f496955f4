import { hasFocus } from "./hasFocus";

type EnsureFocusOptions = FocusOptions & {
  isActive?: typeof hasFocus;
};

/**
 * Ensures `element` will receive focus if it's not already.
 *
 * @example
 * import { ensureFocus } from "reakit-utils";
 *
 * ensureFocus(document.activeElement); // does nothing
 *
 * const element = document.querySelector("input");
 *
 * ensureFocus(element); // focuses element
 * ensureFocus(element, { preventScroll: true }); // focuses element preventing scroll jump
 *
 * function isActive(el) {
 *   return el.dataset.active === "true";
 * }
 *
 * ensureFocus(document.querySelector("[data-active='true']"), { isActive }); // does nothing
 *
 * @returns {number} `requestAnimationFrame` call ID so it can be passed to `cancelAnimationFrame` if needed.
 */
export function ensureFocus(
  element: HTMLElement,
  { preventScroll, isActive = hasFocus }: EnsureFocusOptions = {}
) {
  if (isActive(element)) return -1;

  element.focus({ preventScroll });

  if (isActive(element)) return -1;

  return requestAnimationFrame(() => {
    element.focus({ preventScroll });
  });
}
