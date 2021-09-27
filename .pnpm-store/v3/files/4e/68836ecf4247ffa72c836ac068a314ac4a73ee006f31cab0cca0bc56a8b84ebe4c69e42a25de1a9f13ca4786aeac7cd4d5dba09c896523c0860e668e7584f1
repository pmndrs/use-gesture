import { SealedInitialState } from "reakit-utils/useSealedState";
import { CompositeState, CompositeActions, CompositeInitialState } from "../Composite/CompositeState";
export declare type TabState = CompositeState & {
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
export declare type TabActions = CompositeActions & {
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
export declare type TabInitialState = CompositeInitialState & Partial<Pick<TabState, "selectedId" | "manual">>;
export declare type TabStateReturn = TabState & TabActions;
export declare function useTabState(initialState?: SealedInitialState<TabInitialState>): TabStateReturn;
