/**
 * Checks whether `element` is focusable or not.
 *
 * @memberof tabbable
 *
 * @example
 * import { isFocusable } from "reakit-utils";
 *
 * isFocusable(document.querySelector("input")); // true
 * isFocusable(document.querySelector("input[tabindex='-1']")); // true
 * isFocusable(document.querySelector("input[hidden]")); // false
 * isFocusable(document.querySelector("input:disabled")); // false
 */
export declare function isFocusable(element: Element): boolean;
/**
 * Checks whether `element` is tabbable or not.
 *
 * @memberof tabbable
 *
 * @example
 * import { isTabbable } from "reakit-utils";
 *
 * isTabbable(document.querySelector("input")); // true
 * isTabbable(document.querySelector("input[tabindex='-1']")); // false
 * isTabbable(document.querySelector("input[hidden]")); // false
 * isTabbable(document.querySelector("input:disabled")); // false
 */
export declare function isTabbable(element: Element): boolean;
/**
 * Returns all the focusable elements in `container`.
 *
 * @memberof tabbable
 *
 * @param {Element} container
 *
 * @returns {Element[]}
 */
export declare function getAllFocusableIn<T extends Element>(container: T): T[];
/**
 * Returns the first focusable element in `container`.
 *
 * @memberof tabbable
 *
 * @param {Element} container
 *
 * @returns {Element|null}
 */
export declare function getFirstFocusableIn<T extends Element>(container: T): T;
/**
 * Returns all the tabbable elements in `container`, including the container
 * itself.
 *
 * @memberof tabbable
 *
 * @param {Element} container
 * @param fallbackToFocusable If `true`, it'll return focusable elements if there are no tabbable ones.
 *
 * @returns {Element[]}
 */
export declare function getAllTabbableIn<T extends Element>(container: T, fallbackToFocusable?: boolean): T[];
/**
 * Returns the first tabbable element in `container`, including the container
 * itself if it's tabbable.
 *
 * @memberof tabbable
 *
 * @param {Element} container
 * @param fallbackToFocusable If `true`, it'll return the first focusable element if there are no tabbable ones.
 *
 * @returns {Element|null}
 */
export declare function getFirstTabbableIn<T extends Element>(container: T, fallbackToFocusable?: boolean): T | null;
/**
 * Returns the last tabbable element in `container`, including the container
 * itself if it's tabbable.
 *
 * @memberof tabbable
 *
 * @param {Element} container
 * @param fallbackToFocusable If `true`, it'll return the last focusable element if there are no tabbable ones.
 *
 * @returns {Element|null}
 */
export declare function getLastTabbableIn<T extends Element>(container: T, fallbackToFocusable?: boolean): T | null;
/**
 * Returns the next tabbable element in `container`.
 *
 * @memberof tabbable
 *
 * @param {Element} container
 * @param fallbackToFocusable If `true`, it'll return the next focusable element if there are no tabbable ones.
 *
 * @returns {Element|null}
 */
export declare function getNextTabbableIn<T extends Element>(container: T, fallbackToFocusable?: boolean): T | null;
/**
 * Returns the previous tabbable element in `container`.
 *
 * @memberof tabbable
 *
 * @param {Element} container
 * @param fallbackToFocusable If `true`, it'll return the previous focusable element if there are no tabbable ones.
 *
 * @returns {Element|null}
 */
export declare function getPreviousTabbableIn<T extends Element>(container: T, fallbackToFocusable?: boolean): T | null;
/**
 * Returns the closest focusable element.
 *
 * @memberof tabbable
 *
 * @param {Element} container
 *
 * @returns {Element|null}
 */
export declare function getClosestFocusable<T extends Element>(element?: T | null): T | null | undefined;
