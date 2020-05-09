import Recognizer from './Recognizer'
import { calculateAllKinematics, subV } from '../utils/math'
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
    // angle might not be defined when ctrl wheel is used for zoom only
    // in that case we set it to the previous angle value
    a = a !== void 0 ? a : state.values[1]

    let delta_a = a - state.values[1]

    //console.warn({
    //  raw: delta_a, 
    //  fixed: fixContinuity(delta_a)
    //})

    let next_turns = state.turns
    if (Math.abs(delta_a) > 270) {
      next_turns += Math.sign(delta_a)
    }

    /**
     * The angle value might jump from 179deg to -179deg when we actually want to
     * read 181deg to ensure continuity. To make that happen, we detect when the jump
     * is supsiciously high (ie > 270deg) and increase the `turns` value
     */

    return subV([ d, a - 360 * next_turns ], state.initial)
  }

  getKinematics(values: Vector2, event: UseGestureEvent): PartialGestureState<T> {
    const movementDetection = this.getMovement(values, this.state)
    const turns = (values[1] - movementDetection.movement![1] - this.state.initial[1]) / 360

    const kinematics = calculateAllKinematics(
      movementDetection.movement!, 
      movementDetection.delta!, 
      event.timeStamp - this.state.timeStamp!
    )

    return { values, turns, ...movementDetection, ...kinematics }
  }

  protected mapStateValues(state: GestureState<T>): PartialGestureState<T> {
    return { da: state.values, vdva: state.velocities } as PartialGestureState<T>
  }
}

/**
 * @param dangle is a small change of variable on "lifting" of the circle. 
 * It's expected to be small and cannot be greater than 270 or under -270
 */
function fixContinuity(dangle: number) {
  dangle -= Math.round(dangle/360)*360
  if (dangle >  270) return dangle - 360
  if (dangle < -270) return dangle + 360
  return dangle
}