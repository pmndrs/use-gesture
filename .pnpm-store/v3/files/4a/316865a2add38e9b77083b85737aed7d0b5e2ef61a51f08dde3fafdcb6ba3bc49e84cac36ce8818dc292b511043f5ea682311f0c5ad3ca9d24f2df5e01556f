function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { generateAutocompleteId, getItemsCount, noop, normalizeGetSources } from './utils';
export function getDefaultProps(props) {
  var _props$id;

  var environment = typeof window !== 'undefined' ? window : {};
  return _objectSpread(_objectSpread({
    openOnFocus: false,
    placeholder: '',
    autoFocus: false,
    defaultHighlightedIndex: null,
    enableCompletion: false,
    stallThreshold: 300,
    environment: environment,
    shouldDropdownShow: function shouldDropdownShow(_ref) {
      var state = _ref.state;
      return getItemsCount(state) > 0;
    },
    onStateChange: noop,
    onSubmit: noop
  }, props), {}, {
    // Since `generateAutocompleteId` triggers a side effect (it increments
    // and internal counter), we don't want to execute it if unnecessary.
    id: (_props$id = props.id) !== null && _props$id !== void 0 ? _props$id : generateAutocompleteId(),
    // The following props need to be deeply defaulted.
    initialState: _objectSpread({
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
    navigator: _objectSpread({
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