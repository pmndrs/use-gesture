/// <reference types="react" />
import Recognizer from './Recognizer';
import { Vector2, PartialGestureState, GestureState, CoordinatesKey } from '../types';
/**
 * @private
 * Abstract class for coordinates-based gesture recongizers
 */
export default abstract class CoordinatesRecognizer<T extends CoordinatesKey> extends Recognizer<T> {
    /**
     * Returns the real movement (without taking intentionality into account)
     */
    protected getInternalMovement(values: Vector2, state: GestureState<T>): Vector2;
    /**
     * In coordinates-based gesture, this function will detect the first intentional axis,
     * lock the gesture axis if lockDirection is specified in the config, block the gesture
     * if the first intentional axis doesn't match the specified axis in config.
     */
    protected checkIntentionality(_intentional: [false | number, false | number], _movement: Vector2): PartialGestureState<T>;
    getKinematics(values: Vector2, event: React.UIEvent | UIEvent): PartialGestureState<T>;
    protected mapStateValues(state: GestureState<T>): Omit<PartialGestureState<T>, 'event'>;
}
