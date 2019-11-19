import Recognizer from './Recognizer'
import { subV, calculateAllKinematics, addV } from '../utils/math'
import { Vector2, UseGestureEvent, ValueKey, CoordinatesKey, PartialGestureState, FalseOrNumber } from '../types'

/**
 * Abstract class for coordinates-based gesture recongizers
 */
export default abstract class CoordinatesRecognizer<T extends CoordinatesKey> extends Recognizer<T> {
  valueKey = 'xy' as ValueKey<T>

  protected getExtraIntentionality(
    _intentional: [FalseOrNumber, FalseOrNumber],
    _movement: Vector2,
    state: PartialGestureState<T>
  ): PartialGestureState<T> {
    let [_ix, _iy] = _intentional
    const intentionalMovement = _ix !== false || _iy !== false
    let { axis } = state
    let _blocked = false
    if (intentionalMovement) {
      const [absX, absY] = _movement.map(Math.abs)

      const { axis: configAxis, lockDirection } = this.config

      axis = axis || (absX > absY ? 'x' : absX < absY ? 'y' : undefined)
      if (!!configAxis || lockDirection) {
        if (!!axis) {
          if (!!configAxis && axis !== configAxis) _blocked = true
          else {
            const lockedIndex = axis === 'x' ? 1 : 0
            _intentional![lockedIndex] = false
          }
        } else {
          _intentional = [false, false]
        }
      }
    }

    return { _intentional, _blocked, axis } as PartialGestureState<T>
  }

  getKinematics(values: Vector2, event: UseGestureEvent): PartialGestureState<T> {
    const { offset, movement: prevMovement, time } = this.state

    const detection = this.getIntentionality(values, this.state)
    const { _blocked, movement } = detection

    if (_blocked) return { _blocked } as PartialGestureState<T>

    // delta is the difference between the current and previous value vectors
    const delta = subV(movement!, prevMovement)

    const delta_t = event.timeStamp - time!
    const kinematics = calculateAllKinematics(movement!, delta, delta_t)

    return {
      values,
      offset: addV(offset, delta),
      delta,
      vxvy: kinematics.velocities,
      ...detection,
      ...kinematics,
    } as PartialGestureState<T>
  }
}
