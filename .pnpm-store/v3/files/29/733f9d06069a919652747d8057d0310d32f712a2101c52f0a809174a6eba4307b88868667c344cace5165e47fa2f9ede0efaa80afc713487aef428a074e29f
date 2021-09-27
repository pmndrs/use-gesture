import * as React from "react";
export declare type BoxOptions = {
    /**
     * Options passed to `reakit-system-*`
     * @private
     */
    unstable_system?: any;
};
export declare type BoxHTMLProps = React.HTMLAttributes<any> & React.RefAttributes<any> & {
    /**
     * Function returned by the hook to wrap the element to which html props
     * will be passed.
     */
    wrapElement?: (element: React.ReactNode) => React.ReactNode;
};
export declare type BoxProps = BoxOptions & BoxHTMLProps;
export declare const useBox: {
    (options?: BoxOptions | undefined, htmlProps?: BoxHTMLProps | undefined, unstable_ignoreUseOptions?: boolean | undefined): BoxHTMLProps;
    unstable_propsAreEqual: (prev: BoxOptions & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        /**
         * Function returned by the hook to wrap the element to which html props
         * will be passed.
         */
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    }, next: BoxOptions & React.HTMLAttributes<any> & React.RefAttributes<any> & {
        /**
         * Function returned by the hook to wrap the element to which html props
         * will be passed.
         */
        wrapElement?: ((element: React.ReactNode) => React.ReactNode) | undefined;
    }) => boolean;
    __keys: readonly any[];
    __useOptions: (options: BoxOptions, htmlProps: BoxHTMLProps) => BoxOptions;
};
export declare const Box: import("reakit-system/ts/createComponent").Component<"div", BoxOptions>;
