import { Lookup } from '@react-spring/types';
import { Animated } from './Animated';
import { AnimatedValue } from './AnimatedValue';
/** An object containing `Animated` nodes */
export declare class AnimatedObject extends Animated {
    protected source: Lookup;
    constructor(source: Lookup);
    getValue(animated?: boolean): Lookup<any>;
    /** Replace the raw object data */
    setValue(source: Lookup): void;
    reset(): void;
    /** Create a payload set. */
    protected _makePayload(source: Lookup): AnimatedValue<any>[] | undefined;
    /** Add to a payload set. */
    protected _addToPayload(this: Set<AnimatedValue>, source: any): void;
}
