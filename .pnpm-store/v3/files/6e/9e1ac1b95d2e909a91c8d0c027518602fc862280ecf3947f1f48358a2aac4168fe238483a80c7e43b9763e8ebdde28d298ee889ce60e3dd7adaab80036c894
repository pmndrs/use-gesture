import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import 'react';
import 'reakit-utils/useLiveRef';
import 'reakit-utils/isSelfTarget';
import 'reakit-utils/useIsomorphicEffect';
import '../Role/Role.js';
import 'reakit-utils/canUseDOM';
import '../__keys-e6a5cfbe.js';
import '../Disclosure/DisclosureContent.js';
import 'react-dom';
import '../Portal/Portal.js';
import '../DialogBackdropContext-8775f78b.js';
import '../__keys-ed7b48af.js';
import { b as POPOVER_BACKDROP_KEYS } from '../__keys-26bb1730.js';
import { useDialogBackdrop } from '../Dialog/DialogBackdrop.js';

var usePopoverBackdrop = createHook({
  name: "PopoverBackdrop",
  compose: useDialogBackdrop,
  keys: POPOVER_BACKDROP_KEYS,
  useOptions: function useOptions(_ref) {
    var _ref$modal = _ref.modal,
        modal = _ref$modal === void 0 ? false : _ref$modal,
        options = _objectWithoutPropertiesLoose(_ref, ["modal"]);

    return _objectSpread2({
      modal: modal
    }, options);
  }
});
var PopoverBackdrop = createComponent({
  as: "div",
  memo: true,
  useHook: usePopoverBackdrop
});

export { PopoverBackdrop, usePopoverBackdrop };
