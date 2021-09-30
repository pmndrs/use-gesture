import { Remap } from '@react-spring/types';
import { ControllerUpdate, PickAnimated, SpringValues } from '../types';
import { Valid } from '../types/common';
import { SpringRef } from '../SpringRef';
/**
 * The props that `useSpring` recognizes.
 */
export declare type UseSpringProps<Props extends object = any> = unknown & PickAnimated<Props> extends infer State ? Remap<ControllerUpdate<State> & {
    /**
     * Used to access the imperative API.
     *
     * When defined, the render animation won't auto-start.
     */
    ref?: SpringRef<State>;
}> : never;
/**
 * The `props` function is only called on the first render, unless
 * `deps` change (when defined). State is inferred from forward props.
 */
export declare function useSpring<Props extends object>(props: Function | (() => (Props & Valid<Props, UseSpringProps<Props>>) | UseSpringProps), deps?: readonly any[] | undefined): PickAnimated<Props> extends infer State ? [SpringValues<State>, SpringRef<State>] : never;
/**
 * Updated on every render, with state inferred from forward props.
 */
export declare function useSpring<Props extends object>(props: (Props & Valid<Props, UseSpringProps<Props>>) | UseSpringProps): SpringValues<PickAnimated<Props>>;
/**
 * Updated only when `deps` change, with state inferred from forward props.
 */
export declare function useSpring<Props extends object>(props: (Props & Valid<Props, UseSpringProps<Props>>) | UseSpringProps, deps: readonly any[] | undefined): PickAnimated<Props> extends infer State ? [SpringValues<State>, SpringRef<State>] : never;
