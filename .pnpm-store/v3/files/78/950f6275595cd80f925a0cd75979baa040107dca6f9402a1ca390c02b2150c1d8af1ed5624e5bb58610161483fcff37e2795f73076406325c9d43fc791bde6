import * as React from "react";
import { SealedInitialState } from "reakit-utils/useSealedState";
export declare type CheckboxState = {
    /**
     * Stores the state of the checkbox.
     * If checkboxes that share this state have defined a `value` prop, it's
     * going to be an array.
     */
    state: boolean | "indeterminate" | Array<number | string>;
};
export declare type CheckboxActions = {
    /**
     * Sets `state`.
     */
    setState: React.Dispatch<React.SetStateAction<CheckboxState["state"]>>;
};
export declare type CheckboxInitialState = Partial<Pick<CheckboxState, "state">>;
export declare type CheckboxStateReturn = CheckboxState & CheckboxActions;
/**
 * As simple as `React.useState(false)`
 */
export declare function useCheckboxState(initialState?: SealedInitialState<CheckboxInitialState>): CheckboxStateReturn;
