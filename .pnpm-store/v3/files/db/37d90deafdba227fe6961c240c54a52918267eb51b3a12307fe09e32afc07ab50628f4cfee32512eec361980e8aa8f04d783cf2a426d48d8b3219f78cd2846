import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import 'react';
import { useForkRef } from 'reakit-utils/useForkRef';
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
import 'reakit-utils/ensureFocus';
import '../__keys-e6a5cfbe.js';
import '../Disclosure/DisclosureContent.js';
import 'react-dom';
import '../Portal/Portal.js';
import 'reakit-utils/removeItemFromArray';
import '../MenuContext-6af6cf92.js';
import { useDialog } from '../Dialog/Dialog.js';
import 'body-scroll-lock';
import 'reakit-utils/closest';
import 'reakit-utils/getActiveElement';
import 'reakit-utils/contains';
import '../DialogBackdropContext-8775f78b.js';
import 'reakit-utils/isEmpty';
import '../__keys-ed7b48af.js';
import { P as POPOVER_KEYS } from '../__keys-26bb1730.js';

var usePopover = createHook({
  name: "Popover",
  compose: useDialog,
  keys: POPOVER_KEYS,
  useOptions: function useOptions(_ref) {
    var _ref$modal = _ref.modal,
        modal = _ref$modal === void 0 ? false : _ref$modal,
        options = _objectWithoutPropertiesLoose(_ref, ["modal"]);

    return _objectSpread2({
      modal: modal
    }, options);
  },
  useProps: function useProps(options, _ref2) {
    var htmlRef = _ref2.ref,
        htmlStyle = _ref2.style,
        htmlProps = _objectWithoutPropertiesLoose(_ref2, ["ref", "style"]);

    return _objectSpread2({
      ref: useForkRef(options.unstable_popoverRef, htmlRef),
      style: _objectSpread2(_objectSpread2({}, options.unstable_popoverStyles), htmlStyle)
    }, htmlProps);
  }
});
var Popover = createComponent({
  as: "div",
  useHook: usePopover,
  useCreateElement: function useCreateElement$1(type, props, children) {
    process.env.NODE_ENV !== "production" ? useWarning(!props["aria-label"] && !props["aria-labelledby"], "You should provide either `aria-label` or `aria-labelledby` props.", "See https://reakit.io/docs/popover") : void 0;
    return useCreateElement(type, props, children);
  }
});

export { Popover, usePopover };
