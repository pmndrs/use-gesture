import * as React from "react";
import { SealedInitialState } from "reakit-utils/useSealedState";
import { DialogState, DialogActions, DialogInitialState, DialogStateReturn } from "../Dialog/DialogState";
declare type Placement = "auto-start" | "auto" | "auto-end" | "top-start" | "top" | "top-end" | "right-start" | "right" | "right-end" | "bottom-end" | "bottom" | "bottom-start" | "left-end" | "left" | "left-start";
export declare type PopoverState = DialogState & {
    /**
     * The reference element.
     */
    unstable_referenceRef: React.RefObject<HTMLElement | null>;
    /**
     * The popover element.
     * @private
     */
    unstable_popoverRef: React.RefObject<HTMLElement | null>;
    /**
     * The arrow element.
     * @private
     */
    unstable_arrowRef: React.RefObject<HTMLElement | null>;
    /**
     * Popover styles.
     * @private
     */
    unstable_popoverStyles: React.CSSProperties;
    /**
     * Arrow styles.
     * @private
     */
    unstable_arrowStyles: React.CSSProperties;
    /**
     * `placement` passed to the hook.
     * @private
     */
    unstable_originalPlacement: Placement;
    /**
     * @private
     */
    unstable_update: () => boolean;
    /**
     * Actual `placement`.
     */
    placement: Placement;
};
export declare type PopoverActions = DialogActions & {
    /**
     * Change the `placement` state.
     */
    place: React.Dispatch<React.SetStateAction<Placement>>;
};
export declare type PopoverInitialState = DialogInitialState & Partial<Pick<PopoverState, "placement">> & {
    /**
     * Whether or not the popover should have `position` set to `fixed`.
     */
    unstable_fixed?: boolean;
    /**
     * Flip the popover's placement when it starts to overlap its reference
     * element.
     */
    unstable_flip?: boolean;
    /**
     * Offset between the reference and the popover: [main axis, alt axis]. Should not be combined with `gutter`.
     */
    unstable_offset?: [number | string, number | string];
    /**
     * Offset between the reference and the popover on the main axis. Should not be combined with `unstable_offset`.
     */
    gutter?: number;
    /**
     * Prevents popover from being positioned outside the boundary.
     */
    unstable_preventOverflow?: boolean;
};
export declare type PopoverStateReturn = DialogStateReturn & PopoverState & PopoverActions;
export declare function usePopoverState(initialState?: SealedInitialState<PopoverInitialState>): PopoverStateReturn;
export {};
