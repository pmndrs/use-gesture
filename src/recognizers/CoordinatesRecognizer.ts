import Recognizer from './Recognizer'
import { addV, subV, calculateAllKinematics } from '../utils'
import { initialState } from '../defaults'
import { Coordinates, GestureState, Vector2, TransformType, TransformedEvent } from '../types'

/**
 * Abstract class for coordinates-based gesture recongizers
 */
export default abstract class CoordinatesRecognizer extends Recognizer<Coordinates> {
  /**
   * Utility function to get kinematics of the gesture
   * @values values we want to calculate the kinematics from
   * @event
   * @returns set of values including movement, velocity, velocities, distance and direction
   */
  protected getKinematics = (values: Vector2, event: TransformedEvent): Partial<GestureState<Coordinates>> => {
    // we get the gesture specific state
    const state = this.getState()
    const { xy, initial, offset, time = 0 } = state
    const transform: TransformType = state.transform || event.transform || this.getTransformConfig()

    // offset is the difference between the current and initial value vectors
    const movement = subV(values, initial).map((v, i) => Object.values(transform)[i](v)) as Vector2
    // delta is the difference between the current and previous value vectors
    const delta = subV(values, xy).map((v, i) => Object.values(transform)[i](v)) as Vector2

    const delta_t = event.timeStamp - time
    const { velocity, velocities, distance, direction } = calculateAllKinematics(movement, delta, delta_t)

    return {
      event,
      xy: values,
      movement,
      offset: addV(offset, delta),
      delta,
      velocity,
      vxvy: velocities,
      distance,
      direction,
      previous: xy,
      transform,
      time: event.timeStamp,
    }
  }

  /**
   * returns the start state for a given gesture
   * @param xy the xy values of the start state
   * @param event the event that triggers the gesture start
   */
  protected getStartState = (xy: Vector2, event: TransformedEvent): GestureState<Coordinates> => {
    const state = this.getState()
    const initial = initialState[this.stateKey] as GestureState<Coordinates>
    const transform: TransformType = state.transform || event.transform || this.getTransformConfig()
    const offset = state.offset || initial.offset

    return {
      ...initial,
      event,
      xy,
      initial: xy,
      previous: xy,
      offset,
      first: true,
      active: true,
      transform,
      time: event.timeStamp,
      args: this.args,
    }
  }
}
