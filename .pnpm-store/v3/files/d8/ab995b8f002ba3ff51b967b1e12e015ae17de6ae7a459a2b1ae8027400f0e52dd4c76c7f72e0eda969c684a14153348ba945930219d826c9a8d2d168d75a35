import { a as _objectSpread2, _ as _objectWithoutPropertiesLoose } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import '../Box/Box.js';
import 'react';
import 'reakit-utils/useForkRef';
import 'reakit-utils/isButton';
import { useWarning } from 'reakit-warning';
import 'reakit-utils/useLiveRef';
import 'reakit-utils/isSelfTarget';
import 'reakit-utils/useIsomorphicEffect';
import 'reakit-utils/hasFocusWithin';
import 'reakit-utils/tabbable';
import '../Role/Role.js';
import 'reakit-utils/useUpdateEffect';
import { useCreateElement } from 'reakit-system/useCreateElement';
import 'reakit-utils/getDocument';
import 'reakit-utils/canUseDOM';
import 'reakit-utils/getNextActiveElementOnBlur';
import { f as COMBOBOX_POPOVER_KEYS } from '../__keys-0f89298f.js';
import '../getMenuId-34730bd3.js';
import 'reakit-utils/ensureFocus';
import { unstable_useComboboxList } from './ComboboxList.js';
import '../__keys-e6a5cfbe.js';
import '../Disclosure/DisclosureContent.js';
import 'react-dom';
import '../Portal/Portal.js';
import 'reakit-utils/removeItemFromArray';
import '../MenuContext-6af6cf92.js';
import '../Dialog/Dialog.js';
import 'body-scroll-lock';
import 'reakit-utils/closest';
import 'reakit-utils/getActiveElement';
import 'reakit-utils/contains';
import '../DialogBackdropContext-8775f78b.js';
import 'reakit-utils/isEmpty';
import '../__keys-ed7b48af.js';
import '../__keys-26bb1730.js';
import { usePopover } from '../Popover/Popover.js';

var unstable_useComboboxPopover = createHook({
  name: "ComboboxPopover",
  compose: [unstable_useComboboxList, usePopover],
  keys: COMBOBOX_POPOVER_KEYS,
  useOptions: function useOptions(options) {
    return _objectSpread2(_objectSpread2({}, options), {}, {
      unstable_disclosureRef: options.unstable_referenceRef,
      unstable_autoFocusOnShow: false,
      unstable_autoFocusOnHide: false
    });
  },
  useComposeProps: function useComposeProps(options, _ref) {
    var tabIndex = _ref.tabIndex,
        htmlProps = _objectWithoutPropertiesLoose(_ref, ["tabIndex"]);

    htmlProps = unstable_useComboboxList(options, htmlProps, true);
    htmlProps = usePopover(options, htmlProps, true);
    return _objectSpread2(_objectSpread2({}, htmlProps), {}, {
      tabIndex: tabIndex != null ? tabIndex : undefined
    });
  }
});
var unstable_ComboboxPopover = createComponent({
  as: "div",
  useHook: unstable_useComboboxPopover,
  useCreateElement: function useCreateElement$1(type, props, children) {
    process.env.NODE_ENV !== "production" ? useWarning(!props["aria-label"] && !props["aria-labelledby"], "You should provide either `aria-label` or `aria-labelledby` props.", "See https://reakit.io/docs/combobox") : void 0;
    return useCreateElement(type, props, children);
  }
});

export { unstable_ComboboxPopover, unstable_useComboboxPopover };
