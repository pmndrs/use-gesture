import Recognizer from './Recognizer'
import { calculateAllKinematics, subV } from '../utils/math'
import { Vector2, PartialGestureState, GestureState, CoordinatesKey } from '../types'

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
    if (_intentional[0] === false && _intentional[1] === false) {
      return { _intentional, axis: this.state.axis } as PartialGestureState<T>
    }
    const [absX, absY] = _movement.map(Math.abs)
    const axis = this.state.axis || (absX > absY ? 'x' : absX < absY ? 'y' : undefined)
    if (!this.config.axis && !this.config.lockDirection) return { _intentional, _blocked: false, axis } as any
    if (!axis) return { _intentional: [false, false], _blocked: false, axis } as any
    if (!!this.config.axis && axis !== this.config.axis) return { _intentional, _blocked: true, axis } as any
    _intentional![axis === 'x' ? 1 : 0] = false
    return { _intentional, _blocked: false, axis } as any
  }

  getKinematics(values: Vector2, event: React.UIEvent | UIEvent): PartialGestureState<T> {
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
