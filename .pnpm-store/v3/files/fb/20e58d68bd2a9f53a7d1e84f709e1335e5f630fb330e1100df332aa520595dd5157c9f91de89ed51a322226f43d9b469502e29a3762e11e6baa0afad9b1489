import { a as _objectSpread2, _ as _objectWithoutPropertiesLoose } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { useCallback } from 'react';
import 'reakit-utils/useForkRef';
import 'reakit-utils/isButton';
import 'reakit-warning';
import { useLiveRef } from 'reakit-utils/useLiveRef';
import 'reakit-utils/useIsomorphicEffect';
import 'reakit-utils/hasFocusWithin';
import 'reakit-utils/isPortalEvent';
import 'reakit-utils/dom';
import 'reakit-utils/tabbable';
import '../Role/Role.js';
import '../Tabbable/Tabbable.js';
import { c as FORM_INPUT_KEYS } from '../__keys-54ad6269.js';
import { g as getInputId, f as formatInputName } from '../getInputId-aa144169.js';
import { g as getLabelId } from '../getLabelId-3db05e97.js';
import { unstable_getIn } from './utils/getIn.js';
import { g as getMessageId, s as shouldShowError } from '../shouldShowError-e8a86b53.js';
import { useInput } from '../Input/Input.js';

var unstable_useFormInput = createHook({
  name: "FormInput",
  compose: useInput,
  keys: FORM_INPUT_KEYS,
  useOptions: function useOptions(options, _ref) {
    var name = _ref.name;
    return _objectSpread2(_objectSpread2({}, options), {}, {
      name: options.name || name
    });
  },
  useProps: function useProps(options, _ref2) {
    var htmlOnChange = _ref2.onChange,
        htmlOnBlur = _ref2.onBlur,
        htmlProps = _objectWithoutPropertiesLoose(_ref2, ["onChange", "onBlur"]);

    var onChangeRef = useLiveRef(htmlOnChange);
    var onBlurRef = useLiveRef(htmlOnBlur);
    var onChange = useCallback(function (event) {
      var _onChangeRef$current, _options$update;

      (_onChangeRef$current = onChangeRef.current) === null || _onChangeRef$current === void 0 ? void 0 : _onChangeRef$current.call(onChangeRef, event);
      if (event.defaultPrevented) return;
      (_options$update = options.update) === null || _options$update === void 0 ? void 0 : _options$update.call(options, options.name, event.target.value);
    }, [options.update, options.name]);
    var onBlur = useCallback(function (event) {
      var _onBlurRef$current, _options$blur;

      (_onBlurRef$current = onBlurRef.current) === null || _onBlurRef$current === void 0 ? void 0 : _onBlurRef$current.call(onBlurRef, event);
      if (event.defaultPrevented) return;
      (_options$blur = options.blur) === null || _options$blur === void 0 ? void 0 : _options$blur.call(options, options.name);
    }, [options.blur, options.name]);
    return _objectSpread2({
      id: getInputId(options.name, options.baseId),
      name: formatInputName(options.name),
      value: unstable_getIn(options.values, options.name, ""),
      "aria-describedby": getMessageId(options.name, options.baseId),
      "aria-labelledby": getLabelId(options.name, options.baseId),
      "aria-invalid": shouldShowError(options, options.name),
      onChange: onChange,
      onBlur: onBlur
    }, htmlProps);
  }
});
var unstable_FormInput = createComponent({
  as: "input",
  memo: true,
  useHook: unstable_useFormInput
});

export { unstable_FormInput, unstable_useFormInput };
