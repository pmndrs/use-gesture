import * as React from "react";
import {
  useSealedState,
  SealedInitialState,
} from "reakit-utils/useSealedState";

export type CheckboxState = {
  /**
   * Stores the state of the checkbox.
   * If checkboxes that share this state have defined a `value` prop, it's
   * going to be an array.
   */
  state: boolean | "indeterminate" | Array<number | string>;
};

export type CheckboxActions = {
  /**
   * Sets `state`.
   */
  setState: React.Dispatch<React.SetStateAction<CheckboxState["state"]>>;
};

export type CheckboxInitialState = Partial<Pick<CheckboxState, "state">>;

export type CheckboxStateReturn = CheckboxState & CheckboxActions;

/**
 * As simple as `React.useState(false)`
 */
export function useCheckboxState(
  initialState: SealedInitialState<CheckboxInitialState> = {}
): CheckboxStateReturn {
  const { state: initialValue = false } = useSealedState(initialState);
  const [state, setState] = React.useState(initialValue);
  return { state, setState };
}
