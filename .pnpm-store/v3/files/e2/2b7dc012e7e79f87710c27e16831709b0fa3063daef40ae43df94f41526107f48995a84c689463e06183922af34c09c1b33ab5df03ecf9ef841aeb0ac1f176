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
import { j as FORM_SUBMIT_BUTTON_KEYS } from '../__keys-54ad6269.js';

function getFirstInvalidInput(baseId, target) {
  var document = getDocument(target);
  var selector = "[aria-invalid=true][id^=" + baseId + "]";
  return document.querySelector(selector);
}

var unstable_useFormSubmitButton = createHook({
  name: "FormSubmitButton",
  compose: useButton,
  keys: FORM_SUBMIT_BUTTON_KEYS,
  useOptions: function useOptions(options) {
    return _objectSpread2({
      disabled: options.submitting
    }, options);
  },
  useProps: function useProps(options, _ref) {
    var htmlOnClick = _ref.onClick,
        htmlProps = _objectWithoutPropertiesLoose(_ref, ["onClick"]);

    var onClickRef = useLiveRef(htmlOnClick);
    var onClick = useCallback(function (event) {
      var _onClickRef$current;

      (_onClickRef$current = onClickRef.current) === null || _onClickRef$current === void 0 ? void 0 : _onClickRef$current.call(onClickRef, event);
      if (event.defaultPrevented) return;
      var element = event.currentTarget;
      window.requestAnimationFrame(function () {
        var input = getFirstInvalidInput(options.baseId, element);
        input === null || input === void 0 ? void 0 : input.focus();

        if (input && "select" in input) {
          input.select();
        }
      });
    }, [options.baseId]);
    return _objectSpread2({
      type: "submit",
      onClick: onClick
    }, htmlProps);
  }
});
var unstable_FormSubmitButton = createComponent({
  as: "button",
  memo: true,
  useHook: unstable_useFormSubmitButton
});

export { unstable_FormSubmitButton, unstable_useFormSubmitButton };
