import { a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import '../Box/Box.js';
import 'react';
import 'reakit-utils/useForkRef';
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
import 'reakit-utils/getDocument';
import '../getCurrentId-5aa9849e.js';
import '../__keys-6742f591.js';
import '../userFocus-e16425e3.js';
import { e as COMBOBOX_OPTION_KEYS } from '../__keys-0f89298f.js';
import 'reakit-utils/isTextField';
import 'reakit-utils/ensureFocus';
import '../Id/IdProvider.js';
import '../Id/Id.js';
import 'reakit-utils/fireEvent';
import '../setTextFieldValue-0a221f4e.js';
import { useCompositeItem } from '../Composite/CompositeItem.js';
import { unstable_useComboboxItem } from './ComboboxItem.js';

var unstable_useComboboxOption = createHook({
  name: "ComboboxOption",
  compose: [unstable_useComboboxItem, useCompositeItem],
  keys: COMBOBOX_OPTION_KEYS,
  useProps: function useProps(_, htmlProps) {
    return _objectSpread2({
      role: "option"
    }, htmlProps);
  }
});
var unstable_ComboboxOption = createComponent({
  as: "div",
  memo: true,
  useHook: unstable_useComboboxOption
});

export { unstable_ComboboxOption, unstable_useComboboxOption };
