import * as React from "react";
import { CompositeItemOptions, CompositeItemHTMLProps } from "../Composite/CompositeItem";
import { TabStateReturn } from "./TabState";
export declare type TabOptions = CompositeItemOptions & Pick<Partial<TabStateReturn>, "manual"> & Pick<TabStateReturn, "panels" | "selectedId" | "select">;
export declare type TabHTMLProps = CompositeItemHTMLProps;
export declare type TabProps = TabOptions & TabHTMLProps;
export declare const useTab: {
    (options?: TabOptions | undefined, htmlProps?: import("..").TabbableHTMLProps | undefined, unstable_ignoreUseOptions?: boolean | undefined): import("..").TabbableHTMLProps;
    unstable_propsAreEqual: (prev: import("..").RoleOptions & {
        disabled?: boolean | undefined;
        focusable?: boolean | undefined;
    } & {
        unstable_clickOnEnter?: boolean | undefined;
        unstable_clickOnSpace?: boolean | undefined;
    } & Pick<Partial<import("..").unstable_IdStateReturn>, "baseId" | "unstable_idCountRef"> & {
        id?: string | undefined;
    } & Pick<Partial<import("..").CompositeStateReturn>, "orientation" | "baseId" | "unstable_virtual" | "unstable_moves" | "unstable_hasActiveWidget"> & Pick<import("..").CompositeStateReturn, "down" | "up" | "next" | "first" | "last" | "currentId" | "items" | "registerItem" | "unregisterItem" | "previous" | "setCurrentId"> & Pick<Partial<TabStateReturn>, "manual"> & Pick<TabStateReturn, "select" | "selectedId" | "panels"> & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    } & {
        disabled?: boolean | undefined;
    }, next: import("..").RoleOptions & {
        disabled?: boolean | undefined;
        focusable?: boolean | undefined;
    } & {
        unstable_clickOnEnter?: boolean | undefined;
        unstable_clickOnSpace?: boolean | undefined;
    } & Pick<Partial<import("..").unstable_IdStateReturn>, "baseId" | "unstable_idCountRef"> & {
        id?: string | undefined;
    } & Pick<Partial<import("..").CompositeStateReturn>, "orientation" | "baseId" | "unstable_virtual" | "unstable_moves" | "unstable_hasActiveWidget"> & Pick<import("..").CompositeStateReturn, "down" | "up" | "next" | "first" | "last" | "currentId" | "items" | "registerItem" | "unregisterItem" | "previous" | "setCurrentId"> & Pick<Partial<TabStateReturn>, "manual"> & Pick<TabStateReturn, "select" | "selectedId" | "panels"> & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    } & {
        disabled?: boolean | undefined;
    }) => boolean;
    __keys: readonly any[];
    __useOptions: (options: TabOptions, htmlProps: import("..").TabbableHTMLProps) => TabOptions;
};
export declare const Tab: import("reakit-system/ts/createComponent").Component<"button", TabOptions>;
