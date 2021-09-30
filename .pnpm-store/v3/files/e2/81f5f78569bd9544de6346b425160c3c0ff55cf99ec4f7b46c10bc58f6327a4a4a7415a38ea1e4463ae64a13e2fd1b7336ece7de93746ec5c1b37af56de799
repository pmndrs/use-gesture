import 'reakit-utils/flatten';
import { warning } from './warning.js';
import { useEffect } from 'react';
import { isObject } from 'reakit-utils/isObject';

function isRefObject(ref) {
  return isObject(ref) && "current" in ref;
}
/**
 * Logs `messages` to the console using `console.warn` based on a `condition`.
 * This should be used inside components.
 */


function useWarning(condition) {
  for (var _len = arguments.length, messages = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    messages[_key - 1] = arguments[_key];
  }

  if (process.env.NODE_ENV !== "production") {
    useEffect(function () {
      process.env.NODE_ENV !== "production" ? warning.apply(void 0, [condition].concat(messages.map(function (message) {
        return isRefObject(message) ? message.current : message;
      }))) : void 0;
    }, [condition]);
  }
}

export { useWarning };
