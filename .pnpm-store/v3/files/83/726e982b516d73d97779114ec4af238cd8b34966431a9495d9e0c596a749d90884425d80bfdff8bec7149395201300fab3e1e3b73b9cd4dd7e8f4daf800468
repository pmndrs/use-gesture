import type { FrameFn, FrameUpdateFn, Rafz, Timeout, Throttled } from './types';
export type { FrameFn, FrameUpdateFn, Timeout, Throttled, Rafz };
/**
 * Schedule an update for next frame.
 * Your function can return `true` to repeat next frame.
 */
export declare const raf: Rafz;
/** Tree-shakable state for testing purposes */
export declare const __raf: {
    /** The number of pending tasks */
    count: number;
    /** Clear internal state. Never call from update loop! */
    clear(): void;
};
