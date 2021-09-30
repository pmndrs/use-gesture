/**
 * Similar to `Element.prototype.contains`, but a little bit faster when
 * `element` is the same as `child`.
 *
 * @example
 * import { contains } from "reakit-utils";
 *
 * contains(document.getElementById("parent"), document.getElementById("child"));
 */
export function contains(parent: Element, child: Element): boolean {
  return parent === child || parent.contains(child);
}
