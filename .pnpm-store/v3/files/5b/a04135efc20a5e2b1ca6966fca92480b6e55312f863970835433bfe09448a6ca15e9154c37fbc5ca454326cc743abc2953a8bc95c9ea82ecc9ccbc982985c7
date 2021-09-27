declare type Hook<O = any, P = any> = {
    (options?: O, htmlProps?: P, unstable_ignoreUseOptions?: boolean): P;
    unstable_propsAreEqual: (prev: O & P, next: O & P) => boolean;
    __keys: ReadonlyArray<any>;
    __useOptions: (options: O, htmlProps: P) => O;
};
declare type CreateHookOptions<O, P> = {
    name?: string;
    compose?: Hook | Hook[];
    useState?: {
        (): any;
        __keys: ReadonlyArray<any>;
    };
    useOptions?: (options: O, htmlProps: P) => O;
    useProps?: (options: O, htmlProps: P) => P;
    useComposeOptions?: (options: O, htmlProps: P) => O;
    useComposeProps?: (options: O, htmlProps: P) => P;
    propsAreEqual?: (prev: O & P, next: O & P) => boolean;
    keys?: ReadonlyArray<string>;
};
/**
 * Creates a React custom hook that will return component props.
 *
 * @example
 * import { createHook } from "reakit-system";
 *
 * const useA = createHook({
 *   name: "A",
 *   keys: ["url"], // custom props/options keys
 *   useProps(options, htmlProps) {
 *     return {
 *       ...htmlProps,
 *       href: options.url,
 *     };
 *   },
 * });
 *
 * function A({ url, ...htmlProps }) {
 *   const props = useA({ url }, htmlProps);
 *   return <a {...props} />;
 * }
 *
 * @param options
 */
export declare function createHook<O, P>(options: CreateHookOptions<O, P>): Hook<O, P>;
export {};
