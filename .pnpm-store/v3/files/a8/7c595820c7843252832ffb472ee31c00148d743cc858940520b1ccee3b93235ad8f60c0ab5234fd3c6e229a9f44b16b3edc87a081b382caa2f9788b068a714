import { FluidValue } from '@react-spring/shared';
import { AnyFn, OneOrMore, Lookup } from '@react-spring/types';
import { InferTo } from './types';
import type { Controller } from './Controller';
import type { SpringRef } from './SpringRef';
export declare function callProp<T>(value: T, ...args: T extends AnyFn ? Parameters<T> : unknown[]): T extends AnyFn<any, infer U> ? U : T;
/** Try to coerce the given value into a boolean using the given key */
export declare const matchProp: (value: boolean | OneOrMore<string> | ((key: any) => boolean) | undefined, key: string | undefined) => boolean;
export declare const resolveProp: <T>(prop: T | Lookup<T> | undefined, key: string | undefined) => any;
export declare const concatFn: <T extends AnyFn<any[], any>>(first: T | undefined, last: T) => (...args: Parameters<T>) => any;
/** Returns `true` if the given prop is having its default value set. */
export declare const hasDefaultProp: <T extends Lookup<any>>(props: T, key: keyof T) => boolean;
/** Get the default value being set for the given `key` */
export declare const getDefaultProp: <T extends Lookup<any>, P extends keyof T>(props: T, key: P) => T[P];
/**
 * Extract the default props from an update.
 *
 * When the `default` prop is falsy, this function still behaves as if
 * `default: true` was used. The `default` prop is always respected when
 * truthy.
 */
export declare const getDefaultProps: <T extends Lookup<any>>(props: Lookup, transform?: (value: any, key: string) => any) => T;
/**
 * These props are implicitly used as defaults when defined in a
 * declarative update (eg: render-based) or any update with `default: true`.
 *
 * Use `default: {}` or `default: false` to opt-out of these implicit defaults
 * for any given update.
 *
 * Note: These are not the only props with default values. For example, the
 * `pause`, `cancel`, and `immediate` props. But those must be updated with
 * the object syntax (eg: `default: { immediate: true }`).
 */
export declare const DEFAULT_PROPS: readonly ["config", "onProps", "onStart", "onChange", "onPause", "onResume", "onRest"];
/**
 * Clone the given `props` and move all non-reserved props
 * into the `to` prop.
 */
export declare function inferTo<T extends object>(props: T): InferTo<T>;
export declare function computeGoal<T>(value: T | FluidValue<T>): T;
export declare function hasProps(props: object): boolean;
export declare function isAsyncTo(to: any): boolean;
/** Detach `ctrl` from `ctrl.ref` and (optionally) the given `ref` */
export declare function detachRefs(ctrl: Controller, ref?: SpringRef): void;
/** Replace `ctrl.ref` with the given `ref` (if defined) */
export declare function replaceRef(ctrl: Controller, ref?: SpringRef): void;
