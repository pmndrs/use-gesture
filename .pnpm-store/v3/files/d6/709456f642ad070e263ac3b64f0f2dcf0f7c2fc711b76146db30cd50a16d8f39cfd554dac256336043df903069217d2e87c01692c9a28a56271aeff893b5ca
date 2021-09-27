function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Results } from './Results';
import { SourceIcon, SelectIcon } from './icons';
export function ResultsScreen(props) {
  return React.createElement("div", {
    className: "DocSearch-Dropdown-Container"
  }, props.state.suggestions.map(function (suggestion, index) {
    if (suggestion.items.length === 0) {
      return null;
    }

    var title = suggestion.items[0].hierarchy.lvl0;
    return React.createElement(Results, _extends({}, props, {
      key: index,
      title: title,
      suggestion: suggestion,
      renderIcon: function renderIcon(_ref) {
        var _suggestion$items;

        var item = _ref.item,
            index = _ref.index;
        return React.createElement(React.Fragment, null, item.__docsearch_parent && React.createElement("svg", {
          className: "DocSearch-Hit-Tree",
          viewBox: "0 0 24 54"
        }, React.createElement("g", {
          stroke: "currentColor",
          fill: "none",
          fillRule: "evenodd",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }, item.__docsearch_parent !== ((_suggestion$items = suggestion.items[index + 1]) === null || _suggestion$items === void 0 ? void 0 : _suggestion$items.__docsearch_parent) ? React.createElement("path", {
          d: "M8 6v21M20 27H8.3"
        }) : React.createElement("path", {
          d: "M8 6v42M20 27H8.3"
        }))), React.createElement("div", {
          className: "DocSearch-Hit-icon"
        }, React.createElement(SourceIcon, {
          type: item.type
        })));
      },
      renderAction: function renderAction() {
        return React.createElement("div", {
          className: "DocSearch-Hit-action"
        }, React.createElement(SelectIcon, null));
      }
    }));
  }));
}