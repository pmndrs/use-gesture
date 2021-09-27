'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('reakit-utils/flatten');
var warning = require('./warning.js');
var React = require('react');
var isObject = require('reakit-utils/isObject');

function isRefObject(ref) {
  return isObject.isObject(ref) && "current" in ref;
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
    React.useEffect(function () {
      process.env.NODE_ENV !== "production" ? warning.warning.apply(void 0, [condition].concat(messages.map(function (message) {
        return isRefObject(message) ? message.current : message;
      }))) : void 0;
    }, [condition]);
  }
}

exports.useWarning = useWarning;
