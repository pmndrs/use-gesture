import { a as _objectSpread2, _ as _objectWithoutPropertiesLoose } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { useCallback } from 'react';
import 'reakit-utils/useForkRef';
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
import { useButton } from '../Button/Button.js';
import { getDocument } from 'reakit-utils/getDocument';
import { f as FORM_PUSH_BUTTON_KEYS } from '../__keys-54ad6269.js';
import { g as getInputId, f as formatInputName } from '../getInputId-aa144169.js';
import { unstable_getIn } from './utils/getIn.js';
import { g as getPushButtonId } from '../getPushButtonId-9f434755.js';

var unstable_useFormPushButton = createHook({
  name: "FormPushButton",
  compose: useButton,
  keys: FORM_PUSH_BUTTON_KEYS,
  useOptions: function useOptions(options, _ref) {
    var _options$value;

    var name = _ref.name,
        value = _ref.value;
    return _objectSpread2(_objectSpread2({}, options), {}, {
      name: options.name || name,
      value: (_options$value = options.value) != null ? _options$value : value
    });
  },
  useProps: function useProps(options, _ref2) {
    var htmlOnClick = _ref2.onClick,
        htmlProps = _objectWithoutPropertiesLoose(_ref2, ["onClick"]);

    var onClickRef = useLiveRef(htmlOnClick);
    var onClick = useCallback(function (event) {
      var _onClickRef$current, _options$push;

      (_onClickRef$current = onClickRef.current) === null || _onClickRef$current === void 0 ? void 0 : _onClickRef$current.call(onClickRef, event);
      if (event.defaultPrevented) return;
      (_options$push = options.push) === null || _options$push === void 0 ? void 0 : _options$push.call(options, options.name, options.value);

      var _unstable_getIn = unstable_getIn(options.values, options.name, []),
          length = _unstable_getIn.length;

      var inputId = getInputId(formatInputName(options.name, "-") + "-" + length, options.baseId);
      if (!inputId) return;
      var element = event.currentTarget;
      window.requestAnimationFrame(function () {
        var selector = "[id^=\"" + inputId + "\"]";
        var document = getDocument(element);
        var input = document.querySelector(selector);
        input === null || input === void 0 ? void 0 : input.focus();
      });
    }, [options.push, options.name, options.value, options.values, options.baseId]);
    return _objectSpread2({
      id: getPushButtonId(options.name, options.baseId),
      onClick: onClick
    }, htmlProps);
  }
});
var unstable_FormPushButton = createComponent({
  as: "button",
  memo: true,
  useHook: unstable_useFormPushButton
});

export { unstable_FormPushButton, unstable_useFormPushButton };
