function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export var noop = function noop() {};
var autocompleteId = 0;
export function generateAutocompleteId() {
  return "autocomplete-".concat(autocompleteId++);
}
export function getItemsCount(state) {
  if (state.suggestions.length === 0) {
    return 0;
  }

  return state.suggestions.reduce(function (sum, suggestion) {
    return sum + suggestion.items.length;
  }, 0);
}
export function isSpecialClick(event) {
  var isMiddleClick = event.button === 1;
  return isMiddleClick || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
}

function normalizeSource(source) {
  return _objectSpread({
    getInputValue: function getInputValue(_ref) {
      var state = _ref.state;
      return state.query;
    },
    getSuggestionUrl: function getSuggestionUrl() {
      return undefined;
    },
    onSelect: function onSelect(_ref2) {
      var setIsOpen = _ref2.setIsOpen;
      setIsOpen(false);
    },
    onHighlight: noop
  }, source);
}

export function normalizeGetSources(getSources) {
  return function (options) {
    return Promise.resolve(getSources(options)).then(function (sources) {
      return Promise.all(sources.filter(Boolean).map(function (source) {
        return Promise.resolve(normalizeSource(source));
      }));
    });
  };
}
export function getNextHighlightedIndex(moveAmount, baseIndex, itemCount, defaultHighlightedIndex) {
  // We allow circular keyboard navigation from the base index.
  // The base index can either be `null` (nothing is highlighted) or `0`
  // (the first item is highlighted).
  // The base index is allowed to get assigned `null` only if
  // `props.defaultHighlightedIndex` is `null`. This pattern allows to "stop"
  // by the actual query before navigating to other suggestions as seen on
  // Google or Amazon.
  if (baseIndex === null && moveAmount < 0) {
    return itemCount - 1;
  }

  if (defaultHighlightedIndex !== null && baseIndex === 0 && moveAmount < 0) {
    return itemCount - 1;
  }

  var numericIndex = (baseIndex === null ? -1 : baseIndex) + moveAmount;

  if (numericIndex <= -1 || numericIndex >= itemCount) {
    return defaultHighlightedIndex === null ? null : 0;
  }

  return numericIndex;
} // We don't have access to the autocomplete source when we call `onKeyDown`
// or `onClick` because those are native browser events.
// However, we can get the source from the suggestion index.

function getSuggestionFromHighlightedIndex(_ref3) {
  var state = _ref3.state;
  // Given 3 sources with respectively 1, 2 and 3 suggestions: [1, 2, 3]
  // We want to get the accumulated counts:
  // [1, 1 + 2, 1 + 2 + 3] = [1, 3, 3 + 3] = [1, 3, 6]
  var accumulatedSuggestionsCount = state.suggestions.map(function (suggestion) {
    return suggestion.items.length;
  }).reduce(function (acc, suggestionCount, index) {
    var previousValue = acc[index - 1] || 0;
    var nextValue = previousValue + suggestionCount;
    acc.push(nextValue);
    return acc;
  }, []); // Based on the accumulated counts, we can infer the index of the suggestion.

  var suggestionIndex = accumulatedSuggestionsCount.reduce(function (acc, current) {
    if (current <= state.highlightedIndex) {
      return acc + 1;
    }

    return acc;
  }, 0);
  return state.suggestions[suggestionIndex];
}
/**
 * Gets the highlighted index relative to a suggestion object (not the absolute
 * highlighted index).
 *
 * Example:
 *  [['a', 'b'], ['c', 'd', 'e'], ['f']]
 *                      ↑
 *         (absolute: 3, relative: 1)
 * @param param0
 */


function getRelativeHighlightedIndex(_ref4) {
  var state = _ref4.state,
      suggestion = _ref4.suggestion;
  var isOffsetFound = false;
  var counter = 0;
  var previousItemsOffset = 0;

  while (isOffsetFound === false) {
    var currentSuggestion = state.suggestions[counter];

    if (currentSuggestion === suggestion) {
      isOffsetFound = true;
      break;
    }

    previousItemsOffset += currentSuggestion.items.length;
    counter++;
  }

  return state.highlightedIndex - previousItemsOffset;
}

export function getHighlightedItem(_ref5) {
  var state = _ref5.state;
  var suggestion = getSuggestionFromHighlightedIndex({
    state: state
  });

  if (!suggestion) {
    return null;
  }

  var item = suggestion.items[getRelativeHighlightedIndex({
    state: state,
    suggestion: suggestion
  })];
  var source = suggestion.source;
  var itemValue = source.getInputValue({
    suggestion: item,
    state: state
  });
  var itemUrl = source.getSuggestionUrl({
    suggestion: item,
    state: state
  });
  return {
    item: item,
    itemValue: itemValue,
    itemUrl: itemUrl,
    source: source
  };
}
export function isOrContainsNode(parent, child) {
  return parent === child || parent.contains && parent.contains(child);
}