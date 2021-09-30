import { AnimatedValue } from './AnimatedValue';
declare type Value = string | number;
export declare class AnimatedString extends AnimatedValue<Value> {
    protected _value: number;
    protected _string: string | null;
    protected _toString: (input: number) => string;
    constructor(value: string);
    /** @internal */
    static create(value: string): AnimatedString;
    getValue(): string;
    setValue(value: Value): boolean;
    reset(goal?: string): void;
}
export {};
