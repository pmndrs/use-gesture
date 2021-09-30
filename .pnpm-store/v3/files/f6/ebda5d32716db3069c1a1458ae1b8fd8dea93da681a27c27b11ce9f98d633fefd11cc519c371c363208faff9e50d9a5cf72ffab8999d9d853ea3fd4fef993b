import { FluidValue } from '@react-spring/shared';
import { Constrain, OneOrMore, Animatable, ExtrapolateType, InterpolatorConfig, InterpolatorFn } from '@react-spring/types';
import { Interpolation } from './Interpolation';
/** Map the value of one or more dependencies */
export declare const to: Interpolator;
/** @deprecated Use the `to` export instead */
export declare const interpolate: Interpolator;
/** Extract the raw value types that are being interpolated */
export declare type Interpolated<T extends ReadonlyArray<any>> = {
    [P in keyof T]: T[P] extends infer Element ? Element extends FluidValue<infer U> ? U : Element : never;
};
/**
 * This interpolates one or more `FluidValue` objects.
 * The exported `interpolate` function uses this type.
 */
export interface Interpolator {
    <In extends ReadonlyArray<any>, Out>(parents: In, interpolator: (...args: Interpolated<In>) => Out): Interpolation<Out>;
    <In, Out>(parent: FluidValue<In> | In, interpolator: InterpolatorFn<In, Out>): Interpolation<Out>;
    <Out>(parents: OneOrMore<FluidValue>, config: InterpolatorConfig<Out>): Interpolation<Animatable<Out>>;
    <Out>(parents: OneOrMore<FluidValue<number>> | FluidValue<number[]>, range: readonly number[], output: readonly Constrain<Out, Animatable>[], extrapolate?: ExtrapolateType): Interpolation<Animatable<Out>>;
}
