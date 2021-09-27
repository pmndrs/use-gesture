import { getHighlightedItem } from './utils';
export function getCompletion(_ref) {
  var state = _ref.state,
      props = _ref.props;

  if (props.enableCompletion === false || state.isOpen === false || state.highlightedIndex === null || state.status === 'stalled') {
    return null;
  }

  var _ref2 = getHighlightedItem({
    state: state
  }),
      itemValue = _ref2.itemValue; // The completion should appear only if the _first_ characters of the query
  // match with the suggestion.


  if (state.query.length > 0 && itemValue.toLocaleLowerCase().indexOf(state.query.toLocaleLowerCase()) === 0) {
    // If the query typed has a different case than the suggestion, we want
    // to show the completion matching the case of the query. This makes both
    // strings overlap correctly.
    // Example:
    //  - query: 'Gui'
    //  - suggestion: 'guitar'
    //  => completion: 'Guitar'
    var completion = state.query + itemValue.slice(state.query.length);

    if (completion === state.query) {
      return null;
    }

    return completion;
  }

  return null;
}