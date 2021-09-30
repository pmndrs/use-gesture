import { SealedInitialState } from "reakit-utils/useSealedState";
import { CompositeState, CompositeActions, CompositeInitialState } from "../Composite";
export declare type MenuBarState = CompositeState & {
    /**
     * Stores the values of radios and checkboxes within the menu.
     */
    unstable_values: Record<string, any>;
};
export declare type MenuBarActions = CompositeActions & {
    /**
     * Updates checkboxes and radios values within the menu.
     */
    unstable_setValue: (name: string, value?: any) => void;
};
export declare type MenuBarInitialState = CompositeInitialState & Partial<Pick<MenuBarState, "unstable_values">>;
export declare type MenuBarStateReturn = MenuBarState & MenuBarActions;
export declare function useMenuBarState(initialState?: SealedInitialState<MenuBarInitialState>): MenuBarStateReturn;
