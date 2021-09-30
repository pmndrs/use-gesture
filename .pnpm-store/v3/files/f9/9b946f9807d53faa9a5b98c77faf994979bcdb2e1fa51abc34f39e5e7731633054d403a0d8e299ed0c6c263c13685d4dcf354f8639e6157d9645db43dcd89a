import { Predicate, PredicateOptions } from './predicate';
export declare class SetPredicate<T = any> extends Predicate<Set<T>> {
    /**
    @hidden
    */
    constructor(options?: PredicateOptions);
    /**
    Test a Set to have a specific size.

    @param size - The size of the Set.
    */
    size(size: number): this;
    /**
    Test a Set to have a minimum size.

    @param size - The minimum size of the Set.
    */
    minSize(size: number): this;
    /**
    Test a Set to have a maximum size.

    @param size - The maximum size of the Set.
    */
    maxSize(size: number): this;
    /**
    Test a Set to include all the provided items. The items are tested by identity, not structure.

    @param items - The items that should be a item in the Set.
    */
    has(...items: readonly T[]): this;
    /**
    Test a Set to include any of the provided items. The items are tested by identity, not structure.

    @param items - The items that could be a item in the Set.
    */
    hasAny(...items: readonly T[]): this;
    /**
    Test all the items in the Set to match the provided predicate.

    @param predicate - The predicate that should be applied against every item in the Set.
    */
    ofType(predicate: Predicate<T>): this;
    /**
    Test a Set to be empty.
    */
    get empty(): this;
    /**
    Test a Set to be not empty.
    */
    get nonEmpty(): this;
    /**
    Test a Set to be deeply equal to the provided Set.

    @param expected - Expected Set to match.
    */
    deepEqual(expected: Set<T>): this;
}
