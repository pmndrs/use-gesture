import Recognizer from './Recognizer'
import { calculateAllKinematics, subV } from '../utils/math'
import { Vector2, UseGestureEvent, PartialGestureState, DistanceAngleKey, GestureState } from '../types'

/**
 * @private
 * Abstract class for distance/angle-based gesture recongizers
 */
export default abstract class DistanceAngleRecognizer<T extends DistanceAngleKey> extends Recognizer<T> {
  protected getInternalMovement(values: [number, number?], state: GestureState<T>): Vector2 {
    const prev_a = state.values[1]
    // not be defined if ctrl+wheel is used for zoom only
    let [d, a = prev_a] = values

    let delta_a = a - prev_a
    let next_turns = state.turns
    if (Math.abs(delta_a) > 270) next_turns += Math.sign(delta_a)
    return subV([d, a - 360 * next_turns], state.initial)
  }

  getKinematics(values: Vector2, event: UseGestureEvent): PartialGestureState<T> {
    const state = this.getMovement(values)
    const turns = (values[1] - state.movement![1] - this.state.initial[1]) / 360
    const dt = event.timeStamp - this.state.timeStamp!
    const kinematics = calculateAllKinematics(state.movement!, state.delta!, dt)
    return { turns, ...state, ...kinematics }
  }

  protected mapStateValues(state: GestureState<T>): PartialGestureState<T> {
    return { da: state.values, vdva: state.velocities } as PartialGestureState<T>
  }
}

/**
 * @param dangle is a small change of variable on "lifting" of the circle.
 * It's expected to be small and cannot be greater than 270 or under -270
 */
export function fixContinuity(dangle: number) {
  dangle -= Math.round(dangle / 360) * 360
  if (dangle > 270) return dangle - 360
  if (dangle < -270) return dangle + 360
  return dangle
}
