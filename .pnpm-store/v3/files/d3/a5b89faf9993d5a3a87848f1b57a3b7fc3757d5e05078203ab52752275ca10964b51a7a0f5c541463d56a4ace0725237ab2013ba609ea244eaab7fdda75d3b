function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { getItemsCount, getNextHighlightedIndex } from './utils';
export var stateReducer = function stateReducer(action, state, props) {
  switch (action.type) {
    case 'setHighlightedIndex':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          highlightedIndex: action.value
        });
      }

    case 'setQuery':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          query: action.value
        });
      }

    case 'setSuggestions':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          suggestions: action.value
        });
      }

    case 'setIsOpen':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          isOpen: action.value
        });
      }

    case 'setStatus':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          status: action.value
        });
      }

    case 'setContext':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          context: _objectSpread(_objectSpread({}, state.context), action.value)
        });
      }

    case 'ArrowDown':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          highlightedIndex: getNextHighlightedIndex(1, state.highlightedIndex, getItemsCount(state), props.defaultHighlightedIndex)
        });
      }

    case 'ArrowUp':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          highlightedIndex: getNextHighlightedIndex(-1, state.highlightedIndex, getItemsCount(state), props.defaultHighlightedIndex)
        });
      }

    case 'Escape':
      {
        if (state.isOpen) {
          return _objectSpread(_objectSpread({}, state), {}, {
            isOpen: false
          });
        }

        return _objectSpread(_objectSpread({}, state), {}, {
          query: '',
          status: 'idle',
          statusContext: {},
          suggestions: []
        });
      }

    case 'submit':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          highlightedIndex: null,
          isOpen: false,
          status: 'idle',
          statusContext: {}
        });
      }

    case 'reset':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
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
        return _objectSpread(_objectSpread({}, state), {}, {
          highlightedIndex: props.defaultHighlightedIndex,
          isOpen: props.openOnFocus || state.query.length > 0
        });
      }

    case 'blur':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          isOpen: false,
          highlightedIndex: null
        });
      }

    case 'mousemove':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          highlightedIndex: action.value
        });
      }

    case 'mouseleave':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          highlightedIndex: props.defaultHighlightedIndex
        });
      }

    default:
      return state;
  }
};