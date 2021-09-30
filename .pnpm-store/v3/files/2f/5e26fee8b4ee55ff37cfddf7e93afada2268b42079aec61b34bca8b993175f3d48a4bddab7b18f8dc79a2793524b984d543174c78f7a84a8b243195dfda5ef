import * as React from "react";
import { RoleOptions, RoleHTMLProps } from "../Role/Role";
import { PopoverStateReturn } from "./PopoverState";
export declare type PopoverArrowOptions = RoleOptions & Pick<Partial<PopoverStateReturn>, "unstable_arrowRef" | "unstable_arrowStyles"> & Pick<PopoverStateReturn, "placement"> & {
    /** Arrow's size */
    size?: number | string;
};
export declare type PopoverArrowHTMLProps = RoleHTMLProps;
export declare type PopoverArrowProps = PopoverArrowOptions & PopoverArrowHTMLProps;
export declare const usePopoverArrow: {
    (options?: PopoverArrowOptions | undefined, htmlProps?: RoleHTMLProps | undefined, unstable_ignoreUseOptions?: boolean | undefined): RoleHTMLProps;
    unstable_propsAreEqual: (prev: RoleOptions & Pick<Partial<PopoverStateReturn>, "unstable_arrowRef" | "unstable_arrowStyles"> & Pick<PopoverStateReturn, "placement"> & {
        /** Arrow's size */
        size?: string | number | undefined;
    } & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    }, next: RoleOptions & Pick<Partial<PopoverStateReturn>, "unstable_arrowRef" | "unstable_arrowStyles"> & Pick<PopoverStateReturn, "placement"> & {
        /** Arrow's size */
        size?: string | number | undefined;
    } & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    }) => boolean;
    __keys: readonly any[];
    __useOptions: (options: PopoverArrowOptions, htmlProps: RoleHTMLProps) => PopoverArrowOptions;
};
export declare const PopoverArrow: import("reakit-system/ts/createComponent").Component<"div", PopoverArrowOptions>;
