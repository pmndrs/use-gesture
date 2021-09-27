import { createContext, useRef, useCallback, createElement } from 'react';

var defaultPrefix = "id";
function generateRandomString(prefix) {
  if (prefix === void 0) {
    prefix = defaultPrefix;
  }

  return "" + (prefix ? prefix + "-" : "") + Math.random().toString(32).substr(2, 6);
}

var unstable_IdContext = /*#__PURE__*/createContext(generateRandomString);
function unstable_IdProvider(_ref) {
  var children = _ref.children,
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === void 0 ? defaultPrefix : _ref$prefix;
  var count = useRef(0);
  var generateId = useCallback(function (localPrefix) {
    if (localPrefix === void 0) {
      localPrefix = prefix;
    }

    return "" + (localPrefix ? localPrefix + "-" : "") + ++count.current;
  }, [prefix]);
  return /*#__PURE__*/createElement(unstable_IdContext.Provider, {
    value: generateId
  }, children);
}

export { unstable_IdContext, unstable_IdProvider };
