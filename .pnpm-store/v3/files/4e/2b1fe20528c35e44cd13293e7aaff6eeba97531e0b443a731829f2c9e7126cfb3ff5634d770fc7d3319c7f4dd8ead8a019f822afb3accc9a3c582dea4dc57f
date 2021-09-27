function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import React from 'react';
import { NoResultsIcon } from './icons';
export function NoResultsScreen(props) {
  var searchSuggestions = props.state.context.searchSuggestions;
  return React.createElement("div", {
    className: "DocSearch-NoResults"
  }, React.createElement("div", {
    className: "DocSearch-Screen-Icon"
  }, React.createElement(NoResultsIcon, null)), React.createElement("p", {
    className: "DocSearch-Title"
  }, "No results for \"", React.createElement("strong", null, props.state.query), "\""), searchSuggestions && searchSuggestions.length > 0 && React.createElement("div", {
    className: "DocSearch-NoResults-Prefill-List"
  }, React.createElement("p", {
    className: "DocSearch-Help"
  }, "Try searching for:"), React.createElement("ul", null, searchSuggestions.slice(0, 3).reduce(function (acc, search) {
    return [].concat(_toConsumableArray(acc), [React.createElement("li", {
      key: search
    }, React.createElement("button", {
      className: "DocSearch-Prefill",
      key: search,
      onClick: function onClick() {
        props.setQuery(search.toLowerCase() + ' ');
        props.refresh();
        props.inputRef.current.focus();
      }
    }, search))]);
  }, []))), React.createElement("p", {
    className: "DocSearch-Help"
  }, "Believe this query should return results?", ' ', React.createElement("a", {
    href: "https://github.com/algolia/docsearch-configs/issues/new?template=Missing_results.md",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Let us know"), "."));
}