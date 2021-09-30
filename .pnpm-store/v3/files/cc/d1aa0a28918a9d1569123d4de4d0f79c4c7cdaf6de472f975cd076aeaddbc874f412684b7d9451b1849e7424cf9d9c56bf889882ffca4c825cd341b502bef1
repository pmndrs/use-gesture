import * as React from "react";
import {
  SealedInitialState,
  useSealedState,
} from "reakit-utils/useSealedState";
import { SetState } from "reakit-utils/types";
import {
  unstable_useGridState as useGridState,
  unstable_GridState as GridState,
  unstable_GridActions as GridActions,
  unstable_GridInitialState as GridInitialState,
} from "../Grid/GridState";
import {
  useComboboxBaseState,
  ComboboxBaseState,
  ComboboxBaseActions,
  ComboboxBaseInitialState,
} from "./__utils/ComboboxBaseState";

function chunk<T>(array: T[], size: number) {
  const chunks: T[][] = [];
  for (let i = 0, j = array.length; i < j; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export function unstable_useComboboxListGridState(
  initialState: SealedInitialState<unstable_ComboboxListGridInitialState> = {}
): unstable_ComboboxListGridStateReturn {
  const {
    columns: initialColumns = 1,
    currentId = null,
    loop = true,
    ...sealed
  } = useSealedState(initialState);

  const [columns, setColumns] = React.useState(initialColumns);

  const grid = useGridState({
    currentId,
    loop,
    ...sealed,
    unstable_virtual: true,
    unstable_includesBaseElement: true,
  });
  const combobox = useComboboxBaseState(grid, sealed);

  const matches = React.useMemo(() => chunk(combobox.matches, columns), [
    combobox.matches,
    columns,
  ]);

  return {
    ...combobox,
    menuRole: "grid",
    columns,
    matches,
    setColumns,
  };
}

export type unstable_ComboboxListGridState = Omit<
  ComboboxBaseState<GridState>,
  "matches"
> & {
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

export type unstable_ComboboxListGridActions = ComboboxBaseActions<GridActions> & {
  /**
   * Sets `columns`.
   */
  setColumns: SetState<unstable_ComboboxListGridState["columns"]>;
};

export type unstable_ComboboxListGridInitialState = Omit<
  GridInitialState,
  "unstable_virtual" | "unstable_includesBaseElement"
> &
  ComboboxBaseInitialState &
  Pick<Partial<unstable_ComboboxListGridState>, "columns">;

export type unstable_ComboboxListGridStateReturn = unstable_ComboboxListGridState &
  unstable_ComboboxListGridActions;
