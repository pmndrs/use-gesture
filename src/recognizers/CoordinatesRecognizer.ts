import Recognizer from './Recognizer'
import { addV, subV, calculateAllKinematics } from '../utils/utils'
import { Coordinates, GestureState, Vector2, UseGestureEvent } from '../types'
import { initialState } from '../utils/state'

/**
 * Abstract class for coordinates-based gesture recongizers
 */
export default abstract class CoordinatesRecognizer extends Recognizer<Coordinates> {
  protected _axis?: 'x' | 'y'

  getKinematics(values: Vector2, event: UseGestureEvent, isStart?: boolean): Partial<GestureState<Coordinates>> {
    let newState

    if (isStart) {
      newState = {
        ...initialState[this.stateKey],
        event,
        values,
        initial: values,
        offset: this.state.offset,
        time: event.timeStamp,
        args: this.args,
      }
    } else {
      // we get the gesture specific state
      const { values: xy, initial, offset, time } = this.state

      // offset is the difference between the current and initial value vectors
      const movement = subV(values, initial)
      // delta is the difference between the current and previous value vectors
      const delta = subV(values, xy)

      const delta_t = event.timeStamp - time!
      const { velocity, velocities, distance, direction } = calculateAllKinematics(movement, delta, delta_t)

      newState = {
        event,
        values,
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

    let [intentionalX, intentionalY] = this._intentional
    const [movementX, movementY] = newState.movement
    const [thresholdX, thresholdY] = this.config.intentionalThreshold!

    const absX = Math.abs(movementX)
    const absY = Math.abs(movementY)

    if (!intentionalX && absX >= thresholdX) intentionalX = movementX
    if (!intentionalY && absY >= thresholdY) intentionalY = movementY

    this._intentional = [intentionalX, intentionalY]

    const { axis: configAxis } = this.config

    const intentionalMovement = intentionalX !== false || intentionalY !== false

    if (!!configAxis && intentionalMovement) {
      if (!this._axis) {
        this._axis = absX > absY ? 'x' : absX < absY ? 'y' : undefined
        if (this._axis !== configAxis) this._blocked = true
      } else {
        const lockedIndex = configAxis === 'x' ? 1 : 0
        this._intentional[lockedIndex] = false
      }
    }

    return { ...newState, xy: newState.values }
  }
}
