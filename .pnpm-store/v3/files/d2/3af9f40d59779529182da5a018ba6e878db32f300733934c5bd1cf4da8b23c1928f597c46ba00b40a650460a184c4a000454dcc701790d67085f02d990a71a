import * as React from "react";
import { TabbableOptions, TabbableHTMLProps } from "../Tabbable/Tabbable";
export declare type ClickableOptions = TabbableOptions & {
    /**
     * Whether or not trigger click on pressing <kbd>Enter</kbd>.
     * @private
     */
    unstable_clickOnEnter?: boolean;
    /**
     * Whether or not trigger click on pressing <kbd>Space</kbd>.
     * @private
     */
    unstable_clickOnSpace?: boolean;
};
export declare type ClickableHTMLProps = TabbableHTMLProps;
export declare type ClickableProps = ClickableOptions & ClickableHTMLProps;
export declare const useClickable: {
    (options?: ClickableOptions | undefined, htmlProps?: TabbableHTMLProps | undefined, unstable_ignoreUseOptions?: boolean | undefined): TabbableHTMLProps;
    unstable_propsAreEqual: (prev: import("..").RoleOptions & {
        disabled?: boolean | undefined;
        focusable?: boolean | undefined;
    } & {
        /**
         * Whether or not trigger click on pressing <kbd>Enter</kbd>.
         * @private
         */
        unstable_clickOnEnter?: boolean | undefined;
        /**
         * Whether or not trigger click on pressing <kbd>Space</kbd>.
         * @private
         */
        unstable_clickOnSpace?: boolean | undefined;
    } & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    } & {
        disabled?: boolean | undefined;
    }, next: import("..").RoleOptions & {
        disabled?: boolean | undefined;
        focusable?: boolean | undefined;
    } & {
        /**
         * Whether or not trigger click on pressing <kbd>Enter</kbd>.
         * @private
         */
        unstable_clickOnEnter?: boolean | undefined;
        /**
         * Whether or not trigger click on pressing <kbd>Space</kbd>.
         * @private
         */
        unstable_clickOnSpace?: boolean | undefined;
    } & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    } & {
        disabled?: boolean | undefined;
    }) => boolean;
    __keys: readonly any[];
    __useOptions: (options: ClickableOptions, htmlProps: TabbableHTMLProps) => ClickableOptions;
};
export declare const Clickable: import("reakit-system/ts/createComponent").Component<"button", ClickableOptions>;
