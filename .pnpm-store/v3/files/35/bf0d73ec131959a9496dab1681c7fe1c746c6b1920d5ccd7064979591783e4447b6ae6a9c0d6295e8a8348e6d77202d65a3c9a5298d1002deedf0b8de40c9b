import { canUseDOM } from "./canUseDOM";

/**
 * Checks if a given string exists in the user agent string.
 */
export function isUA(string: string) {
  if (!canUseDOM) return false;
  return window.navigator.userAgent.indexOf(string) !== -1;
}
