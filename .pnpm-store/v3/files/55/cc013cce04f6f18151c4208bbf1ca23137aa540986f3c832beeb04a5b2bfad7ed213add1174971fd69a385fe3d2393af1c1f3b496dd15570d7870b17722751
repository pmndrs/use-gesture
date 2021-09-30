function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React from 'react';
import { createAutocomplete } from '@francoischalifour/autocomplete-core';
import { getAlgoliaHits } from '@francoischalifour/autocomplete-preset-algolia';
import { MAX_QUERY_SIZE } from './constants';
import { groupBy, noop } from './utils';
import { createStoredSearches } from './stored-searches';
import { useSearchClient } from './useSearchClient';
import { useTrapFocus } from './useTrapFocus';
import { useTouchEvents } from './useTouchEvents';
import { Hit } from './Hit';
import { SearchBox } from './SearchBox';
import { ScreenState } from './ScreenState';
import { Footer } from './Footer';
export function DocSearchModal(_ref) {
  var _ref$appId = _ref.appId,
      appId = _ref$appId === void 0 ? 'BH4D9OD16A' : _ref$appId,
      apiKey = _ref.apiKey,
      indexName = _ref.indexName,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === void 0 ? 'Search docs' : _ref$placeholder,
      searchParameters = _ref.searchParameters,
      _ref$onClose = _ref.onClose,
      onClose = _ref$onClose === void 0 ? noop : _ref$onClose,
      _ref$transformItems = _ref.transformItems,
      transformItems = _ref$transformItems === void 0 ? function (x) {
    return x;
  } : _ref$transformItems,
      _ref$hitComponent = _ref.hitComponent,
      hitComponent = _ref$hitComponent === void 0 ? Hit : _ref$hitComponent,
      navigator = _ref.navigator;

  var _React$useState = React.useState({
    query: '',
    suggestions: []
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      state = _React$useState2[0],
      setState = _React$useState2[1];

  var containerRef = React.useRef(null);
  var searchBoxRef = React.useRef(null);
  var dropdownRef = React.useRef(null);
  var inputRef = React.useRef(null);
  var snipetLength = React.useRef(10);
  var initialQuery = React.useRef(typeof window !== 'undefined' ? window.getSelection().toString().slice(0, MAX_QUERY_SIZE) : '').current;
  var scrollY = React.useRef(0);
  var searchClient = useSearchClient(appId, apiKey);
  var favoriteSearches = React.useRef(createStoredSearches({
    key: "__DOCSEARCH_FAVORITE_SEARCHES__".concat(indexName),
    limit: 10
  })).current;
  var recentSearches = React.useRef(createStoredSearches({
    key: "__DOCSEARCH_RECENT_SEARCHES__".concat(indexName),
    // We display 7 recent searches and there's no favorites, but only
    // 4 when there are favorites.
    limit: favoriteSearches.getAll().length === 0 ? 7 : 4
  })).current;
  var saveRecentSearch = React.useCallback(function saveRecentSearch(item) {
    // We don't store `content` record, but their parent if available.
    var search = item.type === 'content' ? item.__docsearch_parent : item; // We save the recent search only if it's not favorited.

    if (search && favoriteSearches.getAll().findIndex(function (x) {
      return x.objectID === search.objectID;
    }) === -1) {
      recentSearches.add(search);
    }
  }, [favoriteSearches, recentSearches]);
  var autocomplete = React.useMemo(function () {
    return createAutocomplete({
      id: 'docsearch',
      defaultHighlightedIndex: 0,
      autoFocus: true,
      placeholder: placeholder,
      openOnFocus: true,
      initialState: {
        query: initialQuery,
        context: {
          searchSuggestions: []
        }
      },
      navigator: navigator,
      onStateChange: function onStateChange(_ref2) {
        var state = _ref2.state;
        setState(state);
      },
      // @ts-ignore Temporarily ignore bad typing in autocomplete-core.
      getSources: function getSources(_ref3) {
        var query = _ref3.query,
            state = _ref3.state,
            setContext = _ref3.setContext,
            setStatus = _ref3.setStatus;

        if (!query) {
          return [{
            onSelect: function onSelect(_ref4) {
              var suggestion = _ref4.suggestion;
              saveRecentSearch(suggestion);
              onClose();
            },
            getSuggestionUrl: function getSuggestionUrl(_ref5) {
              var suggestion = _ref5.suggestion;
              return suggestion.url;
            },
            getSuggestions: function getSuggestions() {
              return recentSearches.getAll();
            }
          }, {
            onSelect: function onSelect(_ref6) {
              var suggestion = _ref6.suggestion;
              saveRecentSearch(suggestion);
              onClose();
            },
            getSuggestionUrl: function getSuggestionUrl(_ref7) {
              var suggestion = _ref7.suggestion;
              return suggestion.url;
            },
            getSuggestions: function getSuggestions() {
              return favoriteSearches.getAll();
            }
          }];
        }

        return getAlgoliaHits({
          searchClient: searchClient,
          queries: [{
            indexName: indexName,
            query: query,
            params: _objectSpread({
              attributesToRetrieve: ['hierarchy.lvl0', 'hierarchy.lvl1', 'hierarchy.lvl2', 'hierarchy.lvl3', 'hierarchy.lvl4', 'hierarchy.lvl5', 'hierarchy.lvl6', 'content', 'type', 'url'],
              attributesToSnippet: ["hierarchy.lvl1:".concat(snipetLength.current), "hierarchy.lvl2:".concat(snipetLength.current), "hierarchy.lvl3:".concat(snipetLength.current), "hierarchy.lvl4:".concat(snipetLength.current), "hierarchy.lvl5:".concat(snipetLength.current), "hierarchy.lvl6:".concat(snipetLength.current), "content:".concat(snipetLength.current)],
              snippetEllipsisText: '…',
              highlightPreTag: '<mark>',
              highlightPostTag: '</mark>',
              hitsPerPage: 20,
              distinct: 4
            }, searchParameters)
          }]
        }).catch(function (error) {
          // The Algolia `RetryError` happens when all the servers have
          // failed, meaning that there's no chance the response comes
          // back. This is the right time to display an error.
          // See https://github.com/algolia/algoliasearch-client-javascript/blob/2ffddf59bc765cd1b664ee0346b28f00229d6e12/packages/transporter/src/errors/createRetryError.ts#L5
          if (error.name === 'RetryError') {
            setStatus('error');
          }

          throw error;
        }).then(function (hits) {
          var sources = groupBy(hits, function (hit) {
            return hit.hierarchy.lvl0;
          }); // We store the `lvl0`s to display them as search suggestions
          // in the “no results“ screen.

          if (state.context.searchSuggestions.length < Object.keys(sources).length) {
            setContext({
              searchSuggestions: Object.keys(sources)
            });
          }

          return Object.values(sources).map(function (items) {
            return {
              onSelect: function onSelect(_ref8) {
                var suggestion = _ref8.suggestion;
                saveRecentSearch(suggestion);
                onClose();
              },
              getSuggestionUrl: function getSuggestionUrl(_ref9) {
                var suggestion = _ref9.suggestion;
                return suggestion.url;
              },
              getSuggestions: function getSuggestions() {
                return Object.values(groupBy(items, function (item) {
                  return item.hierarchy.lvl1;
                })).map(transformItems).map(function (hits) {
                  return hits.map(function (item) {
                    return _objectSpread({}, item, {
                      // eslint-disable-next-line @typescript-eslint/camelcase
                      __docsearch_parent: item.type !== 'lvl1' && hits.find(function (siblingItem) {
                        return siblingItem.type === 'lvl1' && siblingItem.hierarchy.lvl1 === item.hierarchy.lvl1;
                      })
                    });
                  });
                }).flat();
              }
            };
          });
        });
      }
    });
  }, [indexName, searchParameters, searchClient, onClose, recentSearches, favoriteSearches, saveRecentSearch, initialQuery, placeholder, navigator, transformItems]);
  var getEnvironmentProps = autocomplete.getEnvironmentProps,
      getRootProps = autocomplete.getRootProps,
      refresh = autocomplete.refresh;
  useTouchEvents({
    getEnvironmentProps: getEnvironmentProps,
    dropdownElement: dropdownRef.current,
    searchBoxElement: searchBoxRef.current,
    inputElement: inputRef.current
  });
  useTrapFocus({
    container: containerRef.current
  });
  React.useEffect(function () {
    document.body.classList.add('DocSearch--active');
    scrollY.current = window.scrollY;
    return function () {
      document.body.classList.remove('DocSearch--active');
      window.scrollTop = scrollY.current;
    };
  }, []);
  React.useEffect(function () {
    var isMobileMediaQuery = window.matchMedia('(max-width: 750px)');

    if (isMobileMediaQuery.matches) {
      snipetLength.current = 5;
    }
  }, []);
  React.useEffect(function () {
    if (dropdownRef.current) {
      dropdownRef.current.scrollTop = 0;
    }
  }, [state.query]); // We don't focus the input when there's an initial query (i.e. Selection
  // Search) because users rather want to see the results directly, without the
  // keyboard appearing.
  // We therefore need to refresh the autocomplete instance to load all the
  // results, which is usually triggered on focus.

  React.useEffect(function () {
    if (initialQuery.length > 0) {
      refresh();
    }
  }, [initialQuery, refresh]);
  return React.createElement("div", _extends({
    ref: containerRef
  }, getRootProps({}), {
    className: ['DocSearch-Container', state.status === 'stalled' && 'DocSearch-Container--Stalled', state.status === 'error' && 'DocSearch-Container--Errored'].filter(Boolean).join(' '),
    onClick: function onClick(event) {
      if (event.target === event.currentTarget) {
        onClose();
      }
    }
  }), React.createElement("div", {
    className: "DocSearch-Modal"
  }, React.createElement("header", {
    className: "DocSearch-SearchBar",
    ref: searchBoxRef
  }, React.createElement(SearchBox, _extends({}, autocomplete, {
    state: state,
    autoFocus: initialQuery.length === 0,
    onClose: onClose,
    inputRef: inputRef
  }))), React.createElement("div", {
    className: "DocSearch-Dropdown",
    ref: dropdownRef
  }, React.createElement(ScreenState, _extends({}, autocomplete, {
    state: state,
    hitComponent: hitComponent,
    recentSearches: recentSearches,
    favoriteSearches: favoriteSearches,
    onItemClick: function onItemClick(item) {
      saveRecentSearch(item);
      onClose();
    },
    inputRef: inputRef
  }))), React.createElement("footer", {
    className: "DocSearch-Footer"
  }, React.createElement(Footer, null))));
}