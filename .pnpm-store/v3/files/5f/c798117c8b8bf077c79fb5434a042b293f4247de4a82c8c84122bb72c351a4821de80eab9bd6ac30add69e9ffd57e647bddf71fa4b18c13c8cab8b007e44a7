import { isObject } from './isObject.js';

/**
 * Checks whether `arg` is a plain object or not.
 *
 * @returns {boolean}
 */

function isPlainObject(arg) {
  var _proto$constructor;

  if (!isObject(arg)) return false;
  var proto = Object.getPrototypeOf(arg);
  if (proto == null) return true;
  return ((_proto$constructor = proto.constructor) === null || _proto$constructor === void 0 ? void 0 : _proto$constructor.toString()) === Object.toString();
}

export { isPlainObject };
