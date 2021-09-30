import { AnimatedValue } from '@react-spring/animated';
import { FluidValue } from '@react-spring/shared';
import { AnimationConfig } from './AnimationConfig';
import { PickEventFns } from './types/internal';
import { SpringProps } from './types';
/** An animation being executed by the frameloop */
export declare class Animation<T = any> {
    changed: boolean;
    values: readonly AnimatedValue[];
    toValues: readonly number[] | null;
    fromValues: readonly number[];
    to: T | FluidValue<T>;
    from: T | FluidValue<T>;
    config: AnimationConfig;
    immediate: boolean;
}
export interface Animation<T> extends PickEventFns<SpringProps<T>> {
}
