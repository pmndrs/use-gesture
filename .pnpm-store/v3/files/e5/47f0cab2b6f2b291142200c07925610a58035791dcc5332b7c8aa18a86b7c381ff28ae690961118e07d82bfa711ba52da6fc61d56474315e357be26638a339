import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { useRef, useReducer, useMemo, useEffect, useCallback } from 'react';
import { useForkRef } from 'reakit-utils/useForkRef';
import 'reakit-utils/isButton';
import { warning } from 'reakit-warning';
import { useLiveRef } from 'reakit-utils/useLiveRef';
import 'reakit-utils/isSelfTarget';
import 'reakit-utils/useIsomorphicEffect';
import 'reakit-utils/hasFocusWithin';
import 'reakit-utils/isPortalEvent';
import 'reakit-utils/dom';
import 'reakit-utils/tabbable';
import '../Role/Role.js';
import '../Tabbable/Tabbable.js';
import { useUpdateEffect } from 'reakit-utils/useUpdateEffect';
import 'reakit-system/useCreateElement';
import 'reakit-utils/getDocument';
import 'reakit-utils/fireBlurEvent';
import 'reakit-utils/fireKeyboardEvent';
import 'reakit-utils/canUseDOM';
import 'reakit-utils/getNextActiveElementOnBlur';
import '../reverse-30eaa122.js';
import '../getCurrentId-5aa9849e.js';
import '../findEnabledItemById-8ddca752.js';
import '../__keys-6742f591.js';
import '../userFocus-e16425e3.js';
import { useComposite } from '../Composite/Composite.js';
import { C as COMBOBOX_KEYS } from '../__keys-0f89298f.js';
import { g as getMenuId } from '../getMenuId-34730bd3.js';

function getControls(baseId, ariaControls) {
  var menuId = getMenuId(baseId);

  if (ariaControls) {
    return ariaControls + " " + menuId;
  }

  return menuId;
}

function getAutocomplete(options) {
  if (options.list && options.inline) return "both";
  if (options.list) return "list";
  if (options.inline) return "inline";
  return "none";
}

function isFirstItemAutoSelected(items, autoSelect, currentId) {
  if (!autoSelect) return false;
  var firstItem = items.find(function (item) {
    return !item.disabled;
  });
  return currentId && (firstItem === null || firstItem === void 0 ? void 0 : firstItem.id) === currentId;
}

function hasCompletionString(inputValue, currentValue) {
  return !!currentValue && currentValue.length > inputValue.length && currentValue.toLowerCase().indexOf(inputValue.toLowerCase()) === 0;
}

function getCompletionString(inputValue, currentValue) {
  if (!currentValue) return "";
  var index = currentValue.toLowerCase().indexOf(inputValue.toLowerCase());
  return currentValue.slice(index + inputValue.length);
}

function useValue(options) {
  return useMemo(function () {
    if (!options.inline) {
      return options.inputValue;
    }

    var firstItemAutoSelected = isFirstItemAutoSelected(options.items, options.autoSelect, options.currentId);

    if (firstItemAutoSelected) {
      if (hasCompletionString(options.inputValue, options.currentValue)) {
        return options.inputValue + getCompletionString(options.inputValue, options.currentValue);
      }

      return options.inputValue;
    }

    return options.currentValue || options.inputValue;
  }, [options.inline, options.inputValue, options.autoSelect, options.items, options.currentId, options.currentValue]);
}

function getFirstEnabledItemId(items) {
  var _items$find;

  return (_items$find = items.find(function (item) {
    return !item.disabled;
  })) === null || _items$find === void 0 ? void 0 : _items$find.id;
}

var unstable_useCombobox = createHook({
  name: "Combobox",
  compose: useComposite,
  keys: COMBOBOX_KEYS,
  useOptions: function useOptions(_ref) {
    var _ref$menuRole = _ref.menuRole,
        menuRole = _ref$menuRole === void 0 ? "listbox" : _ref$menuRole,
        _ref$hideOnEsc = _ref.hideOnEsc,
        hideOnEsc = _ref$hideOnEsc === void 0 ? true : _ref$hideOnEsc,
        options = _objectWithoutPropertiesLoose(_ref, ["menuRole", "hideOnEsc"]);

    return _objectSpread2({
      menuRole: menuRole,
      hideOnEsc: hideOnEsc
    }, options);
  },
  useProps: function useProps(options, _ref2) {
    var htmlRef = _ref2.ref,
        htmlOnKeyDown = _ref2.onKeyDown,
        htmlOnKeyPress = _ref2.onKeyPress,
        htmlOnChange = _ref2.onChange,
        htmlOnClick = _ref2.onClick,
        htmlOnBlur = _ref2.onBlur,
        ariaControls = _ref2["aria-controls"],
        htmlProps = _objectWithoutPropertiesLoose(_ref2, ["ref", "onKeyDown", "onKeyPress", "onChange", "onClick", "onBlur", "aria-controls"]);

    var ref = useRef(null);

    var _React$useReducer = useReducer(function () {
      return {};
    }, {}),
        updated = _React$useReducer[0],
        update = _React$useReducer[1];

    var onKeyDownRef = useLiveRef(htmlOnKeyDown);
    var onKeyPressRef = useLiveRef(htmlOnKeyPress);
    var onChangeRef = useLiveRef(htmlOnChange);
    var onClickRef = useLiveRef(htmlOnClick);
    var onBlurRef = useLiveRef(htmlOnBlur);
    var value = useValue(options);
    var hasInsertedTextRef = useRef(false); // Completion string

    useEffect(function () {
      if (!options.inline) return;
      if (!options.autoSelect) return;
      if (!options.currentValue) return;
      if (options.currentId !== getFirstEnabledItemId(options.items)) return;

      if (!hasCompletionString(options.inputValue, options.currentValue)) {
        return;
      }

      var element = ref.current;
      process.env.NODE_ENV !== "production" ? warning(!element, "Can't auto select combobox because `ref` wasn't passed to the component", "See https://reakit.io/docs/combobox") : void 0;
      element === null || element === void 0 ? void 0 : element.setSelectionRange(options.inputValue.length, options.currentValue.length);
    }, [updated, options.inline, options.autoSelect, options.currentValue, options.inputValue, options.currentId, options.items]); // Auto select on type

    useUpdateEffect(function () {
      if (options.autoSelect && options.items.length && hasInsertedTextRef.current) {
        // If autoSelect is set to true and the last change was a text
        // insertion, we want to automatically focus on the first suggestion.
        // This effect will run both when inputValue changes and when items
        // change so we can also catch async items.
        options.setCurrentId(undefined);
      } else {
        // Without autoSelect, we'll always blur the combobox option and move
        // focus onto the combobox input.
        options.setCurrentId(null);
      }
    }, [options.items, options.inputValue, options.autoSelect, options.setCurrentId]);
    var onKeyDown = useCallback(function (event) {
      var _onKeyDownRef$current;

      (_onKeyDownRef$current = onKeyDownRef.current) === null || _onKeyDownRef$current === void 0 ? void 0 : _onKeyDownRef$current.call(onKeyDownRef, event); // Resets the reference on key down so we can figure it out later on
      // key press.

      hasInsertedTextRef.current = false;
      if (event.defaultPrevented) return;

      if (event.key === "Escape" && options.hideOnEsc) {
        var _options$hide;

        (_options$hide = options.hide) === null || _options$hide === void 0 ? void 0 : _options$hide.call(options);
      }
    }, [options.hideOnEsc, options.hide]);
    var onKeyPress = useCallback(function (event) {
      var _onKeyPressRef$curren;

      (_onKeyPressRef$curren = onKeyPressRef.current) === null || _onKeyPressRef$curren === void 0 ? void 0 : _onKeyPressRef$curren.call(onKeyPressRef, event); // onKeyPress will catch only printable character presses, so we skip
      // text removal and paste.

      hasInsertedTextRef.current = true;
    }, []);
    var onChange = useCallback(function (event) {
      var _onChangeRef$current, _options$show, _options$setInputValu;

      (_onChangeRef$current = onChangeRef.current) === null || _onChangeRef$current === void 0 ? void 0 : _onChangeRef$current.call(onChangeRef, event);
      if (event.defaultPrevented) return;
      (_options$show = options.show) === null || _options$show === void 0 ? void 0 : _options$show.call(options);
      (_options$setInputValu = options.setInputValue) === null || _options$setInputValu === void 0 ? void 0 : _options$setInputValu.call(options, event.target.value);
      update();

      if (!options.autoSelect || !hasInsertedTextRef.current) {
        var _options$setCurrentId;

        // If autoSelect is not set or it's not an insertion of text, focus
        // on the combobox input after changing the value.
        (_options$setCurrentId = options.setCurrentId) === null || _options$setCurrentId === void 0 ? void 0 : _options$setCurrentId.call(options, null);
      } else {
        var _options$setCurrentId2;

        // Selects first item
        (_options$setCurrentId2 = options.setCurrentId) === null || _options$setCurrentId2 === void 0 ? void 0 : _options$setCurrentId2.call(options, undefined);
      }
    }, [options.show, options.autoSelect, options.setCurrentId, options.setInputValue]);
    var onClick = useCallback(function (event) {
      var _onClickRef$current, _options$setCurrentId3;

      (_onClickRef$current = onClickRef.current) === null || _onClickRef$current === void 0 ? void 0 : _onClickRef$current.call(onClickRef, event);
      if (event.defaultPrevented) return; // https://github.com/reakit/reakit/issues/808

      if (!options.minValueLength || value.length >= options.minValueLength) {
        var _options$show2;

        (_options$show2 = options.show) === null || _options$show2 === void 0 ? void 0 : _options$show2.call(options);
      }

      (_options$setCurrentId3 = options.setCurrentId) === null || _options$setCurrentId3 === void 0 ? void 0 : _options$setCurrentId3.call(options, null);
      options.setInputValue(value);
    }, [options.show, options.setCurrentId, options.setInputValue, options.minValueLength, value]);
    var onBlur = useCallback(function (event) {
      var _onBlurRef$current;

      (_onBlurRef$current = onBlurRef.current) === null || _onBlurRef$current === void 0 ? void 0 : _onBlurRef$current.call(onBlurRef, event);
      if (event.defaultPrevented) return;
      options.setInputValue(value);
    }, [options.setInputValue, value]);
    return _objectSpread2({
      ref: useForkRef(ref, useForkRef(options.unstable_referenceRef, htmlRef)),
      role: "combobox",
      autoComplete: "off",
      "aria-controls": getControls(options.baseId, ariaControls),
      "aria-haspopup": options.menuRole,
      "aria-expanded": options.visible,
      "aria-autocomplete": getAutocomplete(options),
      value: value,
      onKeyDown: onKeyDown,
      onKeyPress: onKeyPress,
      onChange: onChange,
      onClick: onClick,
      onBlur: onBlur
    }, htmlProps);
  },
  useComposeProps: function useComposeProps(options, _ref3) {
    var onKeyUp = _ref3.onKeyUp,
        htmlOnKeyDownCapture = _ref3.onKeyDownCapture,
        htmlOnKeyDown = _ref3.onKeyDown,
        htmlProps = _objectWithoutPropertiesLoose(_ref3, ["onKeyUp", "onKeyDownCapture", "onKeyDown"]);

    var compositeHTMLProps = useComposite(options, htmlProps, true);
    var onKeyDownCaptureRef = useLiveRef(htmlOnKeyDownCapture);
    var onKeyDownRef = useLiveRef(htmlOnKeyDown);
    var onKeyDownCapture = useCallback(function (event) {
      var _onKeyDownCaptureRef$, _compositeHTMLProps$o;

      (_onKeyDownCaptureRef$ = onKeyDownCaptureRef.current) === null || _onKeyDownCaptureRef$ === void 0 ? void 0 : _onKeyDownCaptureRef$.call(onKeyDownCaptureRef, event);
      if (event.defaultPrevented) return;

      if (options.menuRole !== "grid") {
        // If menu is a one-dimensional list and there's an option with
        // focus, we don't want Home/End and printable characters to perform
        // actions on the option, only on the combobox input.
        if (event.key === "Home") return;
        if (event.key === "End") return;
      }

      if (event.key.length === 1) return; // Composite's onKeyDownCapture will proxy this event to the active
      // item.

      (_compositeHTMLProps$o = compositeHTMLProps.onKeyDownCapture) === null || _compositeHTMLProps$o === void 0 ? void 0 : _compositeHTMLProps$o.call(compositeHTMLProps, event);
    }, [options.menuRole, compositeHTMLProps.onKeyDownCapture]);
    var onKeyDown = useCallback(function (event) {
      var _onKeyDownRef$current2, _compositeHTMLProps$o2;

      (_onKeyDownRef$current2 = onKeyDownRef.current) === null || _onKeyDownRef$current2 === void 0 ? void 0 : _onKeyDownRef$current2.call(onKeyDownRef, event);
      if (event.defaultPrevented) return;
      var onlyInputHasFocus = options.currentId === null;
      if (!onlyInputHasFocus) return; // Do not perform list actions when pressing horizontal arrow keys when
      // focusing the combobox input while no option has focus.

      if (event.key === "ArrowLeft") return;
      if (event.key === "ArrowRight") return;
      if (event.key === "Home") return;
      if (event.key === "End") return;

      if (!event.ctrlKey && !event.altKey && !event.shiftKey && !event.metaKey && (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key.length === 1)) {
        var _options$show3;

        // Up/Down arrow keys and printable characters should open the
        // combobox popover.
        (_options$show3 = options.show) === null || _options$show3 === void 0 ? void 0 : _options$show3.call(options);
      }

      (_compositeHTMLProps$o2 = compositeHTMLProps.onKeyDown) === null || _compositeHTMLProps$o2 === void 0 ? void 0 : _compositeHTMLProps$o2.call(compositeHTMLProps, event);
    }, [options.currentId, options.show, compositeHTMLProps.onKeyDown]);
    return _objectSpread2(_objectSpread2({}, compositeHTMLProps), {}, {
      onKeyDownCapture: onKeyDownCapture,
      onKeyDown: onKeyDown,
      onKeyUp: onKeyUp
    });
  }
});
var unstable_Combobox = createComponent({
  as: "input",
  memo: true,
  useHook: unstable_useCombobox
});

export { unstable_Combobox, unstable_useCombobox };
