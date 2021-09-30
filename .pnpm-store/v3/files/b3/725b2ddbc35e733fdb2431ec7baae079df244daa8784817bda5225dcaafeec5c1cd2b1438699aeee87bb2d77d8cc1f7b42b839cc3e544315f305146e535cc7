import * as React from "react";
export declare type RoleOptions = {
    /**
     * Options passed to `reakit-system-*`
     * @private
     */
    unstable_system?: any;
};
export declare type RoleHTMLProps = React.HTMLAttributes<any> & React.RefAttributes<any> & {
    /**
     * Function returned by the hook to wrap the element to which html props
     * will be passed.
     */
    wrapElement?: (element: React.ReactNode) => React.ReactNode;
};
export declare type RoleProps = RoleOptions & RoleHTMLProps;
export declare const useRole: {
    (options?: RoleOptions | undefined, htmlProps?: RoleHTMLProps | undefined, unstable_ignoreUseOptions?: boolean | undefined): RoleHTMLProps;
    unstable_propsAreEqual: (prev: RoleOptions & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        /**
         * Function returned by the hook to wrap the element to which html props
         * will be passed.
         */
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    }, next: RoleOptions & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        /**
         * Function returned by the hook to wrap the element to which html props
         * will be passed.
         */
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    }) => boolean;
    __keys: readonly any[];
    __useOptions: (options: RoleOptions, htmlProps: RoleHTMLProps) => RoleOptions;
};
export declare const Role: import("reakit-system/ts/createComponent").Component<"div", RoleOptions>;
