import * as React from "react";
import { RoleOptions, RoleHTMLProps } from "../Role/Role";
import { TooltipStateReturn } from "./TooltipState";
export declare type TooltipReferenceOptions = RoleOptions & Pick<Partial<TooltipStateReturn>, "unstable_referenceRef" | "baseId"> & Pick<TooltipStateReturn, "show" | "hide">;
export declare type TooltipReferenceHTMLProps = RoleHTMLProps;
export declare type TooltipReferenceProps = TooltipReferenceOptions & TooltipReferenceHTMLProps;
export declare const useTooltipReference: {
    (options?: TooltipReferenceOptions | undefined, htmlProps?: RoleHTMLProps | undefined, unstable_ignoreUseOptions?: boolean | undefined): RoleHTMLProps;
    unstable_propsAreEqual: (prev: RoleOptions & Pick<Partial<TooltipStateReturn>, "baseId" | "unstable_referenceRef"> & Pick<TooltipStateReturn, "hide" | "show"> & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    }, next: RoleOptions & Pick<Partial<TooltipStateReturn>, "baseId" | "unstable_referenceRef"> & Pick<TooltipStateReturn, "hide" | "show"> & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    }) => boolean;
    __keys: readonly any[];
    __useOptions: (options: TooltipReferenceOptions, htmlProps: RoleHTMLProps) => TooltipReferenceOptions;
};
export declare const TooltipReference: import("reakit-system/ts/createComponent").Component<"div", TooltipReferenceOptions>;
