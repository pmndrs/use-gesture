/**
 * Compares two objects.
 *
 * @example
 * import { shallowEqual } from "reakit-utils";
 *
 * shallowEqual({ a: "a" }, {}); // false
 * shallowEqual({ a: "a" }, { b: "b" }); // false
 * shallowEqual({ a: "a" }, { a: "a" }); // true
 * shallowEqual({ a: "a" }, { a: "a", b: "b" }); // false
 */
function shallowEqual(objA, objB) {
  if (objA === objB) return true;
  if (!objA) return false;
  if (!objB) return false;
  if (typeof objA !== "object") return false;
  if (typeof objB !== "object") return false;
  var aKeys = Object.keys(objA);
  var bKeys = Object.keys(objB);
  var length = aKeys.length;
  if (bKeys.length !== length) return false;

  for (var _i = 0, _aKeys = aKeys; _i < _aKeys.length; _i++) {
    var key = _aKeys[_i];

    if (objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
}

export { shallowEqual };
