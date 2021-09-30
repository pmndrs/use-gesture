import { g as getInputId } from './getInputId-aa144169.js';
import { unstable_getIn } from './Form/utils/getIn.js';

function getMessageId(name, baseId) {
  return getInputId(name, baseId, "-message");
}

function shouldShowError(_ref, name) {
  var touched = _ref.touched,
      errors = _ref.errors;
  return !!(unstable_getIn(touched, name) && unstable_getIn(errors, name));
}

export { getMessageId as g, shouldShowError as s };
