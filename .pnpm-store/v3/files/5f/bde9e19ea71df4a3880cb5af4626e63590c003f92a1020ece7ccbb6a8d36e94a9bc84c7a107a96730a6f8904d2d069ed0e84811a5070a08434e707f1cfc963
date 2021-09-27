import { AnimatedObject } from './AnimatedObject';
import { AnimatedValue } from './AnimatedValue';
declare type Value = number | string;
declare type Source = AnimatedValue<Value>[];
/** An array of animated nodes */
export declare class AnimatedArray<T extends ReadonlyArray<Value> = Value[]> extends AnimatedObject {
    protected source: Source;
    constructor(source: T);
    /** @internal */
    static create<T extends ReadonlyArray<Value>>(source: T): AnimatedArray<T>;
    getValue(): T;
    setValue(source: T): boolean;
}
export {};
