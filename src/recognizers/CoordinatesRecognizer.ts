import Recognizer from './Recognizer'
import { calculateAllKinematics, subV } from '../utils/math'
import { Vector2, UseGestureEvent, PartialGestureState, GestureState, CoordinatesKey } from '../types'

/**
 * @private
 * Abstract class for coordinates-based gesture recongizers
 */
export default abstract class CoordinatesRecognizer<T extends CoordinatesKey> extends Recognizer<T> {
  /**
   * Returns the real movement (without taking intentionality into acount)
   */
  protected getInternalMovement(values: Vector2, state: GestureState<T>): Vector2 {
    return subV(values, state.initial)
  }

  /**
   * In coordinates-based gesture, this function will detect the first intentional axis,
   * lock the gesture axis if lockDirection is specified in the config, block the gesture
   * if the first intentional axis doesn't match the specified axis in config.
   */
  protected checkIntentionality(
    _intentional: [false | number, false | number],
    _movement: Vector2
  ): PartialGestureState<T> {
    let [_ix, _iy] = _intentional
    const intentionalMovement = _ix !== false || _iy !== false
    let { axis } = this.state
    let _blocked = false

    // If the movement is intentional, we can compute axis.
    if (intentionalMovement) {
      const [absX, absY] = _movement.map(Math.abs)

      const { axis: configAxis, lockDirection } = this.config

      // We make sure we only set axis value if it hadn't been detected before.
      axis = axis || (absX > absY ? 'x' : absX < absY ? 'y' : undefined)
      if (!!configAxis || lockDirection) {
        if (!!axis) {
          // If the detected axis doesn't match the config axis we block the gesture
          if (!!configAxis && axis !== configAxis) _blocked = true
          else {
            // Otherwise we prevent the gesture from updating the unwanted axis.
            const lockedIndex = axis === 'x' ? 1 : 0
            _intentional![lockedIndex] = false
          }
        } else {
          // Until we've detected the axis, we prevent the hnadler from updating.
          _intentional = [false, false]
        }
      }
    }

    return { _intentional, _blocked, axis } as PartialGestureState<T>
  }

  getKinematics(values: Vector2, event: UseGestureEvent): PartialGestureState<T> {
    const state = this.getMovement(values)
    if (!state._blocked) {
      const dt = event.timeStamp - this.state.timeStamp!
      Object.assign(state, calculateAllKinematics(state.movement!, state.delta!, dt))
    }
    return state
  }

  protected mapStateValues(state: GestureState<T>): PartialGestureState<T> {
    return { xy: state.values, vxvy: state.velocities } as PartialGestureState<T>
  }
}
