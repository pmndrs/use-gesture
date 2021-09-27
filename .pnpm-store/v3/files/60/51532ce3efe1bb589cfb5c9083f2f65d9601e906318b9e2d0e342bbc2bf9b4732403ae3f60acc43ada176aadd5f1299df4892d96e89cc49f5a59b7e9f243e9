import { Predicate, PredicateOptions } from './predicate';
export declare class MapPredicate<T1 = unknown, T2 = unknown> extends Predicate<Map<T1, T2>> {
    /**
    @hidden
    */
    constructor(options?: PredicateOptions);
    /**
    Test a Map to have a specific size.

    @param size - The size of the Map.
    */
    size(size: number): this;
    /**
    Test an Map to have a minimum size.

    @param size - The minimum size of the Map.
    */
    minSize(size: number): this;
    /**
    Test an Map to have a maximum size.

    @param size - The maximum size of the Map.
    */
    maxSize(size: number): this;
    /**
    Test a Map to include all the provided keys. The keys are tested by identity, not structure.

    @param keys - The keys that should be a key in the Map.
    */
    hasKeys(...keys: readonly T1[]): this;
    /**
    Test a Map to include any of the provided keys. The keys are tested by identity, not structure.

    @param keys - The keys that could be a key in the Map.
    */
    hasAnyKeys(...keys: readonly T1[]): this;
    /**
    Test a Map to include all the provided values. The values are tested by identity, not structure.

    @param values - The values that should be a value in the Map.
    */
    hasValues(...values: readonly T2[]): this;
    /**
    Test a Map to include any of the provided values. The values are tested by identity, not structure.

    @param values - The values that could be a value in the Map.
    */
    hasAnyValues(...values: readonly T2[]): this;
    /**
    Test all the keys in the Map to match the provided predicate.

    @param predicate - The predicate that should be applied against every key in the Map.
    */
    keysOfType(predicate: Predicate<T1>): this;
    /**
    Test all the values in the Map to match the provided predicate.

    @param predicate - The predicate that should be applied against every value in the Map.
    */
    valuesOfType(predicate: Predicate<T2>): this;
    /**
    Test a Map to be empty.
    */
    get empty(): this;
    /**
    Test a Map to be not empty.
    */
    get nonEmpty(): this;
    /**
    Test a Map to be deeply equal to the provided Map.

    @param expected - Expected Map to match.
    */
    deepEqual(expected: Map<T1, T2>): this;
}
