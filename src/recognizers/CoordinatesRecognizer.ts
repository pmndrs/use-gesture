import Recognizer from './Recognizer'
import { subV, calculateAllKinematics, getIntentional, addV } from '../utils/math'
import { Vector2, UseGestureEvent, ValueKey, CoordinatesKey, PartialGestureState } from '../types'

/**
 * Abstract class for coordinates-based gesture recongizers
 */
export default abstract class CoordinatesRecognizer<T extends CoordinatesKey> extends Recognizer<T> {
  valueKey = 'xy' as ValueKey<T>

  protected getIntentionality(values: Vector2, state: PartialGestureState<T>): PartialGestureState<T> {
    let { _intentional, initial, axis } = state
    const _movement = subV(values, initial!)

    const { axis: configAxis, lockDirection, threshold } = this.config
    const [tx, ty] = threshold

    if (_intentional![0] === false) _intentional![0] = getIntentional(_movement![0], tx)
    if (_intentional![1] === false) _intentional![1] = getIntentional(_movement![1], ty)

    const absX = Math.abs(_movement![0])
    const absY = Math.abs(_movement![1])

    const intentionalMovement = _intentional![0] !== false || _intentional![1] !== false
    let _blocked = false

    if (intentionalMovement) {
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

    const movement = [
      _intentional![0] !== false ? _movement![0] - _intentional![0] : 0,
      _intentional![1] !== false ? _movement![1] - _intentional![1] : 0,
    ]

    return { _movement, movement, _intentional, _blocked, axis } as PartialGestureState<T>
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
      ...this.getGenericStatePayload(event),
    } as PartialGestureState<T>
  }
}
