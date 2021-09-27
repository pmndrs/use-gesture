import * as React from "react";
import { RoleOptions, RoleHTMLProps } from "../Role/Role";
import { DisclosureStateReturn } from "./DisclosureState";
export declare type DisclosureContentOptions = RoleOptions & Pick<Partial<DisclosureStateReturn>, "baseId" | "visible" | "animating" | "animated" | "stopAnimation">;
export declare type DisclosureContentHTMLProps = RoleHTMLProps;
export declare type DisclosureContentProps = DisclosureContentOptions & DisclosureContentHTMLProps;
export declare const useDisclosureContent: {
    (options?: DisclosureContentOptions | undefined, htmlProps?: RoleHTMLProps | undefined, unstable_ignoreUseOptions?: boolean | undefined): RoleHTMLProps;
    unstable_propsAreEqual: (prev: RoleOptions & Pick<Partial<DisclosureStateReturn>, "visible" | "baseId" | "animated" | "animating" | "stopAnimation"> & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    }, next: RoleOptions & Pick<Partial<DisclosureStateReturn>, "visible" | "baseId" | "animated" | "animating" | "stopAnimation"> & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    }) => boolean;
    __keys: readonly any[];
    __useOptions: (options: DisclosureContentOptions, htmlProps: RoleHTMLProps) => DisclosureContentOptions;
};
export declare const DisclosureContent: import("reakit-system/ts/createComponent").Component<"div", DisclosureContentOptions>;
