/**
 * It does nothing but beautify union type
 *
 * ```
 * type A = { a: 'a' } & { b: 'b' } // { a: 'a' } & { b: 'b' }
 * type B = Id<{ a: 'a' } & { b: 'b' }> // { a: 'a', b: 'b' }
 * ```
 */
export declare type BeautifyUnionType<T> = T extends object ? T extends Function ? T : any[] extends T ? T : T extends infer TT ? {
    [k in keyof TT]: TT[k];
} & GetIterator<TT> : never : T;
declare type GetIterator<T> = T extends {
    [Symbol.iterator]: infer U;
} ? {
    [Symbol.iterator]: U;
} : {};
export declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
/**
 * Gets keys from Record
 */
export declare type GetKeys<V> = V extends Record<infer K, number> ? K : never;
export {};
