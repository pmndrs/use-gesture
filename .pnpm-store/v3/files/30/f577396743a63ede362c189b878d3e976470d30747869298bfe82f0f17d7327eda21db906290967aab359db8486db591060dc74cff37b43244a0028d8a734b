import { a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import '../Role/Role.js';
import { useGroup } from '../Group/Group.js';
import { b as FORM_GROUP_KEYS } from '../__keys-54ad6269.js';
import { g as getInputId } from '../getInputId-aa144169.js';
import { g as getLabelId } from '../getLabelId-3db05e97.js';
import './utils/getIn.js';
import { g as getMessageId, s as shouldShowError } from '../shouldShowError-e8a86b53.js';

var unstable_useFormGroup = createHook({
  name: "FormGroup",
  compose: useGroup,
  keys: FORM_GROUP_KEYS,
  useProps: function useProps(options, htmlProps) {
    return _objectSpread2({
      id: getInputId(options.name, options.baseId),
      tabIndex: -1,
      "aria-describedby": getMessageId(options.name, options.baseId),
      "aria-labelledby": getLabelId(options.name, options.baseId),
      "aria-invalid": shouldShowError(options, options.name)
    }, htmlProps);
  }
});
var unstable_FormGroup = createComponent({
  as: "fieldset",
  useHook: unstable_useFormGroup
});

export { unstable_FormGroup, unstable_useFormGroup };
