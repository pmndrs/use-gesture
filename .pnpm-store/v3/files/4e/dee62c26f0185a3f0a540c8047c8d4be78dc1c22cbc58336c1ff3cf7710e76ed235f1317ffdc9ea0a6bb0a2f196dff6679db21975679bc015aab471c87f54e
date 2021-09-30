import { createAutocomplete } from '..';

function createSuggestion() {
  var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return {
    source: {
      getInputValue: function getInputValue(_ref) {
        var suggestion = _ref.suggestion;
        return suggestion.label;
      },
      getSuggestionUrl: function getSuggestionUrl() {
        return undefined;
      },
      onHighlight: function onHighlight() {},
      onSelect: function onSelect() {},
      getSuggestions: function getSuggestions() {
        return items;
      }
    },
    items: items
  };
}

describe('createAutocomplete', function () {
  test('setHighlightedIndex', function () {
    var onStateChange = jest.fn();

    var _createAutocomplete = createAutocomplete({
      getSources: function getSources() {
        return [];
      },
      onStateChange: onStateChange
    }),
        setHighlightedIndex = _createAutocomplete.setHighlightedIndex;

    setHighlightedIndex(1);
    expect(onStateChange).toHaveBeenCalledTimes(1);
    expect(onStateChange).toHaveBeenCalledWith({
      state: expect.objectContaining({
        highlightedIndex: 1
      })
    });
    setHighlightedIndex(null);
    expect(onStateChange).toHaveBeenCalledTimes(2);
    expect(onStateChange).toHaveBeenCalledWith({
      state: expect.objectContaining({
        highlightedIndex: null
      })
    });
  });
  test('setQuery', function () {
    var onStateChange = jest.fn();

    var _createAutocomplete2 = createAutocomplete({
      getSources: function getSources() {
        return [];
      },
      onStateChange: onStateChange
    }),
        setQuery = _createAutocomplete2.setQuery;

    setQuery('query');
    expect(onStateChange).toHaveBeenCalledTimes(1);
    expect(onStateChange).toHaveBeenCalledWith({
      state: expect.objectContaining({
        query: 'query'
      })
    });
  });
  test('setSuggestions', function () {
    var onStateChange = jest.fn();

    var _createAutocomplete3 = createAutocomplete({
      getSources: function getSources() {
        return [];
      },
      onStateChange: onStateChange
    }),
        setSuggestions = _createAutocomplete3.setSuggestions;

    var suggestions = [createSuggestion()];
    setSuggestions(suggestions);
    expect(onStateChange).toHaveBeenCalledTimes(1);
    expect(onStateChange).toHaveBeenCalledWith({
      state: expect.objectContaining({
        suggestions: suggestions
      })
    });
  });
  test('setIsOpen', function () {
    var onStateChange = jest.fn();

    var _createAutocomplete4 = createAutocomplete({
      getSources: function getSources() {
        return [];
      },
      onStateChange: onStateChange
    }),
        setIsOpen = _createAutocomplete4.setIsOpen;

    setIsOpen(true);
    expect(onStateChange).toHaveBeenCalledTimes(1);
    expect(onStateChange).toHaveBeenCalledWith({
      state: expect.objectContaining({
        isOpen: true
      })
    });
  });
  test('setStatus', function () {
    var onStateChange = jest.fn();

    var _createAutocomplete5 = createAutocomplete({
      getSources: function getSources() {
        return [];
      },
      onStateChange: onStateChange
    }),
        setStatus = _createAutocomplete5.setStatus;

    setStatus('stalled');
    expect(onStateChange).toHaveBeenCalledTimes(1);
    expect(onStateChange).toHaveBeenCalledWith({
      state: expect.objectContaining({
        status: 'stalled'
      })
    });
  });
  test('setContext', function () {
    var onStateChange = jest.fn();

    var _createAutocomplete6 = createAutocomplete({
      getSources: function getSources() {
        return [];
      },
      onStateChange: onStateChange
    }),
        setContext = _createAutocomplete6.setContext;

    setContext({
      nbArticles: 10
    });
    expect(onStateChange).toHaveBeenCalledTimes(1);
    expect(onStateChange).toHaveBeenCalledWith({
      state: expect.objectContaining({
        context: {
          nbArticles: 10
        }
      })
    });
    setContext({
      nbProducts: 30
    });
    expect(onStateChange).toHaveBeenCalledTimes(2);
    expect(onStateChange).toHaveBeenCalledWith({
      state: expect.objectContaining({
        context: {
          nbArticles: 10,
          nbProducts: 30
        }
      })
    });
  });
});