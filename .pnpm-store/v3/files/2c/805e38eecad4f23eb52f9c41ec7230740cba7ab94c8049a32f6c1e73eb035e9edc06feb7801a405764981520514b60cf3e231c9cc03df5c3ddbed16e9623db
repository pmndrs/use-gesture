function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export function getAutocompleteSetters(_ref) {
  var store = _ref.store;

  var setHighlightedIndex = function setHighlightedIndex(value) {
    store.send('setHighlightedIndex', value);
  };

  var setQuery = function setQuery(value) {
    store.send('setQuery', value);
  };

  var setSuggestions = function setSuggestions(rawValue) {
    var baseItemId = 0;
    var value = rawValue.map(function (suggestion) {
      return _objectSpread(_objectSpread({}, suggestion), {}, {
        items: suggestion.items.map(function (item) {
          return _objectSpread(_objectSpread({}, item), {}, {
            __autocomplete_id: baseItemId++
          });
        })
      });
    });
    store.send('setSuggestions', value);
  };

  var setIsOpen = function setIsOpen(value) {
    store.send('setIsOpen', value);
  };

  var setStatus = function setStatus(value) {
    store.send('setStatus', value);
  };

  var setContext = function setContext(value) {
    store.send('setContext', value);
  };

  return {
    setHighlightedIndex: setHighlightedIndex,
    setQuery: setQuery,
    setSuggestions: setSuggestions,
    setIsOpen: setIsOpen,
    setStatus: setStatus,
    setContext: setContext
  };
}