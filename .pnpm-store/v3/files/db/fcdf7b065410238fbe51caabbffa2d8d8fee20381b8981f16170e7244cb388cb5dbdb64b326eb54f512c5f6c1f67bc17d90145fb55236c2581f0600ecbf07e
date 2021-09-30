import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import 'react';
import { useForkRef } from 'reakit-utils/useForkRef';
import 'reakit-utils/isButton';
import 'reakit-warning';
import 'reakit-utils/useLiveRef';
import 'reakit-utils/isSelfTarget';
import 'reakit-utils/useIsomorphicEffect';
import 'reakit-utils/hasFocusWithin';
import 'reakit-utils/isPortalEvent';
import 'reakit-utils/dom';
import 'reakit-utils/tabbable';
import '../Role/Role.js';
import '../Tabbable/Tabbable.js';
import '../Clickable/Clickable.js';
import '../Button/Button.js';
import '../__keys-e6a5cfbe.js';
import '../__keys-ed7b48af.js';
import { c as POPOVER_DISCLOSURE_KEYS } from '../__keys-26bb1730.js';
import '../Disclosure/Disclosure.js';
import { useDialogDisclosure } from '../Dialog/DialogDisclosure.js';

var usePopoverDisclosure = createHook({
  name: "PopoverDisclosure",
  compose: useDialogDisclosure,
  keys: POPOVER_DISCLOSURE_KEYS,
  useProps: function useProps(options, _ref) {
    var htmlRef = _ref.ref,
        htmlProps = _objectWithoutPropertiesLoose(_ref, ["ref"]);

    return _objectSpread2({
      ref: useForkRef(options.unstable_referenceRef, htmlRef)
    }, htmlProps);
  }
});
var PopoverDisclosure = createComponent({
  as: "button",
  memo: true,
  useHook: usePopoverDisclosure
});

export { PopoverDisclosure, usePopoverDisclosure };
