import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { useRef, useState, useEffect, useCallback } from 'react';
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
import { useClickable } from '../Clickable/Clickable.js';
import { removeIndexFromArray } from 'reakit-utils/removeIndexFromArray';
import { createEvent } from 'reakit-utils/createEvent';

// Automatically generated
var CHECKBOX_STATE_KEYS = ["state", "setState"];
var CHECKBOX_KEYS = [].concat(CHECKBOX_STATE_KEYS, ["value", "checked"]);

function getChecked(options) {
  if (typeof options.checked !== "undefined") {
    return options.checked;
  }

  if (typeof options.value === "undefined") {
    return !!options.state;
  }

  var state = Array.isArray(options.state) ? options.state : [];
  return state.indexOf(options.value) !== -1;
}

function fireChange(element, onChange) {
  var event = createEvent(element, "change");
  Object.defineProperties(event, {
    type: {
      value: "change"
    },
    target: {
      value: element
    },
    currentTarget: {
      value: element
    }
  });
  onChange === null || onChange === void 0 ? void 0 : onChange(event);
}

function useIndeterminateState(ref, options) {
  useEffect(function () {
    var element = ref.current;

    if (!element) {
      process.env.NODE_ENV !== "production" ? warning(options.state === "indeterminate", "Can't set indeterminate state because `ref` wasn't passed to component.", "See https://reakit.io/docs/checkbox/#indeterminate-state") : void 0;
      return;
    }

    if (options.state === "indeterminate") {
      element.indeterminate = true;
    } else if (element.indeterminate) {
      element.indeterminate = false;
    }
  }, [options.state, ref]);
}

var useCheckbox = createHook({
  name: "Checkbox",
  compose: useClickable,
  keys: CHECKBOX_KEYS,
  useOptions: function useOptions(_ref, _ref2) {
    var value = _ref2.value,
        checked = _ref2.checked;

    var _ref$unstable_clickOn = _ref.unstable_clickOnEnter,
        unstable_clickOnEnter = _ref$unstable_clickOn === void 0 ? false : _ref$unstable_clickOn,
        options = _objectWithoutPropertiesLoose(_ref, ["unstable_clickOnEnter"]);

    return _objectSpread2({
      unstable_clickOnEnter: unstable_clickOnEnter,
      value: value,
      checked: getChecked(_objectSpread2({
        checked: checked
      }, options))
    }, options);
  },
  useProps: function useProps(options, _ref3) {
    var htmlRef = _ref3.ref,
        htmlOnChange = _ref3.onChange,
        htmlOnClick = _ref3.onClick,
        htmlProps = _objectWithoutPropertiesLoose(_ref3, ["ref", "onChange", "onClick"]);

    var ref = useRef(null);

    var _React$useState = useState(true),
        isNativeCheckbox = _React$useState[0],
        setIsNativeCheckbox = _React$useState[1];

    var onChangeRef = useLiveRef(htmlOnChange);
    var onClickRef = useLiveRef(htmlOnClick);
    useEffect(function () {
      var element = ref.current;

      if (!element) {
        process.env.NODE_ENV !== "production" ? warning(true, "Can't determine whether the element is a native checkbox because `ref` wasn't passed to the component", "See https://reakit.io/docs/checkbox") : void 0;
        return;
      }

      if (element.tagName !== "INPUT" || element.type !== "checkbox") {
        setIsNativeCheckbox(false);
      }
    }, []);
    useIndeterminateState(ref, options);
    var onChange = useCallback(function (event) {
      var element = event.currentTarget;

      if (options.disabled) {
        event.stopPropagation();
        event.preventDefault();
        return;
      }

      if (onChangeRef.current) {
        // If component is NOT rendered as a native input, it will not have
        // the `checked` property. So we assign it for consistency.
        if (!isNativeCheckbox) {
          element.checked = !element.checked;
        }

        onChangeRef.current(event);
      }

      if (!options.setState) return;

      if (typeof options.value === "undefined") {
        options.setState(!options.checked);
      } else {
        var state = Array.isArray(options.state) ? options.state : [];
        var index = state.indexOf(options.value);

        if (index === -1) {
          options.setState([].concat(state, [options.value]));
        } else {
          options.setState(removeIndexFromArray(state, index));
        }
      }
    }, [options.disabled, isNativeCheckbox, options.setState, options.value, options.checked, options.state]);
    var onClick = useCallback(function (event) {
      var _onClickRef$current;

      (_onClickRef$current = onClickRef.current) === null || _onClickRef$current === void 0 ? void 0 : _onClickRef$current.call(onClickRef, event);
      if (event.defaultPrevented) return;
      if (isNativeCheckbox) return;
      fireChange(event.currentTarget, onChange);
    }, [isNativeCheckbox, onChange]);
    return _objectSpread2({
      ref: useForkRef(ref, htmlRef),
      role: !isNativeCheckbox ? "checkbox" : undefined,
      type: isNativeCheckbox ? "checkbox" : undefined,
      value: isNativeCheckbox ? options.value : undefined,
      checked: options.checked,
      "aria-checked": options.state === "indeterminate" ? "mixed" : options.checked,
      onChange: onChange,
      onClick: onClick
    }, htmlProps);
  }
});
var Checkbox = createComponent({
  as: "input",
  memo: true,
  useHook: useCheckbox
});

export { Checkbox, useCheckbox };
