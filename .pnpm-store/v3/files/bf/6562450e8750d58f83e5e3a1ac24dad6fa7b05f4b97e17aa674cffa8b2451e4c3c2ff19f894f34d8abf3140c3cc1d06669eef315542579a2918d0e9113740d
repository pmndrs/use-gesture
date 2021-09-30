import {
  SealedInitialState,
  useSealedState,
} from "reakit-utils/useSealedState";
import {
  unstable_ComboboxListState as ComboboxListState,
  unstable_ComboboxListActions as ComboboxListActions,
  unstable_ComboboxListInitialState as ComboboxListInitialState,
  unstable_useComboboxListState as useComboboxListState,
} from "./ComboboxListState";
import {
  ComboboxPopoverState,
  ComboboxPopoverActions,
  ComboboxPopoverInitialState,
  useComboboxPopoverState,
} from "./__utils/ComboboxPopoverState";

export function unstable_useComboboxState(
  initialState: SealedInitialState<unstable_ComboboxInitialState> = {}
): unstable_ComboboxStateReturn {
  const sealed = useSealedState(initialState);
  const combobox = useComboboxListState(sealed);
  return useComboboxPopoverState(combobox, sealed);
}

export type unstable_ComboboxState = ComboboxPopoverState & ComboboxListState;

export type unstable_ComboboxActions = ComboboxPopoverActions &
  ComboboxListActions;

export type unstable_ComboboxInitialState = ComboboxPopoverInitialState &
  ComboboxListInitialState;

export type unstable_ComboboxStateReturn = unstable_ComboboxState &
  unstable_ComboboxActions;
