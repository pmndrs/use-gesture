import * as React from "react";
import { RoleOptions, RoleHTMLProps } from "../Role/Role";
export declare type TabbableOptions = RoleOptions & {
    /**
     * Same as the HTML attribute.
     */
    disabled?: boolean;
    /**
     * When an element is `disabled`, it may still be `focusable`. It works
     * similarly to `readOnly` on form elements. In this case, only
     * `aria-disabled` will be set.
     */
    focusable?: boolean;
};
export declare type TabbableHTMLProps = RoleHTMLProps & {
    disabled?: boolean;
};
export declare type TabbableProps = TabbableOptions & TabbableHTMLProps;
export declare const useTabbable: {
    (options?: TabbableOptions | undefined, htmlProps?: TabbableHTMLProps | undefined, unstable_ignoreUseOptions?: boolean | undefined): TabbableHTMLProps;
    unstable_propsAreEqual: (prev: RoleOptions & {
        /**
         * Same as the HTML attribute.
         */
        disabled?: boolean | undefined;
        /**
         * When an element is `disabled`, it may still be `focusable`. It works
         * similarly to `readOnly` on form elements. In this case, only
         * `aria-disabled` will be set.
         */
        focusable?: boolean | undefined;
    } & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    } & {
        disabled?: boolean | undefined;
    }, next: RoleOptions & {
        /**
         * Same as the HTML attribute.
         */
        disabled?: boolean | undefined;
        /**
         * When an element is `disabled`, it may still be `focusable`. It works
         * similarly to `readOnly` on form elements. In this case, only
         * `aria-disabled` will be set.
         */
        focusable?: boolean | undefined;
    } & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    } & {
        disabled?: boolean | undefined;
    }) => boolean;
    __keys: readonly any[];
    __useOptions: (options: TabbableOptions, htmlProps: TabbableHTMLProps) => TabbableOptions;
};
export declare const Tabbable: import("reakit-system/ts/createComponent").Component<"div", TabbableOptions>;
