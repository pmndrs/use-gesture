/**
 * Welcome to @reach/tabs!
 *
 * An accessible tabs component.
 *
 * The `Tab` and `TabPanel` elements are associated by their order in the tree.
 * None of the components are empty wrappers, each is associated with a real DOM
 * element in the document, giving you maximum control over styling and composition.
 *
 * You can render any other elements you want inside of `Tabs`, but `TabList`
 * should only render `Tab` elements, and `TabPanels` should only render
 * `TabPanel` elements.
 *
 * @see Docs     https://reach.tech/tabs
 * @see Source   https://github.com/reach/reach-ui/tree/main/packages/tabs
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2/#tabpanel
 */
import * as React from "react";
import type * as Polymorphic from "@reach/utils/polymorphic";
declare enum TabsKeyboardActivation {
    Auto = "auto",
    Manual = "manual"
}
declare enum TabsOrientation {
    Horizontal = "horizontal",
    Vertical = "vertical"
}
/**
 * Tabs
 *
 * The parent component of the tab interface.
 *
 * @see Docs https://reach.tech/tabs#tabs
 */
declare const Tabs: Polymorphic.ForwardRefComponent<"div", TabsProps>;
/**
 * @see Docs https://reach.tech/tabs#tabs-props
 */
interface TabsProps {
    /**
     * Tabs expects `<TabList>` and `<TabPanels>` as children. The order doesn't
     * matter, you can have tabs on the top or the bottom. In fact, you could have
     * tabs on both the bottom and the top at the same time. You can have random
     * elements inside as well.
     *
     * You can also pass a render function to access data relevant to nested
     * components.
     *
     * @see Docs https://reach.tech/tabs#tabs-children
     */
    children: React.ReactNode | ((props: TabsContextValue) => React.ReactNode);
    /**
     * Like form inputs, a tab's state can be controlled by the owner. Make sure
     * to include an `onChange` as well, or else the tabs will not be interactive.
     *
     * @see Docs https://reach.tech/tabs#tabs-index
     */
    index?: number;
    /**
     * Describes the activation mode when navigating a tablist with a keyboard.
     * When set to `"auto"`, a tab panel is activated automatically when a tab is
     * highlighted using arrow keys. When set to `"manual"`, the user must
     * activate the tab panel with either the `Spacebar` or `Enter` keys. Defaults
     * to `"auto"`.
     *
     * @see Docs https://reach.tech/tabs#tabs-keyboardactivation
     */
    keyboardActivation?: TabsKeyboardActivation;
    /**
     * @see Docs https://reach.tech/tabs#tabs-readonly
     */
    readOnly?: boolean;
    /**
     * Starts the tabs at a specific index.
     *
     * @see Docs https://reach.tech/tabs#tabs-defaultindex
     */
    defaultIndex?: number;
    /**
     * Allows you to switch the orientation of the tabs relative to their tab
     * panels. This value can either be `"horizontal"`
     * (`TabsOrientation.Horizontal`) or `"vertical"`
     * (`TabsOrientation.Vertical`). Defaults to `"horizontal"`.
     *
     * @see Docs https://reach.tech/tabs#tabs-orientation
     * @see MDN  https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties
     */
    orientation?: TabsOrientation;
    /**
     * Calls back with the tab index whenever the user changes tabs, allowing your
     * app to synchronize with it.
     *
     * @see Docs https://reach.tech/tabs#tabs-onchange
     */
    onChange?: (index: number) => void;
}
declare const TabList: Polymorphic.MemoComponent<"div", TabListProps>;
/**
 * @see Docs https://reach.tech/tabs#tablist-props
 */
interface TabListProps {
    /**
     * `TabList` expects multiple `Tab` elements as children.
     *
     * `TabPanels` expects multiple `TabPanel` elements as children.
     *
     * @see Docs https://reach.tech/tabs#tablist-children
     */
    children?: React.ReactNode;
}
/**
 * Tab
 *
 * The interactive element that changes the selected panel.
 *
 * @see Docs https://reach.tech/tabs#tab
 */
declare const Tab: Polymorphic.ForwardRefComponent<"button", TabProps>;
/**
 * @see Docs https://reach.tech/tabs#tab-props
 */
interface TabProps {
    /**
     * `Tab` can receive any type of children.
     *
     * @see Docs https://reach.tech/tabs#tab-children
     */
    children?: React.ReactNode;
    /**
     * Disables a tab when true. Clicking will not work and keyboard navigation
     * will skip over it.
     *
     * @see Docs https://reach.tech/tabs#tab-disabled
     */
    disabled?: boolean;
    index?: number;
}
declare const TabPanels: Polymorphic.MemoComponent<"div", TabPanelsProps>;
/**
 * @see Docs https://reach.tech/tabs#tabpanels-props
 */
interface TabPanelsProps extends TabListProps {
}
/**
 * TabPanel
 *
 * The panel that displays when it's corresponding tab is active.
 *
 * @see Docs https://reach.tech/tabs#tabpanel
 */
declare const TabPanel: Polymorphic.ForwardRefComponent<"div", TabPanelProps>;
/**
 * @see Docs https://reach.tech/tabs#tabpanel-props
 */
interface TabPanelProps {
    /**
     * `TabPanel` can receive any type of children.
     *
     * @see Docs https://reach.tech/tabs#tabpanel-children
     */
    children?: React.ReactNode;
    /**
     * If an explicit index is passed to a `Tab` component, the same index value
     * should be passed to its corresponding `TabPanel`.
     *
     * @see Docs https://reach.tech/tabs#tabpanel-index
     */
    index?: number;
}
/**
 * A hook that exposes data for a given `Tabs` component to its descendants.
 *
 * @see Docs https://reach.tech/tabs#usetabscontext
 */
declare function useTabsContext(): TabsContextValue;
interface TabsContextValue {
    focusedIndex: number;
    id: string;
    selectedIndex: number;
}
export type { TabListProps, TabPanelProps, TabPanelsProps, TabProps, TabsContextValue, TabsProps, };
export { Tab, TabList, TabPanel, TabPanels, Tabs, TabsKeyboardActivation, TabsOrientation, useTabsContext, };
