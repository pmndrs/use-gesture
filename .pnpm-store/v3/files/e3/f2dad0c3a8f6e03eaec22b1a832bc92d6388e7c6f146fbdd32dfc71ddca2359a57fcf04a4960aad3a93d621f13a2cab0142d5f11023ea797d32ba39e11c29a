import * as React from "react";
import { DisclosureContentOptions, DisclosureContentHTMLProps } from "../Disclosure/DisclosureContent";
import { TooltipStateReturn } from "./TooltipState";
export declare type TooltipOptions = DisclosureContentOptions & Pick<Partial<TooltipStateReturn>, "unstable_popoverRef" | "unstable_popoverStyles"> & {
    /**
     * Whether or not the tooltip should be rendered within `Portal`.
     */
    unstable_portal?: boolean;
};
export declare type TooltipHTMLProps = DisclosureContentHTMLProps;
export declare type TooltipProps = TooltipOptions & TooltipHTMLProps;
export declare const useTooltip: {
    (options?: TooltipOptions | undefined, htmlProps?: import("..").RoleHTMLProps | undefined, unstable_ignoreUseOptions?: boolean | undefined): import("..").RoleHTMLProps;
    unstable_propsAreEqual: (prev: import("..").RoleOptions & Pick<Partial<import("..").DisclosureStateReturn>, "visible" | "baseId" | "animated" | "animating" | "stopAnimation"> & Pick<Partial<TooltipStateReturn>, "unstable_popoverRef" | "unstable_popoverStyles"> & {
        /**
         * Whether or not the tooltip should be rendered within `Portal`.
         */
        unstable_portal?: boolean | undefined;
    } & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    }, next: import("..").RoleOptions & Pick<Partial<import("..").DisclosureStateReturn>, "visible" | "baseId" | "animated" | "animating" | "stopAnimation"> & Pick<Partial<TooltipStateReturn>, "unstable_popoverRef" | "unstable_popoverStyles"> & {
        /**
         * Whether or not the tooltip should be rendered within `Portal`.
         */
        unstable_portal?: boolean | undefined;
    } & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    }) => boolean;
    __keys: readonly any[];
    __useOptions: (options: TooltipOptions, htmlProps: import("..").RoleHTMLProps) => TooltipOptions;
};
export declare const Tooltip: import("reakit-system/ts/createComponent").Component<"div", TooltipOptions>;
