import { getCompletion } from './getCompletion';
import { onInput } from './onInput';
import { getHighlightedItem } from './utils';
export function onKeyDown(_ref) {
  var event = _ref.event,
      store = _ref.store,
      props = _ref.props,
      setHighlightedIndex = _ref.setHighlightedIndex,
      setQuery = _ref.setQuery,
      setSuggestions = _ref.setSuggestions,
      setIsOpen = _ref.setIsOpen,
      setStatus = _ref.setStatus,
      setContext = _ref.setContext;

  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    // Default browser behavior changes the caret placement on ArrowUp and
    // Arrow down.
    event.preventDefault();
    store.send(event.key, {
      shiftKey: event.shiftKey
    });
    var nodeItem = props.environment.document.getElementById("".concat(props.id, "-item-").concat(store.getState().highlightedIndex));
    nodeItem === null || nodeItem === void 0 ? void 0 : nodeItem.scrollIntoView(false);
    var highlightedItem = getHighlightedItem({
      state: store.getState()
    });

    if (store.getState().highlightedIndex !== null && highlightedItem) {
      var item = highlightedItem.item,
          itemValue = highlightedItem.itemValue,
          itemUrl = highlightedItem.itemUrl,
          source = highlightedItem.source;
      source.onHighlight({
        suggestion: item,
        suggestionValue: itemValue,
        suggestionUrl: itemUrl,
        source: source,
        state: store.getState(),
        setHighlightedIndex: setHighlightedIndex,
        setQuery: setQuery,
        setSuggestions: setSuggestions,
        setIsOpen: setIsOpen,
        setStatus: setStatus,
        setContext: setContext,
        event: event
      });
    }
  } else if ((event.key === 'Tab' || // When the user hits the right arrow and is at the end of the input
  // query, we validate the completion.
  event.key === 'ArrowRight' && event.target.selectionStart === store.getState().query.length) && props.enableCompletion && store.getState().highlightedIndex !== null) {
    event.preventDefault();
    var query = getCompletion({
      state: store.getState(),
      props: props
    });

    if (query) {
      onInput({
        query: query,
        store: store,
        props: props,
        setHighlightedIndex: setHighlightedIndex,
        setQuery: setQuery,
        setSuggestions: setSuggestions,
        setIsOpen: setIsOpen,
        setStatus: setStatus,
        setContext: setContext
      });
    }
  } else if (event.key === 'Escape') {
    // This prevents the default browser behavior on `input[type="search"]`
    // to remove the query right away because we first want to close the
    // dropdown.
    event.preventDefault();
    store.send(event.key, null);
  } else if (event.key === 'Enter') {
    // No item is selected, so we let the browser handle the native `onSubmit`
    // form event.
    if (store.getState().highlightedIndex === null || store.getState().suggestions.every(function (suggestion) {
      return suggestion.items.length === 0;
    })) {
      return;
    } // This prevents the `onSubmit` event to be sent because an item is
    // highlighted.


    event.preventDefault();

    var _ref2 = getHighlightedItem({
      state: store.getState()
    }),
        _item = _ref2.item,
        _itemValue = _ref2.itemValue,
        _itemUrl = _ref2.itemUrl,
        _source = _ref2.source;

    if (event.metaKey || event.ctrlKey) {
      if (_itemUrl !== undefined) {
        props.navigator.navigateNewTab({
          suggestionUrl: _itemUrl,
          suggestion: _item,
          state: store.getState()
        });
      }
    } else if (event.shiftKey) {
      if (_itemUrl !== undefined) {
        props.navigator.navigateNewWindow({
          suggestionUrl: _itemUrl,
          suggestion: _item,
          state: store.getState()
        });
      }
    } else if (event.altKey) {// Keep native browser behavior
    } else {
      onInput({
        query: _itemValue,
        store: store,
        props: props,
        setHighlightedIndex: setHighlightedIndex,
        setQuery: setQuery,
        setSuggestions: setSuggestions,
        setIsOpen: setIsOpen,
        setStatus: setStatus,
        setContext: setContext,
        nextState: {
          isOpen: false
        }
      }).then(function () {
        _source.onSelect({
          suggestion: _item,
          suggestionValue: _itemValue,
          suggestionUrl: _itemUrl,
          source: _source,
          state: store.getState(),
          setHighlightedIndex: setHighlightedIndex,
          setQuery: setQuery,
          setSuggestions: setSuggestions,
          setIsOpen: setIsOpen,
          setStatus: setStatus,
          setContext: setContext,
          event: event
        });
      });

      if (_itemUrl !== undefined) {
        props.navigator.navigate({
          suggestionUrl: _itemUrl,
          suggestion: _item,
          state: store.getState()
        });
      }
    }
  }
}