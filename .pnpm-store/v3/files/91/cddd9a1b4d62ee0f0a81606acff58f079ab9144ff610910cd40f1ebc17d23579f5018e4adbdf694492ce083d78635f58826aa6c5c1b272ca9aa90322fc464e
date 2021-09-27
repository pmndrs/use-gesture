import { CSSProperties, ForwardRefExoticComponent, ElementType, ComponentPropsWithRef } from 'react';
import { FluidValue, FluidProps } from '@react-spring/shared';
import { Merge } from '@react-spring/types';
import { Primitives } from './primitives';
import type * as CSS from 'csstype';
export type { CSS };
declare type AnimatedPrimitives = {
    [Tag in Primitives]: AnimatedComponent<Tag>;
};
/** The type of the `animated()` function */
export declare type WithAnimated = {
    <T extends ElementType>(wrappedComponent: T): AnimatedComponent<T>;
} & AnimatedPrimitives;
/** The type of an `animated()` component */
export declare type AnimatedComponent<T extends ElementType> = ForwardRefExoticComponent<AnimatedProps<Merge<ComponentPropsWithRef<T>, {
    style?: StyleProps;
}>> & FluidProps<{
    scrollTop?: number;
    scrollLeft?: number;
}>>;
/** The props of an `animated()` component */
export declare type AnimatedProps<Props extends object> = {
    [P in keyof Props]: P extends 'ref' | 'key' ? Props[P] : AnimatedProp<Props[P]>;
};
declare type StyleProps = Merge<CSSProperties, TransformProps>;
declare type StylePropKeys = keyof StyleProps;
declare type ValidStyleProps<T extends object> = {
    [P in keyof T & StylePropKeys]: T[P] extends StyleProps[P] ? P : never;
}[keyof T & StylePropKeys];
declare type AnimatedProp<T> = [T, T] extends [infer T, infer DT] ? [DT] extends [never] ? never : DT extends void ? undefined : DT extends string | number ? DT | AnimatedLeaf<T> : DT extends object ? [ValidStyleProps<DT>] extends [never] ? DT extends ReadonlyArray<any> ? AnimatedStyles<DT> : DT : AnimatedStyle<T> : DT | AnimatedLeaf<T> : never;
declare type AnimatedStyles<T extends ReadonlyArray<any>> = {
    [P in keyof T]: [T[P]] extends [infer DT] ? DT extends object ? [ValidStyleProps<DT>] extends [never] ? DT extends ReadonlyArray<any> ? AnimatedStyles<DT> : DT : {
        [P in keyof DT]: AnimatedProp<DT[P]>;
    } : DT : never;
};
declare type AnimatedStyle<T> = [T, T] extends [infer T, infer DT] ? DT extends void ? undefined : [DT] extends [never] ? never : DT extends string | number ? DT | AnimatedLeaf<T> : DT extends object ? AnimatedObject<DT> : DT | AnimatedLeaf<T> : never;
declare type AnimatedObject<T extends object> = {
    [P in keyof T]: AnimatedStyle<T[P]>;
} | (T extends ReadonlyArray<number | string> ? FluidValue<Readonly<T>> : never);
declare type AnimatedLeaf<T> = NonObject<T> extends infer U ? [U] extends [never] ? never : FluidValue<U> : never;
declare type NonObject<T> = Extract<T, string | number | ReadonlyArray<string | number>> | Exclude<T, object | void>;
declare type Angle = number | string;
declare type Length = number | string;
declare type TransformProps = {
    transform?: string;
    x?: Length;
    y?: Length;
    z?: Length;
    translate?: Length | readonly [Length, Length];
    translateX?: Length;
    translateY?: Length;
    translateZ?: Length;
    translate3d?: readonly [Length, Length, Length];
    rotate?: Angle;
    rotateX?: Angle;
    rotateY?: Angle;
    rotateZ?: Angle;
    rotate3d?: readonly [number, number, number, Angle];
    scale?: number | readonly [number, number] | string;
    scaleX?: number;
    scaleY?: number;
    scaleZ?: number;
    scale3d?: readonly [number, number, number];
    skew?: Angle | readonly [Angle, Angle];
    skewX?: Angle;
    skewY?: Angle;
    matrix?: readonly [number, number, number, number, number, number];
    matrix3d?: readonly [
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number
    ];
};
