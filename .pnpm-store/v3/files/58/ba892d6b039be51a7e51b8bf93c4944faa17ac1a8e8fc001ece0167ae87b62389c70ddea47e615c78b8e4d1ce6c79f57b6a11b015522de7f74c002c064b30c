import { flatten } from "reakit-utils/flatten";

/**
 * Logs `messages` to the console using `console.warn` based on a `condition`.
 *
 * @example
 * import { warning } from "reakit-warning";
 *
 * warning(true, "a", "b"); // console.warn("a", "\n", "b")
 * warning(false, "a", "b"); // does nothing
 */
export function warning(condition: boolean, ...messages: any[]) {
  if (process.env.NODE_ENV !== "production") {
    if (!condition) return;

    const warns = flatten(messages.map((message) => [message, "\n"]));

    // eslint-disable-next-line no-console
    console.warn(...warns.slice(0, -1));

    // Throwing an error and catching it immediately to improve debugging
    // A consumer can use 'pause on caught exceptions'
    // https://github.com/facebook/react/issues/4216
    try {
      throw Error(warns.join(""));
    } catch (x) {
      // do nothing
    }
  }
}
