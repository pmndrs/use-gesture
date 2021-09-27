import { a as _objectSpread2 } from '../../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { toArray } from 'reakit-utils/toArray';
import { isInteger } from 'reakit-utils/isInteger';

function unstable_setIn(object, path, value) {
  var _objectSpread2$1;

  var pathArray = toArray(path);
  var key = pathArray[0],
      keys = pathArray.slice(1);
  if (key == null) return object;
  var obj = isInteger(key) ? object || [] : object || {};
  var result = keys.length ? unstable_setIn(obj[key], keys, value) : value;

  if (isInteger(key)) {
    if (object) {
      return [].concat(object.slice(0, Number(key)), [result], object.slice(Number(key) + 1));
    }

    return [result];
  }

  return _objectSpread2(_objectSpread2({}, object), {}, (_objectSpread2$1 = {}, _objectSpread2$1[key] = result, _objectSpread2$1));
}

export { unstable_setIn };
