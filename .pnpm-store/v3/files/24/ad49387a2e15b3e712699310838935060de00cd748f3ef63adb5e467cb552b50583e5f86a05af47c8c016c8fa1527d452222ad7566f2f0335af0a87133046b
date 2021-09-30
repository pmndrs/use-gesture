import * as React from "react";
import { CompositeOptions, CompositeHTMLProps } from "../Composite/Composite";
import { MenuStateReturn } from "./MenuState";
export declare type MenuBarOptions = CompositeOptions & Pick<Partial<MenuStateReturn>, "orientation"> & Pick<MenuStateReturn, "items" | "move" | "next" | "previous">;
export declare type MenuBarHTMLProps = CompositeHTMLProps;
export declare type MenuBarProps = MenuBarOptions & MenuBarHTMLProps;
export declare const useMenuBar: {
    (options?: MenuBarOptions | undefined, htmlProps?: import("..").TabbableHTMLProps | undefined, unstable_ignoreUseOptions?: boolean | undefined): import("..").TabbableHTMLProps;
    unstable_propsAreEqual: (prev: import("..").RoleOptions & {
        disabled?: boolean | undefined;
        focusable?: boolean | undefined;
    } & Pick<Partial<import("..").CompositeStateReturn>, "wrap" | "orientation" | "baseId" | "currentId" | "unstable_virtual" | "groups" | "unstable_moves"> & Pick<import("..").CompositeStateReturn, "move" | "first" | "last" | "items" | "setCurrentId"> & Pick<Partial<MenuStateReturn>, "orientation"> & Pick<MenuStateReturn, "next" | "move" | "items" | "previous"> & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    } & {
        disabled?: boolean | undefined;
    }, next: import("..").RoleOptions & {
        disabled?: boolean | undefined;
        focusable?: boolean | undefined;
    } & Pick<Partial<import("..").CompositeStateReturn>, "wrap" | "orientation" | "baseId" | "currentId" | "unstable_virtual" | "groups" | "unstable_moves"> & Pick<import("..").CompositeStateReturn, "move" | "first" | "last" | "items" | "setCurrentId"> & Pick<Partial<MenuStateReturn>, "orientation"> & Pick<MenuStateReturn, "next" | "move" | "items" | "previous"> & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    } & {
        disabled?: boolean | undefined;
    }) => boolean;
    __keys: readonly any[];
    __useOptions: (options: MenuBarOptions, htmlProps: import("..").TabbableHTMLProps) => MenuBarOptions;
};
export declare const MenuBar: import("reakit-system/ts/createComponent").Component<"div", MenuBarOptions>;
