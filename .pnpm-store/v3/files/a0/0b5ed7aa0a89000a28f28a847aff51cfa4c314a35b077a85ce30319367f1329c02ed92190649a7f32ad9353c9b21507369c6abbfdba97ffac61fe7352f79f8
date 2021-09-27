import * as React from "react";
import { SealedInitialState } from "reakit-utils/useSealedState";
import { DisclosureState, DisclosureActions, DisclosureInitialState, DisclosureStateReturn } from "../Disclosure/DisclosureState";
export declare type DialogState = DisclosureState & {
    /**
     * Toggles Dialog's `modal` state.
     *   - Non-modal: `preventBodyScroll` doesn't work and focus is free.
     *   - Modal: `preventBodyScroll` is automatically enabled, focus is
     * trapped within the dialog and the dialog is rendered within a `Portal`
     * by default.
     */
    modal: boolean;
    /**
     * @private
     */
    unstable_disclosureRef: React.MutableRefObject<HTMLElement | null>;
};
export declare type DialogActions = DisclosureActions & {
    /**
     * Sets `modal`.
     */
    setModal: React.Dispatch<React.SetStateAction<DialogState["modal"]>>;
};
export declare type DialogInitialState = DisclosureInitialState & Partial<Pick<DialogState, "modal">>;
export declare type DialogStateReturn = DisclosureStateReturn & DialogState & DialogActions;
export declare function useDialogState(initialState?: SealedInitialState<DialogInitialState>): DialogStateReturn;
