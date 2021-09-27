import * as React from "react";
import { GroupOptions, GroupHTMLProps } from "../Group/Group";
import { unstable_IdOptions, unstable_IdHTMLProps } from "../Id/Id";
import { CompositeStateReturn } from "./CompositeState";
export declare type CompositeGroupOptions = GroupOptions & unstable_IdOptions & Pick<CompositeStateReturn, "registerGroup" | "unregisterGroup"> & Pick<Partial<CompositeStateReturn>, "currentId" | "unstable_moves" | "items">;
export declare type CompositeGroupHTMLProps = GroupHTMLProps & unstable_IdHTMLProps;
export declare type CompositeGroupProps = CompositeGroupOptions & CompositeGroupHTMLProps;
export declare const useCompositeGroup: {
    (options?: CompositeGroupOptions | undefined, htmlProps?: import("..").RoleHTMLProps | undefined, unstable_ignoreUseOptions?: boolean | undefined): import("..").RoleHTMLProps;
    unstable_propsAreEqual: (prev: import("..").RoleOptions & Pick<Partial<import("..").unstable_IdStateReturn>, "baseId" | "unstable_idCountRef"> & {
        id?: string | undefined;
    } & Pick<CompositeStateReturn, "registerGroup" | "unregisterGroup"> & Pick<Partial<CompositeStateReturn>, "currentId" | "items" | "unstable_moves"> & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    }, next: import("..").RoleOptions & Pick<Partial<import("..").unstable_IdStateReturn>, "baseId" | "unstable_idCountRef"> & {
        id?: string | undefined;
    } & Pick<CompositeStateReturn, "registerGroup" | "unregisterGroup"> & Pick<Partial<CompositeStateReturn>, "currentId" | "items" | "unstable_moves"> & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    }) => boolean;
    __keys: readonly any[];
    __useOptions: (options: CompositeGroupOptions, htmlProps: import("..").RoleHTMLProps) => CompositeGroupOptions;
};
export declare const CompositeGroup: import("reakit-system/ts/createComponent").Component<"div", CompositeGroupOptions>;
