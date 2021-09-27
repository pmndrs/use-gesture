import * as React from "react";
import { ClickableOptions, ClickableHTMLProps } from "../Clickable/Clickable";
import { unstable_IdOptions, unstable_IdHTMLProps } from "../Id/Id";
import { RoverStateReturn } from "./RoverState";
export declare type RoverOptions = ClickableOptions & unstable_IdOptions & Pick<Partial<RoverStateReturn>, "orientation" | "unstable_moves"> & Pick<RoverStateReturn, "stops" | "currentId" | "register" | "unregister" | "move" | "next" | "previous" | "first" | "last"> & {
    /**
     * Element ID.
     */
    stopId?: string;
};
export declare type RoverHTMLProps = ClickableHTMLProps & unstable_IdHTMLProps;
export declare type RoverProps = RoverOptions & RoverHTMLProps;
export declare const useRover: {
    (options?: RoverOptions | undefined, htmlProps?: import("..").TabbableHTMLProps | undefined, unstable_ignoreUseOptions?: boolean | undefined): import("..").TabbableHTMLProps;
    unstable_propsAreEqual: (prev: import("..").RoleOptions & {
        disabled?: boolean | undefined;
        focusable?: boolean | undefined;
    } & {
        unstable_clickOnEnter?: boolean | undefined;
        unstable_clickOnSpace?: boolean | undefined;
    } & Pick<Partial<import("..").unstable_IdStateReturn>, "baseId" | "unstable_idCountRef"> & {
        id?: string | undefined;
    } & Pick<Partial<RoverStateReturn>, "orientation" | "unstable_moves"> & Pick<RoverStateReturn, "next" | "move" | "first" | "last" | "currentId" | "previous" | "stops" | "register" | "unregister"> & {
        /**
         * Element ID.
         */
        stopId?: string | undefined;
    } & React.HTMLAttributes<any> & React.RefAttributes<any> & {
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
    } & Pick<Partial<RoverStateReturn>, "orientation" | "unstable_moves"> & Pick<RoverStateReturn, "next" | "move" | "first" | "last" | "currentId" | "previous" | "stops" | "register" | "unregister"> & {
        /**
         * Element ID.
         */
        stopId?: string | undefined;
    } & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    } & {
        disabled?: boolean | undefined;
    }) => boolean;
    __keys: readonly any[];
    __useOptions: (options: RoverOptions, htmlProps: import("..").TabbableHTMLProps) => RoverOptions;
};
export declare const Rover: import("reakit-system/ts/createComponent").Component<"button", RoverOptions>;
