/// <reference types="react" />
import type { DataInput } from '../../types';
declare type ControlInputProps = Omit<DataInput, '__refCount' | 'key'> & {
    valueKey: string;
    path: string;
    storeId: string;
    setValue: (value: any) => void;
    setSettings: (settings: any) => void;
    disable: (flag: boolean) => void;
    emitOnEditStart?: (...args: any) => void;
    emitOnEditEnd?: (...args: any) => void;
};
export declare function ControlInput({ type, label, path, valueKey, value, settings, setValue, disabled, ...rest }: ControlInputProps): JSX.Element | null;
export {};
