import { raf, Rafz } from '@react-spring/rafz';
import { OneOrMore, InterpolatorConfig, InterpolatorArgs } from '@react-spring/types';
import { FluidValue } from './fluids';
import type { OpaqueAnimation } from './FrameLoop';
export declare let createStringInterpolator: (config: InterpolatorConfig<string>) => (input: number) => string;
export declare let to: <In, Out>(source: OneOrMore<FluidValue>, args: InterpolatorArgs<In, Out>) => FluidValue<Out>;
export declare let colors: {
    [key: string]: number;
} | null;
export declare let skipAnimation: boolean;
export declare let willAdvance: (animation: OpaqueAnimation) => void;
export interface AnimatedGlobals {
    /** Returns a new `Interpolation` object */
    to?: typeof to;
    /** Used to measure frame length. Read more [here](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now) */
    now?: typeof raf.now;
    /** Provide custom color names for interpolation */
    colors?: typeof colors;
    /** Make all animations instant and skip the frameloop entirely */
    skipAnimation?: typeof skipAnimation;
    /** Provide custom logic for string interpolation */
    createStringInterpolator?: typeof createStringInterpolator;
    /** Schedule a function to run on the next frame */
    requestAnimationFrame?: (cb: () => void) => void;
    /** Event props are called with `batchedUpdates` to reduce extraneous renders */
    batchedUpdates?: typeof raf.batchedUpdates;
    /** @internal Exposed for testing purposes */
    willAdvance?: typeof willAdvance;
    /** sets the global frameLoop setting for the global raf instance */
    frameLoop?: Rafz['frameLoop'];
}
export declare const assign: (globals: AnimatedGlobals) => void;
