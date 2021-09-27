// https://github.com/DefinitelyTyped/DefinitelyTyped/pull/27449/commits/3afbb600c58f0739410b5f882d35eb323976fe80

declare module 'v8n' {
  const v8n: {
    (): Validation
    extend(item: Record<string, (item: any) => (value: any) => boolean>)
  }

  export default v8n

  interface Validation {
    chain: Rule[]
    every: Validation
    invert?: boolean
    extend(newRules: { [key: string]: () => boolean }): void
    test(value: any): boolean
    check(value: any): never
    pattern(pattern: RegExp): Validation
    equal(expected: any): Validation
    exact(expected: any): Validation
    string(): Validation
    number(): Validation
    boolean(): Validation
    undefined(): Validation
    null(): Validation
    array(): Validation
    lowercase(): Validation
    vowel(): Validation
    object(): Validation
    consonant(): Validation
    first(item: any): Validation
    last(item: any): Validation
    empty(): Validation
    length(min: number, max?: number): Validation
    minLength(min: number): Validation
    maxLength(max: number): Validation
    negative(): Validation
    positive(): Validation
    between(min: number, max: number): Validation
    range(min: number, max: number): Validation
    lessThan(bound: number): Validation
    lessThanOrEqual(bound: number): Validation
    greaterThan(bound: number): Validation
    greaterThanOrEqual(bound: number): Validation
    even(): Validation
    odd(): Validation
    includes(expected: any): Validation
    integer(): Validation
    schema(item: any): Validation
    passesAnyOf(...args: Validation[]): Validation
    optional(item: Validation): Validation
  }
  class Rule {
    constructor(name: string, fn: () => boolean, args?: any, invert?: boolean)
    name: string
    fn: () => boolean
    args?: any
    invert?: boolean
  }
}
