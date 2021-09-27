import { b as _createForOfIteratorHelperLoose } from './_rollupPluginBabelHelpers-1f0bf8c2.js';

/**
 * Transforms an array with multiple levels into a flattened one.
 *
 * @example
 * import { flatten } from "reakit-utils";
 *
 * flatten([0, 1, [2, [3, 4], 5], 6]);
 * // => [0, 1, 2, 3, 4, 5, 6]
 */
function flatten(array) {
  var flat = [];

  for (var _iterator = _createForOfIteratorHelperLoose(array), _step; !(_step = _iterator()).done;) {
    var maybeArray = _step.value;

    if (Array.isArray(maybeArray)) {
      flat.push.apply(flat, flatten(maybeArray));
    } else {
      flat.push(maybeArray);
    }
  }

  return flat;
}

export { flatten };
