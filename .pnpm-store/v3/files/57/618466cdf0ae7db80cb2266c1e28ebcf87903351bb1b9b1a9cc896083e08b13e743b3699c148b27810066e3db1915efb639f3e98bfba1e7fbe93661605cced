function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var lastStalledId = null;
export function onInput(_ref) {
  var query = _ref.query,
      store = _ref.store,
      props = _ref.props,
      setHighlightedIndex = _ref.setHighlightedIndex,
      setQuery = _ref.setQuery,
      setSuggestions = _ref.setSuggestions,
      setIsOpen = _ref.setIsOpen,
      setStatus = _ref.setStatus,
      setContext = _ref.setContext,
      _ref$nextState = _ref.nextState,
      nextState = _ref$nextState === void 0 ? {} : _ref$nextState;

  if (props.onInput) {
    return Promise.resolve(props.onInput({
      query: query,
      state: store.getState(),
      setHighlightedIndex: setHighlightedIndex,
      setQuery: setQuery,
      setSuggestions: setSuggestions,
      setIsOpen: setIsOpen,
      setStatus: setStatus,
      setContext: setContext
    }));
  }

  if (lastStalledId) {
    clearTimeout(lastStalledId);
  }

  setHighlightedIndex(props.defaultHighlightedIndex);
  setQuery(query);

  if (query.length === 0 && props.openOnFocus === false) {
    var _nextState$isOpen;

    setStatus('idle');
    setSuggestions(store.getState().suggestions.map(function (suggestion) {
      return _objectSpread(_objectSpread({}, suggestion), {}, {
        items: []
      });
    }));
    setIsOpen((_nextState$isOpen = nextState.isOpen) !== null && _nextState$isOpen !== void 0 ? _nextState$isOpen : props.shouldDropdownShow({
      state: store.getState()
    }));
    return Promise.resolve();
  }

  setStatus('loading');
  lastStalledId = props.environment.setTimeout(function () {
    setStatus('stalled');
  }, props.stallThreshold);
  return props.getSources({
    query: query,
    state: store.getState(),
    setHighlightedIndex: setHighlightedIndex,
    setQuery: setQuery,
    setSuggestions: setSuggestions,
    setIsOpen: setIsOpen,
    setStatus: setStatus,
    setContext: setContext
  }).then(function (sources) {
    setStatus('loading'); // @TODO: convert `Promise.all` to fetching strategy.

    return Promise.all(sources.map(function (source) {
      return Promise.resolve(source.getSuggestions({
        query: query,
        state: store.getState(),
        setHighlightedIndex: setHighlightedIndex,
        setQuery: setQuery,
        setSuggestions: setSuggestions,
        setIsOpen: setIsOpen,
        setStatus: setStatus,
        setContext: setContext
      })).then(function (items) {
        return {
          source: source,
          items: items
        };
      });
    })).then(function (suggestions) {
      var _nextState$isOpen2;

      setStatus('idle');
      setSuggestions(suggestions);
      setIsOpen((_nextState$isOpen2 = nextState.isOpen) !== null && _nextState$isOpen2 !== void 0 ? _nextState$isOpen2 : query.length === 0 && props.openOnFocus || props.shouldDropdownShow({
        state: store.getState()
      }));
    }).catch(function (error) {
      setStatus('error');
      throw error;
    }).finally(function () {
      if (lastStalledId) {
        clearTimeout(lastStalledId);
      }
    });
  });
}