import * as React from "react";
import { DisclosureContentOptions, DisclosureContentHTMLProps } from "../Disclosure/DisclosureContent";
import { unstable_IdOptions, unstable_IdHTMLProps } from "../Id/Id";
import { TabStateReturn } from "./TabState";
export declare type TabPanelOptions = DisclosureContentOptions & unstable_IdOptions & Pick<TabStateReturn, "selectedId" | "registerPanel" | "unregisterPanel" | "panels" | "items"> & {
    /**
     * Tab's id
     */
    tabId?: string;
};
export declare type TabPanelHTMLProps = DisclosureContentHTMLProps & unstable_IdHTMLProps;
export declare type TabPanelProps = TabPanelOptions & TabPanelHTMLProps;
export declare const useTabPanel: {
    (options?: TabPanelOptions | undefined, htmlProps?: import("..").RoleHTMLProps | undefined, unstable_ignoreUseOptions?: boolean | undefined): import("..").RoleHTMLProps;
    unstable_propsAreEqual: (prev: import("..").RoleOptions & Pick<Partial<import("..").DisclosureStateReturn>, "visible" | "baseId" | "animated" | "animating" | "stopAnimation"> & Pick<Partial<import("..").unstable_IdStateReturn>, "baseId" | "unstable_idCountRef"> & {
        id?: string | undefined;
    } & Pick<TabStateReturn, "items" | "selectedId" | "panels" | "registerPanel" | "unregisterPanel"> & {
        /**
         * Tab's id
         */
        tabId?: string | undefined;
    } & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    }, next: import("..").RoleOptions & Pick<Partial<import("..").DisclosureStateReturn>, "visible" | "baseId" | "animated" | "animating" | "stopAnimation"> & Pick<Partial<import("..").unstable_IdStateReturn>, "baseId" | "unstable_idCountRef"> & {
        id?: string | undefined;
    } & Pick<TabStateReturn, "items" | "selectedId" | "panels" | "registerPanel" | "unregisterPanel"> & {
        /**
         * Tab's id
         */
        tabId?: string | undefined;
    } & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    }) => boolean;
    __keys: readonly any[];
    __useOptions: (options: TabPanelOptions, htmlProps: import("..").RoleHTMLProps) => TabPanelOptions;
};
export declare const TabPanel: import("reakit-system/ts/createComponent").Component<"div", TabPanelOptions>;
