import Recognizer from './Recognizer'
import { addV, subV, calculateAllKinematics } from '../utils'
import { initialState } from '../defaults'
import { Coordinates, GestureState, Vector2, TransformedEvent } from '../types'

/**
 * Abstract class for coordinates-based gesture recongizers
 */
export default abstract class CoordinatesRecognizer extends Recognizer<Coordinates> {
  getKinematics(values: Vector2, event: TransformedEvent): Partial<GestureState<Coordinates>> {
    // we get the gesture specific state
    const { xy, initial, offset, time = 0 } = this.state
    const transform = this.getTransform(event)

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

  getStartState(xy: Vector2, event: TransformedEvent): GestureState<Coordinates> {
    const initial = initialState[this.stateKey] as GestureState<Coordinates>
    const transform = this.getTransform(event)

    return {
      ...initial,
      event,
      xy,
      initial: xy,
      previous: xy,
      offset: this.state.offset,
      first: true,
      active: true,
      transform,
      time: event.timeStamp,
      args: this.args,
    }
  }
}
