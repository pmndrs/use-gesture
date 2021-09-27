/** @module types */
import * as React from "react";

/**
 * Render prop type
 * @memberof types
 * @template P Props
 */
export type RenderProp<P = {}> = (props: P) => React.ReactElement<any>;

/**
 * "as" prop
 * @memberof types
 * @template P Props
 */
export type As<P = any> = React.ElementType<P>;

/**
 * @memberof types
 * @template T Element type
 */
export type HTMLAttributesWithRef<T = any> = React.HTMLAttributes<T> &
  React.RefAttributes<T>;

/**
 * Returns only the HTML attributes inside P
 * ```ts
 * type OnlyId = ExtractHTMLAttributes<{ id: string; foo: string }>;
 * type HTMLAttributes = ExtractHTMLAttributes<any>;
 * ```
 * @memberof types
 * @template P Props
 */
export type ExtractHTMLAttributes<P> = Pick<
  HTMLAttributesWithRef,
  Extract<keyof HTMLAttributesWithRef, keyof P>
>;

/**
 * Transforms `"a" | "b"` into `"a" & "b"`
 * @memberof types
 * @template U Union
 */
export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

/**
 * Generic component props with "as" prop
 * @memberof types
 * @template P Additional props
 * @template T React component or string element
 */
export type PropsWithAs<P, T extends As> = {
  // Some components (Checkbox) are using `state` as a prop
  // to avoid type checking errors, we also allow `unknown`
  state?: P | unknown;
} & Partial<P> &
  Omit<React.ComponentProps<T>, "as" | "state" | keyof P> & {
    as?: T;
    children?: React.ReactNode | RenderProp<ExtractHTMLAttributes<any>>;
  };

/**
 * Returns the type of the items in an array
 * @memberof types
 * @template T Array
 */
export type ArrayValue<T> = T extends Array<infer U> ? U : never;

/**
 * Any function
 * @memberof types
 */
export type AnyFunction = (...args: any[]) => any;

/**
 * State hook setter.
 * @memberof types
 * @template T Setter type
 */
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
