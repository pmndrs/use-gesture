import { b as _createForOfIteratorHelperLoose } from '../../_rollupPluginBabelHelpers-1f0bf8c2.js';

function unstable_getIn(object, path, defaultValue) {
  if (typeof path === "string") {
    return object[path] == null ? defaultValue : object[path];
  }

  var result = object;

  for (var _iterator = _createForOfIteratorHelperLoose(path), _step; !(_step = _iterator()).done;) {
    var key = _step.value;
    if (!(key in result)) return defaultValue;
    result = result[key];
  }

  if (result == null) {
    return defaultValue;
  }

  return result;
}

export { unstable_getIn };
