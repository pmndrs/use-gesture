import { _ as _objectWithoutPropertiesLoose } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import { shallowEqual } from 'reakit-utils/shallowEqual';

// Automatically generated
var ROLE_KEYS = ["unstable_system"];

var useRole = createHook({
  name: "Role",
  keys: ROLE_KEYS,
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
var Role = createComponent({
  as: "div",
  useHook: useRole
});

export { Role, useRole };
