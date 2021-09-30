import { SealedInitialState } from "reakit-utils/useSealedState";
import { SetState } from "reakit-utils/types";
import { unstable_GridState as GridState, unstable_GridActions as GridActions, unstable_GridInitialState as GridInitialState } from "../Grid/GridState";
import { ComboboxBaseState, ComboboxBaseActions, ComboboxBaseInitialState } from "./__utils/ComboboxBaseState";
export declare function unstable_useComboboxListGridState(initialState?: SealedInitialState<unstable_ComboboxListGridInitialState>): unstable_ComboboxListGridStateReturn;
export declare type unstable_ComboboxListGridState = Omit<ComboboxBaseState<GridState>, "matches"> & {
    /**
     * Number of columns by which `values` will be splitted to generate the
     * `matches` 2D array.
     */
    columns: number;
    /**
     * Result of filtering `values` based on `inputValue`.
     * @default []
     * @example
     * const combobox = useComboboxState({
     *   values: ["Red", "Green", "Blue"],
     *   columns: 2,
     * });
     * combobox.matches; // [["Red", "Green"], ["Blue"]]
     * combobox.setInputValue("g");
     * // On next render
     * combobox.matches; // [["Green"]]
     */
    matches: string[][];
};
export declare type unstable_ComboboxListGridActions = ComboboxBaseActions<GridActions> & {
    /**
     * Sets `columns`.
     */
    setColumns: SetState<unstable_ComboboxListGridState["columns"]>;
};
export declare type unstable_ComboboxListGridInitialState = Omit<GridInitialState, "unstable_virtual" | "unstable_includesBaseElement"> & ComboboxBaseInitialState & Pick<Partial<unstable_ComboboxListGridState>, "columns">;
export declare type unstable_ComboboxListGridStateReturn = unstable_ComboboxListGridState & unstable_ComboboxListGridActions;
