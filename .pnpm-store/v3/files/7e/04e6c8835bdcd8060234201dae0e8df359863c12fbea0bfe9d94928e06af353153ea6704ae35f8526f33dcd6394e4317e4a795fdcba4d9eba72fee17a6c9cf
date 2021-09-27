import { AnimationResult } from './types';
import { Readable } from './types/internal';
/** @internal */
export declare const getCombinedResult: <T extends Readable<any>>(target: T, results: AnimationResult<T>[]) => AnimationResult<T>;
/** No-op results are for updates that never start an animation. */
export declare const getNoopResult: (value: any) => {
    value: any;
    noop: boolean;
    finished: boolean;
    cancelled: boolean;
};
export declare const getFinishedResult: (value: any, finished: boolean, cancelled?: boolean) => {
    value: any;
    finished: boolean;
    cancelled: boolean;
};
export declare const getCancelledResult: (value: any) => {
    value: any;
    cancelled: boolean;
    finished: boolean;
};
