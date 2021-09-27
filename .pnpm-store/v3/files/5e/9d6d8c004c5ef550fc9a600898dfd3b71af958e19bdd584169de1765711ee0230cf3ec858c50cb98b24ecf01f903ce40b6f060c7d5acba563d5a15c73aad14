(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom'], factory) :
  (global = global || self, factory(global['@docsearch/react'] = {}, global.React, global.ReactDOM));
}(this, (function (exports, React, reactDom) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function SearchIcon() {
    return React__default.createElement("svg", {
      width: "20",
      height: "20",
      className: "DocSearch-Search-Icon",
      viewBox: "0 0 20 20"
    }, React__default.createElement("path", {
      d: "M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z",
      stroke: "currentColor",
      fill: "none",
      fillRule: "evenodd",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }));
  }

  var ACTION_KEY_DEFAULT = 'Ctrl';
  var ACTION_KEY_APPLE = '⌘';

  function isAppleDevice() {
    if (typeof navigator === 'undefined') {
      return ACTION_KEY_DEFAULT;
    }

    return /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
  }

  function DocSearchButton(props) {
    var _useState = React.useState(function () {
      return isAppleDevice() ? ACTION_KEY_APPLE : ACTION_KEY_DEFAULT;
    }),
        _useState2 = _slicedToArray(_useState, 2),
        key = _useState2[0],
        setKey = _useState2[1];

    React.useEffect(function () {
      if (isAppleDevice()) {
        setKey(ACTION_KEY_APPLE);
      }
    }, []);
    return React__default.createElement("button", _extends({
      type: "button",
      className: "DocSearch-SearchButton"
    }, props), React__default.createElement(SearchIcon, null), React__default.createElement("span", {
      className: "DocSearch-SearchButton-Placeholder"
    }, "Search"), React__default.createElement("span", {
      className: "DocSearch-SearchButton-Key"
    }, key), React__default.createElement("span", {
      className: "DocSearch-SearchButton-Key"
    }, "K"));
  }

  function ownKeys$1(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys$1(Object(source), true).forEach(function (key) {
          _defineProperty$1(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys$1(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _defineProperty$1(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var noop = function noop() {};
  var autocompleteId = 0;
  function generateAutocompleteId() {
    return "autocomplete-".concat(autocompleteId++);
  }
  function getItemsCount(state) {
    if (state.suggestions.length === 0) {
      return 0;
    }

    return state.suggestions.reduce(function (sum, suggestion) {
      return sum + suggestion.items.length;
    }, 0);
  }
  function isSpecialClick(event) {
    var isMiddleClick = event.button === 1;
    return isMiddleClick || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
  }

  function normalizeSource(source) {
    return _objectSpread({
      getInputValue: function getInputValue(_ref) {
        var state = _ref.state;
        return state.query;
      },
      getSuggestionUrl: function getSuggestionUrl() {
        return undefined;
      },
      onSelect: function onSelect(_ref2) {
        var setIsOpen = _ref2.setIsOpen;
        setIsOpen(false);
      },
      onHighlight: noop
    }, source);
  }

  function normalizeGetSources(getSources) {
    return function (options) {
      return Promise.resolve(getSources(options)).then(function (sources) {
        return Promise.all(sources.filter(Boolean).map(function (source) {
          return Promise.resolve(normalizeSource(source));
        }));
      });
    };
  }
  function getNextHighlightedIndex(moveAmount, baseIndex, itemCount, defaultHighlightedIndex) {
    // We allow circular keyboard navigation from the base index.
    // The base index can either be `null` (nothing is highlighted) or `0`
    // (the first item is highlighted).
    // The base index is allowed to get assigned `null` only if
    // `props.defaultHighlightedIndex` is `null`. This pattern allows to "stop"
    // by the actual query before navigating to other suggestions as seen on
    // Google or Amazon.
    if (baseIndex === null && moveAmount < 0) {
      return itemCount - 1;
    }

    if (defaultHighlightedIndex !== null && baseIndex === 0 && moveAmount < 0) {
      return itemCount - 1;
    }

    var numericIndex = (baseIndex === null ? -1 : baseIndex) + moveAmount;

    if (numericIndex <= -1 || numericIndex >= itemCount) {
      return defaultHighlightedIndex === null ? null : 0;
    }

    return numericIndex;
  } // We don't have access to the autocomplete source when we call `onKeyDown`
  // or `onClick` because those are native browser events.
  // However, we can get the source from the suggestion index.

  function getSuggestionFromHighlightedIndex(_ref3) {
    var state = _ref3.state; // Given 3 sources with respectively 1, 2 and 3 suggestions: [1, 2, 3]
    // We want to get the accumulated counts:
    // [1, 1 + 2, 1 + 2 + 3] = [1, 3, 3 + 3] = [1, 3, 6]

    var accumulatedSuggestionsCount = state.suggestions.map(function (suggestion) {
      return suggestion.items.length;
    }).reduce(function (acc, suggestionCount, index) {
      var previousValue = acc[index - 1] || 0;
      var nextValue = previousValue + suggestionCount;
      acc.push(nextValue);
      return acc;
    }, []); // Based on the accumulated counts, we can infer the index of the suggestion.

    var suggestionIndex = accumulatedSuggestionsCount.reduce(function (acc, current) {
      if (current <= state.highlightedIndex) {
        return acc + 1;
      }

      return acc;
    }, 0);
    return state.suggestions[suggestionIndex];
  }
  /**
   * Gets the highlighted index relative to a suggestion object (not the absolute
   * highlighted index).
   *
   * Example:
   *  [['a', 'b'], ['c', 'd', 'e'], ['f']]
   *                      ↑
   *         (absolute: 3, relative: 1)
   * @param param0
   */


  function getRelativeHighlightedIndex(_ref4) {
    var state = _ref4.state,
        suggestion = _ref4.suggestion;
    var isOffsetFound = false;
    var counter = 0;
    var previousItemsOffset = 0;

    while (isOffsetFound === false) {
      var currentSuggestion = state.suggestions[counter];

      if (currentSuggestion === suggestion) {
        isOffsetFound = true;
        break;
      }

      previousItemsOffset += currentSuggestion.items.length;
      counter++;
    }

    return state.highlightedIndex - previousItemsOffset;
  }

  function getHighlightedItem(_ref5) {
    var state = _ref5.state;
    var suggestion = getSuggestionFromHighlightedIndex({
      state: state
    });

    if (!suggestion) {
      return null;
    }

    var item = suggestion.items[getRelativeHighlightedIndex({
      state: state,
      suggestion: suggestion
    })];
    var source = suggestion.source;
    var itemValue = source.getInputValue({
      suggestion: item,
      state: state
    });
    var itemUrl = source.getSuggestionUrl({
      suggestion: item,
      state: state
    });
    return {
      item: item,
      itemValue: itemValue,
      itemUrl: itemUrl,
      source: source
    };
  }
  function isOrContainsNode(parent, child) {
    return parent === child || parent.contains && parent.contains(child);
  }

  function ownKeys$2(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread$1(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys$2(Object(source), true).forEach(function (key) {
          _defineProperty$2(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys$2(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _defineProperty$2(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }
  var stateReducer = function stateReducer(action, state, props) {
    switch (action.type) {
      case 'setHighlightedIndex':
        {
          return _objectSpread$1({}, state, {
            highlightedIndex: action.value
          });
        }

      case 'setQuery':
        {
          return _objectSpread$1({}, state, {
            query: action.value
          });
        }

      case 'setSuggestions':
        {
          return _objectSpread$1({}, state, {
            suggestions: action.value
          });
        }

      case 'setIsOpen':
        {
          return _objectSpread$1({}, state, {
            isOpen: action.value
          });
        }

      case 'setStatus':
        {
          return _objectSpread$1({}, state, {
            status: action.value
          });
        }

      case 'setContext':
        {
          return _objectSpread$1({}, state, {
            context: _objectSpread$1({}, state.context, {}, action.value)
          });
        }

      case 'ArrowDown':
        {
          return _objectSpread$1({}, state, {
            highlightedIndex: getNextHighlightedIndex(1, state.highlightedIndex, getItemsCount(state), props.defaultHighlightedIndex)
          });
        }

      case 'ArrowUp':
        {
          return _objectSpread$1({}, state, {
            highlightedIndex: getNextHighlightedIndex(-1, state.highlightedIndex, getItemsCount(state), props.defaultHighlightedIndex)
          });
        }

      case 'Escape':
        {
          if (state.isOpen) {
            return _objectSpread$1({}, state, {
              isOpen: false
            });
          }

          return _objectSpread$1({}, state, {
            query: '',
            status: 'idle',
            statusContext: {},
            suggestions: []
          });
        }

      case 'submit':
        {
          return _objectSpread$1({}, state, {
            highlightedIndex: null,
            isOpen: false,
            status: 'idle',
            statusContext: {}
          });
        }

      case 'reset':
        {
          return _objectSpread$1({}, state, {
            highlightedIndex: // Since we open the menu on reset when openOnFocus=true
            // we need to restore the highlighted index to the defaultHighlightedIndex. (DocSearch use-case)
            // Since we close the menu when openOnFocus=false
            // we lose track of the highlighted index. (Query-suggestions use-case)
            props.openOnFocus === true ? props.defaultHighlightedIndex : null,
            isOpen: props.openOnFocus,
            // @TODO: Check with UX team if we want to close the menu on reset.
            status: 'idle',
            statusContext: {},
            query: ''
          });
        }

      case 'focus':
        {
          return _objectSpread$1({}, state, {
            highlightedIndex: props.defaultHighlightedIndex,
            isOpen: props.openOnFocus || state.query.length > 0
          });
        }

      case 'blur':
        {
          return _objectSpread$1({}, state, {
            isOpen: false,
            highlightedIndex: null
          });
        }

      case 'mousemove':
        {
          return _objectSpread$1({}, state, {
            highlightedIndex: action.value
          });
        }

      case 'mouseleave':
        {
          return _objectSpread$1({}, state, {
            highlightedIndex: props.defaultHighlightedIndex
          });
        }

      default:
        return state;
    }
  };

  function ownKeys$3(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread$2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys$3(Object(source), true).forEach(function (key) {
          _defineProperty$3(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys$3(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _defineProperty$3(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }
  function getDefaultProps(props) {
    var _props$id;

    var environment = typeof window !== 'undefined' ? window : {};
    return _objectSpread$2({
      openOnFocus: false,
      placeholder: '',
      autoFocus: false,
      defaultHighlightedIndex: null,
      showCompletion: false,
      stallThreshold: 300,
      environment: environment,
      shouldDropdownShow: function shouldDropdownShow(_ref) {
        var state = _ref.state;
        return getItemsCount(state) > 0;
      },
      onStateChange: noop,
      onSubmit: noop
    }, props, {
      // Since `generateAutocompleteId` triggers a side effect (it increments
      // and internal counter), we don't want to execute it if unnecessary.
      id: (_props$id = props.id) !== null && _props$id !== void 0 ? _props$id : generateAutocompleteId(),
      // The following props need to be deeply defaulted.
      initialState: _objectSpread$2({
        highlightedIndex: null,
        query: '',
        completion: null,
        suggestions: [],
        isOpen: false,
        status: 'idle',
        statusContext: {},
        context: {}
      }, props.initialState),
      getSources: normalizeGetSources(props.getSources),
      navigator: _objectSpread$2({
        navigate: function navigate(_ref2) {
          var suggestionUrl = _ref2.suggestionUrl;
          environment.location.assign(suggestionUrl);
        },
        navigateNewTab: function navigateNewTab(_ref3) {
          var suggestionUrl = _ref3.suggestionUrl;
          var windowReference = environment.open(suggestionUrl, '_blank', 'noopener');

          if (windowReference) {
            windowReference.focus();
          }
        },
        navigateNewWindow: function navigateNewWindow(_ref4) {
          var suggestionUrl = _ref4.suggestionUrl;
          environment.open(suggestionUrl, '_blank', 'noopener');
        }
      }, props.navigator)
    });
  }

  function getCompletion(_ref) {
    var state = _ref.state,
        props = _ref.props;

    if (props.showCompletion === false || state.isOpen === false || state.highlightedIndex === null || state.status === 'stalled') {
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

  function ownKeys$4(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread$3(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys$4(Object(source), true).forEach(function (key) {
          _defineProperty$4(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys$4(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _defineProperty$4(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }
  function createStore(reducer, props) {
    return {
      state: props.initialState,
      getState: function getState() {
        return this.state;
      },
      send: function send(action, payload) {
        this.state = withCompletion(reducer({
          type: action,
          value: payload
        }, this.state, props), props);
        props.onStateChange({
          state: this.state
        });
      }
    };
  }

  function withCompletion(state, props) {
    return _objectSpread$3({}, state, {
      completion: getCompletion({
        state: state,
        props: props
      })
    });
  }

  function ownKeys$5(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread$4(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys$5(Object(source), true).forEach(function (key) {
          _defineProperty$5(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys$5(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _defineProperty$5(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var lastStalledId = null;
  function onInput(_ref) {
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
        return _objectSpread$4({}, suggestion, {
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

  function onKeyDown(_ref) {
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
    event.key === 'ArrowRight' && event.target.selectionStart === store.getState().query.length) && props.showCompletion && store.getState().highlightedIndex !== null) {
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
      } else if (event.altKey) ; else {
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

  function _objectWithoutProperties$1(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose$1(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _objectWithoutPropertiesLoose$1(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function ownKeys$6(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread$5(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys$6(Object(source), true).forEach(function (key) {
          _defineProperty$6(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys$6(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _defineProperty$6(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }
  function getPropGetters(_ref) {
    var store = _ref.store,
        props = _ref.props,
        setHighlightedIndex = _ref.setHighlightedIndex,
        setQuery = _ref.setQuery,
        setSuggestions = _ref.setSuggestions,
        setIsOpen = _ref.setIsOpen,
        setStatus = _ref.setStatus,
        setContext = _ref.setContext;

    var getEnvironmentProps = function getEnvironmentProps(getterProps) {
      return {
        // On touch devices, we do not rely on the native `blur` event of the
        // input to close the dropdown, but rather on a custom `touchstart` event
        // outside of the autocomplete elements.
        // This ensures a working experience on mobile because we blur the input
        // on touch devices when the user starts scrolling (`touchmove`).
        onTouchStart: function onTouchStart(event) {
          if (store.getState().isOpen === false || event.target === getterProps.inputElement) {
            return;
          }

          var isTargetWithinAutocomplete = [getterProps.searchBoxElement, getterProps.dropdownElement].some(function (contextNode) {
            return contextNode && (isOrContainsNode(contextNode, event.target) || isOrContainsNode(contextNode, props.environment.document.activeElement));
          });

          if (isTargetWithinAutocomplete === false) {
            store.send('blur', null);
          }
        },
        // When scrolling on touch devices (mobiles, tablets, etc.), we want to
        // mimic the native platform behavior where the input is blurred to
        // hide the virtual keyboard. This gives more vertical space to
        // discover all the suggestions showing up in the dropdown.
        onTouchMove: function onTouchMove(event) {
          if (store.getState().isOpen === false || getterProps.inputElement !== props.environment.document.activeElement || event.target === getterProps.inputElement) {
            return;
          }

          getterProps.inputElement.blur();
        }
      };
    };

    var getRootProps = function getRootProps(rest) {
      return _objectSpread$5({
        role: 'combobox',
        'aria-expanded': store.getState().isOpen,
        'aria-haspopup': 'listbox',
        'aria-owns': store.getState().isOpen ? "".concat(props.id, "-menu") : undefined,
        'aria-labelledby': "".concat(props.id, "-label")
      }, rest);
    };

    var getFormProps = function getFormProps(providedProps) {
      var inputElement = providedProps.inputElement,
          rest = _objectWithoutProperties$1(providedProps, ["inputElement"]);

      return _objectSpread$5({
        onSubmit: function onSubmit(event) {
          event.preventDefault();
          props.onSubmit({
            state: store.getState(),
            setHighlightedIndex: setHighlightedIndex,
            setQuery: setQuery,
            setSuggestions: setSuggestions,
            setIsOpen: setIsOpen,
            setStatus: setStatus,
            setContext: setContext,
            event: event
          });
          store.send('submit', null);

          if (providedProps.inputElement) {
            providedProps.inputElement.blur();
          }
        },
        onReset: function onReset(event) {
          event.preventDefault();

          if (props.openOnFocus) {
            onInput({
              query: '',
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

          store.send('reset', null);

          if (providedProps.inputElement) {
            providedProps.inputElement.focus();
          }
        }
      }, rest);
    };

    var getInputProps = function getInputProps(providedProps) {
      function onFocus() {
        // We want to trigger a query when `openOnFocus` is true
        // because the dropdown should open with the current query.
        if (props.openOnFocus || store.getState().query.length > 0) {
          onInput({
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

        store.send('focus', null);
      }

      var isTouchDevice = ('ontouchstart' in props.environment);

      var inputElement = providedProps.inputElement,
          _providedProps$maxLen = providedProps.maxLength,
          maxLength = _providedProps$maxLen === void 0 ? 512 : _providedProps$maxLen,
          rest = _objectWithoutProperties$1(providedProps, ["inputElement", "maxLength"]);

      return _objectSpread$5({
        'aria-autocomplete': props.showCompletion ? 'both' : 'list',
        'aria-activedescendant': store.getState().isOpen && store.getState().highlightedIndex !== null ? "".concat(props.id, "-item-").concat(store.getState().highlightedIndex) : undefined,
        'aria-controls': store.getState().isOpen ? "".concat(props.id, "-menu") : undefined,
        'aria-labelledby': "".concat(props.id, "-label"),
        value: store.getState().query,
        id: "".concat(props.id, "-input"),
        autoComplete: 'off',
        autoCorrect: 'off',
        autoCapitalize: 'off',
        spellCheck: false,
        autoFocus: props.autoFocus,
        placeholder: props.placeholder,
        maxLength: maxLength,
        onChange: function onChange(event) {
          onInput({
            query: event.currentTarget.value.slice(0, maxLength),
            store: store,
            props: props,
            setHighlightedIndex: setHighlightedIndex,
            setQuery: setQuery,
            setSuggestions: setSuggestions,
            setIsOpen: setIsOpen,
            setStatus: setStatus,
            setContext: setContext
          });
        },
        onKeyDown: function onKeyDown$1(event) {
          onKeyDown({
            event: event,
            store: store,
            props: props,
            setHighlightedIndex: setHighlightedIndex,
            setQuery: setQuery,
            setSuggestions: setSuggestions,
            setIsOpen: setIsOpen,
            setStatus: setStatus,
            setContext: setContext
          });
        },
        onFocus: onFocus,
        onBlur: function onBlur() {
          // We do rely on the `blur` event on touch devices.
          // See explanation in `onTouchStart`.
          if (!isTouchDevice) {
            store.send('blur', null);
          }
        },
        onClick: function onClick() {
          // When the dropdown is closed and you click on the input while
          // the input is focused, the `onFocus` event is not triggered
          // (default browser behavior).
          // In an autocomplete context, it makes sense to open the menu in this
          // case.
          // We mimic this event by catching the `onClick` event which
          // triggers the `onFocus` for the dropdown to open.
          if (providedProps.inputElement === props.environment.document.activeElement && !store.getState().isOpen) {
            onFocus();
          }
        }
      }, rest);
    };

    var getLabelProps = function getLabelProps(rest) {
      return _objectSpread$5({
        htmlFor: "".concat(props.id, "-input"),
        id: "".concat(props.id, "-label")
      }, rest);
    };

    var getMenuProps = function getMenuProps(rest) {
      return _objectSpread$5({
        role: 'listbox',
        'aria-labelledby': "".concat(props.id, "-label"),
        id: "".concat(props.id, "-menu")
      }, rest);
    };

    var getDropdownProps = function getDropdownProps(rest) {
      return _objectSpread$5({
        onMouseLeave: function onMouseLeave() {
          store.send('mouseleave', null);
        }
      }, rest);
    };

    var getItemProps = function getItemProps(providedProps) {
      var item = providedProps.item,
          source = providedProps.source,
          rest = _objectWithoutProperties$1(providedProps, ["item", "source"]);

      return _objectSpread$5({
        id: "".concat(props.id, "-item-").concat(item.__autocomplete_id),
        role: 'option',
        'aria-selected': store.getState().highlightedIndex === item.__autocomplete_id,
        onMouseMove: function onMouseMove(event) {
          if (item.__autocomplete_id === store.getState().highlightedIndex) {
            return;
          }

          store.send('mousemove', item.__autocomplete_id);
          var highlightedItem = getHighlightedItem({
            state: store.getState()
          });

          if (store.getState().highlightedIndex !== null && highlightedItem) {
            var _item = highlightedItem.item,
                itemValue = highlightedItem.itemValue,
                itemUrl = highlightedItem.itemUrl,
                _source = highlightedItem.source;

            _source.onHighlight({
              suggestion: _item,
              suggestionValue: itemValue,
              suggestionUrl: itemUrl,
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
          }
        },
        onMouseDown: function onMouseDown(event) {
          // Prevents the `activeElement` from being changed to the item so it
          // can remain with the current `activeElement`.
          event.preventDefault();
        },
        onClick: function onClick(event) {
          // If `getSuggestionUrl` is provided, it means that the suggestion
          // is a link, not plain text that aims at updating the query.
          // We can therefore skip the state change because it will update
          // the `highlightedIndex`, resulting in a UI flash, especially
          // noticeable on mobile.
          if (source.getSuggestionUrl({
            suggestion: item,
            state: store.getState()
          }) !== undefined) {
            return;
          } // We ignore all modified clicks to support default browsers' behavior.


          if (isSpecialClick(event)) {
            return;
          }

          var inputValue = source.getInputValue({
            suggestion: item,
            state: store.getState()
          });
          onInput({
            query: inputValue,
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
            source.onSelect({
              suggestion: item,
              suggestionValue: inputValue,
              suggestionUrl: source.getSuggestionUrl({
                suggestion: item,
                state: store.getState()
              }),
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
          });
        }
      }, rest);
    };

    return {
      getEnvironmentProps: getEnvironmentProps,
      getRootProps: getRootProps,
      getFormProps: getFormProps,
      getLabelProps: getLabelProps,
      getInputProps: getInputProps,
      getDropdownProps: getDropdownProps,
      getMenuProps: getMenuProps,
      getItemProps: getItemProps
    };
  }

  function ownKeys$7(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread$6(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys$7(Object(source), true).forEach(function (key) {
          _defineProperty$7(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys$7(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _defineProperty$7(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function getAutocompleteSetters(_ref) {
    var store = _ref.store;

    var setHighlightedIndex = function setHighlightedIndex(value) {
      store.send('setHighlightedIndex', value);
    };

    var setQuery = function setQuery(value) {
      store.send('setQuery', value);
    };

    var setSuggestions = function setSuggestions(rawValue) {
      var baseItemId = 0;
      var value = rawValue.map(function (suggestion) {
        return _objectSpread$6({}, suggestion, {
          items: suggestion.items.map(function (item) {
            return _objectSpread$6({}, item, {
              __autocomplete_id: baseItemId++
            });
          })
        });
      });
      store.send('setSuggestions', value);
    };

    var setIsOpen = function setIsOpen(value) {
      store.send('setIsOpen', value);
    };

    var setStatus = function setStatus(value) {
      store.send('setStatus', value);
    };

    var setContext = function setContext(value) {
      store.send('setContext', value);
    };

    return {
      setHighlightedIndex: setHighlightedIndex,
      setQuery: setQuery,
      setSuggestions: setSuggestions,
      setIsOpen: setIsOpen,
      setStatus: setStatus,
      setContext: setContext
    };
  }

  function createAutocomplete(options) {
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

  function flatten(values) {
    return values.reduce(function (a, b) {
      return a.concat(b);
    }, []);
  }

  function ownKeys$8(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread$7(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys$8(Object(source), true).forEach(function (key) {
          _defineProperty$8(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys$8(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _defineProperty$8(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function getAlgoliaSource(_ref) {
    var searchClient = _ref.searchClient,
        queries = _ref.queries;

    if (typeof searchClient.addAlgoliaAgent === 'function') {
      searchClient.addAlgoliaAgent("autocomplete-core (".concat("1.0.0-alpha.14", ")"));
    }

    return searchClient.search(queries.map(function (searchParameters) {
      var indexName = searchParameters.indexName,
          query = searchParameters.query,
          params = searchParameters.params;
      return {
        indexName: indexName,
        query: query,
        params: _objectSpread$7({
          hitsPerPage: 5,
          highlightPreTag: '<mark>',
          highlightPostTag: '</mark>'
        }, params)
      };
    }));
  }
  function getAlgoliaHits(_ref3) {
    var searchClient = _ref3.searchClient,
        queries = _ref3.queries;
    return getAlgoliaSource({
      searchClient: searchClient,
      queries: queries
    }).then(function (response) {
      var results = response.results; // @TODO: should `getAlgoliaHits` flatten the hits?

      return flatten(results.map(function (result) {
        return result.hits;
      }));
    });
  }

  var MAX_QUERY_SIZE = 64;

  function groupBy(values, predicate) {
    return values.reduce(function (acc, item) {
      var key = predicate(item);

      if (!acc.hasOwnProperty(key)) {
        acc[key] = [];
      }

      acc[key].push(item);
      return acc;
    }, {});
  }

  function noop$1() {}

  function isLocalStorageSupported() {
    var key = '__TEST_KEY__';

    try {
      localStorage.setItem(key, '');
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      return false;
    }
  }

  function createStorage(key) {
    if (isLocalStorageSupported() === false) {
      return {
        setItem: function setItem() {},
        getItem: function getItem() {
          return [];
        }
      };
    }

    return {
      setItem: function setItem(item) {
        return window.localStorage.setItem(key, JSON.stringify(item));
      },
      getItem: function getItem() {
        var item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : [];
      }
    };
  }

  function createStoredSearches(_ref) {
    var key = _ref.key,
        _ref$limit = _ref.limit,
        limit = _ref$limit === void 0 ? 5 : _ref$limit;
    var storage = createStorage(key);
    var items = storage.getItem().slice(0, limit);
    return {
      add: function add(item) {
        var _ref2 = item,
            _highlightResult = _ref2._highlightResult,
            _snippetResult = _ref2._snippetResult,
            hit = _objectWithoutProperties(_ref2, ["_highlightResult", "_snippetResult"]);

        var isQueryAlreadySaved = items.findIndex(function (x) {
          return x.objectID === hit.objectID;
        });

        if (isQueryAlreadySaved > -1) {
          items.splice(isQueryAlreadySaved, 1);
        }

        items.unshift(hit);
        items = items.slice(0, limit);
        storage.setItem(items);
      },
      remove: function remove(item) {
        items = items.filter(function (x) {
          return x.objectID !== item.objectID;
        });
        storage.setItem(items);
      },
      getAll: function getAll() {
        return items;
      }
    };
  }

  function createBrowserLocalStorageCache(options) {
      const namespaceKey = `algoliasearch-client-js-${options.key}`;
      // eslint-disable-next-line functional/no-let
      let storage;
      const getStorage = () => {
          if (storage === undefined) {
              storage = options.localStorage || window.localStorage;
          }
          return storage;
      };
      const getNamespace = () => {
          return JSON.parse(getStorage().getItem(namespaceKey) || '{}');
      };
      return {
          get(key, defaultValue, events = {
              miss: () => Promise.resolve(),
          }) {
              return Promise.resolve()
                  .then(() => {
                  const keyAsString = JSON.stringify(key);
                  const value = getNamespace()[keyAsString];
                  return Promise.all([value || defaultValue(), value !== undefined]);
              })
                  .then(([value, exists]) => {
                  return Promise.all([value, exists || events.miss(value)]);
              })
                  .then(([value]) => value);
          },
          set(key, value) {
              return Promise.resolve().then(() => {
                  const namespace = getNamespace();
                  // eslint-disable-next-line functional/immutable-data
                  namespace[JSON.stringify(key)] = value;
                  getStorage().setItem(namespaceKey, JSON.stringify(namespace));
                  return value;
              });
          },
          delete(key) {
              return Promise.resolve().then(() => {
                  const namespace = getNamespace();
                  // eslint-disable-next-line functional/immutable-data
                  delete namespace[JSON.stringify(key)];
                  getStorage().setItem(namespaceKey, JSON.stringify(namespace));
              });
          },
          clear() {
              return Promise.resolve().then(() => {
                  getStorage().removeItem(namespaceKey);
              });
          },
      };
  }

  // @todo Add logger on options to debug when caches go wrong.
  function createFallbackableCache(options) {
      const caches = [...options.caches];
      const current = caches.shift(); // eslint-disable-line functional/immutable-data
      if (current === undefined) {
          return createNullCache();
      }
      return {
          get(key, defaultValue, events = {
              miss: () => Promise.resolve(),
          }) {
              return current.get(key, defaultValue, events).catch(() => {
                  return createFallbackableCache({ caches }).get(key, defaultValue, events);
              });
          },
          set(key, value) {
              return current.set(key, value).catch(() => {
                  return createFallbackableCache({ caches }).set(key, value);
              });
          },
          delete(key) {
              return current.delete(key).catch(() => {
                  return createFallbackableCache({ caches }).delete(key);
              });
          },
          clear() {
              return current.clear().catch(() => {
                  return createFallbackableCache({ caches }).clear();
              });
          },
      };
  }

  function createNullCache() {
      return {
          get(_key, defaultValue, events = {
              miss: () => Promise.resolve(),
          }) {
              const value = defaultValue();
              return value
                  .then(result => Promise.all([result, events.miss(result)]))
                  .then(([result]) => result);
          },
          set(_key, value) {
              return Promise.resolve(value);
          },
          delete(_key) {
              return Promise.resolve();
          },
          clear() {
              return Promise.resolve();
          },
      };
  }

  function createInMemoryCache(options = { serializable: true }) {
      // eslint-disable-next-line functional/no-let
      let cache = {};
      return {
          get(key, defaultValue, events = {
              miss: () => Promise.resolve(),
          }) {
              const keyAsString = JSON.stringify(key);
              if (keyAsString in cache) {
                  return Promise.resolve(options.serializable ? JSON.parse(cache[keyAsString]) : cache[keyAsString]);
              }
              const promise = defaultValue();
              const miss = (events && events.miss) || (() => Promise.resolve());
              return promise.then((value) => miss(value)).then(() => promise);
          },
          set(key, value) {
              // eslint-disable-next-line functional/immutable-data
              cache[JSON.stringify(key)] = options.serializable ? JSON.stringify(value) : value;
              return Promise.resolve(value);
          },
          delete(key) {
              // eslint-disable-next-line functional/immutable-data
              delete cache[JSON.stringify(key)];
              return Promise.resolve();
          },
          clear() {
              cache = {};
              return Promise.resolve();
          },
      };
  }

  function createAuth(authMode, appId, apiKey) {
      const credentials = {
          'x-algolia-api-key': apiKey,
          'x-algolia-application-id': appId,
      };
      return {
          headers() {
              return authMode === AuthMode.WithinHeaders ? credentials : {};
          },
          queryParameters() {
              return authMode === AuthMode.WithinQueryParameters ? credentials : {};
          },
      };
  }

  // eslint-disable-next-line functional/prefer-readonly-type
  function shuffle(array) {
      let c = array.length - 1; // eslint-disable-line functional/no-let
      // eslint-disable-next-line functional/no-loop-statement
      for (c; c > 0; c--) {
          const b = Math.floor(Math.random() * (c + 1));
          const a = array[c];
          array[c] = array[b]; // eslint-disable-line functional/immutable-data, no-param-reassign
          array[b] = a; // eslint-disable-line functional/immutable-data, no-param-reassign
      }
      return array;
  }
  function addMethods(base, methods) {
      Object.keys(methods !== undefined ? methods : {}).forEach(key => {
          // @ts-ignore
          // eslint-disable-next-line functional/immutable-data, no-param-reassign
          base[key] = methods[key](base);
      });
      // @ts-ignore
      return base;
  }
  function encode(format, ...args) {
      // eslint-disable-next-line functional/no-let
      let i = 0;
      return format.replace(/%s/g, () => encodeURIComponent(args[i++]));
  }

  const version = '4.1.0';

  const AuthMode = {
      /**
       * If auth credentials should be in query parameters.
       */
      WithinQueryParameters: 0,
      /**
       * If auth credentials should be in headers.
       */
      WithinHeaders: 1,
  };

  function createMappedRequestOptions(requestOptions, timeout) {
      const options = requestOptions || {};
      const data = options.data || {};
      Object.keys(options).forEach(key => {
          if (['timeout', 'headers', 'queryParameters', 'data', 'cacheable'].indexOf(key) === -1) {
              data[key] = options[key]; // eslint-disable-line functional/immutable-data
          }
      });
      return {
          data: Object.entries(data).length > 0 ? data : undefined,
          timeout: options.timeout || timeout,
          headers: options.headers || {},
          queryParameters: options.queryParameters || {},
          cacheable: options.cacheable,
      };
  }

  const CallEnum = {
      /**
       * If the host is read only.
       */
      Read: 1,
      /**
       * If the host is write only.
       */
      Write: 2,
      /**
       * If the host is both read and write.
       */
      Any: 3,
  };

  const HostStatusEnum = {
      Up: 1,
      Down: 2,
      Timeouted: 3,
  };

  // By default, API Clients at Algolia have expiration delay
  // of 5 mins. In the JavaScript client, we have 2 mins.
  const EXPIRATION_DELAY = 2 * 60 * 1000;
  function createStatefulHost(host, status = HostStatusEnum.Up) {
      return {
          ...host,
          status,
          lastUpdate: Date.now(),
      };
  }
  function isStatefulHostUp(host) {
      return host.status === HostStatusEnum.Up || Date.now() - host.lastUpdate > EXPIRATION_DELAY;
  }
  function isStatefulHostTimeouted(host) {
      return (host.status === HostStatusEnum.Timeouted && Date.now() - host.lastUpdate <= EXPIRATION_DELAY);
  }

  function createStatelessHost(options) {
      return {
          protocol: options.protocol || 'https',
          url: options.url,
          accept: options.accept || CallEnum.Any,
      };
  }

  const MethodEnum = {
      Delete: 'DELETE',
      Get: 'GET',
      Post: 'POST',
      Put: 'PUT',
  };

  function createRetryableOptions(hostsCache, statelessHosts) {
      return Promise.all(statelessHosts.map(statelessHost => {
          return hostsCache.get(statelessHost, () => {
              return Promise.resolve(createStatefulHost(statelessHost));
          });
      })).then(statefulHosts => {
          const hostsUp = statefulHosts.filter(host => isStatefulHostUp(host));
          const hostsTimeouted = statefulHosts.filter(host => isStatefulHostTimeouted(host));
          /**
           * Note, we put the hosts that previously timeouted on the end of the list.
           */
          const hostsAvailable = [...hostsUp, ...hostsTimeouted];
          const statelessHostsAvailable = hostsAvailable.length > 0
              ? hostsAvailable.map(host => createStatelessHost(host))
              : statelessHosts;
          return {
              getTimeout(timeoutsCount, baseTimeout) {
                  /**
                   * Imagine that you have 4 hosts, if timeouts will increase
                   * on the following way: 1 (timeouted) > 4 (timeouted) > 5 (200)
                   *
                   * Note that, the very next request, we start from the previous timeout
                   *
                   *  5 (timeouted) > 6 (timeouted) > 7 ...
                   *
                   * This strategy may need to be reviewed, but is the strategy on the our
                   * current v3 version.
                   */
                  const timeoutMultiplier = hostsTimeouted.length === 0 && timeoutsCount === 0
                      ? 1
                      : hostsTimeouted.length + 3 + timeoutsCount;
                  return timeoutMultiplier * baseTimeout;
              },
              statelessHosts: statelessHostsAvailable,
          };
      });
  }

  const isNetworkError = ({ isTimedOut, status }) => {
      return !isTimedOut && ~~status === 0;
  };
  const isRetryable = (response) => {
      const status = response.status;
      const isTimedOut = response.isTimedOut;
      return (isTimedOut || isNetworkError(response) || (~~(status / 100) !== 2 && ~~(status / 100) !== 4));
  };
  const isSuccess = ({ status }) => {
      return ~~(status / 100) === 2;
  };
  const retryDecision = (response, outcomes) => {
      if (isRetryable(response)) {
          return outcomes.onRetry(response);
      }
      if (isSuccess(response)) {
          return outcomes.onSucess(response);
      }
      return outcomes.onFail(response);
  };

  function retryableRequest(transporter, statelessHosts, request, requestOptions) {
      const stackTrace = []; // eslint-disable-line functional/prefer-readonly-type
      /**
       * First we prepare the payload that do not depend from hosts.
       */
      const data = serializeData(request, requestOptions);
      const headers = serializeHeaders(transporter, requestOptions);
      const method = request.method;
      // On `GET`, the data is proxied to query parameters.
      const dataQueryParameters = request.method !== MethodEnum.Get
          ? {}
          : {
              ...request.data,
              ...requestOptions.data,
          };
      const queryParameters = {
          'x-algolia-agent': transporter.userAgent.value,
          ...transporter.queryParameters,
          ...dataQueryParameters,
          ...requestOptions.queryParameters,
      };
      let timeoutsCount = 0; // eslint-disable-line functional/no-let
      const retry = (hosts, // eslint-disable-line functional/prefer-readonly-type
      getTimeout) => {
          /**
           * We iterate on each host, until there is no host left.
           */
          const host = hosts.pop(); // eslint-disable-line functional/immutable-data
          if (host === undefined) {
              throw createRetryError(stackTraceWithoutCredentials(stackTrace));
          }
          const payload = {
              data,
              headers,
              method,
              url: serializeUrl(host, request.path, queryParameters),
              connectTimeout: getTimeout(timeoutsCount, transporter.timeouts.connect),
              responseTimeout: getTimeout(timeoutsCount, requestOptions.timeout),
          };
          /**
           * The stackFrame is pushed to the stackTrace so we
           * can have information about onRetry and onFailure
           * decisions.
           */
          const pushToStackTrace = (response) => {
              const stackFrame = {
                  request: payload,
                  response,
                  host,
                  triesLeft: hosts.length,
              };
              // eslint-disable-next-line functional/immutable-data
              stackTrace.push(stackFrame);
              return stackFrame;
          };
          const decisions = {
              onSucess: response => deserializeSuccess(response),
              onRetry(response) {
                  const stackFrame = pushToStackTrace(response);
                  /**
                   * If response is a timeout, we increaset the number of
                   * timeouts so we can increase the timeout later.
                   */
                  if (response.isTimedOut) {
                      timeoutsCount++;
                  }
                  return Promise.all([
                      /**
                       * Failures are individually send the logger, allowing
                       * the end user to debug / store stack frames even
                       * when a retry error does not happen.
                       */
                      transporter.logger.info('Retryable failure', stackFrameWithoutCredentials(stackFrame)),
                      /**
                       * We also store the state of the host in failure cases. If the host, is
                       * down it will remain down for the next 2 minutes. In a timeout situation,
                       * this host will be added end of the list of hosts on the next request.
                       */
                      transporter.hostsCache.set(host, createStatefulHost(host, response.isTimedOut ? HostStatusEnum.Timeouted : HostStatusEnum.Down)),
                  ]).then(() => retry(hosts, getTimeout));
              },
              onFail(response) {
                  pushToStackTrace(response);
                  throw deserializeFailure(response, stackTraceWithoutCredentials(stackTrace));
              },
          };
          return transporter.requester.send(payload).then(response => {
              return retryDecision(response, decisions);
          });
      };
      /**
       * Finally, for each retryable host perform request until we got a non
       * retryable response. Some notes here:
       *
       * 1. The reverse here is applied so we can apply a `pop` later on => more performant.
       * 2. We also get from the retryable options a timeout multiplier that is tailored
       * for the current context.
       */
      return createRetryableOptions(transporter.hostsCache, statelessHosts).then(options => {
          return retry([...options.statelessHosts].reverse(), options.getTimeout);
      });
  }

  function createTransporter(options) {
      const { hostsCache, logger, requester, requestsCache, responsesCache, timeouts, userAgent, hosts, queryParameters, headers, } = options;
      const transporter = {
          hostsCache,
          logger,
          requester,
          requestsCache,
          responsesCache,
          timeouts,
          userAgent,
          headers,
          queryParameters,
          hosts: hosts.map(host => createStatelessHost(host)),
          read(request, requestOptions) {
              /**
               * First, we compute the user request options. Now, keep in mind,
               * that using request options the user is able to modified the intire
               * payload of the request. Such as headers, query parameters, and others.
               */
              const mappedRequestOptions = createMappedRequestOptions(requestOptions, transporter.timeouts.read);
              const createRetryableRequest = () => {
                  /**
                   * Then, we prepare a function factory that contains the construction of
                   * the retryable request. At this point, we may *not* perform the actual
                   * request. But we want to have the function factory ready.
                   */
                  return retryableRequest(transporter, transporter.hosts.filter(host => (host.accept & CallEnum.Read) !== 0), request, mappedRequestOptions);
              };
              /**
               * Once we have the function factory ready, we need to determine of the
               * request is "cacheable" - should be cached. Note that, once again,
               * the user can force this option.
               */
              const cacheable = mappedRequestOptions.cacheable !== undefined
                  ? mappedRequestOptions.cacheable
                  : request.cacheable;
              /**
               * If is not "cacheable", we immediatly trigger the retryable request, no
               * need to check cache implementations.
               */
              if (cacheable !== true) {
                  return createRetryableRequest();
              }
              /**
               * If the request is "cacheable", we need to first compute the key to ask
               * the cache implementations if this request is on progress or if the
               * response already exists on the cache.
               */
              const key = {
                  request,
                  mappedRequestOptions,
                  transporter: {
                      queryParameters: transporter.queryParameters,
                      headers: transporter.headers,
                  },
              };
              /**
               * With the computed key, we first ask the responses cache
               * implemention if this request was been resolved before.
               */
              return transporter.responsesCache.get(key, () => {
                  /**
                   * If the request has never resolved before, we actually ask if there
                   * is a current request with the same key on progress.
                   */
                  return transporter.requestsCache.get(key, () => {
                      return (transporter.requestsCache
                          /**
                           * Finally, if there is no request in progress with the same key,
                           * this `createRetryableRequest()` will actually trigger the
                           * retryable request.
                           */
                          .set(key, createRetryableRequest())
                          .then(response => Promise.all([transporter.requestsCache.delete(key), response]), err => Promise.all([transporter.requestsCache.delete(key), Promise.reject(err)]))
                          .then(([_, response]) => response));
                  });
              }, {
                  /**
                   * Of course, once we get this response back from the server, we
                   * tell response cache to actually store the received response
                   * to be used later.
                   */
                  miss: response => transporter.responsesCache.set(key, response),
              });
          },
          write(request, requestOptions) {
              /**
               * On write requests, no cache mechanisms are applied, and we
               * proxy the request immediately to the requester.
               */
              return retryableRequest(transporter, transporter.hosts.filter(host => (host.accept & CallEnum.Write) !== 0), request, createMappedRequestOptions(requestOptions, transporter.timeouts.write));
          },
      };
      return transporter;
  }

  function createUserAgent(version) {
      const userAgent = {
          value: `Algolia for JavaScript (${version})`,
          add(options) {
              const addedUserAgent = `; ${options.segment}${options.version !== undefined ? ` (${options.version})` : ''}`;
              if (userAgent.value.indexOf(addedUserAgent) === -1) {
                  // eslint-disable-next-line functional/immutable-data
                  userAgent.value = `${userAgent.value}${addedUserAgent}`;
              }
              return userAgent;
          },
      };
      return userAgent;
  }

  function deserializeSuccess(response) {
      // eslint-disable-next-line functional/no-try-statement
      try {
          return JSON.parse(response.content);
      }
      catch (e) {
          throw createDeserializationError(e.message, response);
      }
  }
  function deserializeFailure({ content, status }, stackFrame) {
      // eslint-disable-next-line functional/no-let
      let message = content;
      // eslint-disable-next-line functional/no-try-statement
      try {
          message = JSON.parse(content).message;
      }
      catch (e) {
          // ..
      }
      return createApiError(message, status, stackFrame);
  }

  function serializeUrl(host, path, queryParameters) {
      const queryParametersAsString = serializeQueryParameters(queryParameters);
      // eslint-disable-next-line functional/no-let
      let url = `${host.protocol}://${host.url}/${path.charAt(0) === '/' ? path.substr(1) : path}`;
      if (queryParametersAsString.length) {
          url += `?${queryParametersAsString}`;
      }
      return url;
  }
  function serializeQueryParameters(parameters) {
      const isObjectOrArray = (value) => Object.prototype.toString.call(value) === '[object Object]' ||
          Object.prototype.toString.call(value) === '[object Array]';
      return Object.keys(parameters)
          .map(key => encode('%s=%s', key, isObjectOrArray(parameters[key]) ? JSON.stringify(parameters[key]) : parameters[key]))
          .join('&');
  }
  function serializeData(request, requestOptions) {
      if (request.method === MethodEnum.Get ||
          (request.data === undefined && requestOptions.data === undefined)) {
          return undefined;
      }
      const data = Array.isArray(request.data)
          ? request.data
          : { ...request.data, ...requestOptions.data };
      return JSON.stringify(data);
  }
  function serializeHeaders(transporter, requestOptions) {
      const headers = {
          ...transporter.headers,
          ...requestOptions.headers,
      };
      const serializedHeaders = {};
      Object.keys(headers).forEach(header => {
          const value = headers[header];
          // @ts-ignore
          // eslint-disable-next-line functional/immutable-data
          serializedHeaders[header.toLowerCase()] = value;
      });
      return serializedHeaders;
  }

  function stackTraceWithoutCredentials(stackTrace) {
      return stackTrace.map(stackFrame => stackFrameWithoutCredentials(stackFrame));
  }
  function stackFrameWithoutCredentials(stackFrame) {
      const modifiedHeaders = stackFrame.request.headers['x-algolia-api-key']
          ? { 'x-algolia-api-key': '*****' }
          : {};
      return {
          ...stackFrame,
          request: {
              ...stackFrame.request,
              headers: {
                  ...stackFrame.request.headers,
                  ...modifiedHeaders,
              },
          },
      };
  }

  function createApiError(message, status, transporterStackTrace) {
      return {
          name: 'ApiError',
          message,
          status,
          transporterStackTrace,
      };
  }

  function createDeserializationError(message, response) {
      return {
          name: 'DeserializationError',
          message,
          response,
      };
  }

  function createRetryError(transporterStackTrace) {
      return {
          name: 'RetryError',
          message: 'Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.',
          transporterStackTrace,
      };
  }

  const createSearchClient = options => {
      const appId = options.appId;
      const auth = createAuth(options.authMode !== undefined ? options.authMode : AuthMode.WithinHeaders, appId, options.apiKey);
      const transporter = createTransporter({
          hosts: [
              { url: `${appId}-dsn.algolia.net`, accept: CallEnum.Read },
              { url: `${appId}.algolia.net`, accept: CallEnum.Write },
          ].concat(shuffle([
              { url: `${appId}-1.algolianet.com` },
              { url: `${appId}-2.algolianet.com` },
              { url: `${appId}-3.algolianet.com` },
          ])),
          ...options,
          headers: {
              ...auth.headers(),
              ...{ 'content-type': 'application/x-www-form-urlencoded' },
              ...options.headers,
          },
          queryParameters: {
              ...auth.queryParameters(),
              ...options.queryParameters,
          },
      });
      const base = {
          transporter,
          appId,
          addAlgoliaAgent(segment, version) {
              transporter.userAgent.add({ segment, version });
          },
          clearCache() {
              return Promise.all([
                  transporter.requestsCache.clear(),
                  transporter.responsesCache.clear(),
              ]).then(() => undefined);
          },
      };
      return addMethods(base, options.methods);
  };

  const initIndex = (base) => {
      return (indexName, options = {}) => {
          const searchIndex = {
              transporter: base.transporter,
              appId: base.appId,
              indexName,
          };
          return addMethods(searchIndex, options.methods);
      };
  };

  const multipleQueries = (base) => {
      return (queries, requestOptions) => {
          const requests = queries.map(query => {
              return {
                  ...query,
                  params: serializeQueryParameters(query.params || {}),
              };
          });
          return base.transporter.read({
              method: MethodEnum.Post,
              path: '1/indexes/*/queries',
              data: {
                  requests,
              },
              cacheable: true,
          }, requestOptions);
      };
  };

  const multipleSearchForFacetValues = (base) => {
      return (queries, requestOptions) => {
          return Promise.all(queries.map(query => {
              const { facetName, facetQuery, ...params } = query.params;
              return initIndex(base)(query.indexName, {
                  methods: { searchForFacetValues },
              }).searchForFacetValues(facetName, facetQuery, {
                  ...requestOptions,
                  ...params,
              });
          }));
      };
  };

  const search = (base) => {
      return (query, requestOptions) => {
          return base.transporter.read({
              method: MethodEnum.Post,
              path: encode('1/indexes/%s/query', base.indexName),
              data: {
                  query,
              },
              cacheable: true,
          }, requestOptions);
      };
  };

  const searchForFacetValues = (base) => {
      return (facetName, facetQuery, requestOptions) => {
          return base.transporter.read({
              method: MethodEnum.Post,
              path: encode('1/indexes/%s/facets/%s/query', base.indexName, facetName),
              data: {
                  facetQuery,
              },
              cacheable: true,
          }, requestOptions);
      };
  };

  const LogLevelEnum = {
      Debug: 1,
      Info: 2,
      Error: 3,
  };

  /* eslint no-console: 0 */
  function createConsoleLogger(logLevel) {
      return {
          debug(message, args) {
              if (LogLevelEnum.Debug >= logLevel) {
                  console.debug(message, args);
              }
              return Promise.resolve();
          },
          info(message, args) {
              if (LogLevelEnum.Info >= logLevel) {
                  console.info(message, args);
              }
              return Promise.resolve();
          },
          error(message, args) {
              console.error(message, args);
              return Promise.resolve();
          },
      };
  }

  function createBrowserXhrRequester() {
      return {
          send(request) {
              return new Promise((resolve) => {
                  const baseRequester = new XMLHttpRequest();
                  baseRequester.open(request.method, request.url, true);
                  Object.keys(request.headers).forEach(key => baseRequester.setRequestHeader(key, request.headers[key]));
                  const createTimeout = (timeout, content) => {
                      return setTimeout(() => {
                          baseRequester.abort();
                          resolve({
                              status: 0,
                              content,
                              isTimedOut: true,
                          });
                      }, timeout * 1000);
                  };
                  const connectTimeout = createTimeout(request.connectTimeout, 'Connection timeout');
                  // eslint-disable-next-line functional/no-let
                  let responseTimeout;
                  // eslint-disable-next-line functional/immutable-data
                  baseRequester.onreadystatechange = () => {
                      if (baseRequester.readyState > baseRequester.OPENED && responseTimeout === undefined) {
                          clearTimeout(connectTimeout);
                          responseTimeout = createTimeout(request.responseTimeout, 'Socket timeout');
                      }
                  };
                  // eslint-disable-next-line functional/immutable-data
                  baseRequester.onerror = () => {
                      // istanbul ignore next
                      if (baseRequester.status === 0) {
                          clearTimeout(connectTimeout);
                          clearTimeout(responseTimeout);
                          resolve({
                              content: baseRequester.responseText || 'Network request failed',
                              status: baseRequester.status,
                              isTimedOut: false,
                          });
                      }
                  };
                  //  eslint-disable-next-line functional/immutable-data
                  baseRequester.onload = () => {
                      clearTimeout(connectTimeout);
                      clearTimeout(responseTimeout);
                      resolve({
                          content: baseRequester.responseText,
                          status: baseRequester.status,
                          isTimedOut: false,
                      });
                  };
                  baseRequester.send(request.data);
              });
          },
      };
  }

  function algoliasearch(appId, apiKey, options) {
      const commonOptions = {
          appId,
          apiKey,
          timeouts: {
              connect: 1,
              read: 2,
              write: 30,
          },
          requester: createBrowserXhrRequester(),
          logger: createConsoleLogger(LogLevelEnum.Error),
          responsesCache: createInMemoryCache(),
          requestsCache: createInMemoryCache({ serializable: false }),
          hostsCache: createFallbackableCache({
              caches: [
                  createBrowserLocalStorageCache({ key: `${version}-${appId}` }),
                  createInMemoryCache(),
              ],
          }),
          userAgent: createUserAgent(version).add({
              segment: 'Browser',
              version: 'lite',
          }),
          authMode: AuthMode.WithinQueryParameters,
      };
      return createSearchClient({
          ...commonOptions,
          ...options,
          methods: {
              search: multipleQueries,
              searchForFacetValues: multipleSearchForFacetValues,
              multipleQueries,
              multipleSearchForFacetValues,
              initIndex: base => (indexName) => {
                  return initIndex(base)(indexName, {
                      methods: { search, searchForFacetValues },
                  });
              },
          },
      });
  }
  // eslint-disable-next-line functional/immutable-data
  algoliasearch.version = version;

  var version$1 = '1.0.0-alpha.14';

  function useSearchClient(appId, apiKey) {
    var searchClient = React__default.useMemo(function () {
      var client = algoliasearch(appId, apiKey);
      client.addAlgoliaAgent("docsearch (".concat(version$1, ")"));
      return client;
    }, [appId, apiKey]);
    return searchClient;
  }

  function useTrapFocus(_ref) {
    var container = _ref.container;
    React__default.useEffect(function () {
      if (!container) {
        return undefined;
      }

      var focusableElements = container.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), input:not([disabled])');
      var firstElement = focusableElements[0];
      var lastElement = focusableElements[focusableElements.length - 1];

      function trapFocus(event) {
        if (event.key !== 'Tab') {
          return;
        }

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }

      container.addEventListener('keydown', trapFocus);
      return function () {
        container.removeEventListener('keydown', trapFocus);
      };
    }, [container]);
  }

  function useTouchEvents(_ref) {
    var getEnvironmentProps = _ref.getEnvironmentProps,
        dropdownElement = _ref.dropdownElement,
        searchBoxElement = _ref.searchBoxElement,
        inputElement = _ref.inputElement;
    React__default.useEffect(function () {
      if (!(dropdownElement && searchBoxElement && inputElement)) {
        return undefined;
      }

      var _getEnvironmentProps = getEnvironmentProps({
        dropdownElement: dropdownElement,
        searchBoxElement: searchBoxElement,
        inputElement: inputElement
      }),
          onTouchStart = _getEnvironmentProps.onTouchStart,
          onTouchMove = _getEnvironmentProps.onTouchMove;

      window.addEventListener('touchstart', onTouchStart);
      window.addEventListener('touchmove', onTouchMove);
      return function () {
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchmove', onTouchMove);
      };
    }, [getEnvironmentProps, dropdownElement, searchBoxElement, inputElement]);
  }

  function Hit(_ref) {
    var hit = _ref.hit,
        children = _ref.children;
    return React__default.createElement("a", {
      href: hit.url
    }, children);
  }

  function ResetIcon() {
    return React__default.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 20 20"
    }, React__default.createElement("path", {
      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
      stroke: "currentColor",
      fill: "none",
      fillRule: "evenodd",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }));
  }

  function LoadingIcon() {
    return React__default.createElement("svg", {
      viewBox: "0 0 38 38",
      stroke: "currentColor",
      strokeOpacity: ".5"
    }, React__default.createElement("g", {
      fill: "none",
      fillRule: "evenodd"
    }, React__default.createElement("g", {
      transform: "translate(1 1)",
      strokeWidth: "2"
    }, React__default.createElement("circle", {
      strokeOpacity: ".3",
      cx: "18",
      cy: "18",
      r: "18"
    }), React__default.createElement("path", {
      d: "M36 18c0-9.94-8.06-18-18-18"
    }, React__default.createElement("animateTransform", {
      attributeName: "transform",
      type: "rotate",
      from: "0 18 18",
      to: "360 18 18",
      dur: "1s",
      repeatCount: "indefinite"
    })))));
  }

  function SearchBox(props) {
    var _props$getFormProps = props.getFormProps({
      inputElement: props.inputRef.current
    }),
        onSubmit = _props$getFormProps.onSubmit,
        onReset = _props$getFormProps.onReset;

    return React__default.createElement(React__default.Fragment, null, React__default.createElement("form", {
      action: "",
      role: "search",
      noValidate: true,
      className: "DocSearch-Form",
      onSubmit: onSubmit,
      onReset: onReset
    }, React__default.createElement("label", _extends({
      className: "DocSearch-MagnifierLabel"
    }, props.getLabelProps()), React__default.createElement(SearchIcon, null)), React__default.createElement("div", {
      className: "DocSearch-LoadingIndicator"
    }, React__default.createElement(LoadingIcon, null)), React__default.createElement("input", _extends({
      className: "DocSearch-Input",
      ref: props.inputRef
    }, props.getInputProps({
      autoFocus: props.autoFocus,
      inputElement: props.inputRef.current,
      type: 'search',
      maxLength: MAX_QUERY_SIZE
    }))), React__default.createElement("button", {
      type: "reset",
      title: "Clear the query",
      className: "DocSearch-Reset",
      hidden: !props.state.query,
      onClick: onReset
    }, React__default.createElement(ResetIcon, null))), React__default.createElement("button", {
      className: "DocSearch-Cancel",
      onClick: props.onClose
    }, "Cancel"));
  }

  function getPropertyByPath(object, path) {
    var parts = path.split('.');
    return parts.reduce(function (current, key) {
      return current && current[key];
    }, object);
  }

  function Snippet(_ref) {
    var hit = _ref.hit,
        attribute = _ref.attribute,
        _ref$tagName = _ref.tagName,
        tagName = _ref$tagName === void 0 ? 'span' : _ref$tagName,
        rest = _objectWithoutProperties(_ref, ["hit", "attribute", "tagName"]);

    return React.createElement(tagName, _objectSpread2({}, rest, {
      dangerouslySetInnerHTML: {
        __html: getPropertyByPath(hit, "_snippetResult.".concat(attribute, ".value")) || getPropertyByPath(hit, attribute)
      }
    }));
  }

  function Results(props) {
    if (!props.suggestion || props.suggestion.items.length === 0) {
      return null;
    }

    return React__default.createElement("section", {
      className: "DocSearch-Hits"
    }, React__default.createElement("div", {
      className: "DocSearch-Hit-source"
    }, props.title), React__default.createElement("ul", props.getMenuProps(), props.suggestion.items.map(function (item, index) {
      return React__default.createElement(Result, _extends({
        key: [props.title, item.objectID].join(':'),
        item: item,
        index: index
      }, props));
    })));
  }

  function Result(_ref) {
    var item = _ref.item,
        index = _ref.index,
        renderIcon = _ref.renderIcon,
        renderAction = _ref.renderAction,
        getItemProps = _ref.getItemProps,
        onItemClick = _ref.onItemClick,
        suggestion = _ref.suggestion,
        hitComponent = _ref.hitComponent;

    var _React$useState = React__default.useState(false),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        isDeleting = _React$useState2[0],
        setIsDeleting = _React$useState2[1];

    var _React$useState3 = React__default.useState(false),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        isFavoriting = _React$useState4[0],
        setIsFavoriting = _React$useState4[1];

    var action = React__default.useRef(null);
    var Hit = hitComponent;

    function runDeleteTransition(cb) {
      setIsDeleting(true);
      action.current = cb;
    }

    function runFavoriteTransition(cb) {
      setIsFavoriting(true);
      action.current = cb;
    }

    return React__default.createElement("li", _extends({
      className: ['DocSearch-Hit', item.__docsearch_parent && 'DocSearch-Hit--Child', isDeleting && 'DocSearch-Hit--deleting', isFavoriting && 'DocSearch-Hit--favoriting'].filter(Boolean).join(' '),
      onTransitionEnd: function onTransitionEnd() {
        if (action.current) {
          action.current();
        }
      }
    }, getItemProps({
      item: item,
      source: suggestion.source,
      onClick: function onClick() {
        onItemClick(item);
      }
    })), React__default.createElement(Hit, {
      hit: item
    }, React__default.createElement("div", {
      className: "DocSearch-Hit-Container"
    }, renderIcon({
      item: item,
      index: index
    }), item.hierarchy[item.type] && item.type === 'lvl1' && React__default.createElement("div", {
      className: "DocSearch-Hit-content-wrapper"
    }, React__default.createElement(Snippet, {
      className: "DocSearch-Hit-title",
      hit: item,
      attribute: "hierarchy.lvl1"
    }), item.content && React__default.createElement(Snippet, {
      className: "DocSearch-Hit-path",
      hit: item,
      attribute: "content"
    })), item.hierarchy[item.type] && (item.type === 'lvl2' || item.type === 'lvl3' || item.type === 'lvl4' || item.type === 'lvl5' || item.type === 'lvl6') && React__default.createElement("div", {
      className: "DocSearch-Hit-content-wrapper"
    }, React__default.createElement(Snippet, {
      className: "DocSearch-Hit-title",
      hit: item,
      attribute: "hierarchy.".concat(item.type)
    }), React__default.createElement(Snippet, {
      className: "DocSearch-Hit-path",
      hit: item,
      attribute: "hierarchy.lvl1"
    })), item.type === 'content' && React__default.createElement("div", {
      className: "DocSearch-Hit-content-wrapper"
    }, React__default.createElement(Snippet, {
      className: "DocSearch-Hit-title",
      hit: item,
      attribute: "content"
    }), React__default.createElement(Snippet, {
      className: "DocSearch-Hit-path",
      hit: item,
      attribute: "hierarchy.lvl1"
    })), renderAction({
      item: item,
      runDeleteTransition: runDeleteTransition,
      runFavoriteTransition: runFavoriteTransition
    }))));
  }

  function RecentIcon() {
    return React__default.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 20 20"
    }, React__default.createElement("g", {
      stroke: "currentColor",
      fill: "none",
      fillRule: "evenodd",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, React__default.createElement("path", {
      d: "M3.18 6.6a8.23 8.23 0 1112.93 9.94h0a8.23 8.23 0 01-11.63 0"
    }), React__default.createElement("path", {
      d: "M6.44 7.25H2.55V3.36M10.45 6v5.6M10.45 11.6L13 13"
    })));
  }

  function SelectIcon() {
    return React__default.createElement("svg", {
      className: "DocSearch-Hit-Select-Icon",
      width: "20",
      height: "20",
      viewBox: "0 0 20 20"
    }, React__default.createElement("g", {
      stroke: "currentColor",
      fill: "none",
      fillRule: "evenodd",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, React__default.createElement("path", {
      d: "M18 3v4c0 2-2 4-4 4H2"
    }), React__default.createElement("path", {
      d: "M8 17l-6-6 6-6"
    })));
  }

  function SourceIcon(props) {
    switch (props.type) {
      case 'lvl1':
        return React__default.createElement(LvlIcon, null);

      case 'content':
        return React__default.createElement(ContentIcon, null);

      default:
        return React__default.createElement(AnchorIcon, null);
    }
  }

  function LvlIcon() {
    return React__default.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 20 20"
    }, React__default.createElement("path", {
      d: "M17 6v12c0 .52-.2 1-1 1H4c-.7 0-1-.33-1-1V2c0-.55.42-1 1-1h8l5 5zM14 8h-3.13c-.51 0-.87-.34-.87-.87V4",
      stroke: "currentColor",
      fill: "none",
      fillRule: "evenodd",
      strokeLinejoin: "round"
    }));
  }

  function AnchorIcon() {
    return React__default.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 20 20"
    }, React__default.createElement("path", {
      d: "M13 13h4-4V8H7v5h6v4-4H7V8H3h4V3v5h6V3v5h4-4v5zm-6 0v4-4H3h4z",
      stroke: "currentColor",
      fill: "none",
      fillRule: "evenodd",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }));
  }

  function ContentIcon() {
    return React__default.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 20 20"
    }, React__default.createElement("path", {
      d: "M17 5H3h14zm0 5H3h14zm0 5H3h14z",
      stroke: "currentColor",
      fill: "none",
      fillRule: "evenodd",
      strokeLinejoin: "round"
    }));
  }

  function StarIcon() {
    return React__default.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 20 20"
    }, React__default.createElement("path", {
      d: "M10 14.2L5 17l1-5.6-4-4 5.5-.7 2.5-5 2.5 5 5.6.8-4 4 .9 5.5z",
      stroke: "currentColor",
      fill: "none",
      fillRule: "evenodd",
      strokeLinejoin: "round"
    }));
  }

  function ErrorIcon() {
    return React__default.createElement("svg", {
      width: "40",
      height: "40",
      viewBox: "0 0 20 20",
      fill: "none",
      fillRule: "evenodd",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, React__default.createElement("path", {
      d: "M19 4.8a16 16 0 00-2-1.2m-3.3-1.2A16 16 0 001.1 4.7M16.7 8a12 12 0 00-2.8-1.4M10 6a12 12 0 00-6.7 2M12.3 14.7a4 4 0 00-4.5 0M14.5 11.4A8 8 0 0010 10M3 16L18 2M10 18h0"
    }));
  }

  function NoResultsIcon() {
    return React__default.createElement("svg", {
      width: "40",
      height: "40",
      viewBox: "0 0 20 20",
      fill: "none",
      fillRule: "evenodd",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, React__default.createElement("path", {
      d: "M15.5 4.8c2 3 1.7 7-1 9.7h0l4.3 4.3-4.3-4.3a7.8 7.8 0 01-9.8 1m-2.2-2.2A7.8 7.8 0 0113.2 2.4M2 18L18 2"
    }));
  }

  function StartScreen(props) {
    if (props.state.status === 'idle' && props.hasSuggestions === false) {
      return React__default.createElement("div", {
        className: "DocSearch-StartScreen"
      }, React__default.createElement("p", {
        className: "DocSearch-Help"
      }, "No recent searches"));
    }

    if (props.hasSuggestions === false) {
      return null;
    }

    return React__default.createElement("div", {
      className: "DocSearch-Dropdown-Container"
    }, React__default.createElement(Results, _extends({}, props, {
      title: "Recent",
      suggestion: props.state.suggestions[0],
      renderIcon: function renderIcon() {
        return React__default.createElement("div", {
          className: "DocSearch-Hit-icon"
        }, React__default.createElement(RecentIcon, null));
      },
      renderAction: function renderAction(_ref) {
        var item = _ref.item,
            runFavoriteTransition = _ref.runFavoriteTransition,
            runDeleteTransition = _ref.runDeleteTransition;
        return React__default.createElement(React__default.Fragment, null, React__default.createElement("div", {
          className: "DocSearch-Hit-action"
        }, React__default.createElement("button", {
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
        }, React__default.createElement(StarIcon, null))), React__default.createElement("div", {
          className: "DocSearch-Hit-action"
        }, React__default.createElement("button", {
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
        }, React__default.createElement(ResetIcon, null))));
      }
    })), React__default.createElement(Results, _extends({}, props, {
      title: "Favorites",
      suggestion: props.state.suggestions[1],
      renderIcon: function renderIcon() {
        return React__default.createElement("div", {
          className: "DocSearch-Hit-icon"
        }, React__default.createElement(StarIcon, null));
      },
      renderAction: function renderAction(_ref2) {
        var item = _ref2.item,
            runDeleteTransition = _ref2.runDeleteTransition;
        return React__default.createElement("div", {
          className: "DocSearch-Hit-action"
        }, React__default.createElement("button", {
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
        }, React__default.createElement(ResetIcon, null)));
      }
    })));
  }

  function ResultsScreen(props) {
    return React__default.createElement("div", {
      className: "DocSearch-Dropdown-Container"
    }, props.state.suggestions.map(function (suggestion, index) {
      if (suggestion.items.length === 0) {
        return null;
      }

      var title = suggestion.items[0].hierarchy.lvl0;
      return React__default.createElement(Results, _extends({}, props, {
        key: index,
        title: title,
        suggestion: suggestion,
        renderIcon: function renderIcon(_ref) {
          var _suggestion$items;

          var item = _ref.item,
              index = _ref.index;
          return React__default.createElement(React__default.Fragment, null, item.__docsearch_parent && React__default.createElement("svg", {
            className: "DocSearch-Hit-Tree",
            viewBox: "0 0 24 54"
          }, React__default.createElement("g", {
            stroke: "currentColor",
            fill: "none",
            fillRule: "evenodd",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }, item.__docsearch_parent !== ((_suggestion$items = suggestion.items[index + 1]) === null || _suggestion$items === void 0 ? void 0 : _suggestion$items.__docsearch_parent) ? React__default.createElement("path", {
            d: "M8 6v21M20 27H8.3"
          }) : React__default.createElement("path", {
            d: "M8 6v42M20 27H8.3"
          }))), React__default.createElement("div", {
            className: "DocSearch-Hit-icon"
          }, React__default.createElement(SourceIcon, {
            type: item.type
          })));
        },
        renderAction: function renderAction() {
          return React__default.createElement("div", {
            className: "DocSearch-Hit-action"
          }, React__default.createElement(SelectIcon, null));
        }
      }));
    }));
  }

  function NoResultsScreen(props) {
    var searchSuggestions = props.state.context.searchSuggestions;
    return React__default.createElement("div", {
      className: "DocSearch-NoResults"
    }, React__default.createElement("div", {
      className: "DocSearch-Screen-Icon"
    }, React__default.createElement(NoResultsIcon, null)), React__default.createElement("p", {
      className: "DocSearch-Title"
    }, "No results for \"", React__default.createElement("strong", null, props.state.query), "\""), searchSuggestions && searchSuggestions.length > 0 && React__default.createElement("div", {
      className: "DocSearch-NoResults-Prefill-List"
    }, React__default.createElement("p", {
      className: "DocSearch-Help"
    }, "Try searching for:"), React__default.createElement("ul", null, searchSuggestions.slice(0, 3).reduce(function (acc, search) {
      return [].concat(_toConsumableArray(acc), [React__default.createElement("li", {
        key: search
      }, React__default.createElement("button", {
        className: "DocSearch-Prefill",
        key: search,
        onClick: function onClick() {
          props.setQuery(search.toLowerCase() + ' ');
          props.refresh();
          props.inputRef.current.focus();
        }
      }, search))]);
    }, []))), React__default.createElement("p", {
      className: "DocSearch-Help"
    }, "Believe this query should return results?", ' ', React__default.createElement("a", {
      href: "https://github.com/algolia/docsearch-configs/issues/new?template=Missing_results.md",
      target: "_blank",
      rel: "noopener noreferrer"
    }, "Let us know"), "."));
  }

  function ErrorScreen() {
    return React__default.createElement("div", {
      className: "DocSearch-ErrorScreen"
    }, React__default.createElement("div", {
      className: "DocSearch-Screen-Icon"
    }, React__default.createElement(ErrorIcon, null)), React__default.createElement("p", {
      className: "DocSearch-Title"
    }, "Unable to fetch results"), React__default.createElement("p", {
      className: "DocSearch-Help"
    }, "You might want to check your network connection."));
  }

  var ScreenState = React__default.memo(function (props) {
    if (props.state.status === 'error') {
      return React__default.createElement(ErrorScreen, null);
    }

    var hasSuggestions = props.state.suggestions.some(function (suggestion) {
      return suggestion.items.length > 0;
    });

    if (!props.state.query) {
      return React__default.createElement(StartScreen, _extends({}, props, {
        hasSuggestions: hasSuggestions
      }));
    }

    if (hasSuggestions === false) {
      return React__default.createElement(NoResultsScreen, props);
    }

    return React__default.createElement(ResultsScreen, props);
  }, function areEqual(_prevProps, nextProps) {
    // We don't update the screen when Autocomplete is loading or stalled to
    // avoid UI flashes:
    //  - Empty screen → Results screen
    //  - NoResults screen → NoResults screen with another query
    return nextProps.state.status === 'loading' || nextProps.state.status === 'stalled';
  });

  function AlgoliaLogo() {
    return React__default.createElement("a", {
      href: "https://www.algolia.com/docsearch",
      target: "_blank",
      rel: "noopener noreferrer"
    }, React__default.createElement("span", {
      className: "DocSearch-Label"
    }, "Search by"), React__default.createElement("svg", {
      width: "77",
      height: "19"
    }, React__default.createElement("path", {
      d: "M2.5067 0h14.0245c1.384.001 2.5058 1.1205 2.5068 2.5017V16.5c-.0014 1.3808-1.1232 2.4995-2.5068 2.5H2.5067C1.1232 18.9995.0014 17.8808 0 16.5V2.4958A2.495 2.495 0 01.735.7294 2.505 2.505 0 012.5068 0zM37.95 15.0695c-3.7068.0168-3.7068-2.986-3.7068-3.4634L34.2372.3576 36.498 0v11.1794c0 .2715 0 1.9889 1.452 1.994v1.8961zm-9.1666-1.8388c.694 0 1.2086-.0397 1.5678-.1088v-2.2934a5.3639 5.3639 0 00-1.3303-.1679 4.8283 4.8283 0 00-.758.0582 2.2845 2.2845 0 00-.688.2024c-.2029.0979-.371.2362-.4919.4142-.1268.1788-.185.2826-.185.5533 0 .5297.185.8359.5205 1.0375.3355.2016.7928.3053 1.365.3053v-.0008zm-.1969-8.1817c.7463 0 1.3768.092 1.8856.2767.5088.1838.9195.4428 1.2204.7717.3068.334.5147.7777.6423 1.251.1327.4723.196.991.196 1.5603v5.798c-.5235.1036-1.05.192-1.5787.2649-.7048.1037-1.4976.156-2.3774.156-.5832 0-1.1215-.0582-1.6016-.167a3.385 3.385 0 01-1.2432-.5364 2.6034 2.6034 0 01-.8037-.9565c-.191-.3922-.29-.9447-.29-1.5208 0-.5533.11-.905.3246-1.2863a2.7351 2.7351 0 01.8849-.9329c.376-.242.8029-.415 1.2948-.5187a7.4517 7.4517 0 011.5381-.156 7.1162 7.1162 0 011.6667.2024V8.886c0-.259-.0296-.5061-.093-.7372a1.5847 1.5847 0 00-.3245-.6158 1.5079 1.5079 0 00-.6119-.4158 2.6788 2.6788 0 00-.966-.173c-.5206 0-.9948.0634-1.4283.1384a6.5481 6.5481 0 00-1.065.259l-.2712-1.849c.2831-.0986.7048-.1964 1.2491-.2943a9.2979 9.2979 0 011.752-.1501v.0008zm44.6597 8.1193c.6947 0 1.2086-.0405 1.567-.1097v-2.2942a5.3743 5.3743 0 00-1.3303-.1679c-.2485 0-.503.0177-.7573.0582a2.2853 2.2853 0 00-.688.2024 1.2333 1.2333 0 00-.4918.4142c-.1268.1788-.1843.2826-.1843.5533 0 .5297.1843.8359.5198 1.0375.3414.2066.7927.3053 1.365.3053v.0009zm-.191-8.1767c.7463 0 1.3768.0912 1.8856.2759.5087.1847.9195.4436 1.2204.7717.3.329.5147.7786.6414 1.251a5.7248 5.7248 0 01.197 1.562v5.7972c-.3466.0742-.874.1602-1.5788.2648-.7049.1038-1.4976.1552-2.3774.1552-.5832 0-1.1215-.0573-1.6016-.167a3.385 3.385 0 01-1.2432-.5356 2.6034 2.6034 0 01-.8038-.9565c-.191-.3922-.2898-.9447-.2898-1.5216 0-.5533.1098-.905.3245-1.2854a2.7373 2.7373 0 01.8849-.9338c.376-.2412.8029-.4141 1.2947-.5178a7.4545 7.4545 0 012.325-.1097c.2781.0287.5672.081.879.156v-.3686a2.7781 2.7781 0 00-.092-.738 1.5788 1.5788 0 00-.3246-.6166 1.5079 1.5079 0 00-.612-.415 2.6797 2.6797 0 00-.966-.1729c-.5205 0-.9947.0633-1.4282.1384a6.5608 6.5608 0 00-1.065.259l-.2712-1.8498c.283-.0979.7048-.1957 1.2491-.2935a9.8597 9.8597 0 011.752-.1494zm-6.79-1.072c-.7576.001-1.373-.6103-1.3759-1.3664 0-.755.6128-1.3664 1.376-1.3664.764 0 1.3775.6115 1.3775 1.3664s-.6195 1.3664-1.3776 1.3664zm1.1393 11.1507h-2.2726V5.3409l2.2734-.3568v10.0845l-.0008.0017zm-3.984 0c-3.707.0168-3.707-2.986-3.707-3.4642L59.7069.3576 61.9685 0v11.1794c0 .2715 0 1.9889 1.452 1.994V15.0703zm-7.3512-4.979c0-.975-.2138-1.7873-.6305-2.3516-.4167-.571-.9998-.852-1.747-.852-.7454 0-1.3302.281-1.7452.852-.4166.5702-.6195 1.3765-.6195 2.3516 0 .9851.208 1.6473.6254 2.2183.4158.576.9998.8587 1.7461.8587.7454 0 1.3303-.2885 1.747-.8595.4158-.5761.6237-1.2315.6237-2.2184v.0009zm2.3132-.006c0 .7609-.1099 1.3361-.3356 1.9654a4.654 4.654 0 01-.9533 1.6076A4.214 4.214 0 0155.613 14.69c-.579.2412-1.4697.3795-1.9143.3795-.4462-.005-1.3303-.1324-1.9033-.3795a4.307 4.307 0 01-1.474-1.0316c-.4115-.4445-.7293-.9801-.9609-1.6076a5.3423 5.3423 0 01-.3465-1.9653c0-.7608.104-1.493.3356-2.1155a4.683 4.683 0 01.9719-1.5958 4.3383 4.3383 0 011.479-1.0257c.5739-.242 1.2043-.3567 1.8864-.3567.6829 0 1.3125.1197 1.8906.3567a4.1245 4.1245 0 011.4816 1.0257 4.7587 4.7587 0 01.9592 1.5958c.2426.6225.3643 1.3547.3643 2.1155zm-17.0198 0c0 .9448.208 1.9932.6238 2.431.4166.4386.955.6579 1.6142.6579.3584 0 .6998-.0523 1.0176-.1502.3186-.0978.5721-.2134.775-.3517V7.0784a8.8706 8.8706 0 00-1.4926-.1906c-.8206-.0236-1.4452.312-1.8847.8468-.4335.5365-.6533 1.476-.6533 2.3516v-.0008zm6.2863 4.4485c0 1.5385-.3938 2.662-1.1866 3.3773-.791.7136-2.0005 1.0712-3.6308 1.0712-.5958 0-1.834-.1156-2.8228-.334l.3643-1.7865c.8282.173 1.9202.2193 2.4932.2193.9077 0 1.555-.1847 1.943-.5533.388-.3686.578-.916.578-1.643v-.3687a6.8289 6.8289 0 01-.8848.3349c-.3634.1096-.786.167-1.261.167-.6246 0-1.1917-.0979-1.7055-.2944a3.5554 3.5554 0 01-1.3244-.8645c-.3642-.3796-.6541-.8579-.8561-1.4289-.2028-.571-.3068-1.59-.3068-2.339 0-.7034.1099-1.5856.3245-2.1735.2198-.5871.5316-1.0949.9542-1.515.4167-.42.9255-.743 1.5213-.98a5.5923 5.5923 0 012.052-.3855c.7353 0 1.4114.092 2.0707.2024.6592.1088 1.2204.2236 1.6776.35v8.945-.0008zM11.5026 4.2418v-.6511c-.0005-.4553-.3704-.8241-.8266-.8241H8.749c-.4561 0-.826.3688-.8265.824v.669c0 .0742.0693.1264.1445.1096a6.0346 6.0346 0 011.6768-.2362 6.125 6.125 0 011.6202.2185.1116.1116 0 00.1386-.1097zm-5.2806.852l-.3296-.3282a.8266.8266 0 00-1.168 0l-.393.3922a.8199.8199 0 000 1.164l.3237.323c.0524.0515.1268.0397.1733-.0117.191-.259.3989-.507.6305-.7372.2374-.2362.48-.4437.7462-.6335.0575-.0354.0634-.1155.017-.1687zm3.5159 2.069v2.818c0 .081.0879.1392.1622.0987l2.5102-1.2964c.0574-.0287.0752-.0987.0464-.1552a3.1237 3.1237 0 00-2.603-1.574c-.0575 0-.115.0456-.115.1097l-.0008-.0009zm.0008 6.789c-2.0933.0005-3.7915-1.6912-3.7947-3.7804C5.9468 8.0821 7.6452 6.39 9.7387 6.391c2.0932-.0005 3.7911 1.6914 3.794 3.7804a3.7783 3.7783 0 01-1.1124 2.675 3.7936 3.7936 0 01-2.6824 1.1054h.0008zM9.738 4.8002c-1.9218 0-3.6975 1.0232-4.6584 2.6841a5.359 5.359 0 000 5.3683c.9609 1.661 2.7366 2.6841 4.6584 2.6841a5.3891 5.3891 0 003.8073-1.5725 5.3675 5.3675 0 001.578-3.7987 5.3574 5.3574 0 00-1.5771-3.797A5.379 5.379 0 009.7387 4.801l-.0008-.0008z",
      fill: "currentColor",
      fillRule: "evenodd"
    })));
  }

  function Footer() {
    return React__default.createElement(React__default.Fragment, null, React__default.createElement("div", {
      className: "DocSearch-Logo"
    }, React__default.createElement(AlgoliaLogo, null)), React__default.createElement("ul", {
      className: "DocSearch-Commands"
    }, React__default.createElement("li", null, React__default.createElement("span", {
      className: "DocSearch-Commands-Key"
    }, React__default.createElement(CommandIcon, null, React__default.createElement("path", {
      d: "M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3"
    }))), React__default.createElement("span", {
      className: "DocSearch-Label"
    }, "to select")), React__default.createElement("li", null, React__default.createElement("span", {
      className: "DocSearch-Commands-Key"
    }, React__default.createElement(CommandIcon, null, React__default.createElement("path", {
      d: "M7.5 3.5v8M10.5 8.5l-3 3-3-3"
    }))), React__default.createElement("span", {
      className: "DocSearch-Commands-Key"
    }, React__default.createElement(CommandIcon, null, React__default.createElement("path", {
      d: "M7.5 11.5v-8M10.5 6.5l-3-3-3 3"
    }))), React__default.createElement("span", {
      className: "DocSearch-Label"
    }, "to navigate")), React__default.createElement("li", null, React__default.createElement("span", {
      className: "DocSearch-Commands-Key"
    }, React__default.createElement(CommandIcon, null, React__default.createElement("path", {
      d: "M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956"
    }))), React__default.createElement("span", {
      className: "DocSearch-Label"
    }, "to close"))));
  }

  function CommandIcon(props) {
    return React__default.createElement("svg", {
      width: "15",
      height: "15"
    }, React__default.createElement("g", {
      fill: "none",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "1.2"
    }, props.children));
  }

  function DocSearchModal(_ref) {
    var _ref$appId = _ref.appId,
        appId = _ref$appId === void 0 ? 'BH4D9OD16A' : _ref$appId,
        apiKey = _ref.apiKey,
        indexName = _ref.indexName,
        _ref$placeholder = _ref.placeholder,
        placeholder = _ref$placeholder === void 0 ? 'Search docs' : _ref$placeholder,
        searchParameters = _ref.searchParameters,
        _ref$onClose = _ref.onClose,
        onClose = _ref$onClose === void 0 ? noop$1 : _ref$onClose,
        _ref$transformItems = _ref.transformItems,
        transformItems = _ref$transformItems === void 0 ? function (x) {
      return x;
    } : _ref$transformItems,
        _ref$hitComponent = _ref.hitComponent,
        hitComponent = _ref$hitComponent === void 0 ? Hit : _ref$hitComponent,
        navigator = _ref.navigator;

    var _React$useState = React__default.useState({
      query: '',
      suggestions: []
    }),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        state = _React$useState2[0],
        setState = _React$useState2[1];

    var containerRef = React__default.useRef(null);
    var searchBoxRef = React__default.useRef(null);
    var dropdownRef = React__default.useRef(null);
    var inputRef = React__default.useRef(null);
    var snipetLength = React__default.useRef(10);
    var initialQuery = React__default.useRef(typeof window !== 'undefined' ? window.getSelection().toString().slice(0, MAX_QUERY_SIZE) : '').current;
    var scrollY = React__default.useRef(0);
    var searchClient = useSearchClient(appId, apiKey);
    var favoriteSearches = React__default.useRef(createStoredSearches({
      key: "__DOCSEARCH_FAVORITE_SEARCHES__".concat(indexName),
      limit: 10
    })).current;
    var recentSearches = React__default.useRef(createStoredSearches({
      key: "__DOCSEARCH_RECENT_SEARCHES__".concat(indexName),
      // We display 7 recent searches and there's no favorites, but only
      // 4 when there are favorites.
      limit: favoriteSearches.getAll().length === 0 ? 7 : 4
    })).current;
    var saveRecentSearch = React__default.useCallback(function saveRecentSearch(item) {
      // We don't store `content` record, but their parent if available.
      var search = item.type === 'content' ? item.__docsearch_parent : item; // We save the recent search only if it's not favorited.

      if (search && favoriteSearches.getAll().findIndex(function (x) {
        return x.objectID === search.objectID;
      }) === -1) {
        recentSearches.add(search);
      }
    }, [favoriteSearches, recentSearches]);
    var autocomplete = React__default.useMemo(function () {
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
              params: _objectSpread2({
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
                      return _objectSpread2({}, item, {
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
    React__default.useEffect(function () {
      document.body.classList.add('DocSearch--active');
      scrollY.current = window.scrollY;
      return function () {
        document.body.classList.remove('DocSearch--active');
        window.scrollTop = scrollY.current;
      };
    }, []);
    React__default.useEffect(function () {
      var isMobileMediaQuery = window.matchMedia('(max-width: 750px)');

      if (isMobileMediaQuery.matches) {
        snipetLength.current = 5;
      }
    }, []);
    React__default.useEffect(function () {
      if (dropdownRef.current) {
        dropdownRef.current.scrollTop = 0;
      }
    }, [state.query]); // We don't focus the input when there's an initial query (i.e. Selection
    // Search) because users rather want to see the results directly, without the
    // keyboard appearing.
    // We therefore need to refresh the autocomplete instance to load all the
    // results, which is usually triggered on focus.

    React__default.useEffect(function () {
      if (initialQuery.length > 0) {
        refresh();
      }
    }, [initialQuery, refresh]);
    return React__default.createElement("div", _extends({
      ref: containerRef
    }, getRootProps({}), {
      className: ['DocSearch-Container', state.status === 'stalled' && 'DocSearch-Container--Stalled', state.status === 'error' && 'DocSearch-Container--Errored'].filter(Boolean).join(' '),
      onClick: function onClick(event) {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }
    }), React__default.createElement("div", {
      className: "DocSearch-Modal"
    }, React__default.createElement("header", {
      className: "DocSearch-SearchBar",
      ref: searchBoxRef
    }, React__default.createElement(SearchBox, _extends({}, autocomplete, {
      state: state,
      autoFocus: initialQuery.length === 0,
      onClose: onClose,
      inputRef: inputRef
    }))), React__default.createElement("div", {
      className: "DocSearch-Dropdown",
      ref: dropdownRef
    }, React__default.createElement(ScreenState, _extends({}, autocomplete, {
      state: state,
      hitComponent: hitComponent,
      recentSearches: recentSearches,
      favoriteSearches: favoriteSearches,
      onItemClick: function onItemClick(item) {
        saveRecentSearch(item);
        onClose();
      },
      inputRef: inputRef
    }))), React__default.createElement("footer", {
      className: "DocSearch-Footer"
    }, React__default.createElement(Footer, null))));
  }

  function useDocSearchKeyboardEvents(_ref) {
    var isOpen = _ref.isOpen,
        onOpen = _ref.onOpen,
        onClose = _ref.onClose;
    React__default.useEffect(function () {
      function onKeyDown(event) {
        if (event.keyCode === 27 && isOpen || event.key === 'k' && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();

          if (isOpen) {
            onClose();
          } else {
            onOpen();
          }
        }
      }

      window.addEventListener('keydown', onKeyDown);
      return function () {
        window.removeEventListener('keydown', onKeyDown);
      };
    }, [isOpen, onOpen, onClose]);
  }

  function DocSearch(props) {
    var _React$useState = React__default.useState(false),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        isOpen = _React$useState2[0],
        setIsOpen = _React$useState2[1];

    var onOpen = React__default.useCallback(function onOpen() {
      setIsOpen(true);
    }, [setIsOpen]);
    var onClose = React__default.useCallback(function onClose() {
      setIsOpen(false);
    }, [setIsOpen]);
    useDocSearchKeyboardEvents({
      isOpen: isOpen,
      onOpen: onOpen,
      onClose: onClose
    });
    return React__default.createElement(React__default.Fragment, null, React__default.createElement(DocSearchButton, {
      onClick: onOpen
    }), isOpen && reactDom.createPortal(React__default.createElement(DocSearchModal, _extends({}, props, {
      onClose: onClose
    })), document.body));
  }

  exports.DocSearch = DocSearch;
  exports.DocSearchButton = DocSearchButton;
  exports.DocSearchModal = DocSearchModal;
  exports.useDocSearchKeyboardEvents = useDocSearchKeyboardEvents;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
