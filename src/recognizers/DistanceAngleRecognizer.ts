import Recognizer from './Recognizer'
import { addV, calculateVelocities, calculateDirection } from '../utils'
import { DistanceAngle, GestureState, Vector2, TransformType, TransformedEvent } from '../types'
import { initialState } from '../defaults'

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
    const { da, turns, initial, offset, time = 0 } = state

    // angle might not be defined when ctrl wheel is used for zoom only
    // in that case we set it to the previous angle value
    a = a === undefined ? da[1] : a

    const delta_d = d - da[0]
    let delta_a = a - da[1]

    /**
     * The angle value might jump from 179deg to -179deg when we actually want to
     * read 181deg to ensure continuity. To make that happen, we detect when the jump
     * is supsiciously high (ie > 300deg) and increase the `turns` value
     */
    const newTurns = Math.abs(delta_a) > 300 ? turns + Math.sign(delta_a) : turns

    // we update the angle difference to its corrected value
    delta_a -= 360 * newTurns
    const offset_d = d - initial[0]
    const offset_a = a - 360 * newTurns - initial[1]

    const movement: Vector2 = [offset_d, offset_a]

    const delta = [delta_d, delta_a] as Vector2

    const delta_t = event.timeStamp - time
    const velocities = calculateVelocities(delta, delta_t)
    const direction = calculateDirection(delta)
    return {
      event,
      da: [d, a],
      movement,
      delta,
      offset: addV(offset, delta),
      vdva: velocities,
      direction,
      turns: newTurns,
      previous: da,
      time: event.timeStamp,
    }
  }

  /**
   * returns the start state for a given gesture
   * @param da the distance/angle values of the start state
   * @param event the event that triggers the gesture start
   */
  protected getStartState = (da: Vector2, event: TransformedEvent): GestureState<DistanceAngle> => {
    const state = this.getState()
    const initial = initialState[this.stateKey] as GestureState<DistanceAngle>
    const transform: TransformType = state.transform || event.transform || this.getTransformConfig()
    const offset = state.offset || initial.offset

    return {
      ...initial,
      event,
      da,
      initial: da,
      previous: da,
      offset,
      first: true,
      active: true,
      transform,
      time: event.timeStamp,
      args: this.args,
    }
  }
}
