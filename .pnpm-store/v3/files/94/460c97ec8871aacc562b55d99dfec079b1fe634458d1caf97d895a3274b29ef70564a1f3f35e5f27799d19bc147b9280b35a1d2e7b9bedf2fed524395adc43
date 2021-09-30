import * as React from "react";
import { SealedInitialState } from "reakit-utils/useSealedState";
import { PopoverState, PopoverActions, PopoverInitialState, PopoverStateReturn } from "../Popover/PopoverState";
export declare type TooltipState = Omit<PopoverState, "modal"> & {
    /**
     * @private
     */
    unstable_timeout: number;
};
export declare type TooltipActions = Omit<PopoverActions, "setModal"> & {
    /**
     * @private
     */
    unstable_setTimeout: React.Dispatch<React.SetStateAction<TooltipState["unstable_timeout"]>>;
};
export declare type TooltipInitialState = Omit<PopoverInitialState, "modal"> & Pick<Partial<TooltipState>, "unstable_timeout">;
export declare type TooltipStateReturn = Omit<PopoverStateReturn, "modal" | "setModal"> & TooltipState & TooltipActions;
export declare function useTooltipState(initialState?: SealedInitialState<TooltipInitialState>): TooltipStateReturn;
