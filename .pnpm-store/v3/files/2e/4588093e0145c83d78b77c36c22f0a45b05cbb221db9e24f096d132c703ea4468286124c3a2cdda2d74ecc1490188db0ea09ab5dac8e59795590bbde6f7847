import { SealedInitialState } from "reakit-utils/useSealedState";
import { PopoverState, PopoverActions, PopoverInitialState, PopoverStateReturn } from "../Popover/PopoverState";
import { MenuBarState, MenuBarActions, MenuBarInitialState, MenuBarStateReturn } from "./MenuBarState";
export declare type MenuState = MenuBarState & PopoverState;
export declare type MenuActions = MenuBarActions & PopoverActions;
export declare type MenuInitialState = MenuBarInitialState & PopoverInitialState;
export declare type MenuStateReturn = MenuBarStateReturn & PopoverStateReturn & MenuState & MenuActions;
export declare function useMenuState(initialState?: SealedInitialState<MenuInitialState>): MenuStateReturn;
