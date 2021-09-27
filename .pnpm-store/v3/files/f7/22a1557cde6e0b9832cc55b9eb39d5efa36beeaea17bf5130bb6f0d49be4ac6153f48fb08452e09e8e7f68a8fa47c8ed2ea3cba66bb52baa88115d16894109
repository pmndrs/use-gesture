import * as React from "react";
import {
  SealedInitialState,
  useSealedState,
} from "reakit-utils/useSealedState";
import { applyState } from "reakit-utils/applyState";
import { useIsomorphicEffect } from "reakit-utils/useIsomorphicEffect";
import {
  unstable_IdState,
  unstable_IdActions,
  unstable_IdInitialState,
  unstable_useIdState,
  unstable_IdStateReturn,
} from "../Id/IdState";
import { reverse } from "./__utils/reverse";
import { Item, Group, Orientation } from "./__utils/types";
import { findDOMIndex } from "./__utils/findDOMIndex";
import { findFirstEnabledItem } from "./__utils/findFirstEnabledItem";
import { findEnabledItemById } from "./__utils/findEnabledItemById";
import { verticalizeItems } from "./__utils/verticalizeItems";
import { groupItems } from "./__utils/groupItems";
import { flatten } from "./__utils/flatten";
import { fillGroups } from "./__utils/fillGroups";
import { getCurrentId } from "./__utils/getCurrentId";
import { placeItemsAfter } from "./__utils/placeItemsAfter";
import { getItemsInGroup } from "./__utils/getItemsInGroup";
import { getOppositeOrientation } from "./__utils/getOppositeOrientation";
import { addItemAtIndex } from "./__utils/addItemAtIndex";
import { sortBasedOnDOMPosition } from "./__utils/sortBasedOnDOMPosition";
import { useSortBasedOnDOMPosition } from "./__utils/useSortBasedOnDOMPosition";

type CompositeReducerAction =
  | { type: "registerItem"; item: Item }
  | { type: "unregisterItem"; id: string | null }
  | { type: "registerGroup"; group: Group }
  | { type: "unregisterGroup"; id: string | null }
  | { type: "move"; id?: string | null }
  | { type: "next"; allTheWay?: boolean; hasNullItem?: boolean }
  | { type: "previous"; allTheWay?: boolean }
  | { type: "up"; allTheWay?: boolean }
  | { type: "down"; allTheWay?: boolean }
  | { type: "first" }
  | { type: "last" }
  | { type: "sort" }
  | {
      type: "setVirtual";
      virtual: React.SetStateAction<CompositeState["unstable_virtual"]>;
    }
  | {
      type: "setRTL";
      rtl: React.SetStateAction<CompositeState["rtl"]>;
    }
  | {
      type: "setOrientation";
      orientation?: React.SetStateAction<CompositeState["orientation"]>;
    }
  | {
      type: "setCurrentId";
      currentId?: React.SetStateAction<CompositeState["currentId"]>;
    }
  | {
      type: "setLoop";
      loop: React.SetStateAction<CompositeState["loop"]>;
    }
  | {
      type: "setWrap";
      wrap: React.SetStateAction<CompositeState["wrap"]>;
    }
  | {
      type: "setShift";
      shift: React.SetStateAction<CompositeState["shift"]>;
    }
  | { type: "reset" }
  | { type: "setItems"; items: CompositeState["items"] }
  | {
      type: "setIncludesBaseElement";
      includesBaseElement: React.SetStateAction<
        CompositeState["unstable_includesBaseElement"]
      >;
    };

type CompositeReducerState = Omit<
  CompositeState,
  "unstable_hasActiveWidget" | keyof unstable_IdState
> & {
  pastIds: string[];
  initialVirtual: CompositeState["unstable_virtual"];
  initialRTL: CompositeState["rtl"];
  initialOrientation: CompositeState["orientation"];
  initialCurrentId: CompositeState["currentId"];
  initialLoop: CompositeState["loop"];
  initialWrap: CompositeState["wrap"];
  initialShift: CompositeState["shift"];
  hasSetCurrentId?: boolean;
};

function reducer(
  state: CompositeReducerState,
  action: CompositeReducerAction
): CompositeReducerState {
  const {
    unstable_virtual: virtual,
    rtl,
    orientation,
    items,
    groups,
    currentId,
    loop,
    wrap,
    pastIds,
    shift,
    unstable_moves: moves,
    unstable_includesBaseElement: includesBaseElement,
    initialVirtual,
    initialRTL,
    initialOrientation,
    initialCurrentId,
    initialLoop,
    initialWrap,
    initialShift,
    hasSetCurrentId,
  } = state;

  switch (action.type) {
    case "registerGroup": {
      const { group } = action;
      // If there are no groups yet, just add it as the first one
      if (groups.length === 0) {
        return { ...state, groups: [group] };
      }
      // Finds the group index based on DOM position
      const index = findDOMIndex(groups, group);
      return { ...state, groups: addItemAtIndex(groups, group, index) };
    }

    case "unregisterGroup": {
      const { id } = action;
      const nextGroups = groups.filter((group) => group.id !== id);
      // The group isn't registered, so do nothing
      if (nextGroups.length === groups.length) {
        return state;
      }
      return { ...state, groups: nextGroups };
    }

    case "registerItem": {
      const { item } = action;
      // Finds the item group based on the DOM hierarchy
      const group = groups.find((r) =>
        r.ref.current?.contains(item.ref.current)
      );
      // Group will be null if it's a one-dimensional composite
      const nextItem = { groupId: group?.id, ...item };
      const index = findDOMIndex(items, nextItem);
      const nextState = {
        ...state,
        items: addItemAtIndex(items, nextItem, index),
      };
      if (!hasSetCurrentId && !moves && initialCurrentId === undefined) {
        // Sets currentId to the first enabled item. This runs whenever an item
        // is registered because the first enabled item may be registered
        // asynchronously.
        return {
          ...nextState,
          currentId: findFirstEnabledItem(nextState.items)?.id,
        };
      }
      return nextState;
    }

    case "unregisterItem": {
      const { id } = action;
      const nextItems = items.filter((item) => item.id !== id);
      // The item isn't registered, so do nothing
      if (nextItems.length === items.length) {
        return state;
      }
      // Filters out the item that is being removed from the pastIds list
      const nextPastIds = pastIds.filter((pastId) => pastId !== id);
      const nextState = {
        ...state,
        pastIds: nextPastIds,
        items: nextItems,
      };
      // If the current item is the item that is being removed, focus pastId
      if (currentId && currentId === id) {
        const nextId = includesBaseElement
          ? null
          : getCurrentId({
              ...nextState,
              currentId: nextPastIds[0],
            });
        return { ...nextState, currentId: nextId };
      }
      return nextState;
    }

    case "move": {
      const { id } = action;
      // move() does nothing
      if (id === undefined) {
        return state;
      }
      // Removes the current item and the item that is receiving focus from the
      // pastIds list
      const filteredPastIds = pastIds.filter(
        (pastId) => pastId !== currentId && pastId !== id
      );
      // If there's a currentId, add it to the pastIds list so it can be focused
      // if the new item gets removed or disabled
      const nextPastIds = currentId
        ? [currentId, ...filteredPastIds]
        : filteredPastIds;
      const nextState = { ...state, pastIds: nextPastIds };
      // move(null) will focus the composite element itself, not an item
      if (id === null) {
        return {
          ...nextState,
          unstable_moves: moves + 1,
          currentId: getCurrentId(nextState, id),
        };
      }
      const item = findEnabledItemById(items, id);
      return {
        ...nextState,
        unstable_moves: item ? moves + 1 : moves,
        currentId: getCurrentId(nextState, item?.id),
      };
    }

    case "next": {
      // If there's no item focused, we just move the first one
      if (currentId == null) {
        return reducer(state, { ...action, type: "first" });
      }
      // RTL doesn't make sense on vertical navigation
      const isHorizontal = orientation !== "vertical";
      const isRTL = rtl && isHorizontal;
      const allItems = isRTL ? reverse(items) : items;
      const currentItem = allItems.find((item) => item.id === currentId);
      // If there's no item focused, we just move the first one
      if (!currentItem) {
        return reducer(state, { ...action, type: "first" });
      }
      const isGrid = !!currentItem.groupId;
      const currentIndex = allItems.indexOf(currentItem);
      const nextItems = allItems.slice(currentIndex + 1);
      const nextItemsInGroup = getItemsInGroup(nextItems, currentItem.groupId);
      // Home, End
      if (action.allTheWay) {
        // We reverse so we can get the last enabled item in the group. If it's
        // RTL, nextItems and nextItemsInGroup are already reversed and don't
        // have the items before the current one anymore. So we have to get
        // items in group again with allItems.
        const nextItem = findFirstEnabledItem(
          isRTL
            ? getItemsInGroup(allItems, currentItem.groupId)
            : reverse(nextItemsInGroup)
        );
        return reducer(state, { ...action, type: "move", id: nextItem?.id });
      }
      const oppositeOrientation = getOppositeOrientation(
        // If it's a grid and orientation is not set, it's a next/previous
        // call, which is inherently horizontal. up/down will call next with
        // orientation set to vertical by default (see below on up/down cases).
        isGrid ? orientation || "horizontal" : orientation
      );
      const canLoop = loop && loop !== oppositeOrientation;
      const canWrap = isGrid && wrap && wrap !== oppositeOrientation;
      const hasNullItem =
        // `previous` and `up` will set action.hasNullItem, but when calling
        // next directly, hasNullItem will only be true if it's not a grid and
        // loop is set to true, which means that pressing right or down keys on
        // grids will never focus the composite element. On one-dimensional
        // composites that don't loop, pressing right or down keys also doesn't
        // focus the composite element.
        action.hasNullItem || (!isGrid && canLoop && includesBaseElement);

      if (canLoop) {
        const loopItems =
          canWrap && !hasNullItem
            ? allItems
            : getItemsInGroup(allItems, currentItem.groupId);
        // Turns [0, 1, current, 3, 4] into [3, 4, 0, 1]
        const sortedItems = placeItemsAfter(loopItems, currentId, hasNullItem);
        const nextItem = findFirstEnabledItem(sortedItems, currentId);
        return reducer(state, { ...action, type: "move", id: nextItem?.id });
      }
      if (canWrap) {
        const nextItem = findFirstEnabledItem(
          // We can use nextItems, which contains all the next items, including
          // items from other groups, to wrap between groups. However, if there
          // is a null item (the composite element), we'll only use the next
          // items in the group. So moving next from the last item will focus
          // the composite element (null). On grid composites, horizontal
          // navigation never focuses the composite element, only vertical.
          hasNullItem ? nextItemsInGroup : nextItems,
          currentId
        );
        const nextId = hasNullItem ? nextItem?.id || null : nextItem?.id;
        return reducer(state, { ...action, type: "move", id: nextId });
      }
      const nextItem = findFirstEnabledItem(nextItemsInGroup, currentId);
      if (!nextItem && hasNullItem) {
        return reducer(state, { ...action, type: "move", id: null });
      }
      return reducer(state, { ...action, type: "move", id: nextItem?.id });
    }

    case "previous": {
      // If currentId is initially set to null, the composite element will be
      // focusable while navigating with arrow keys. But, if it's a grid, we
      // don't want to focus the composite element with horizontal navigation.
      const isGrid = !!groups.length;
      const hasNullItem = !isGrid && includesBaseElement;
      const nextState = reducer(
        { ...state, items: reverse(items) },
        { ...action, type: "next", hasNullItem }
      );
      return { ...nextState, items };
    }

    case "down": {
      const shouldShift = shift && !action.allTheWay;
      // First, we make sure groups have the same number of items by filling it
      // with disabled fake items. Then, we reorganize the items list so
      // [1-1, 1-2, 2-1, 2-2] becomes [1-1, 2-1, 1-2, 2-2].
      const verticalItems = verticalizeItems(
        flatten(fillGroups(groupItems(items), currentId, shouldShift))
      );
      const canLoop = loop && loop !== "horizontal";
      // Pressing down arrow key will only focus the composite element if loop
      // is true or vertical.
      const hasNullItem = canLoop && includesBaseElement;
      const nextState = reducer(
        { ...state, orientation: "vertical", items: verticalItems },
        { ...action, type: "next", hasNullItem }
      );
      return { ...nextState, orientation, items };
    }

    case "up": {
      const shouldShift = shift && !action.allTheWay;
      const verticalItems = verticalizeItems(
        reverse(flatten(fillGroups(groupItems(items), currentId, shouldShift)))
      );
      // If currentId is initially set to null, we'll always focus the
      // composite element when the up arrow key is pressed in the first row.
      const hasNullItem = includesBaseElement;
      const nextState = reducer(
        { ...state, orientation: "vertical", items: verticalItems },
        { ...action, type: "next", hasNullItem }
      );
      return { ...nextState, orientation, items };
    }

    case "first": {
      const firstItem = findFirstEnabledItem(items);
      return reducer(state, { ...action, type: "move", id: firstItem?.id });
    }

    case "last": {
      const nextState = reducer(
        { ...state, items: reverse(items) },
        { ...action, type: "first" }
      );
      return { ...nextState, items };
    }

    case "sort": {
      return {
        ...state,
        items: sortBasedOnDOMPosition(items),
        groups: sortBasedOnDOMPosition(groups),
      };
    }

    case "setVirtual":
      return {
        ...state,
        unstable_virtual: applyState(action.virtual, virtual),
      };

    case "setRTL":
      return { ...state, rtl: applyState(action.rtl, rtl) };

    case "setOrientation":
      return {
        ...state,
        orientation: applyState(action.orientation, orientation),
      };

    case "setCurrentId": {
      const nextCurrentId = getCurrentId({
        ...state,
        currentId: applyState(action.currentId, currentId),
      });
      return { ...state, currentId: nextCurrentId, hasSetCurrentId: true };
    }

    case "setLoop":
      return { ...state, loop: applyState(action.loop, loop) };

    case "setWrap":
      return { ...state, wrap: applyState(action.wrap, wrap) };

    case "setShift":
      return { ...state, shift: applyState(action.shift, shift) };

    case "setIncludesBaseElement": {
      return {
        ...state,
        unstable_includesBaseElement: applyState(
          action.includesBaseElement,
          includesBaseElement
        ),
      };
    }

    case "reset":
      return {
        ...state,
        unstable_virtual: initialVirtual,
        rtl: initialRTL,
        orientation: initialOrientation,
        currentId: getCurrentId({ ...state, currentId: initialCurrentId }),
        loop: initialLoop,
        wrap: initialWrap,
        shift: initialShift,
        unstable_moves: 0,
        pastIds: [],
      };

    case "setItems": {
      return { ...state, items: action.items };
    }
    default:
      throw new Error();
  }
}

function useAction<T extends (...args: any[]) => any>(fn: T) {
  return React.useCallback(fn, []);
}

function useIsUnmountedRef() {
  const isUnmountedRef = React.useRef(false);
  useIsomorphicEffect(() => {
    return () => {
      isUnmountedRef.current = true;
    };
  }, []);
  return isUnmountedRef;
}

export function useCompositeState(
  initialState: SealedInitialState<CompositeInitialState> = {}
): CompositeStateReturn {
  const {
    unstable_virtual: virtual = false,
    rtl = false,
    orientation,
    currentId,
    loop = false,
    wrap = false,
    shift = false,
    unstable_includesBaseElement,
    ...sealed
  } = useSealedState(initialState);
  const idState = unstable_useIdState(sealed);
  const [
    {
      pastIds,
      initialVirtual,
      initialRTL,
      initialOrientation,
      initialCurrentId,
      initialLoop,
      initialWrap,
      initialShift,
      hasSetCurrentId,
      ...state
    },
    dispatch,
  ] = React.useReducer(reducer, {
    unstable_virtual: virtual,
    rtl,
    orientation,
    items: [],
    groups: [],
    currentId,
    loop,
    wrap,
    shift,
    unstable_moves: 0,
    pastIds: [],
    unstable_includesBaseElement:
      unstable_includesBaseElement ?? currentId === null,
    initialVirtual: virtual,
    initialRTL: rtl,
    initialOrientation: orientation,
    initialCurrentId: currentId,
    initialLoop: loop,
    initialWrap: wrap,
    initialShift: shift,
  });
  const [hasActiveWidget, setHasActiveWidget] = React.useState(false);
  // register/unregister may be called when this component is unmounted. We
  // store the unmounted state here so we don't update the state if it's true.
  // This only happens in a very specific situation.
  // See https://github.com/reakit/reakit/issues/650
  const isUnmountedRef = useIsUnmountedRef();

  const setItems = React.useCallback(
    (items: Item[]) => dispatch({ type: "setItems", items }),
    []
  );
  useSortBasedOnDOMPosition(state.items, setItems);

  return {
    ...idState,
    ...state,
    unstable_hasActiveWidget: hasActiveWidget,
    unstable_setHasActiveWidget: setHasActiveWidget,
    registerItem: useAction((item) => {
      if (isUnmountedRef.current) return;
      dispatch({ type: "registerItem", item });
    }),
    unregisterItem: useAction((id) => {
      if (isUnmountedRef.current) return;
      dispatch({ type: "unregisterItem", id });
    }),
    registerGroup: useAction((group) => {
      if (isUnmountedRef.current) return;
      dispatch({ type: "registerGroup", group });
    }),
    unregisterGroup: useAction((id) => {
      if (isUnmountedRef.current) return;
      dispatch({ type: "unregisterGroup", id });
    }),
    move: useAction((id) => dispatch({ type: "move", id })),
    next: useAction((allTheWay) => dispatch({ type: "next", allTheWay })),
    previous: useAction((allTheWay) =>
      dispatch({ type: "previous", allTheWay })
    ),
    up: useAction((allTheWay) => dispatch({ type: "up", allTheWay })),
    down: useAction((allTheWay) => dispatch({ type: "down", allTheWay })),
    first: useAction(() => dispatch({ type: "first" })),
    last: useAction(() => dispatch({ type: "last" })),
    sort: useAction(() => dispatch({ type: "sort" })),
    unstable_setVirtual: useAction((value) =>
      dispatch({ type: "setVirtual", virtual: value })
    ),
    setRTL: useAction((value) => dispatch({ type: "setRTL", rtl: value })),
    setOrientation: useAction((value) =>
      dispatch({ type: "setOrientation", orientation: value })
    ),
    setCurrentId: useAction((value) =>
      dispatch({ type: "setCurrentId", currentId: value })
    ),
    setLoop: useAction((value) => dispatch({ type: "setLoop", loop: value })),
    setWrap: useAction((value) => dispatch({ type: "setWrap", wrap: value })),
    setShift: useAction((value) =>
      dispatch({ type: "setShift", shift: value })
    ),
    unstable_setIncludesBaseElement: useAction((value) =>
      dispatch({ type: "setIncludesBaseElement", includesBaseElement: value })
    ),
    reset: useAction(() => dispatch({ type: "reset" })),
  };
}

export type CompositeState = unstable_IdState & {
  /**
   * If enabled, the composite element will act as an
   * [aria-activedescendant](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_focus_activedescendant)
   * container instead of
   * [roving tabindex](https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex).
   * DOM focus will remain on the composite while its items receive virtual focus.
   * @default false
   */
  unstable_virtual: boolean;
  /**
   * Determines how `next` and `previous` functions will behave. If `rtl` is
   * set to `true`, they will be inverted. This only affects the composite
   * widget behavior. You still need to set `dir="rtl"` on HTML/CSS.
   * @default false
   */
  rtl: boolean;
  /**
   * Defines the orientation of the composite widget. If the composite has a
   * single row or column (one-dimensional), the `orientation` value determines
   * which arrow keys can be used to move focus:
   *   - `undefined`: all arrow keys work.
   *   - `horizontal`: only left and right arrow keys work.
   *   - `vertical`: only up and down arrow keys work.
   *
   * It doesn't have any effect on two-dimensional composites.
   * @default undefined
   */
  orientation?: Orientation;
  /**
   * Lists all the composite items with their `id`, DOM `ref`, `disabled` state
   * and `groupId` if any. This state is automatically updated when
   * `registerItem` and `unregisterItem` are called.
   * @example
   * const composite = useCompositeState();
   * composite.items.forEach((item) => {
   *   const { id, ref, disabled, groupId } = item;
   *   ...
   * });
   */
  items: Item[];
  /**
   * Lists all the composite groups with their `id` and DOM `ref`. This state
   * is automatically updated when `registerGroup` and `unregisterGroup` are
   * called.
   * @example
   * const composite = useCompositeState();
   * composite.groups.forEach((group) => {
   *   const { id, ref } = group;
   *   ...
   * });
   */
  groups: Group[];
  /**
   * The current focused item `id`.
   *   - `undefined` will automatically focus the first enabled composite item.
   *   - `null` will focus the base composite element and users will be able to
   * navigate out of it using arrow keys.
   *   - If `currentId` is initially set to `null`, the base composite element
   * itself will have focus and users will be able to navigate to it using
   * arrow keys.
   * @default undefined
   * @example
   * // First enabled item has initial focus
   * useCompositeState();
   * // Base composite element has initial focus
   * useCompositeState({ currentId: null });
   * // Specific composite item element has initial focus
   * useCompositeState({ currentId: "item-id" });
   */
  currentId?: string | null;
  /**
   * On one-dimensional composites:
   *   - `true` loops from the last item to the first item and vice-versa.
   *   - `horizontal` loops only if `orientation` is `horizontal` or not set.
   *   - `vertical` loops only if `orientation` is `vertical` or not set.
   *   - If `currentId` is initially set to `null`, the composite element will
   * be focused in between the last and first items.
   *
   * On two-dimensional composites:
   *   - `true` loops from the last row/column item to the first item in the
   * same row/column and vice-versa. If it's the last item in the last row, it
   * moves to the first item in the first row and vice-versa.
   *   - `horizontal` loops only from the last row item to the first item in
   * the same row.
   *   - `vertical` loops only from the last column item to the first item in
   * the column row.
   *   - If `currentId` is initially set to `null`, vertical loop will have no
   * effect as moving down from the last row or up from the first row will
   * focus the composite element.
   *   - If `wrap` matches the value of `loop`, it'll wrap between the last
   * item in the last row or column and the first item in the first row or
   * column and vice-versa.
   * @default false
   */
  loop: boolean | Orientation;
  /**
   * **Has effect only on two-dimensional composites**. If enabled, moving to
   * the next item from the last one in a row or column will focus the first
   * item in the next row or column and vice-versa.
   *   - `true` wraps between rows and columns.
   *   - `horizontal` wraps only between rows.
   *   - `vertical` wraps only between columns.
   *   - If `loop` matches the value of `wrap`, it'll wrap between the last
   * item in the last row or column and the first item in the first row or
   * column and vice-versa.
   * @default false
   */
  wrap: boolean | Orientation;
  /**
   * **Has effect only on two-dimensional composites**. If enabled, moving up
   * or down when there's no next item or the next item is disabled will shift
   * to the item right before it.
   * @default false
   */
  shift: boolean;
  /**
   * Stores the number of moves that have been performed by calling `move`,
   * `next`, `previous`, `up`, `down`, `first` or `last`.
   * @default 0
   */
  unstable_moves: number;
  /**
   * @default false
   * @private
   */
  unstable_hasActiveWidget: boolean;
  /**
   * @default false
   * @private
   */
  unstable_includesBaseElement: boolean;
};

export type CompositeActions = unstable_IdActions & {
  /**
   * Registers a composite item.
   * @example
   * const ref = React.useRef();
   * const composite = useCompositeState();
   * React.useEffect(() => {
   *   composite.registerItem({ ref, id: "id" });
   *   return () => composite.unregisterItem("id");
   * }, []);
   */
  registerItem: (item: Item) => void;
  /**
   * Unregisters a composite item.
   * @example
   * const ref = React.useRef();
   * const composite = useCompositeState();
   * React.useEffect(() => {
   *   composite.registerItem({ ref, id: "id" });
   *   return () => composite.unregisterItem("id");
   * }, []);
   */
  unregisterItem: (id: string) => void;
  /**
   * Registers a composite group.
   * @example
   * const ref = React.useRef();
   * const composite = useCompositeState();
   * React.useEffect(() => {
   *   composite.registerGroup({ ref, id: "id" });
   *   return () => composite.unregisterGroup("id");
   * }, []);
   */
  registerGroup: (group: Group) => void;
  /**
   * Unregisters a composite group.
   * @example
   * const ref = React.useRef();
   * const composite = useCompositeState();
   * React.useEffect(() => {
   *   composite.registerGroup({ ref, id: "id" });
   *   return () => composite.unregisterGroup("id");
   * }, []);
   */
  unregisterGroup: (id: string) => void;
  /**
   * Moves focus to a given item ID.
   * @example
   * const composite = useCompositeState();
   * composite.move("item-2"); // focus item 2
   */
  move: (id: string | null) => void;
  /**
   * Moves focus to the next item.
   */
  next: (unstable_allTheWay?: boolean) => void;
  /**
   * Moves focus to the previous item.
   */
  previous: (unstable_allTheWay?: boolean) => void;
  /**
   * Moves focus to the item above.
   */
  up: (unstable_allTheWay?: boolean) => void;
  /**
   * Moves focus to the item below.
   */
  down: (unstable_allTheWay?: boolean) => void;
  /**
   * Moves focus to the first item.
   */
  first: () => void;
  /**
   * Moves focus to the last item.
   */
  last: () => void;
  /**
   * Sorts the `composite.items` based on the items position in the DOM. This
   * is especially useful after modifying the composite items order in the DOM.
   * Most of the time, though, you don't need to manually call this function as
   * the re-ordering happens automatically.
   */
  sort: () => void;
  /**
   * Sets `virtual`.
   */
  unstable_setVirtual: React.Dispatch<
    React.SetStateAction<CompositeState["unstable_virtual"]>
  >;
  /**
   * Sets `rtl`.
   * @example
   * const composite = useCompositeState({ rtl: true });
   * composite.setRTL(false);
   */
  setRTL: React.Dispatch<React.SetStateAction<CompositeState["rtl"]>>;
  /**
   * Sets `orientation`.
   */
  setOrientation: React.Dispatch<
    React.SetStateAction<CompositeState["orientation"]>
  >;
  /**
   * Sets `currentId`. This is different from `composite.move` as this only
   * updates the `currentId` state without moving focus. When the composite
   * widget gets focused by the user, the item referred by the `currentId`
   * state will get focus.
   * @example
   * const composite = useCompositeState({ currentId: "item-1" });
   * // Updates `composite.currentId` to `item-2`
   * composite.setCurrentId("item-2");
   */
  setCurrentId: React.Dispatch<
    React.SetStateAction<CompositeState["currentId"]>
  >;
  /**
   * Sets `loop`.
   */
  setLoop: React.Dispatch<React.SetStateAction<CompositeState["loop"]>>;
  /**
   * Sets `wrap`.
   */
  setWrap: React.Dispatch<React.SetStateAction<CompositeState["wrap"]>>;
  /**
   * Sets `shift`.
   */
  setShift: React.Dispatch<React.SetStateAction<CompositeState["shift"]>>;
  /**
   * Resets to initial state.
   * @example
   * // On initial render, currentId will be item-1 and loop will be true
   * const composite = useCompositeState({
   *   currentId: "item-1",
   *   loop: true,
   * });
   * // On next render, currentId will be item-2 and loop will be false
   * composite.setCurrentId("item-2");
   * composite.setLoop(false);
   * // On next render, currentId will be item-1 and loop will be true
   * composite.reset();
   */
  reset: () => void;
  /**
   * Sets `includesBaseElement`.
   * @private
   */
  unstable_setIncludesBaseElement: React.Dispatch<
    React.SetStateAction<CompositeState["unstable_includesBaseElement"]>
  >;
  /**
   * Sets `hasActiveWidget`.
   * @private
   */
  unstable_setHasActiveWidget: React.Dispatch<
    React.SetStateAction<CompositeState["unstable_hasActiveWidget"]>
  >;
};

export type CompositeInitialState = unstable_IdInitialState &
  Partial<
    Pick<
      CompositeState,
      | "unstable_virtual"
      | "rtl"
      | "orientation"
      | "currentId"
      | "loop"
      | "wrap"
      | "shift"
      | "unstable_includesBaseElement"
    >
  >;

export type CompositeStateReturn = unstable_IdStateReturn &
  CompositeState &
  CompositeActions;
