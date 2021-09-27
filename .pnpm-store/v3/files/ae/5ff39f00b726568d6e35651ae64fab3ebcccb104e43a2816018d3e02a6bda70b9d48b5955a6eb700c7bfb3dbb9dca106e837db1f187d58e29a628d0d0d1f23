import {
  SealedInitialState,
  useSealedState,
} from "reakit-utils/useSealedState";
import {
  unstable_ComboboxListGridState as ComboboxListGridState,
  unstable_ComboboxListGridActions as ComboboxListGridActions,
  unstable_ComboboxListGridInitialState as ComboboxListGridInitialState,
  unstable_useComboboxListGridState as useComboboxListGridState,
} from "./ComboboxListGridState";
import {
  ComboboxPopoverState,
  ComboboxPopoverActions,
  ComboboxPopoverInitialState,
  useComboboxPopoverState,
} from "./__utils/ComboboxPopoverState";

export function unstable_useComboboxGridState(
  initialState: SealedInitialState<unstable_ComboboxGridInitialState> = {}
): unstable_ComboboxGridStateReturn {
  const sealed = useSealedState(initialState);
  const combobox = useComboboxListGridState(sealed);
  return useComboboxPopoverState(combobox, sealed);
}

export type unstable_ComboboxGridState = ComboboxPopoverState &
  ComboboxListGridState;

export type unstable_ComboboxGridActions = ComboboxPopoverActions &
  ComboboxListGridActions;

export type unstable_ComboboxGridInitialState = ComboboxPopoverInitialState &
  ComboboxListGridInitialState;

export type unstable_ComboboxGridStateReturn = unstable_ComboboxGridState &
  unstable_ComboboxGridActions;
