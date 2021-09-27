import * as React from "react";
import {
  SealedInitialState,
  useSealedState,
} from "reakit-utils/useSealedState";
import {
  useCompositeState,
  CompositeState,
  CompositeActions,
  CompositeInitialState,
} from "../Composite/CompositeState";

export type TabState = CompositeState & {
  /**
   * The current selected tab's `id`.
   */
  selectedId?: TabState["currentId"];
  /**
   * Lists all the panels.
   */
  panels: TabState["items"];
  /**
   * Whether the tab selection should be manual.
   */
  manual: boolean;
};

export type TabActions = CompositeActions & {
  /**
   * Moves into and selects a tab by its `id`.
   */
  select: TabActions["move"];
  /**
   * Sets `selectedId`.
   */
  setSelectedId: TabActions["setCurrentId"];
  /**
   * Registers a tab panel.
   */
  registerPanel: TabActions["registerItem"];
  /**
   * Unregisters a tab panel.
   */
  unregisterPanel: TabActions["unregisterItem"];
};

export type TabInitialState = CompositeInitialState &
  Partial<Pick<TabState, "selectedId" | "manual">>;

export type TabStateReturn = TabState & TabActions;

export function useTabState(
  initialState: SealedInitialState<TabInitialState> = {}
): TabStateReturn {
  const {
    selectedId: initialSelectedId,
    loop = true,
    manual = false,
    ...sealed
  } = useSealedState(initialState);

  const composite = useCompositeState({
    loop,
    currentId: initialSelectedId,
    ...sealed,
  });
  const panels = useCompositeState();
  const [selectedId, setSelectedId] = React.useState(initialSelectedId);

  const select = React.useCallback(
    (id: string) => {
      composite.move(id);
      setSelectedId(id);
    },
    [composite.move]
  );

  // If selectedId is not set, use the currentId. It's still possible to have
  // no selected tab with useTabState({ selectedId: null });
  React.useEffect(() => {
    if (selectedId === null) return;
    const selectedItem = composite.items.find((item) => item.id === selectedId);
    if (selectedItem) return;
    if (composite.currentId) {
      setSelectedId(composite.currentId);
    }
  }, [selectedId, composite.items, composite.currentId]);

  return {
    ...composite,
    selectedId,
    panels: panels.items,
    manual,
    select,
    setSelectedId,
    registerPanel: React.useCallback((panel) => panels.registerItem(panel), [
      panels.registerItem,
    ]),
    unregisterPanel: React.useCallback((id) => panels.unregisterItem(id), [
      panels.unregisterItem,
    ]),
  };
}
