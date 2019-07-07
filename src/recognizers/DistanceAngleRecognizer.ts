import Recognizer from './Recognizer'
import { addV, calculateVelocities } from '../utils'
import { DistanceAngle, GestureState, Vector2, TransformedEvent } from '../types'

/**
 * Abstract class for distance/angle-based gesture recongizers
 */
export default abstract class DistanceAngleRecognizer extends Recognizer<DistanceAngle> {
  /**
   * Utility function to get kinematics of the gesture
   * @d distance
   * @a angle
   * @event
   * @returns set of values including delta, velocities, turns
   */
  protected getKinematics = ([d, a]: [number, number?], event: TransformedEvent): Partial<GestureState<DistanceAngle>> => {
    const state = this.getState()
    const { values: da, turns, initial, lastLocal, time = 0 } = state

    // angle might not be defined when ctrl wheel is used for zoom only
    // in that case we set it to the previous angle value
    a = a === undefined ? da[1] : a

    const diff_d = d - da[0]
    let diff_a = a - da[1]

    /**
     * The angle value might jump from 179deg to -179deg when we actually want to
     * read 181deg to ensure continuity. To make that happen, we detect when the jump
     * is supsiciously high (ie > 300deg) and increase the `turns` value
     */
    const newTurns = Math.abs(diff_a) > 300 ? turns + Math.sign(diff_a) : turns

    // we update the angle difference to its corrected value
    diff_a -= 360 * newTurns
    const delta_d = d - initial[0]
    const delta_a = a - 360 * newTurns - initial[1]

    const delta: Vector2 = [delta_d, delta_a]

    const delta_t = event.timeStamp - time
    const velocities = calculateVelocities([diff_d, diff_a], delta_t) as Vector2

    return {
      event,
      values: [d, a],
      delta,
      velocities,
      turns: newTurns,
      local: addV(lastLocal, delta),
      previous: da,
      time: event.timeStamp,
    }
  }
}
