function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { onInput } from './onInput';
import { onKeyDown as _onKeyDown } from './onKeyDown';
import { getHighlightedItem, isOrContainsNode, isSpecialClick } from './utils';
export function getPropGetters(_ref) {
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
    return _objectSpread({
      role: 'combobox',
      'aria-expanded': store.getState().isOpen,
      'aria-haspopup': 'listbox',
      'aria-owns': store.getState().isOpen ? "".concat(props.id, "-menu") : undefined,
      'aria-labelledby': "".concat(props.id, "-label")
    }, rest);
  };

  var getFormProps = function getFormProps(providedProps) {
    var inputElement = providedProps.inputElement,
        rest = _objectWithoutProperties(providedProps, ["inputElement"]);

    return _objectSpread({
      action: '',
      noValidate: true,
      role: 'search',
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

    var _ref2 = providedProps || {},
        inputElement = _ref2.inputElement,
        _ref2$maxLength = _ref2.maxLength,
        maxLength = _ref2$maxLength === void 0 ? 512 : _ref2$maxLength,
        rest = _objectWithoutProperties(_ref2, ["inputElement", "maxLength"]);

    return _objectSpread({
      'aria-autocomplete': props.enableCompletion ? 'both' : 'list',
      'aria-activedescendant': store.getState().isOpen && store.getState().highlightedIndex !== null ? "".concat(props.id, "-item-").concat(store.getState().highlightedIndex) : undefined,
      'aria-controls': store.getState().isOpen ? "".concat(props.id, "-menu") : undefined,
      'aria-labelledby': "".concat(props.id, "-label"),
      value: store.getState().query,
      id: "".concat(props.id, "-input"),
      autoComplete: 'off',
      autoCorrect: 'off',
      autoCapitalize: 'off',
      spellCheck: 'false',
      autoFocus: props.autoFocus,
      placeholder: props.placeholder,
      maxLength: maxLength,
      type: 'search',
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
      onKeyDown: function onKeyDown(event) {
        _onKeyDown({
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
    return _objectSpread({
      htmlFor: "".concat(props.id, "-input"),
      id: "".concat(props.id, "-label")
    }, rest);
  };

  var getMenuProps = function getMenuProps(rest) {
    return _objectSpread({
      role: 'listbox',
      'aria-labelledby': "".concat(props.id, "-label"),
      id: "".concat(props.id, "-menu")
    }, rest);
  };

  var getDropdownProps = function getDropdownProps(rest) {
    return _objectSpread({
      onMouseDown: function onMouseDown(event) {
        // Prevents the `activeElement` from being changed to the dropdown so
        // that the blur event is not triggered, otherwise it closes the
        // dropdown.
        event.preventDefault();
      },
      onMouseLeave: function onMouseLeave() {
        store.send('mouseleave', null);
      }
    }, rest);
  };

  var getItemProps = function getItemProps(providedProps) {
    var item = providedProps.item,
        source = providedProps.source,
        rest = _objectWithoutProperties(providedProps, ["item", "source"]);

    return _objectSpread({
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