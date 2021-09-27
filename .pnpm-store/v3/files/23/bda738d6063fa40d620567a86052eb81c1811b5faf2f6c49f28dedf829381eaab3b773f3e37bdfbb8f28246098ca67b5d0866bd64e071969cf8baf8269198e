import { createStore } from './createStore';
import { getAutocompleteSetters } from './getAutocompleteSetters';
import { getDefaultProps } from './getDefaultProps';
import { getPropGetters } from './getPropGetters';
import { onInput } from './onInput';
import { stateReducer } from './stateReducer';
export function createAutocomplete(options) {
  var props = getDefaultProps(options);
  var store = createStore(stateReducer, props);

  var _getAutocompleteSette = getAutocompleteSetters({
    store: store
  }),
      setHighlightedIndex = _getAutocompleteSette.setHighlightedIndex,
      setQuery = _getAutocompleteSette.setQuery,
      setSuggestions = _getAutocompleteSette.setSuggestions,
      setIsOpen = _getAutocompleteSette.setIsOpen,
      setStatus = _getAutocompleteSette.setStatus,
      setContext = _getAutocompleteSette.setContext;

  var _getPropGetters = getPropGetters({
    store: store,
    props: props,
    setHighlightedIndex: setHighlightedIndex,
    setQuery: setQuery,
    setSuggestions: setSuggestions,
    setIsOpen: setIsOpen,
    setStatus: setStatus,
    setContext: setContext
  }),
      getEnvironmentProps = _getPropGetters.getEnvironmentProps,
      getRootProps = _getPropGetters.getRootProps,
      getFormProps = _getPropGetters.getFormProps,
      getLabelProps = _getPropGetters.getLabelProps,
      getInputProps = _getPropGetters.getInputProps,
      getDropdownProps = _getPropGetters.getDropdownProps,
      getMenuProps = _getPropGetters.getMenuProps,
      getItemProps = _getPropGetters.getItemProps;

  function refresh() {
    return onInput({
      query: store.getState().query,
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

  return {
    setHighlightedIndex: setHighlightedIndex,
    setQuery: setQuery,
    setSuggestions: setSuggestions,
    setIsOpen: setIsOpen,
    setStatus: setStatus,
    setContext: setContext,
    getEnvironmentProps: getEnvironmentProps,
    getRootProps: getRootProps,
    getFormProps: getFormProps,
    getInputProps: getInputProps,
    getLabelProps: getLabelProps,
    getDropdownProps: getDropdownProps,
    getMenuProps: getMenuProps,
    getItemProps: getItemProps,
    refresh: refresh
  };
}