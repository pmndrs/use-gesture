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
import { i as FORM_REMOVE_BUTTON_KEYS } from '../__keys-54ad6269.js';
import { g as getInputId } from '../getInputId-aa144169.js';
import { g as getPushButtonId } from '../getPushButtonId-9f434755.js';

var unstable_useFormRemoveButton = createHook({
  name: "FormRemoveButton",
  compose: useButton,
  keys: FORM_REMOVE_BUTTON_KEYS,
  useOptions: function useOptions(options, _ref) {
    var name = _ref.name;
    return _objectSpread2(_objectSpread2({}, options), {}, {
      name: options.name || name
    });
  },
  useProps: function useProps(options, _ref2) {
    var htmlOnClick = _ref2.onClick,
        htmlProps = _objectWithoutPropertiesLoose(_ref2, ["onClick"]);

    var onClickRef = useLiveRef(htmlOnClick);
    var onClick = useCallback(function (event) {
      var _onClickRef$current, _options$remove;

      (_onClickRef$current = onClickRef.current) === null || _onClickRef$current === void 0 ? void 0 : _onClickRef$current.call(onClickRef, event);
      if (event.defaultPrevented) return;
      (_options$remove = options.remove) === null || _options$remove === void 0 ? void 0 : _options$remove.call(options, options.name, options.index);
      var inputId = getInputId(options.name, options.baseId);
      if (!inputId) return;
      var document = getDocument(event.currentTarget);
      window.requestAnimationFrame(function () {
        var selector = "[id^=\"" + inputId + "-\"]";
        var inputs = document.querySelectorAll(selector);

        if (inputs.length) {
          var inputsArray = Array.from(inputs);
          var nextIdx = inputsArray.reduce(function (final, input) {
            var match = input.id.match(new RegExp(inputId + "-([0-9]+)"));
            if (!match) return final;
            var idx = match[1];

            if (Number(idx) > final && options.index >= final) {
              return Number(idx);
            }

            return final;
          }, 0);
          var nextSelector = "[id^=\"" + inputId + "-" + nextIdx + "\"]";
          var input = document.querySelector(nextSelector);

          if (input) {
            input.focus();
            return;
          }
        }

        var pushButtonId = getPushButtonId(options.name, options.baseId);

        if (pushButtonId) {
          var pushButton = document.getElementById(pushButtonId);
          pushButton === null || pushButton === void 0 ? void 0 : pushButton.focus();
        }
      });
    }, [options.remove, options.name, options.index, options.baseId]);
    return _objectSpread2({
      onClick: onClick
    }, htmlProps);
  }
});
var unstable_FormRemoveButton = createComponent({
  as: "button",
  memo: true,
  useHook: unstable_useFormRemoveButton
});

export { unstable_FormRemoveButton, unstable_useFormRemoveButton };
