import * as React from "react";
import { SealedInitialState } from "reakit-utils/useSealedState";
import { CompositeState, CompositeActions, CompositeInitialState } from "../Composite";
export declare type RadioState = CompositeState & {
    /**
     * The `value` attribute of the current checked radio.
     */
    state: string | number | undefined;
};
export declare type RadioActions = CompositeActions & {
    /**
     * Sets `state`.
     */
    setState: React.Dispatch<React.SetStateAction<string | number | undefined>>;
};
export declare type RadioInitialState = CompositeInitialState & Partial<Pick<RadioState, "state">>;
export declare type RadioStateReturn = RadioState & RadioActions;
export declare function useRadioState(initialState?: SealedInitialState<RadioInitialState>): RadioStateReturn;
