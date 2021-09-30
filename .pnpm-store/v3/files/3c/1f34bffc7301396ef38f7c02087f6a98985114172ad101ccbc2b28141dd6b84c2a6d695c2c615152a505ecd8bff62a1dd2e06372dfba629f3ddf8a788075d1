import { Animated, Payload } from './Animated';
/** An animated number or a native attribute value */
export declare class AnimatedValue<T = any> extends Animated {
    protected _value: T;
    done: boolean;
    elapsedTime: number;
    lastPosition: number;
    lastVelocity?: number | null;
    v0?: number | null;
    durationProgress: number;
    constructor(_value: T);
    /** @internal */
    static create(value: any): AnimatedValue<any>;
    getPayload(): Payload;
    getValue(): T;
    setValue(value: T, step?: number): boolean;
    reset(): void;
}
