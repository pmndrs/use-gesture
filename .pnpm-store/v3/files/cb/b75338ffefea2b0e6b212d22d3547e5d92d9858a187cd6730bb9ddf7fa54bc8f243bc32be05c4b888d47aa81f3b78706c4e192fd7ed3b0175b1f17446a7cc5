// Utils from https://github.com/pmndrs/use-tweaks/blob/92561618abbf43c581fc5950fd35c0f8b21047cd/src/types.ts#L70
/**
 * It does nothing but beautify union type
 *
 * ```
 * type A = { a: 'a' } & { b: 'b' } // { a: 'a' } & { b: 'b' }
 * type B = Id<{ a: 'a' } & { b: 'b' }> // { a: 'a', b: 'b' }
 * ```
 */
export type BeautifyUnionType<T> = T extends object
  ? T extends Function // if T is a function return it as is
    ? T
    : any[] extends T // if T is a plain array return it as is
    ? T
    : T extends infer TT // if T is an object beautify it
    ? { [k in keyof TT]: TT[k] } & GetIterator<TT>
    : never
  : T

// adds Iterator to the return type in case it has any
type GetIterator<T> = T extends { [Symbol.iterator]: infer U } ? { [Symbol.iterator]: U } : {}

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

/**
 * Gets keys from Record
 */
export type GetKeys<V> = V extends Record<infer K, number> ? K : never
