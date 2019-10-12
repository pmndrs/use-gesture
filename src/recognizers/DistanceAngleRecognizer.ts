import Recognizer from './Recognizer'
import { addV, calculateVelocities, calculateDirection } from '../utils'
import { DistanceAngle, GestureState, Vector2, UseGestureEvent, GestureKey } from '../types'
import GestureController from 'controllers/GestureController'

/**
 * Abstract class for distance/angle-based gesture recongizers
 */
export default abstract class DistanceAngleRecognizer extends Recognizer<DistanceAngle> {
  constructor(gestureKey: GestureKey, controller: GestureController, args: any[] = []) {
    super(gestureKey, controller, args)
  }

  getKinematics([d, a]: [number, number?], event: UseGestureEvent): Partial<GestureState<DistanceAngle>> {
    const { values: da, turns, initial, offset, time } = this.state

    // angle might not be defined when ctrl wheel is used for zoom only
    // in that case we set it to the previous angle value
    a = a !== void 0 ? a : da[1]

    const delta_d = d - da[0]
    let delta_a = a - da[1]

    /**
     * The angle value might jump from 179deg to -179deg when we actually want to
     * read 181deg to ensure continuity. To make that happen, we detect when the jump
     * is supsiciously high (ie > 270deg) and increase the `turns` value
     */
    const newTurns = Math.abs(delta_a) > 270 ? turns + Math.sign(delta_a) : turns

    // we update the angle difference to its corrected value
    delta_a -= 360 * (newTurns - turns)
    const delta = [delta_d, delta_a] as Vector2

    const movement_d = d - initial[0]
    const movement_a = a - 360 * newTurns - initial[1]
    const movement: Vector2 = [movement_d, movement_a]

    const delta_t = event.timeStamp - time!
    const vdva = calculateVelocities(delta, delta_t)
    const direction = calculateDirection(delta)
    return {
      event,
      values: [d, a],
      da: [d, a],
      movement,
      delta,
      offset: addV(offset, delta),
      vdva,
      direction,
      turns: newTurns,
      previous: da,
      time: event.timeStamp,
    }
  }
}
