import type * as React from "react";
declare type Merge<P1 = {}, P2 = {}> = Omit<P1, keyof P2> & P2;
/**
 * Infers the OwnProps if E is a ForwardRefExoticComponentWithAs
 */
declare type OwnProps<E> = E extends ForwardRefComponent<any, infer P> ? P : {};
/**
 * Infers the JSX.IntrinsicElement if E is a ForwardRefExoticComponentWithAs
 */
declare type IntrinsicElement<E> = E extends ForwardRefComponent<infer I, any> ? I : never;
declare type ForwardRefExoticComponent<E, OwnProps> = React.ForwardRefExoticComponent<Merge<E extends React.ElementType ? React.ComponentPropsWithRef<E> : never, OwnProps & {
    as?: E;
}>>;
interface ForwardRefComponent<IntrinsicElementString, OwnProps = {}> extends ForwardRefExoticComponent<IntrinsicElementString, OwnProps> {
    <As = IntrinsicElementString>(props: As extends "" ? {
        as: keyof JSX.IntrinsicElements;
    } : As extends React.ComponentType<infer P> ? Merge<P, OwnProps & {
        as: As;
    }> : As extends keyof JSX.IntrinsicElements ? Merge<JSX.IntrinsicElements[As], OwnProps & {
        as: As;
    }> : never): React.ReactElement | null;
}
interface MemoComponent<IntrinsicElementString, OwnProps = {}> extends React.MemoExoticComponent<ForwardRefComponent<IntrinsicElementString, OwnProps>> {
    <As = IntrinsicElementString>(props: As extends "" ? {
        as: keyof JSX.IntrinsicElements;
    } : As extends React.ComponentType<infer P> ? Merge<P, OwnProps & {
        as: As;
    }> : As extends keyof JSX.IntrinsicElements ? Merge<JSX.IntrinsicElements[As], OwnProps & {
        as: As;
    }> : never): React.ReactElement | null;
}
export type { ForwardRefComponent, IntrinsicElement, MemoComponent, Merge, OwnProps, };
declare const _default: {};
export default _default;
