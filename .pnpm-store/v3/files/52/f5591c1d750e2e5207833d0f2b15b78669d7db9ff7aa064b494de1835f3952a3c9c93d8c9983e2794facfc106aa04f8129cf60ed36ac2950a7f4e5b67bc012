import { Root } from './renderer';
import { RootState } from './store';
declare type GlobalRenderCallback = (timeStamp: number) => void;
export declare const addEffect: (callback: GlobalRenderCallback) => () => void;
export declare const addAfterEffect: (callback: GlobalRenderCallback) => () => void;
export declare const addTail: (callback: GlobalRenderCallback) => () => void;
export declare function createLoop<TCanvas>(roots: Map<TCanvas, Root>): {
    loop: (timestamp: number) => number | undefined;
    invalidate: (state?: RootState | undefined) => void;
    advance: (timestamp: number, runGlobalEffects?: boolean, state?: RootState | undefined) => void;
};
export {};
