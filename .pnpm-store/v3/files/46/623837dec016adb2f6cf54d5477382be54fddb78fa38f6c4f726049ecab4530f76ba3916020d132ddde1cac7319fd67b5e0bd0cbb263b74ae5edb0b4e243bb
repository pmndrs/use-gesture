import { isObject } from 'reakit-utils/isObject';

function unstable_setAllIn(object, value) {
  var typedObject = object;
  var result = {};
  var keys = Object.keys(object);

  for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
    var key = _keys[_i];
    var val = typedObject[key];

    if (Array.isArray(val)) {
      result[key] = val.map(function (v) {
        if (isObject(v)) {
          return unstable_setAllIn(v, value);
        }

        return value;
      });
    } else if (isObject(val)) {
      result[key] = unstable_setAllIn(val, value);
    } else {
      result[key] = value;
    }
  }

  return result;
}

export { unstable_setAllIn };
