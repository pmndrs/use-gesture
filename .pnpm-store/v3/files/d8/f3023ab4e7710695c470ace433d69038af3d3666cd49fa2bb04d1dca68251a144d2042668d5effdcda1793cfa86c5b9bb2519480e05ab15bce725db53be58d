import { a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { useRole } from '../Role/Role.js';
import { d as FORM_LABEL_KEYS } from '../__keys-54ad6269.js';
import { g as getInputId } from '../getInputId-aa144169.js';
import { g as getLabelId } from '../getLabelId-3db05e97.js';

var unstable_useFormLabel = createHook({
  name: "FormLabel",
  compose: useRole,
  keys: FORM_LABEL_KEYS,
  useProps: function useProps(options, htmlProps) {
    return _objectSpread2({
      children: options.label,
      id: getLabelId(options.name, options.baseId),
      htmlFor: getInputId(options.name, options.baseId)
    }, htmlProps);
  }
});
var unstable_FormLabel = createComponent({
  as: "label",
  memo: true,
  useHook: unstable_useFormLabel
});

export { unstable_FormLabel, unstable_useFormLabel };
