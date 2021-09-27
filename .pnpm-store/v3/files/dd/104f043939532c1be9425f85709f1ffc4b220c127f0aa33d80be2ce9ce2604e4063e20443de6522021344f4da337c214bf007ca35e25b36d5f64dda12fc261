import { Predicate, PredicateOptions } from './predicate';
export declare class WeakSetPredicate<T extends object = object> extends Predicate<WeakSet<T>> {
    /**
    @hidden
    */
    constructor(options?: PredicateOptions);
    /**
    Test a WeakSet to include all the provided items. The items are tested by identity, not structure.

    @param items - The items that should be a item in the WeakSet.
    */
    has(...items: readonly T[]): this;
    /**
    Test a WeakSet to include any of the provided items. The items are tested by identity, not structure.

    @param items - The items that could be a item in the WeakSet.
    */
    hasAny(...items: readonly T[]): this;
}
