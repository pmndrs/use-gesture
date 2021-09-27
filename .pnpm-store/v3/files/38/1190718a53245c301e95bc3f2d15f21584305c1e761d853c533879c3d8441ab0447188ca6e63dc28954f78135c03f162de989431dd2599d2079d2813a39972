import * as React from "react";
import { As, PropsWithAs } from "reakit-utils/types";
declare type RoleHTMLProps = React.HTMLAttributes<any> & React.RefAttributes<any> & {
    wrapElement?: (element: React.ReactNode) => React.ReactNode;
};
declare type Hook<O> = {
    (options?: O, props?: RoleHTMLProps): RoleHTMLProps;
    unstable_propsAreEqual?: (prev: O, next: O) => boolean;
    __keys?: ReadonlyArray<any>;
};
declare type Options<T extends As, O> = {
    as: T;
    useHook?: Hook<O>;
    keys?: ReadonlyArray<any>;
    memo?: boolean;
    propsAreEqual?: (prev: O, next: O) => boolean;
    useCreateElement?: (type: T, props: Omit<PropsWithAs<O, T>, "as">, children?: React.ReactNode) => JSX.Element;
};
export declare type Component<T extends As, O> = {
    <TT extends As>(props: PropsWithAs<O, TT> & {
        as: TT;
    }): JSX.Element;
    (props: PropsWithAs<O, T>): JSX.Element;
    displayName?: string;
    unstable_propsAreEqual: (prev: PropsWithAs<O, T>, next: PropsWithAs<O, T>) => boolean;
    __keys?: ReadonlyArray<any>;
};
/**
 * Creates a React component.
 *
 * @example
 * import { createComponent } from "reakit-system";
 *
 * const A = createComponent({ as: "a" });
 *
 * @param options
 */
export declare function createComponent<T extends As, O>({ as: type, useHook, memo: shouldMemo, propsAreEqual, keys, useCreateElement, }: Options<T, O>): Component<T, O>;
export {};
