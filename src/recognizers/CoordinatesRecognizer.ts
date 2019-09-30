import Recognizer from './Recognizer'
import { addV, subV, calculateAllKinematics } from '../utils'
import { initialState } from '../defaults'
import { Coordinates, GestureState, Vector2, UseGestureEvent } from '../types'

/**
 * Abstract class for coordinates-based gesture recongizers
 */
export default abstract class CoordinatesRecognizer extends Recognizer<Coordinates> {
  getKinematics(values: Vector2, event: UseGestureEvent): Partial<GestureState<Coordinates>> {
    // we get the gesture specific state
    const { xy, initial, offset, time = 0 } = this.state

    // offset is the difference between the current and initial value vectors
    const movement = subV(values, initial)
    // delta is the difference between the current and previous value vectors
    const delta = subV(values, xy)

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
      time: event.timeStamp,
    }
  }

  getStartState(xy: Vector2, event: UseGestureEvent): GestureState<Coordinates> {
    const initial = initialState[this.stateKey] as GestureState<Coordinates>

    return {
      ...initial,
      event,
      xy,
      initial: xy,
      previous: xy,
      offset: this.state.offset,
      first: true,
      active: true,
      time: event.timeStamp,
      args: this.args,
    }
  }
}
