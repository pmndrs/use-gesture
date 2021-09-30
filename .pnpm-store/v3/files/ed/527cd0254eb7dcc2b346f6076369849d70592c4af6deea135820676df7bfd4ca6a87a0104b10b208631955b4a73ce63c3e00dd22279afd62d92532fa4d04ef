import { matches } from "./matches";

export function closest<K extends keyof HTMLElementTagNameMap>(
  element: Element,
  selectors: K
): HTMLElementTagNameMap[K];

export function closest<K extends keyof SVGElementTagNameMap>(
  element: Element,
  selectors: K
): SVGElementTagNameMap[K];

export function closest<T extends Element = Element>(
  element: Element,
  selectors: string
): T | null;

/**
 * Ponyfill for `Element.prototype.closest`
 *
 * @example
 * import { closest } from "reakit-utils";
 *
 * closest(document.getElementById("id"), "div");
 * // same as
 * document.getElementById("id").closest("div");
 */
export function closest(element: Element, selectors: string) {
  if ("closest" in element) return element.closest(selectors);
  do {
    if (matches(element, selectors)) return element;
    element = (element.parentElement || element.parentNode) as any;
  } while (element !== null && element.nodeType === 1);
  return null;
}
