function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Results } from './Results';
import { ResetIcon, RecentIcon, StarIcon } from './icons';
export function StartScreen(props) {
  if (props.state.status === 'idle' && props.hasSuggestions === false) {
    return React.createElement("div", {
      className: "DocSearch-StartScreen"
    }, React.createElement("p", {
      className: "DocSearch-Help"
    }, "No recent searches"));
  }

  if (props.hasSuggestions === false) {
    return null;
  }

  return React.createElement("div", {
    className: "DocSearch-Dropdown-Container"
  }, React.createElement(Results, _extends({}, props, {
    title: "Recent",
    suggestion: props.state.suggestions[0],
    renderIcon: function renderIcon() {
      return React.createElement("div", {
        className: "DocSearch-Hit-icon"
      }, React.createElement(RecentIcon, null));
    },
    renderAction: function renderAction(_ref) {
      var item = _ref.item,
          runFavoriteTransition = _ref.runFavoriteTransition,
          runDeleteTransition = _ref.runDeleteTransition;
      return React.createElement(React.Fragment, null, React.createElement("div", {
        className: "DocSearch-Hit-action"
      }, React.createElement("button", {
        className: "DocSearch-Hit-action-button",
        title: "Save this search",
        onClick: function onClick(event) {
          event.preventDefault();
          event.stopPropagation();
          runFavoriteTransition(function () {
            props.favoriteSearches.add(item);
            props.recentSearches.remove(item);
            props.refresh();
          });
        }
      }, React.createElement(StarIcon, null))), React.createElement("div", {
        className: "DocSearch-Hit-action"
      }, React.createElement("button", {
        className: "DocSearch-Hit-action-button",
        title: "Remove this search from history",
        onClick: function onClick(event) {
          event.preventDefault();
          event.stopPropagation();
          runDeleteTransition(function () {
            props.recentSearches.remove(item);
            props.refresh();
          });
        }
      }, React.createElement(ResetIcon, null))));
    }
  })), React.createElement(Results, _extends({}, props, {
    title: "Favorites",
    suggestion: props.state.suggestions[1],
    renderIcon: function renderIcon() {
      return React.createElement("div", {
        className: "DocSearch-Hit-icon"
      }, React.createElement(StarIcon, null));
    },
    renderAction: function renderAction(_ref2) {
      var item = _ref2.item,
          runDeleteTransition = _ref2.runDeleteTransition;
      return React.createElement("div", {
        className: "DocSearch-Hit-action"
      }, React.createElement("button", {
        className: "DocSearch-Hit-action-button",
        title: "Remove this search from favorites",
        onClick: function onClick(event) {
          event.preventDefault();
          event.stopPropagation();
          runDeleteTransition(function () {
            props.favoriteSearches.remove(item);
            props.refresh();
          });
        }
      }, React.createElement(ResetIcon, null)));
    }
  })));
}