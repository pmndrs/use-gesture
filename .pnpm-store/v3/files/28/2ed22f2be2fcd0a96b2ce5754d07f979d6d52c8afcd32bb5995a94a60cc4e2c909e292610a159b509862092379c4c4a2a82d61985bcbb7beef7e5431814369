import * as React from "react";
import { CompositeItemOptions, CompositeItemHTMLProps } from "../Composite/CompositeItem";
import { MenuStateReturn } from "./MenuState";
export declare type MenuItemOptions = CompositeItemOptions & Pick<Partial<MenuStateReturn>, "visible" | "hide" | "placement" | "unstable_popoverStyles" | "unstable_arrowStyles"> & Pick<MenuStateReturn, "next" | "previous" | "move">;
export declare type MenuItemHTMLProps = CompositeItemHTMLProps;
export declare type MenuItemProps = MenuItemOptions & MenuItemHTMLProps;
export declare const useMenuItem: {
    (options?: MenuItemOptions | undefined, htmlProps?: import("..").TabbableHTMLProps | undefined, unstable_ignoreUseOptions?: boolean | undefined): import("..").TabbableHTMLProps;
    unstable_propsAreEqual: (prev: import("..").RoleOptions & {
        disabled?: boolean | undefined;
        focusable?: boolean | undefined;
    } & {
        unstable_clickOnEnter?: boolean | undefined;
        unstable_clickOnSpace?: boolean | undefined;
    } & Pick<Partial<import("..").unstable_IdStateReturn>, "baseId" | "unstable_idCountRef"> & {
        id?: string | undefined;
    } & Pick<Partial<import("..").CompositeStateReturn>, "orientation" | "baseId" | "unstable_virtual" | "unstable_moves" | "unstable_hasActiveWidget"> & Pick<import("..").CompositeStateReturn, "down" | "up" | "next" | "first" | "last" | "currentId" | "items" | "registerItem" | "unregisterItem" | "previous" | "setCurrentId"> & Pick<Partial<MenuStateReturn>, "hide" | "visible" | "unstable_popoverStyles" | "unstable_arrowStyles" | "placement"> & Pick<MenuStateReturn, "next" | "move" | "previous"> & React.HTMLAttributes<any> & React.RefAttributes<any> & {
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
    } & Pick<Partial<import("..").CompositeStateReturn>, "orientation" | "baseId" | "unstable_virtual" | "unstable_moves" | "unstable_hasActiveWidget"> & Pick<import("..").CompositeStateReturn, "down" | "up" | "next" | "first" | "last" | "currentId" | "items" | "registerItem" | "unregisterItem" | "previous" | "setCurrentId"> & Pick<Partial<MenuStateReturn>, "hide" | "visible" | "unstable_popoverStyles" | "unstable_arrowStyles" | "placement"> & Pick<MenuStateReturn, "next" | "move" | "previous"> & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    } & {
        disabled?: boolean | undefined;
    }) => boolean;
    __keys: readonly any[];
    __useOptions: (options: MenuItemOptions, htmlProps: import("..").TabbableHTMLProps) => MenuItemOptions;
};
export declare const MenuItem: import("reakit-system/ts/createComponent").Component<"button", MenuItemOptions>;
