import * as React from "react";
import { ClickableOptions, ClickableHTMLProps } from "../Clickable/Clickable";
import { CheckboxStateReturn } from "./CheckboxState";
export declare type CheckboxOptions = ClickableOptions & Pick<Partial<CheckboxStateReturn>, "state" | "setState"> & {
    /**
     * Checkbox's value is going to be used when multiple checkboxes share the
     * same state. Checking a checkbox with value will add it to the state
     * array.
     */
    value?: string | number;
    /**
     * Checkbox's checked state. If present, it's used instead of `state`.
     */
    checked?: boolean;
};
export declare type CheckboxHTMLProps = ClickableHTMLProps & React.InputHTMLAttributes<any> & {
    value?: string | number;
};
export declare type CheckboxProps = CheckboxOptions & CheckboxHTMLProps;
export declare const useCheckbox: {
    (options?: CheckboxOptions | undefined, htmlProps?: CheckboxHTMLProps | undefined, unstable_ignoreUseOptions?: boolean | undefined): CheckboxHTMLProps;
    unstable_propsAreEqual: (prev: import("..").RoleOptions & {
        disabled?: boolean | undefined;
        focusable?: boolean | undefined;
    } & {
        unstable_clickOnEnter?: boolean | undefined;
        unstable_clickOnSpace?: boolean | undefined;
    } & Pick<Partial<CheckboxStateReturn>, "state" | "setState"> & {
        /**
         * Checkbox's value is going to be used when multiple checkboxes share the
         * same state. Checking a checkbox with value will add it to the state
         * array.
         */
        value?: string | number | undefined;
        /**
         * Checkbox's checked state. If present, it's used instead of `state`.
         */
        checked?: boolean | undefined;
    } & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    } & {
        disabled?: boolean | undefined;
    } & React.InputHTMLAttributes<any> & {
        value?: string | number | undefined;
    }, next: import("..").RoleOptions & {
        disabled?: boolean | undefined;
        focusable?: boolean | undefined;
    } & {
        unstable_clickOnEnter?: boolean | undefined;
        unstable_clickOnSpace?: boolean | undefined;
    } & Pick<Partial<CheckboxStateReturn>, "state" | "setState"> & {
        /**
         * Checkbox's value is going to be used when multiple checkboxes share the
         * same state. Checking a checkbox with value will add it to the state
         * array.
         */
        value?: string | number | undefined;
        /**
         * Checkbox's checked state. If present, it's used instead of `state`.
         */
        checked?: boolean | undefined;
    } & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    } & {
        disabled?: boolean | undefined;
    } & React.InputHTMLAttributes<any> & {
        value?: string | number | undefined;
    }) => boolean;
    __keys: readonly any[];
    __useOptions: (options: CheckboxOptions, htmlProps: CheckboxHTMLProps) => CheckboxOptions;
};
export declare const Checkbox: import("reakit-system/ts/createComponent").Component<"input", CheckboxOptions>;
