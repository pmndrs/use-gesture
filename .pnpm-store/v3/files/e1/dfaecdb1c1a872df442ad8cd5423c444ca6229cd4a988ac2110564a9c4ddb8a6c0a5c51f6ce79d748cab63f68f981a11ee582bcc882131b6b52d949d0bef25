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

export type ToolbarState = CompositeState;

export type ToolbarActions = CompositeActions;

export type ToolbarInitialState = CompositeInitialState;

export type ToolbarStateReturn = ToolbarState & ToolbarActions;

export function useToolbarState(
  initialState: SealedInitialState<ToolbarInitialState> = {}
): ToolbarStateReturn {
  const { orientation = "horizontal", ...sealed } = useSealedState(
    initialState
  );
  return useCompositeState({ orientation, ...sealed });
}
