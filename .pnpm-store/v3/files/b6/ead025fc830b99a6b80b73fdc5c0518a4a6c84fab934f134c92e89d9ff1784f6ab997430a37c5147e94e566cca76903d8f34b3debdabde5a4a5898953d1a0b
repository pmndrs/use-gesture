import * as React from "react";
import { TabbableOptions, TabbableHTMLProps } from "../Tabbable";
import { CompositeStateReturn } from "./CompositeState";
export declare type CompositeOptions = TabbableOptions & Pick<Partial<CompositeStateReturn>, "baseId" | "unstable_virtual" | "currentId" | "orientation" | "unstable_moves" | "wrap" | "groups"> & Pick<CompositeStateReturn, "items" | "setCurrentId" | "first" | "last" | "move">;
export declare type CompositeHTMLProps = TabbableHTMLProps;
export declare type CompositeProps = CompositeOptions & CompositeHTMLProps;
export declare const useComposite: {
    (options?: CompositeOptions | undefined, htmlProps?: TabbableHTMLProps | undefined, unstable_ignoreUseOptions?: boolean | undefined): TabbableHTMLProps;
    unstable_propsAreEqual: (prev: import("../Role/Role").RoleOptions & {
        disabled?: boolean | undefined;
        focusable?: boolean | undefined;
    } & Pick<Partial<CompositeStateReturn>, "wrap" | "orientation" | "baseId" | "currentId" | "unstable_virtual" | "groups" | "unstable_moves"> & Pick<CompositeStateReturn, "move" | "first" | "last" | "items" | "setCurrentId"> & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    } & {
        disabled?: boolean | undefined;
    }, next: import("../Role/Role").RoleOptions & {
        disabled?: boolean | undefined;
        focusable?: boolean | undefined;
    } & Pick<Partial<CompositeStateReturn>, "wrap" | "orientation" | "baseId" | "currentId" | "unstable_virtual" | "groups" | "unstable_moves"> & Pick<CompositeStateReturn, "move" | "first" | "last" | "items" | "setCurrentId"> & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    } & {
        disabled?: boolean | undefined;
    }) => boolean;
    __keys: readonly any[];
    __useOptions: (options: CompositeOptions, htmlProps: TabbableHTMLProps) => CompositeOptions;
};
export declare const Composite: import("reakit-system/ts/createComponent").Component<"div", CompositeOptions>;
