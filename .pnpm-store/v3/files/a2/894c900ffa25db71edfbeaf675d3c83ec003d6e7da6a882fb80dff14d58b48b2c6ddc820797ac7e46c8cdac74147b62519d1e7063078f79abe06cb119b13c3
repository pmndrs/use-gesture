function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { StartScreen } from './StartScreen';
import { ResultsScreen } from './ResultsScreen';
import { NoResultsScreen } from './NoResultsScreen';
import { ErrorScreen } from './ErrorScreen';
export var ScreenState = React.memo(function (props) {
  if (props.state.status === 'error') {
    return React.createElement(ErrorScreen, null);
  }

  var hasSuggestions = props.state.suggestions.some(function (suggestion) {
    return suggestion.items.length > 0;
  });

  if (!props.state.query) {
    return React.createElement(StartScreen, _extends({}, props, {
      hasSuggestions: hasSuggestions
    }));
  }

  if (hasSuggestions === false) {
    return React.createElement(NoResultsScreen, props);
  }

  return React.createElement(ResultsScreen, props);
}, function areEqual(_prevProps, nextProps) {
  // We don't update the screen when Autocomplete is loading or stalled to
  // avoid UI flashes:
  //  - Empty screen → Results screen
  //  - NoResults screen → NoResults screen with another query
  return nextProps.state.status === 'loading' || nextProps.state.status === 'stalled';
});