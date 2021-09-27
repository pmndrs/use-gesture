import type { DataItem } from '../types';
declare type Input = Omit<DataItem, '__refCount'>;
/**
 * Return all input (value and settings) properties at a given path.
 *
 * @param path
 */
export declare function useInput(path: string): [
    Input | null,
    {
        set: (value: any, onValueChanged?: (value: any) => void) => void;
        setSettings: (value: any) => void;
        disable: (flag: boolean) => void;
        storeId: string;
        emitOnEditStart: () => void;
        emitOnEditEnd: () => void;
    }
];
export {};
