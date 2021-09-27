import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useForkRef } from 'reakit-utils/useForkRef';
import 'reakit-utils/isButton';
import 'reakit-warning';
import { useLiveRef } from 'reakit-utils/useLiveRef';
import 'reakit-utils/isSelfTarget';
import 'reakit-utils/useIsomorphicEffect';
import 'reakit-utils/hasFocusWithin';
import 'reakit-utils/isPortalEvent';
import 'reakit-utils/dom';
import 'reakit-utils/tabbable';
import '../Role/Role.js';
import '../Tabbable/Tabbable.js';
import '../Clickable/Clickable.js';
import { createEvent } from 'reakit-utils/createEvent';
import 'reakit-utils/getDocument';
import '../getCurrentId-5aa9849e.js';
import '../__keys-6742f591.js';
import '../userFocus-e16425e3.js';
import 'reakit-utils/isTextField';
import 'reakit-utils/ensureFocus';
import '../Id/IdProvider.js';
import '../Id/Id.js';
import 'reakit-utils/fireEvent';
import '../setTextFieldValue-0a221f4e.js';
import { useCompositeItem } from '../Composite/CompositeItem.js';
import { warning } from 'reakit-warning/warning';
import { R as RADIO_KEYS } from '../__keys-d251e56b.js';

function getChecked(options) {
  if (typeof options.checked !== "undefined") {
    return options.checked;
  }

  return typeof options.value !== "undefined" && options.state === options.value;
}

function useInitialChecked(options) {
  var _React$useState = useState(function () {
    return getChecked(options);
  }),
      initialChecked = _React$useState[0];

  var _React$useState2 = useState(options.currentId),
      initialCurrentId = _React$useState2[0];

  var id = options.id,
      setCurrentId = options.setCurrentId;
  useEffect(function () {
    if (initialChecked && id && initialCurrentId !== id) {
      setCurrentId === null || setCurrentId === void 0 ? void 0 : setCurrentId(id);
    }
  }, [initialChecked, id, setCurrentId, initialCurrentId]);
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

var useRadio = createHook({
  name: "Radio",
  compose: useCompositeItem,
  keys: RADIO_KEYS,
  useOptions: function useOptions(_ref, _ref2) {
    var _options$value;

    var value = _ref2.value,
        checked = _ref2.checked;

    var _ref$unstable_clickOn = _ref.unstable_clickOnEnter,
        unstable_clickOnEnter = _ref$unstable_clickOn === void 0 ? false : _ref$unstable_clickOn,
        _ref$unstable_checkOn = _ref.unstable_checkOnFocus,
        unstable_checkOnFocus = _ref$unstable_checkOn === void 0 ? true : _ref$unstable_checkOn,
        options = _objectWithoutPropertiesLoose(_ref, ["unstable_clickOnEnter", "unstable_checkOnFocus"]);

    return _objectSpread2(_objectSpread2({
      checked: checked,
      unstable_clickOnEnter: unstable_clickOnEnter,
      unstable_checkOnFocus: unstable_checkOnFocus
    }, options), {}, {
      value: (_options$value = options.value) != null ? _options$value : value
    });
  },
  useProps: function useProps(options, _ref3) {
    var htmlRef = _ref3.ref,
        htmlOnChange = _ref3.onChange,
        htmlOnClick = _ref3.onClick,
        htmlProps = _objectWithoutPropertiesLoose(_ref3, ["ref", "onChange", "onClick"]);

    var ref = useRef(null);

    var _React$useState3 = useState(true),
        isNativeRadio = _React$useState3[0],
        setIsNativeRadio = _React$useState3[1];

    var checked = getChecked(options);
    var isCurrentItemRef = useLiveRef(options.currentId === options.id);
    var onChangeRef = useLiveRef(htmlOnChange);
    var onClickRef = useLiveRef(htmlOnClick);
    useInitialChecked(options);
    useEffect(function () {
      var element = ref.current;

      if (!element) {
        process.env.NODE_ENV !== "production" ? warning(true, "Can't determine whether the element is a native radio because `ref` wasn't passed to the component", "See https://reakit.io/docs/radio") : void 0;
        return;
      }

      if (element.tagName !== "INPUT" || element.type !== "radio") {
        setIsNativeRadio(false);
      }
    }, []);
    var onChange = useCallback(function (event) {
      var _onChangeRef$current, _options$setState;

      (_onChangeRef$current = onChangeRef.current) === null || _onChangeRef$current === void 0 ? void 0 : _onChangeRef$current.call(onChangeRef, event);
      if (event.defaultPrevented) return;
      if (options.disabled) return;
      (_options$setState = options.setState) === null || _options$setState === void 0 ? void 0 : _options$setState.call(options, options.value);
    }, [options.disabled, options.setState, options.value]);
    var onClick = useCallback(function (event) {
      var _onClickRef$current;

      (_onClickRef$current = onClickRef.current) === null || _onClickRef$current === void 0 ? void 0 : _onClickRef$current.call(onClickRef, event);
      if (event.defaultPrevented) return;
      if (isNativeRadio) return;
      fireChange(event.currentTarget, onChange);
    }, [onChange, isNativeRadio]);
    useEffect(function () {
      var element = ref.current;
      if (!element) return;

      if (options.unstable_moves && isCurrentItemRef.current && options.unstable_checkOnFocus) {
        fireChange(element, onChange);
      }
    }, [options.unstable_moves, options.unstable_checkOnFocus, onChange]);
    return _objectSpread2({
      ref: useForkRef(ref, htmlRef),
      role: !isNativeRadio ? "radio" : undefined,
      type: isNativeRadio ? "radio" : undefined,
      value: isNativeRadio ? options.value : undefined,
      name: isNativeRadio ? options.baseId : undefined,
      "aria-checked": checked,
      checked: checked,
      onChange: onChange,
      onClick: onClick
    }, htmlProps);
  }
});
var Radio = createComponent({
  as: "input",
  memo: true,
  useHook: useRadio
});

export { Radio, useRadio };
