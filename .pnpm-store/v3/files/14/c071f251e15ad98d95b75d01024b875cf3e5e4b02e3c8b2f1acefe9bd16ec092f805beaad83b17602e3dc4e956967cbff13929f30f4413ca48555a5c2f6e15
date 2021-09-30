import * as React from "react";
import { ButtonOptions, ButtonHTMLProps } from "../Button/Button";
import { DisclosureStateReturn } from "./DisclosureState";
export declare type DisclosureOptions = ButtonOptions & Pick<Partial<DisclosureStateReturn>, "visible"> & Pick<DisclosureStateReturn, "toggle" | "baseId">;
export declare type DisclosureHTMLProps = ButtonHTMLProps;
export declare type DisclosureProps = DisclosureOptions & DisclosureHTMLProps;
export declare const useDisclosure: {
    (options?: DisclosureOptions | undefined, htmlProps?: ButtonHTMLProps | undefined, unstable_ignoreUseOptions?: boolean | undefined): ButtonHTMLProps;
    unstable_propsAreEqual: (prev: import("..").RoleOptions & {
        disabled?: boolean | undefined;
        focusable?: boolean | undefined;
    } & {
        unstable_clickOnEnter?: boolean | undefined;
        unstable_clickOnSpace?: boolean | undefined;
    } & Pick<Partial<DisclosureStateReturn>, "visible"> & Pick<DisclosureStateReturn, "toggle" | "baseId"> & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    } & {
        disabled?: boolean | undefined;
    } & React.ButtonHTMLAttributes<any>, next: import("..").RoleOptions & {
        disabled?: boolean | undefined;
        focusable?: boolean | undefined;
    } & {
        unstable_clickOnEnter?: boolean | undefined;
        unstable_clickOnSpace?: boolean | undefined;
    } & Pick<Partial<DisclosureStateReturn>, "visible"> & Pick<DisclosureStateReturn, "toggle" | "baseId"> & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    } & {
        disabled?: boolean | undefined;
    } & React.ButtonHTMLAttributes<any>) => boolean;
    __keys: readonly any[];
    __useOptions: (options: DisclosureOptions, htmlProps: ButtonHTMLProps) => DisclosureOptions;
};
export declare const Disclosure: import("reakit-system/ts/createComponent").Component<"button", DisclosureOptions>;
