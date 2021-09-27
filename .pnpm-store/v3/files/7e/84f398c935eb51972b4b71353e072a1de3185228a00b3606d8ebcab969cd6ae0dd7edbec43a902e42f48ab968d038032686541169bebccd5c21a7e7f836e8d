import { CollectionProp, QueryParams } from '../common-types';
declare type IterableFn<P = any, T = any> = (params: P) => Promise<CollectionProp<T>>;
declare type ParamsType<T extends IterableFn> = T extends (params: infer P) => any ? P : never;
export declare const asIterator: <P extends QueryParams, T, F extends IterableFn<P, T>>(fn: F, params: ParamsType<F>) => AsyncIterable<T>;
export {};
