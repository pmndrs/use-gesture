import * as React from "react";
import { SealedInitialState } from "reakit-utils/useSealedState";
import { unstable_IdState, unstable_IdActions, unstable_IdInitialState } from "../Id/IdState";
export declare type DisclosureState = unstable_IdState & {
    /**
     * Whether it's visible or not.
     */
    visible: boolean;
    /**
     * If `true`, `animating` will be set to `true` when `visible` is updated.
     * It'll wait for `stopAnimation` to be called or a CSS transition ends.
     * If `animated` is set to a `number`, `stopAnimation` will be called only
     * after the same number of milliseconds have passed.
     */
    animated: boolean | number;
    /**
     * Whether it's animating or not.
     */
    animating: boolean;
};
export declare type DisclosureActions = unstable_IdActions & {
    /**
     * Changes the `visible` state to `true`
     */
    show: () => void;
    /**
     * Changes the `visible` state to `false`
     */
    hide: () => void;
    /**
     * Toggles the `visible` state
     */
    toggle: () => void;
    /**
     * Sets `visible`.
     */
    setVisible: React.Dispatch<React.SetStateAction<DisclosureState["visible"]>>;
    /**
     * Sets `animated`.
     */
    setAnimated: React.Dispatch<React.SetStateAction<DisclosureState["animated"]>>;
    /**
     * Stops animation. It's called automatically if there's a CSS transition.
     */
    stopAnimation: () => void;
};
export declare type DisclosureInitialState = unstable_IdInitialState & Partial<Pick<DisclosureState, "visible" | "animated">>;
export declare type DisclosureStateReturn = DisclosureState & DisclosureActions;
export declare function useDisclosureState(initialState?: SealedInitialState<DisclosureInitialState>): DisclosureStateReturn;
