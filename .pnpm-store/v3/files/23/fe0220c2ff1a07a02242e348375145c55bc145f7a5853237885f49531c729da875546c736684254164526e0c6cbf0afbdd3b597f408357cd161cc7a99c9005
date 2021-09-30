import { getWindow } from "./getWindow";

// Check if we can use the DOM. Useful for SSR purposes
function checkIsBrowser() {
  const _window = getWindow();

  return Boolean(
    typeof _window !== "undefined" &&
      _window.document &&
      _window.document.createElement
  );
}

/**
 * It's `true` if it is running in a browser environment or `false` if it is not (SSR).
 *
 * @example
 * import { canUseDOM } from "reakit-utils";
 *
 * const title = canUseDOM ? document.title : "";
 */
export const canUseDOM = checkIsBrowser();
