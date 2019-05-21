import Recognizer from './Recognizer'
import { addV, subV, calculateAllKinematics } from '../utils'

export default class CoordinatesRecognizer extends Recognizer {
  getKinematics = ({ values, event }) => {
    const state = this.getState()
    const { values: xy, initial, lastLocal, time } = state
    const transform = state.transform || event.transform || this.getTransformConfig()

    const delta = subV(values, initial).map((v, i) => Object.values(transform)[i](v))
    const diff = subV(values, xy).map((v, i) => Object.values(transform)[i](v))

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
      time: event.timeStamp
    }
  }
}
