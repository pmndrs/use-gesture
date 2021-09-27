import { BasePredicate, testSymbol } from './base-predicate';
import { PredicateOptions } from './predicate';
import { Main } from '..';
/**
@hidden
*/
export declare class AnyPredicate<T = unknown> implements BasePredicate<T> {
    private readonly predicates;
    private readonly options;
    constructor(predicates: BasePredicate[], options?: PredicateOptions);
    [testSymbol](value: T, main: Main, label: string | Function): asserts value;
}
