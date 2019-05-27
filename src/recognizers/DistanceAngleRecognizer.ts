import Recognizer from './Recognizer'
import { addV, calculateVelocities } from '../utils'
import { DistanceAngle, GestureState } from '../../types/states.d'
import { Vector2 } from '../../types/common.d'
import { TransformedEvent } from '../../types/events.d'

export default abstract class DistanceAngleRecognizer<BinderType> extends Recognizer<DistanceAngle, BinderType> {
  getKinematics = ({
    values: [d, a],
    event,
  }: {
    values: Vector2 | [number, number | undefined]
    event: TransformedEvent
  }): Partial<GestureState<DistanceAngle>> => {
    const state = this.getState()
    const { values: da, turns, initial, lastLocal, time = 0 } = state
    a = a === undefined ? da[1] : a // when angle is not defined by onCtrlWheel

    const diff_d = d - da[0]
    let diff_a = a - da[1]

    const newTurns = Math.abs(diff_a) > 300 ? turns + Math.sign(diff_a) : turns

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
