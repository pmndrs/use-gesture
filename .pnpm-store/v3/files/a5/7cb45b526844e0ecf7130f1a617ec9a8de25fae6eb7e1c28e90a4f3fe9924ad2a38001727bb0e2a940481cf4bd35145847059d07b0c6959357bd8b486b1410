import '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import 'reakit-utils/shallowEqual';
import 'react';
import 'reakit-warning';
import 'reakit-utils/useIsomorphicEffect';
import 'reakit-utils/dom';
import { useSealedState } from 'reakit-utils/useSealedState';
import 'reakit-utils/getDocument';
import '../reverse-30eaa122.js';
import '../getCurrentId-5aa9849e.js';
import '../findEnabledItemById-8ddca752.js';
import '../Id/IdProvider.js';
import 'reakit-utils/applyState';
import '../Id/IdState.js';
import '../Composite/CompositeState.js';
import '../Grid/GridState.js';
import '../ComboboxBaseState-73fabcba.js';
import { unstable_useComboboxListGridState } from './ComboboxListGridState.js';
import '@popperjs/core';
import '../Disclosure/DisclosureState.js';
import '../Dialog/DialogState.js';
import '../Popover/PopoverState.js';
import { u as useComboboxPopoverState } from '../ComboboxPopoverState-fdc371b4.js';

function unstable_useComboboxGridState(initialState) {
  if (initialState === void 0) {
    initialState = {};
  }

  var sealed = useSealedState(initialState);
  var combobox = unstable_useComboboxListGridState(sealed);
  return useComboboxPopoverState(combobox, sealed);
}

export { unstable_useComboboxGridState };
