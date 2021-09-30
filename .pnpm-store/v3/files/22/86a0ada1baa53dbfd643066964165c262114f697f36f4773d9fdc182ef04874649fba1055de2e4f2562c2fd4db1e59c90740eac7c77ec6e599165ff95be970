import {
  SealedInitialState,
  useSealedState,
} from "reakit-utils/useSealedState";
import {
  useCompositeState,
  CompositeState,
  CompositeActions,
  CompositeInitialState,
} from "../Composite/CompositeState";

export type unstable_GridState = CompositeState;

export type unstable_GridActions = CompositeActions;

export type unstable_GridInitialState = CompositeInitialState;

export type unstable_GridStateReturn = unstable_GridState &
  unstable_GridActions;

export function unstable_useGridState(
  initialState: SealedInitialState<unstable_GridInitialState> = {}
): unstable_GridStateReturn {
  const sealed = useSealedState(initialState);
  return useCompositeState(sealed);
}
