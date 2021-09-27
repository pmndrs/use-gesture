import { Timeout } from '@react-spring/shared';
import { Falsy } from '@react-spring/types';
import { AnimationTarget, InferState, InferProps } from './types/internal';
import { AnimationResult, AsyncResult, SpringChain, SpringToFn } from './types';
declare type AsyncTo<T> = SpringChain<T> | SpringToFn<T>;
/** @internal */
export declare type RunAsyncProps<T extends AnimationTarget = any> = InferProps<T> & {
    callId: number;
    parentId?: number;
    cancel: boolean;
    to?: any;
};
/** @internal */
export interface RunAsyncState<T extends AnimationTarget = any> {
    paused: boolean;
    pauseQueue: Set<() => void>;
    resumeQueue: Set<() => void>;
    timeouts: Set<Timeout>;
    asyncId?: number;
    asyncTo?: AsyncTo<InferState<T>>;
    promise?: AsyncResult<T>;
    cancelId?: number;
}
/**
 * Start an async chain or an async script.
 *
 * Always call `runAsync` in the action callback of a `scheduleProps` call.
 *
 * The `T` parameter can be a set of animated values (as an object type)
 * or a primitive type for a single animated value.
 */
export declare function runAsync<T extends AnimationTarget>(to: AsyncTo<InferState<T>>, props: RunAsyncProps<T>, state: RunAsyncState<T>, target: T): AsyncResult<T>;
/** Stop the current `runAsync` call with `finished: false` (or with `cancelled: true` when `cancelId` is defined) */
export declare function stopAsync(state: RunAsyncState, cancelId?: number | Falsy): void;
/** This error is thrown to signal an interrupted async animation. */
export declare class BailSignal extends Error {
    result: AnimationResult;
    constructor();
}
export declare class SkipAniamtionSignal extends Error {
    result: AnimationResult;
    constructor();
}
export {};
