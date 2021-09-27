/// <reference types="react" />
import Controller from '../Controller';
import { StateKey, SharedGestureState, IngKey, InternalConfig, GestureKey, GestureState, EventTypes, PartialGestureState, Vector2, FullGestureState, RecognizerClass } from '../types';
export declare const RecognizersMap: Map<GestureKey, RecognizerClass>;
/**
 * @private
 * Recognizer abstract class.
 */
export default abstract class Recognizer<T extends StateKey = StateKey> {
    readonly controller: Controller;
    readonly args: any[];
    abstract readonly ingKey: IngKey;
    protected debounced: Boolean;
    abstract readonly stateKey: T;
    /**
     * Creates an instance of a gesture recognizer.
     * @param stateKey drag, move, pinch, etc.
     * @param controller the controller attached to the gesture
     * @param [args] the args that should be passed to the gesture handler
     */
    constructor(controller: Controller, args?: any[]);
    get config(): NonNullable<InternalConfig[T]>;
    get enabled(): boolean;
    get state(): GestureState<T>;
    get handler(): NonNullable<import("../types").InternalHandlers[T]>;
    get transform(): (xy: Vector2) => Vector2;
    protected updateSharedState(sharedState: Partial<SharedGestureState> | null): void;
    protected updateGestureState(gestureState: PartialGestureState<T> | null): void;
    protected setTimeout: (callback: (...args: any[]) => void, ms?: number, ...args: any[]) => void;
    protected clearTimeout: () => void;
    protected abstract getKinematics(values: Vector2, event: React.UIEvent | UIEvent): PartialGestureState<T>;
    protected abstract getInternalMovement(values: Vector2, state: GestureState<T>): Vector2;
    protected abstract mapStateValues(state: GestureState<T>): Omit<PartialGestureState<T>, 'event'>;
    abstract addBindings(bindings: any): void;
    /**
     * Returns state properties depending on the movement and state.
     *
     * Should be overriden for custom behavior, doesn't do anything in the implementation
     * below.
     */
    protected checkIntentionality(_intentional: [false | number, false | number], _movement: Vector2): PartialGestureState<T>;
    /**
     * Returns basic movement properties for the gesture based on the next values and current state.
     */
    protected getMovement(values: Vector2): PartialGestureState<T>;
    protected clean(): void;
    /**
     * Fires the gesture handler
     */
    protected fireGestureHandler: (forceFlag?: boolean) => FullGestureState<T> | null;
}
/**
 * Returns a generic, common payload for all gestures from an event.
 */
export declare function getGenericPayload<T extends StateKey>({ state }: Recognizer<T>, event: EventTypes[T], isStartEvent?: boolean): {
    _lastEventType: string;
    event: EventTypes[T];
    timeStamp: number;
    elapsedTime: number;
    previous: Vector2;
};
/**
 * Returns the reinitialized start state for the gesture.
 * Should be common to all gestures.
 */
export declare function getStartGestureState<T extends StateKey>({ state, config, stateKey, args, transform }: Recognizer<T>, values: Vector2, event: EventTypes[T], initial?: Vector2): GestureState<T> & {
    _initial: Vector2;
    _bounds: [Vector2, Vector2];
    _active: boolean;
    args: any[];
    values: Vector2;
    initial: Vector2;
    _threshold: number[];
    offset: Vector2;
    lastOffset: Vector2;
    startTime: number;
};
