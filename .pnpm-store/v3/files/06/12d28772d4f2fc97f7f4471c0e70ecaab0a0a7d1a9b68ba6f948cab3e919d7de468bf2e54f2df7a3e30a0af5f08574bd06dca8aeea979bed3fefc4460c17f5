import { flatten } from 'reakit-utils/flatten';

/**
 * Logs `messages` to the console using `console.warn` based on a `condition`.
 *
 * @example
 * import { warning } from "reakit-warning";
 *
 * warning(true, "a", "b"); // console.warn("a", "\n", "b")
 * warning(false, "a", "b"); // does nothing
 */

function warning(condition) {
  if (process.env.NODE_ENV !== "production") {
    var _console;

    if (!condition) return;

    for (var _len = arguments.length, messages = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      messages[_key - 1] = arguments[_key];
    }

    var warns = flatten(messages.map(function (message) {
      return [message, "\n"];
    })); // eslint-disable-next-line no-console

    (_console = console).warn.apply(_console, warns.slice(0, -1)); // Throwing an error and catching it immediately to improve debugging
    // A consumer can use 'pause on caught exceptions'
    // https://github.com/facebook/react/issues/4216


    try {
      throw Error(warns.join(""));
    } catch (x) {// do nothing
    }
  }
}

export { warning };
