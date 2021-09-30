import * as React from "react";
import { PopoverOptions, PopoverHTMLProps } from "../Popover/Popover";
import { MenuBarOptions, MenuBarHTMLProps } from "./MenuBar";
import { MenuStateReturn } from "./MenuState";
export declare type MenuOptions = Omit<PopoverOptions, "hideOnEsc"> & Pick<MenuStateReturn, "placement"> & MenuBarOptions;
export declare type MenuHTMLProps = PopoverHTMLProps & MenuBarHTMLProps;
export declare type MenuProps = MenuOptions & MenuHTMLProps;
export declare const useMenu: {
    (options?: MenuOptions | undefined, htmlProps?: import("..").TabbableHTMLProps | undefined, unstable_ignoreUseOptions?: boolean | undefined): import("..").TabbableHTMLProps;
    unstable_propsAreEqual: (prev: Pick<PopoverOptions, "hide" | "visible" | "unstable_system" | "baseId" | "animated" | "animating" | "modal" | "unstable_disclosureRef" | "unstable_popoverRef" | "unstable_popoverStyles" | "stopAnimation" | "hideOnClickOutside" | "preventBodyScroll" | "unstable_initialFocusRef" | "unstable_finalFocusRef" | "unstable_orphan" | "unstable_autoFocusOnShow" | "unstable_autoFocusOnHide"> & Pick<MenuStateReturn, "placement"> & import("..").RoleOptions & {
        disabled?: boolean | undefined;
        focusable?: boolean | undefined;
    } & Pick<Partial<import("..").CompositeStateReturn>, "wrap" | "orientation" | "baseId" | "currentId" | "unstable_virtual" | "groups" | "unstable_moves"> & Pick<import("..").CompositeStateReturn, "move" | "first" | "last" | "items" | "setCurrentId"> & Pick<Partial<MenuStateReturn>, "orientation"> & Pick<MenuStateReturn, "next" | "move" | "items" | "previous"> & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    } & {
        disabled?: boolean | undefined;
    }, next: Pick<PopoverOptions, "hide" | "visible" | "unstable_system" | "baseId" | "animated" | "animating" | "modal" | "unstable_disclosureRef" | "unstable_popoverRef" | "unstable_popoverStyles" | "stopAnimation" | "hideOnClickOutside" | "preventBodyScroll" | "unstable_initialFocusRef" | "unstable_finalFocusRef" | "unstable_orphan" | "unstable_autoFocusOnShow" | "unstable_autoFocusOnHide"> & Pick<MenuStateReturn, "placement"> & import("..").RoleOptions & {
        disabled?: boolean | undefined;
        focusable?: boolean | undefined;
    } & Pick<Partial<import("..").CompositeStateReturn>, "wrap" | "orientation" | "baseId" | "currentId" | "unstable_virtual" | "groups" | "unstable_moves"> & Pick<import("..").CompositeStateReturn, "move" | "first" | "last" | "items" | "setCurrentId"> & Pick<Partial<MenuStateReturn>, "orientation"> & Pick<MenuStateReturn, "next" | "move" | "items" | "previous"> & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    } & {
        disabled?: boolean | undefined;
    }) => boolean;
    __keys: readonly any[];
    __useOptions: (options: MenuOptions, htmlProps: import("..").TabbableHTMLProps) => MenuOptions;
};
export declare const Menu: import("reakit-system/ts/createComponent").Component<"div", MenuOptions>;
