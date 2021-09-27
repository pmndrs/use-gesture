import * as React from "react";
import { SetState } from "reakit-utils/types";
import {
  CompositeStateReturn,
  CompositeState,
  CompositeActions,
} from "../../Composite/CompositeState";
import { Item } from "./types";

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getMatches(
  inputValue: ComboboxBaseState["inputValue"],
  values: ComboboxBaseState["values"],
  limit: ComboboxBaseState["limit"],
  list: ComboboxBaseState["list"],
  autoSelect: ComboboxBaseState["autoSelect"],
  minValueLength: ComboboxBaseState["minValueLength"]
) {
  if (limit === 0 || inputValue.length < minValueLength) {
    // We don't want to populate combobox.matches if inputValue doesn't have
    // enough characters.
    return [];
  }
  const length = limit === false ? undefined : limit;
  if (!list) {
    // If list is false, this means that values aren't expected to be filtered.
    return values.slice(0, length);
  }
  const regex = new RegExp(escapeRegExp(inputValue), "i");
  const matches: string[] = [];
  if (autoSelect) {
    const match = values.find((value) => value.search(regex) === 0);
    if (match) {
      matches.push(match);
    }
  }
  for (const value of values) {
    if (length && matches.length >= length) {
      break;
    }
    // Excludes first match, that can be auto selected
    if (value !== matches[0] && value.search(regex) !== -1) {
      matches.push(value);
    }
  }
  return matches;
}

export function useComboboxBaseState<T extends CompositeStateReturn>(
  composite: T,
  {
    inputValue: initialInputValue = "",
    minValueLength: initialMinValueLength = 0,
    values: initialValues = [],
    limit: initialLimit = 10,
    list: initialList = !!initialValues.length,
    inline: initialInline = false,
    autoSelect: initialAutoSelect = false,
  }: ComboboxBaseInitialState = {}
): ComboboxBaseStateReturn<T> {
  const valuesById = React.useRef<Record<string, string | undefined>>({});

  const [inputValue, setInputValue] = React.useState(initialInputValue);
  const [minValueLength, setMinValueLength] = React.useState(
    initialMinValueLength
  );
  const [values, setValues] = React.useState(initialValues);
  const [limit, setLimit] = React.useState(initialLimit);
  const [list, setList] = React.useState(initialList);
  const [inline, setInline] = React.useState(initialInline);
  const [autoSelect, setAutoSelect] = React.useState(initialAutoSelect);

  const matches = React.useMemo(
    () =>
      getMatches(inputValue, values, limit, list, autoSelect, minValueLength),
    [inputValue, values, limit, list, autoSelect, minValueLength]
  );

  const currentValue = React.useMemo(
    () =>
      composite.currentId ? valuesById.current[composite.currentId] : undefined,
    [valuesById, composite.currentId]
  );

  const items = React.useMemo(() => {
    composite.items.forEach((item) => {
      if (item.id) {
        (item as Item).value = valuesById.current[item.id];
      }
    });
    return composite.items;
  }, [composite.items]);

  const registerItem = React.useCallback(
    (item: Item) => {
      composite.registerItem(item);
      if (item.id) {
        valuesById.current[item.id] = item.value;
      }
    },
    [composite.registerItem]
  );

  const unregisterItem = React.useCallback(
    (id: string) => {
      composite.unregisterItem(id);
      delete valuesById.current[id];
    },
    [composite.unregisterItem]
  );

  return {
    ...composite,
    menuRole: "listbox",
    items,
    registerItem,
    unregisterItem,
    visible: true,
    inputValue,
    minValueLength,
    currentValue,
    values,
    limit,
    matches,
    list,
    inline,
    autoSelect,
    setInputValue,
    setMinValueLength,
    setValues,
    setLimit,
    setList,
    setInline,
    setAutoSelect,
  };
}

export type ComboboxBaseState<T extends CompositeState = CompositeState> = Omit<
  T,
  "items"
> & {
  /**
   * Lists all the combobox items with their `id`, DOM `ref`, `disabled` state,
   * `value` and `groupId` if any. This state is automatically updated when
   * `registerItem` and `unregisterItem` are called.
   * @example
   * const combobox = useComboboxState();
   * combobox.items.forEach((item) => {
   *   console.log(item.value);
   * });
   */
  items: Item[];
  /**
   * Indicates the type of the suggestions popup.
   */
  menuRole: "listbox" | "tree" | "grid" | "dialog";
  /**
   * Combobox input value that will be used to filter `values` and populate
   * the `matches` property.
   */
  inputValue: string;
  /**
   * How many characters are needed for opening the combobox popover and
   * populating `matches` with filtered values.
   * @default 0
   * @example
   * const combobox = useComboboxState({
   *   values: ["Red", "Green"],
   *   minValueLength: 2,
   * });
   * combobox.matches; // []
   * combobox.setInputValue("g");
   * // On next render
   * combobox.matches; // []
   * combobox.setInputValue("gr");
   * // On next render
   * combobox.matches; // ["Green"]
   */
  minValueLength: number;
  /**
   * Value of the item that is currently selected.
   */
  currentValue?: string;
  /**
   * Values that will be used to produce `matches`.
   * @default []
   * @example
   * const combobox = useComboboxState({ values: ["Red", "Green"] });
   * combobox.matches; // ["Red", "Green"]
   * combobox.setInputValue("g");
   * // On next render
   * combobox.matches; // ["Green"]
   */
  values: string[];
  /**
   * Maximum number of `matches`. If it's set to `false`, there will be no
   * limit.
   * @default 10
   */
  limit: number | false;
  /**
   * Result of filtering `values` based on `inputValue`.
   * @default []
   * @example
   * const combobox = useComboboxState({ values: ["Red", "Green"] });
   * combobox.matches; // ["Red", "Green"]
   * combobox.setInputValue("g");
   * // On next render
   * combobox.matches; // ["Green"]
   */
  matches: string[];
  /**
   * Determines how the combobox options behave: dynamically or statically.
   * By default, it's `true` if `values` are provided. Otherwise, it's `false`:
   *   - If it's `true` and `values` are provided, then they will be
   * automatically filtered based on `inputValue` and will populate `matches`.
   *   - If it's `true` and `values` aren't provided, this means that you'll
   * provide and filter values by yourself. `matches` will be empty.
   *   - If it's `false` and `values` are provided, then they won't be
   * automatically filtered and `matches` will be the same as `values`.
   * @example
   * const withoutValues = useComboboxState();
   * withValues.list; // false;
   * const withValues = useComboboxState({ values: ["Red", "Green"] });
   * withValues.list; // true;
   * const withList = useComboboxState({ list: true });
   * withValues.list; // true;
   * <Combobox list={true} /> // <input aria-autocomplete="list">
   */
  list: boolean;
  /**
   * Determines whether focusing on an option will temporarily change the value
   * of the combobox. If it's `true`, focusing on an option will temporarily
   * change the combobox value to the option's value.
   * @default false
   */
  inline: boolean;
  /**
   * Determines whether the first option will be automatically selected. When
   * it's set to `true`, the exact behavior will depend on the value of
   * `inline`:
   *   - If `inline` is `true`, the first option is automatically focused when
   * the combobox popover opens and the input value changes to reflect this.
   * The inline completion string will be highlighted and will have a selected
   * state.
   *   - If `inline` is `false`, the first option is automatically focused when
   * the combobox popover opens, but the input value remains the same.
   * @default false
   */
  autoSelect: boolean;
  /**
   * Whether the suggestions popup is visible or not.
   */
  visible: boolean;
};

export type ComboboxBaseActions<
  T extends CompositeActions = CompositeActions
> = Omit<T, "registerItem"> & {
  /**
   * Registers a combobox item.
   * @example
   * const ref = React.useRef();
   * const combobox = useComboboxState();
   * React.useEffect(() => {
   *   combobox.registerItem({ ref, id: "id" });
   *   return () => combobox.unregisterItem("id");
   * });
   */
  registerItem: (item: Item) => void;
  /**
   * Sets `inputValue`.
   * @example
   * const combobox = useComboboxState();
   * combobox.setInputValue("new value");
   */
  setInputValue: SetState<ComboboxBaseState["inputValue"]>;
  /**
   * Sets `minValueLength`.
   */
  setMinValueLength: SetState<ComboboxBaseState["minValueLength"]>;
  /**
   * Sets `values`.
   * @example
   * const combobox = useComboboxState();
   * combobox.setValues(["Red", "Green"]);
   * combobox.setValues((prevValues) => [...prevValues, "Blue"]);
   */
  setValues: SetState<ComboboxBaseState["values"]>;
  /**
   * Sets `limit`.
   */
  setLimit: SetState<ComboboxBaseState["limit"]>;
  /**
   * Sets `list`.
   */
  setList: SetState<ComboboxBaseState["list"]>;
  /**
   * Sets `inline`.
   */
  setInline: SetState<ComboboxBaseState["inline"]>;
  /**
   * Sets `autoSelect`.
   */
  setAutoSelect: SetState<ComboboxBaseState["autoSelect"]>;
};

export type ComboboxBaseInitialState = Pick<
  Partial<ComboboxBaseState>,
  | "inputValue"
  | "minValueLength"
  | "values"
  | "limit"
  | "list"
  | "inline"
  | "autoSelect"
>;

export type ComboboxBaseStateReturn<
  T extends CompositeStateReturn
> = ComboboxBaseState<T> & ComboboxBaseActions<T>;
