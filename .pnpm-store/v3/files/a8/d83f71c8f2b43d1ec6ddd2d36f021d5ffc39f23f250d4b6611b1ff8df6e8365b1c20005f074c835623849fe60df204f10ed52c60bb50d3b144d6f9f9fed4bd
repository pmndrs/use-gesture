import { Predicate, PredicateOptions } from './predicate';
export declare class WeakMapPredicate<KeyType extends object = object> extends Predicate<WeakMap<KeyType, unknown>> {
    /**
    @hidden
    */
    constructor(options?: PredicateOptions);
    /**
    Test a WeakMap to include all the provided keys. The keys are tested by identity, not structure.

    @param keys - The keys that should be a key in the WeakMap.
    */
    hasKeys(...keys: readonly KeyType[]): this;
    /**
    Test a WeakMap to include any of the provided keys. The keys are tested by identity, not structure.

    @param keys - The keys that could be a key in the WeakMap.
    */
    hasAnyKeys(...keys: readonly KeyType[]): this;
}
