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
import 'reakit-utils/removeIndexFromArray';
import 'reakit-utils/createEvent';
import { useCheckbox } from '../Checkbox/Checkbox.js';
import { a as FORM_CHECKBOX_KEYS } from '../__keys-54ad6269.js';
import { f as formatInputName, g as getInputId } from '../getInputId-aa144169.js';
import { g as getLabelId } from '../getLabelId-3db05e97.js';
import { unstable_getIn } from './utils/getIn.js';
import { s as shouldShowError, g as getMessageId } from '../shouldShowError-e8a86b53.js';

var unstable_useFormCheckbox = createHook({
  name: "FormCheckbox",
  compose: useCheckbox,
  keys: FORM_CHECKBOX_KEYS,
  useOptions: function useOptions(options, htmlProps) {
    var name = options.name || htmlProps.name;
    var value = typeof options.value !== "undefined" ? options.value : htmlProps.value;
    var state = unstable_getIn(options.values, name);

    var setState = function setState(val) {
      return options.update(name, val);
    };

    return _objectSpread2(_objectSpread2({}, options), {}, {
      state: state,
      setState: setState,
      name: name,
      value: value
    });
  },
  useProps: function useProps(options, _ref) {
    var htmlOnBlur = _ref.onBlur,
        htmlProps = _objectWithoutPropertiesLoose(_ref, ["onBlur"]);

    var onBlurRef = useLiveRef(htmlOnBlur);
    var isBoolean = typeof options.value === "undefined";
    var onBlur = useCallback(function (event) {
      var _onBlurRef$current, _options$blur;

      (_onBlurRef$current = onBlurRef.current) === null || _onBlurRef$current === void 0 ? void 0 : _onBlurRef$current.call(onBlurRef, event);
      if (event.defaultPrevented) return;
      (_options$blur = options.blur) === null || _options$blur === void 0 ? void 0 : _options$blur.call(options, options.name);
    }, [options.blur, options.name]);
    return _objectSpread2(_objectSpread2({
      "aria-invalid": shouldShowError(options, options.name),
      name: formatInputName(options.name),
      onBlur: onBlur
    }, isBoolean ? {
      id: getInputId(options.name, options.baseId),
      "aria-describedby": getMessageId(options.name, options.baseId),
      "aria-labelledby": getLabelId(options.name, options.baseId)
    } : {}), htmlProps);
  }
});
var unstable_FormCheckbox = createComponent({
  as: "input",
  memo: true,
  useHook: unstable_useFormCheckbox
});

export { unstable_FormCheckbox, unstable_useFormCheckbox };
