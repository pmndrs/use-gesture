import Recognizer from './Recognizer'
import { addV, subV, calculateAllKinematics } from '../utils'
import { Vector2, TransformType } from '../../types/common.d'
import { TransformedEvent } from '../../types/events.d'
import { GestureState, Coordinates } from '../../types/states.d'

export default abstract class CoordinatesRecognizer<BinderType> extends Recognizer<Coordinates, BinderType> {
  protected getKinematics = ({ values, event }: { values: Vector2; event: TransformedEvent }): Partial<GestureState<Coordinates>> => {
    const state = this.getState()
    const { values: xy, initial, lastLocal, time = 0 } = state
    const transform: TransformType = state.transform || event.transform || this.getTransformConfig()

    const delta = subV(values, initial).map((v, i) => Object.values(transform)[i](v)) as Vector2
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
