import * as React from "react";
import { ClickableOptions, ClickableHTMLProps } from "../Clickable/Clickable";
import { unstable_IdOptions, unstable_IdHTMLProps } from "../Id/Id";
import { CompositeStateReturn } from "./CompositeState";
export declare type CompositeItemOptions = ClickableOptions & unstable_IdOptions & Pick<Partial<CompositeStateReturn>, "unstable_virtual" | "baseId" | "orientation" | "unstable_moves" | "unstable_hasActiveWidget"> & Pick<CompositeStateReturn, "items" | "currentId" | "registerItem" | "unregisterItem" | "setCurrentId" | "next" | "previous" | "up" | "down" | "first" | "last">;
export declare type CompositeItemHTMLProps = ClickableHTMLProps & unstable_IdHTMLProps;
export declare type CompositeItemProps = CompositeItemOptions & CompositeItemHTMLProps;
export declare const useCompositeItem: {
    (options?: CompositeItemOptions | undefined, htmlProps?: import("..").TabbableHTMLProps | undefined, unstable_ignoreUseOptions?: boolean | undefined): import("..").TabbableHTMLProps;
    unstable_propsAreEqual: (prev: import("..").RoleOptions & {
        disabled?: boolean | undefined;
        focusable?: boolean | undefined;
    } & {
        unstable_clickOnEnter?: boolean | undefined;
        unstable_clickOnSpace?: boolean | undefined;
    } & Pick<Partial<import("..").unstable_IdStateReturn>, "baseId" | "unstable_idCountRef"> & {
        id?: string | undefined;
    } & Pick<Partial<CompositeStateReturn>, "orientation" | "baseId" | "unstable_virtual" | "unstable_moves" | "unstable_hasActiveWidget"> & Pick<CompositeStateReturn, "down" | "up" | "next" | "first" | "last" | "currentId" | "items" | "registerItem" | "unregisterItem" | "previous" | "setCurrentId"> & React.HTMLAttributes<any> & React.RefAttributes<any> & {
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
    } & Pick<Partial<CompositeStateReturn>, "orientation" | "baseId" | "unstable_virtual" | "unstable_moves" | "unstable_hasActiveWidget"> & Pick<CompositeStateReturn, "down" | "up" | "next" | "first" | "last" | "currentId" | "items" | "registerItem" | "unregisterItem" | "previous" | "setCurrentId"> & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    } & {
        disabled?: boolean | undefined;
    }) => boolean;
    __keys: readonly any[];
    __useOptions: (options: CompositeItemOptions, htmlProps: import("..").TabbableHTMLProps) => CompositeItemOptions;
};
export declare const CompositeItem: import("reakit-system/ts/createComponent").Component<"button", CompositeItemOptions>;
