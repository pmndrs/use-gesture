import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { useBox } from '../Box/Box.js';
import { useWarning } from 'reakit-warning';
import { useCreateElement } from 'reakit-system/useCreateElement';
import { d as COMBOBOX_LIST_KEYS } from '../__keys-0f89298f.js';
import { g as getMenuId } from '../getMenuId-34730bd3.js';

var unstable_useComboboxList = createHook({
  name: "ComboboxList",
  compose: useBox,
  keys: COMBOBOX_LIST_KEYS,
  useOptions: function useOptions(_ref) {
    var _ref$menuRole = _ref.menuRole,
        menuRole = _ref$menuRole === void 0 ? "listbox" : _ref$menuRole,
        options = _objectWithoutPropertiesLoose(_ref, ["menuRole"]);

    return _objectSpread2({
      menuRole: menuRole
    }, options);
  },
  useProps: function useProps(options, htmlProps) {
    return _objectSpread2({
      role: options.menuRole,
      id: getMenuId(options.baseId)
    }, htmlProps);
  }
});
var unstable_ComboboxList = createComponent({
  as: "div",
  useHook: unstable_useComboboxList,
  useCreateElement: function useCreateElement$1(type, props, children) {
    process.env.NODE_ENV !== "production" ? useWarning(!props["aria-label"] && !props["aria-labelledby"], "You should provide either `aria-label` or `aria-labelledby` props.", "See https://reakit.io/docs/combobox") : void 0;
    return useCreateElement(type, props, children);
  }
});

export { unstable_ComboboxList, unstable_useComboboxList };
