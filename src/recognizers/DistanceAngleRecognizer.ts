import Recognizer from './Recognizer'
import { calculateAllKinematics, sign } from '../utils/math'
import { Vector2, UseGestureEvent, PartialGestureState, DistanceAngleKey, GestureState } from '../types'

/**
 * @private
 * Abstract class for distance/angle-based gesture recongizers
 * @abstract
 * @class DistanceAngleRecognizer
 * @extends {Recognizer<T>}
 * @template T
 */
export default abstract class DistanceAngleRecognizer<T extends DistanceAngleKey> extends Recognizer<T> {
  /**
   * Returns the real movement (without taking intentionality into acount)
   */
  protected getInternalMovement([d, a]: [number, number?], state: GestureState<T>): Vector2 {
    const { values: da, turns, initial } = state

    // angle might not be defined when ctrl wheel is used for zoom only
    // in that case we set it to the previous angle value
    a = a !== void 0 ? a : da[1]

    let delta_a = a - da[1]

    /**
     * The angle value might jump from 179deg to -179deg when we actually want to
     * read 181deg to ensure continuity. To make that happen, we detect when the jump
     * is supsiciously high (ie > 270deg) and increase the `turns` value
     */
    const newTurns = Math.abs(delta_a) > 270 ? turns + sign(delta_a) : turns

    // we update the angle difference to its corrected value

    const movement_d = d - initial[0]
    const movement_a = a - 360 * newTurns - initial[1]
    return [movement_d, movement_a]
  }

  getKinematics(values: Vector2, event: UseGestureEvent): PartialGestureState<T> {
    const { timeStamp, initial } = this.state

    const movementDetection = this.getMovement(values, this.state)
    const { delta, movement } = movementDetection

    const turns = (values[1] - movement![1] - initial[1]) / 360

    const delta_t = event.timeStamp - timeStamp!
    const kinematics = calculateAllKinematics(movement!, delta!, delta_t)

    return {
      values,
      delta,
      turns,
      ...movementDetection,
      ...kinematics,
    }
  }

  protected mapStateValues(state: GestureState<T>): PartialGestureState<T> {
    return { da: state.values, vdva: state.velocities } as PartialGestureState<T>
  }
}
