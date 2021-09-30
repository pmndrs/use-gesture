import * as React from "react";
import { PopoverState, PopoverActions, PopoverInitialState } from "../../Popover/PopoverState";
import { unstable_ComboboxListStateReturn as ComboboxListStateReturn } from "../ComboboxListState";
import { unstable_ComboboxListGridStateReturn as ComboboxListGridStateReturn } from "../ComboboxListGridState";
export declare function useComboboxPopoverState<T extends ComboboxListStateReturn | ComboboxListGridStateReturn>(combobox: T, { gutter, placement, ...initialState }?: ComboboxPopoverInitialState): T & import("../..").unstable_IdState & {
    visible: boolean;
    animated: number | boolean;
    animating: boolean;
} & import("../..").unstable_IdActions & {
    show: () => void;
    hide: () => void;
    toggle: () => void;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setAnimated: React.Dispatch<React.SetStateAction<number | boolean>>;
    stopAnimation: () => void;
} & {
    modal: boolean;
    unstable_disclosureRef: React.MutableRefObject<HTMLElement | null>;
} & {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
} & {
    unstable_referenceRef: React.RefObject<HTMLElement | null>;
    unstable_popoverRef: React.RefObject<HTMLElement | null>;
    unstable_arrowRef: React.RefObject<HTMLElement | null>;
    unstable_popoverStyles: React.CSSProperties;
    unstable_arrowStyles: React.CSSProperties;
    unstable_originalPlacement: import("@popperjs/core").Placement;
    unstable_update: () => boolean;
    placement: import("@popperjs/core").Placement;
} & {
    visible: boolean;
    place: React.Dispatch<React.SetStateAction<import("@popperjs/core").Placement>>;
};
export declare type ComboboxPopoverState = PopoverState;
export declare type ComboboxPopoverActions = PopoverActions;
export declare type ComboboxPopoverInitialState = PopoverInitialState;
export declare type ComboboxPopoverStateReturn = ComboboxPopoverState & ComboboxPopoverActions;
