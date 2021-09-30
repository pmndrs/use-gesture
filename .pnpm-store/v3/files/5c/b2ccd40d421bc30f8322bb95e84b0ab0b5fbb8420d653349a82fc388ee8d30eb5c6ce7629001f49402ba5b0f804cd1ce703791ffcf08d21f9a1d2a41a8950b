import { a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { useRole } from '../Role/Role.js';
import { e as FORM_MESSAGE_KEYS } from '../__keys-54ad6269.js';
import '../getInputId-aa144169.js';
import { unstable_getIn } from './utils/getIn.js';
import { s as shouldShowError, g as getMessageId } from '../shouldShowError-e8a86b53.js';

function shouldShowMessage(_ref, name) {
  var touched = _ref.touched,
      messages = _ref.messages;
  return !!(unstable_getIn(touched, name) && unstable_getIn(messages, name));
}

var unstable_useFormMessage = createHook({
  name: "FormMessage",
  compose: useRole,
  keys: FORM_MESSAGE_KEYS,
  useProps: function useProps(options, htmlProps) {
    var children = shouldShowError(options, options.name) ? unstable_getIn(options.errors, options.name) : undefined;
    children = children || (shouldShowMessage(options, options.name) ? unstable_getIn(options.messages, options.name) : undefined);
    return _objectSpread2({
      role: "alert",
      id: getMessageId(options.name, options.baseId),
      children: children
    }, htmlProps);
  }
});
var unstable_FormMessage = createComponent({
  as: "div",
  memo: true,
  useHook: unstable_useFormMessage
});

export { unstable_FormMessage, unstable_useFormMessage };
