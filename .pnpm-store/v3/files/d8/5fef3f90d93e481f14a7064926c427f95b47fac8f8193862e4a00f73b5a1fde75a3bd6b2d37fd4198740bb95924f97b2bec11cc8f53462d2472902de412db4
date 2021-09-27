import * as React from "react";
import { RoleOptions, RoleHTMLProps } from "../Role/Role";
import { unstable_FormStateReturn } from "./FormState";
export declare type unstable_FormOptions = RoleOptions & Pick<unstable_FormStateReturn<any>, "submit">;
export declare type unstable_FormHTMLProps = RoleHTMLProps & React.FormHTMLAttributes<any>;
export declare type unstable_FormProps = unstable_FormOptions & unstable_FormHTMLProps;
export declare const unstable_useForm: {
    (options?: unstable_FormOptions | undefined, htmlProps?: unstable_FormHTMLProps | undefined, unstable_ignoreUseOptions?: boolean | undefined): unstable_FormHTMLProps;
    unstable_propsAreEqual: (prev: RoleOptions & Pick<unstable_FormStateReturn<any>, "submit"> & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    } & React.FormHTMLAttributes<any>, next: RoleOptions & Pick<unstable_FormStateReturn<any>, "submit"> & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    } & React.FormHTMLAttributes<any>) => boolean;
    __keys: readonly any[];
    __useOptions: (options: unstable_FormOptions, htmlProps: unstable_FormHTMLProps) => unstable_FormOptions;
};
export declare const unstable_Form: import("reakit-system/ts/createComponent").Component<"form", unstable_FormOptions>;
