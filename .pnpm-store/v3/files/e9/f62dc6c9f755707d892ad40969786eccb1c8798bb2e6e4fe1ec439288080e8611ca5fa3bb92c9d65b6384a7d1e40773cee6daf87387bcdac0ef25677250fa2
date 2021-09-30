import type { InputWithSettings } from '../../types';
import type { VectorType, Format, InternalVectorSettings, VectorSettings } from './vector-types';
export declare function getVectorSchema(dimension: number): (o: any) => boolean;
/**
 * Returns 'array' if value is an array, 'object' if it's an object.
 * @param value
 * @returns
 */
export declare function getVectorType(value: VectorType): Format;
/**
 * This function will check if the value argument is the full vector or only
 * a slice of it. If it's only a slice, then it will merge it with the
 * previousValue, preserving ratio if settings.lock is set.
 * @param value
 * @param settings
 * @param previousValue
 * @returns
 */
export declare const sanitizeVector: <K extends string, F extends Format>(value: number[] | { [key in K]: number; }, settings: InternalVectorSettings<K, K[], F>, previousValue: any) => VectorType<K, F>;
/**
 * Formats a vector into an object to be displayed.
 * @param value
 * @param settings
 * @returns
 */
export declare const formatVector: <K extends string, F extends Format>(value: number[] | { [key in K]: number; }, settings: InternalVectorSettings<K, K[], F>) => { [key_1 in import("../../types").GetKeys<{ [key in K]: number; }> extends never ? K : import("../../types").GetKeys<{ [key in K]: number; }>]: number; };
/**
 * Normalizes a vector by extracting its keys and creating a number settings
 * for each of them.
 * @param _value
 * @param settings
 * @param defaultKeys
 * @returns
 */
export declare function normalizeVector<Value extends VectorType, K extends string>(value: Value, settings: VectorSettings<Value, K>, defaultKeys?: K[]): {
    value: Value;
    settings: { [key_1 in keyof { [key in import("../../types").GetKeys<Value> extends never ? string : import("../../types").GetKeys<Value>]: number; }]: import("../Number/number-types").InternalNumberSettings; } & {
        format: Format;
        keys: string[];
        lock: boolean;
        locked: boolean;
    };
};
export declare function getVectorPlugin<K extends string>(defaultKeys: K[]): {
    schema: (o: any) => boolean;
    normalize: <Value extends number[] | {
        [x: string]: number;
    }>({ value, ...settings }: InputWithSettings<Value, VectorSettings<Value, K>, "value">) => {
        value: Value;
        settings: { [key_1 in keyof { [key in import("../../types").GetKeys<Value> extends never ? string : import("../../types").GetKeys<Value>]: number; }]: import("../Number/number-types").InternalNumberSettings; } & {
            format: Format;
            keys: string[];
            lock: boolean;
            locked: boolean;
        };
    };
    format: (value: any, settings: InternalVectorSettings) => {
        [x: string]: number;
    };
    sanitize: (value: any, settings: InternalVectorSettings, prevValue: any) => number[] | {
        [x: string]: number;
    };
};
