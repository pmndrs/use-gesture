/// <reference types="react" />
import Recognizer from './Recognizer';
import { Vector2, PartialGestureState, DistanceAngleKey, GestureState } from '../types';
/**
 * @private
 * Abstract class for distance/angle-based gesture recongizers
 */
export default abstract class DistanceAngleRecognizer<T extends DistanceAngleKey> extends Recognizer<T> {
    protected getInternalMovement(values: [number, number?], state: GestureState<T>): Vector2;
    getKinematics(values: Vector2, event: React.UIEvent | UIEvent): PartialGestureState<T>;
    protected mapStateValues(state: GestureState<T>): Omit<PartialGestureState<T>, 'event'>;
}
/**
 * @param dangle is a small change of variable on "lifting" of the circle.
 * It's expected to be small and cannot be greater than 270 or under -270
 */
export declare function fixContinuity(dangle: number): number;
