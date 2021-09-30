import { Lookup } from '@react-spring/types';
import { ControllerUpdate, PickAnimated, SpringValues } from '../types';
import { UseSpringProps } from './useSpring';
import { Controller } from '../Controller';
import type { SpringRef as SpringRefType } from '../SpringRef';
export declare type UseSpringsProps<State extends Lookup = Lookup> = unknown & ControllerUpdate<State> & {
    ref?: SpringRefType<State>;
};
/**
 * When the `deps` argument exists, the `props` function is called whenever
 * the `deps` change on re-render.
 *
 * Without the `deps` argument, the `props` function is only called once.
 */
export declare function useSprings<Props extends UseSpringProps>(length: number, props: (i: number, ctrl: Controller) => Props, deps?: readonly any[]): PickAnimated<Props> extends infer State ? [SpringValues<State>[], SpringRefType<State>] : never;
/**
 * Animations are updated on re-render.
 */
export declare function useSprings<Props extends UseSpringsProps>(length: number, props: Props[] & UseSpringsProps<PickAnimated<Props>>[]): SpringValues<PickAnimated<Props>>[];
/**
 * When the `deps` argument exists, you get the `update` and `stop` function.
 */
export declare function useSprings<Props extends UseSpringsProps>(length: number, props: Props[] & UseSpringsProps<PickAnimated<Props>>[], deps: readonly any[] | undefined): PickAnimated<Props> extends infer State ? [SpringValues<State>[], SpringRefType<State>] : never;
