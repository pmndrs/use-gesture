import { _ as _objectWithoutPropertiesLoose } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import { shallowEqual } from 'reakit-utils/shallowEqual';

// Automatically generated
var BOX_KEYS = ["unstable_system"];

var useBox = createHook({
  name: "Box",
  keys: BOX_KEYS,
  propsAreEqual: function propsAreEqual(prev, next) {
    var prevSystem = prev.unstable_system,
        prevProps = _objectWithoutPropertiesLoose(prev, ["unstable_system"]);

    var nextSystem = next.unstable_system,
        nextProps = _objectWithoutPropertiesLoose(next, ["unstable_system"]);

    if (prevSystem !== nextSystem && !shallowEqual(prevSystem, nextSystem)) {
      return false;
    }

    return shallowEqual(prevProps, nextProps);
  }
});
var Box = createComponent({
  as: "div",
  useHook: useBox
});

export { Box, useBox };
