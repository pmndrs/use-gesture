import * as React from "react";
import { MenuBarOptions } from "../MenuBar";
import { MenuOptions } from "../Menu";
declare type Ref = React.RefObject<HTMLElement>;
export declare type MenuContextType = Pick<MenuBarOptions, "orientation" | "next" | "previous"> & {
    ref: Ref;
    role: string;
    parent?: MenuContextType | null;
    children: Array<Ref>;
    addChild: (ref: Ref) => void;
    removeChild: (ref: Ref) => void;
};
export declare const MenuContext: React.Context<MenuContextType | null>;
export declare function useMenuContext(menuRef: Ref, role: string, options: MenuBarOptions | MenuOptions): (element: React.ReactNode) => JSX.Element;
export {};
