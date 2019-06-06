import Recognizer from './Recognizer'
import { addV, subV, calculateAllKinematics } from '../utils'
import { Vector2, TransformType } from '../../types/common.d'
import { TransformedEvent } from '../../types/events.d'
import { GestureState, Coordinates } from '../../types/states.d'

/**
 * Abstract class for coordinates-based gesture recongizers
 */
export default abstract class CoordinatesRecognizer extends Recognizer<Coordinates> {
  /**
   * Utility function to get kinematics of the gesture
   * @values values we want to calculate the kinematics from
   * @event
   * @returns set of values including delta, velocity, velocities, distance and direction
   */
  protected getKinematics = (values: Vector2, event: TransformedEvent): Partial<GestureState<Coordinates>> => {
    // we get the gesture specific state
    const state = this.getState()
    const { values: xy, initial, lastLocal, time = 0 } = state
    const transform: TransformType = state.transform || event.transform || this.getTransformConfig()

    // delta is the difference between the current and initial value vectors
    const delta = subV(values, initial).map((v, i) => Object.values(transform)[i](v)) as Vector2
    // diff is the difference between the current and previous value vectors
    const diff = subV(values, xy).map((v, i) => Object.values(transform)[i](v)) as Vector2

    const delta_t = event.timeStamp - time
    const { velocity, velocities, distance, direction } = calculateAllKinematics(delta, diff, delta_t)

    return {
      event,
      values,
      delta,
      velocity,
      velocities,
      distance,
      direction,
      local: addV(lastLocal, delta),
      previous: xy,
      transform,
      time: event.timeStamp,
    }
  }
}
