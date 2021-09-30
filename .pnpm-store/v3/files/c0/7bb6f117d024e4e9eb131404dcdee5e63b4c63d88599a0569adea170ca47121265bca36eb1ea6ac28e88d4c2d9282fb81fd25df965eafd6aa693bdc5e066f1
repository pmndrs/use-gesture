export declare function isEmpty(arr: any[]): boolean;
export declare function keys(obj: any): string[];
export declare function values(obj: any): any[];
export declare function mapValues<I, O>(obj: Record<string, I>, callback: (value: I, key?: string) => O): O[];
export declare function map<I, O>(arr: I[], callback: (I: any, idx?: number) => O): O[];
export declare function flatten<T>(arr: any[]): T[];
export declare function first<T>(arr: T[]): T;
export declare function last<T>(arr: T[]): T;
export declare function forEach(collection: any, iteratorCallback: Function): void;
export declare function isString(item: any): boolean;
export declare function isUndefined(item: any): boolean;
export declare function isFunction(item: any): boolean;
export declare function drop<T>(arr: T[], howMuch?: number): T[];
export declare function dropRight<T>(arr: T[], howMuch?: number): T[];
export declare function filter<T>(arr: T[], predicate: (T: any) => boolean): T[];
export declare function reject<T>(arr: T[], predicate: (T: any) => boolean): T[];
export declare function pick(obj: Object, predicate: (item: any) => boolean): {};
export declare function has(obj: any, prop: string): boolean;
export declare function contains<T>(arr: T[], item: any): boolean;
/**
 * shallow clone
 */
export declare function cloneArr<T>(arr: T[]): T[];
/**
 * shallow clone
 */
export declare function cloneObj(obj: Object): any;
export declare function find<T>(arr: T[], predicate: (item: T) => boolean): T;
export declare function findAll<T>(arr: T[], predicate: (item: T) => boolean): T[];
export declare function reduce<T, A>(arrOrObj: Array<T> | Object, iterator: (result: A, item: any, idx?: any) => A, initial: A): A;
export declare function compact<T>(arr: T[]): T[];
export declare function uniq<T>(arr: T[], identity?: (item: T) => any): T[];
export declare function partial(func: Function, ...restArgs: any[]): Function;
export declare function isArray(obj: any): obj is any[];
export declare function isRegExp(obj: any): obj is RegExp;
export declare function isObject(obj: any): obj is Object;
export declare function every<T>(arr: T[], predicate: (item: T, idx?: any) => boolean): boolean;
export declare function difference<T>(arr: T[], values: T[]): T[];
export declare function some<T>(arr: T[], predicate: (item: T) => boolean): boolean;
export declare function indexOf<T>(arr: T[], value: T): number;
export declare function sortBy<T>(arr: T[], orderFunc: (item: T) => number): T[];
export declare function zipObject(keys: any[], values: any[]): Object;
/**
 * mutates! (and returns) target
 */
export declare function assign(target: Object, ...sources: Object[]): Object;
/**
 * mutates! (and returns) target
 */
export declare function assignNoOverwrite(target: Object, ...sources: Object[]): Object;
export declare function defaults(...sources: any[]): any;
export declare function groupBy<T>(arr: T[], groupKeyFunc: (item: T) => string): {
    [groupKey: string]: T[];
};
/**
 * Merge obj2 into obj1.
 * Will overwrite existing properties with the same name
 */
export declare function merge(obj1: Object, obj2: Object): any;
export declare function NOOP(): void;
export declare function IDENTITY(item: any): any;
/**
 * Will return a new packed array with same values.
 */
export declare function packArray<T>(holeyArr: T[]): T[];
export declare function PRINT_ERROR(msg: any): void;
export declare function PRINT_WARNING(msg: any): void;
export declare function isES2015MapSupported(): boolean;
export declare function peek<T>(arr: T[]): T;
export declare function timer<T>(func: () => T): {
    time: number;
    value: T;
};
export declare function toFastProperties(toBecomeFast: any): any;
export declare function upperFirst(str: string): string;
