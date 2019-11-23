import Recognizer from './Recognizer'
import { calculateAllKinematics } from '../utils/math'
import { Vector2, UseGestureEvent, ValueKey, CoordinatesKey, PartialGestureState, FalseOrNumber } from '../types'

/**
 * Abstract class for coordinates-based gesture recongizers
 */
export default abstract class CoordinatesRecognizer<T extends CoordinatesKey> extends Recognizer<T> {
  valueKey = 'xy' as ValueKey<T>

  protected checkIntentionality(
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
    const { timeStamp } = this.state

    const movementDetection = this.getMovement(values, this.state)
    const { _blocked, delta, movement } = movementDetection

    if (_blocked) return movementDetection

    const delta_t = event.timeStamp - timeStamp!
    const kinematics = calculateAllKinematics(movement!, delta!, delta_t)

    return {
      values,
      delta,
      vxvy: kinematics.velocities,
      ...movementDetection,
      ...kinematics,
    } as PartialGestureState<T>
  }
}
