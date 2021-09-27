import { Collection, CollectionProp, MakeRequest } from './common-types';
export declare const wrapCollection: <R, T, Rest extends any[]>(fn: (makeRequest: MakeRequest, entity: T, ...rest: Rest) => R) => (makeRequest: MakeRequest, data: CollectionProp<T>, ...rest: Rest) => Collection<R, T>;
