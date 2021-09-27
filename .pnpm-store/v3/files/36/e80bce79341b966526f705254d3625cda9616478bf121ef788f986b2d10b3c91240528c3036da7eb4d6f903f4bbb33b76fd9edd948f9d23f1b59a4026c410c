'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-8f9a8751.js');
var isObject = require('reakit-utils/isObject');

/**
 * Transforms [{ a: "a" }, { a: "b" }] into { a: ["a", "b"] }
 */
function reduceObjects(objects, filter) {
  var result = {};

  for (var _iterator = _rollupPluginBabelHelpers._createForOfIteratorHelperLoose(objects), _step; !(_step = _iterator()).done;) {
    var object = _step.value;
    var keys = Object.keys(object);

    for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
      var _key = _keys[_i];
      // eslint-disable-next-line no-continue
      if (filter && !filter(object[_key], _key)) continue;

      var _value = result[_key] || [];

      result[_key] = [].concat(_value, [object[_key]]);
    }
  }

  return result;
}

function mergeFunctionsInObjects(objects) {
  var object = reduceObjects(objects, function (value) {
    return typeof value === "function";
  });
  var keys = Object.keys(object);
  var result = {};

  for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
    var key = _keys[_i];
    var fns = object[key];
    result[key] = fns.length === 1 ? fns[0] : fns.reduce(function (lastHook, currHook) {
      return function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return currHook.apply(void 0, args.slice(0, -1).concat([lastHook.apply(void 0, args)]));
      };
    });
  }

  return result;
}

function mergeObjectsInObjects(systems) {
  var object = reduceObjects(systems, isObject.isObject);
  var keys = Object.keys(object);
  var result = {};

  for (var _i2 = 0, _keys2 = keys; _i2 < _keys2.length; _i2++) {
    var key = _keys2[_i2];
    var values = object[key];
    result[key] = Object.assign.apply(Object, [{}].concat(values));
  }

  return result;
}
/**
 * Merges multiple system objects into a single system object.
 *
 * @example
 * import { Provider } from "reakit";
 * import { mergeSystem } from "reakit-system";
 * import * as bootstrapSystem from "reakit-system-bootstrap";
 *
 * const mySystem = {
 *   useButtonProps() {},
 * };
 *
 * const system = mergeSystem(bootstrapSystem, mySystem);
 *
 * function App() {
 *   return (
 *     <Provider unstable_system={system}>
 *       <div>App</div>
 *     </Provider>
 *   );
 * }
 */


function mergeSystem() {
  for (var _len2 = arguments.length, systems = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    systems[_key2] = arguments[_key2];
  }

  return Object.assign.apply(Object, [{}].concat(systems, [mergeObjectsInObjects(systems), mergeFunctionsInObjects(systems)]));
}

exports.mergeSystem = mergeSystem;
