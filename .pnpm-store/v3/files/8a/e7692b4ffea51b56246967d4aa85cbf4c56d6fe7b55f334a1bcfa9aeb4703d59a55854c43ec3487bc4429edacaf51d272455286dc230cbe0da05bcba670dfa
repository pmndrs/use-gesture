/// <reference types="react" />
import { CompositeOptions, CompositeHTMLProps } from "../Composite/Composite";
import { ToolbarStateReturn } from "./ToolbarState";
export declare type ToolbarOptions = CompositeOptions & Pick<Partial<ToolbarStateReturn>, "orientation">;
export declare type ToolbarHTMLProps = CompositeHTMLProps;
export declare type ToolbarProps = ToolbarOptions & ToolbarHTMLProps;
export declare const useToolbar: {
    (options?: ToolbarOptions | undefined, htmlProps?: import("..").TabbableHTMLProps | undefined, unstable_ignoreUseOptions?: boolean | undefined): import("..").TabbableHTMLProps;
    unstable_propsAreEqual: (prev: import("..").RoleOptions & {
        disabled?: boolean | undefined;
        focusable?: boolean | undefined;
    } & Pick<Partial<import("..").CompositeStateReturn>, "wrap" | "orientation" | "baseId" | "currentId" | "unstable_virtual" | "groups" | "unstable_moves"> & Pick<import("..").CompositeStateReturn, "move" | "first" | "last" | "items" | "setCurrentId"> & Pick<Partial<import("..").unstable_GridStateReturn>, "orientation"> & import("react").HTMLAttributes<any> & import("react").RefAttributes<any> & {
        wrapElement?: ((element: import("react").ReactNode) => import("react").ReactNode) | undefined;
    } & {
        disabled?: boolean | undefined;
    }, next: import("..").RoleOptions & {
        disabled?: boolean | undefined;
        focusable?: boolean | undefined;
    } & Pick<Partial<import("..").CompositeStateReturn>, "wrap" | "orientation" | "baseId" | "currentId" | "unstable_virtual" | "groups" | "unstable_moves"> & Pick<import("..").CompositeStateReturn, "move" | "first" | "last" | "items" | "setCurrentId"> & Pick<Partial<import("..").unstable_GridStateReturn>, "orientation"> & import("react").HTMLAttributes<any> & import("react").RefAttributes<any> & {
        wrapElement?: ((element: import("react").ReactNode) => import("react").ReactNode) | undefined;
    } & {
        disabled?: boolean | undefined;
    }) => boolean;
    __keys: readonly any[];
    __useOptions: (options: ToolbarOptions, htmlProps: import("..").TabbableHTMLProps) => ToolbarOptions;
};
export declare const Toolbar: import("reakit-system/ts/createComponent").Component<"div", ToolbarOptions>;
