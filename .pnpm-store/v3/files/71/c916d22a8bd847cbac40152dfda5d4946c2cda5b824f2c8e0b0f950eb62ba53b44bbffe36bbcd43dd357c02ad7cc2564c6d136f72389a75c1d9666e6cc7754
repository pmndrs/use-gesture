'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

var defaultPrefix = "id";
function generateRandomString(prefix) {
  if (prefix === void 0) {
    prefix = defaultPrefix;
  }

  return "" + (prefix ? prefix + "-" : "") + Math.random().toString(32).substr(2, 6);
}

var unstable_IdContext = /*#__PURE__*/React.createContext(generateRandomString);
function unstable_IdProvider(_ref) {
  var children = _ref.children,
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === void 0 ? defaultPrefix : _ref$prefix;
  var count = React.useRef(0);
  var generateId = React.useCallback(function (localPrefix) {
    if (localPrefix === void 0) {
      localPrefix = prefix;
    }

    return "" + (localPrefix ? localPrefix + "-" : "") + ++count.current;
  }, [prefix]);
  return /*#__PURE__*/React.createElement(unstable_IdContext.Provider, {
    value: generateId
  }, children);
}

exports.unstable_IdContext = unstable_IdContext;
exports.unstable_IdProvider = unstable_IdProvider;
