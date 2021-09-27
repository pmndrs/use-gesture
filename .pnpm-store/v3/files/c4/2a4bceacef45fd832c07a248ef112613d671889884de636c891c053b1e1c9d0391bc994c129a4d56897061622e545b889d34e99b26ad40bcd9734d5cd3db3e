import * as React from "react";
import { SealedInitialState } from "reakit-utils/useSealedState";
export declare type unstable_IdState = {
    /**
     * ID that will serve as a base for all the items IDs.
     */
    baseId: string;
    /**
     * @private
     */
    unstable_idCountRef: React.MutableRefObject<number>;
};
export declare type unstable_IdActions = {
    /**
     * Sets `baseId`.
     */
    setBaseId: React.Dispatch<React.SetStateAction<string>>;
};
export declare type unstable_IdInitialState = Partial<Pick<unstable_IdState, "baseId">>;
export declare type unstable_IdStateReturn = unstable_IdState & unstable_IdActions;
export declare function unstable_useIdState(initialState?: SealedInitialState<unstable_IdInitialState>): unstable_IdStateReturn;
