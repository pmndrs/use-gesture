import Controller from '../Controller'
import {
  StateKey,
  GestureKey,
  SharedGestureState,
  Fn,
  UseGestureEvent,
  IngKey,
  ValueKey,
  InternalFullConfig,
  Handler,
  GestureState,
  PartialGestureState,
  Vector2,
  FalseOrNumber,
} from '../types'
import { noop, clone } from '../utils/utils'
import { initialState } from '../utils/state'
import { subV, getIntentional, addV } from '../utils/math'

/**
 * Recognizer abstract class
 * @template GestureType whether the Recognizer should deal with coordinates or distance / angle
 */
export default abstract class Recognizer<T extends GestureKey> {
  protected abstract stateKey: StateKey<T>
  protected abstract ingKey: IngKey
  protected abstract valueKey: ValueKey<T>

  /**
   * Continuous gestures are scroll or wheel, where the next gesture continues the previous one.
   * In other words, these gestures also start with a delta.
   */
  protected _continuousGesture = false

  /**
   * Creates an instance of a gesture recognizer.
   * @param gestureKey drag, move, hover, pinch, etc.
   * @param controller the controller attached to the gesture
   * @param [args] the args that should be passed to the gesture handler
   */
  constructor(protected readonly gestureKey: T, protected readonly controller: Controller, protected readonly args: any[] = []) {}

  // get the gesture config
  protected get config(): NonNullable<InternalFullConfig[T]> {
    return this.controller.config[this.gestureKey]!
  }
  // is the gesture enabled
  protected get enabled(): boolean {
    return this.controller.config.enabled && this.config.enabled
  }
  // get the controller state for a given gesture
  protected get state(): GestureState<T> {
    return this.controller.state[this.stateKey]
  }
  // get the gesture handler
  protected get handler(): Handler<T> {
    return this.controller.handlers[this.gestureKey] as Handler<T>
  }

  // convenience method to set a timeout for a given gesture
  protected setTimeout = (callback: (...args: any[]) => void, ms: number = 140, ...args: any[]): void => {
    this.controller.timeouts[this.stateKey] = window.setTimeout(callback, ms, ...args)
  }

  // convenience method to clear a timeout for a given gesture
  protected clearTimeout = () => {
    clearTimeout(this.controller.timeouts[this.stateKey])
  }

  // convenience method to add window listeners for a given gesture
  protected addWindowListeners = (listeners: [string, Fn][]) => {
    this.controller.addWindowListeners(this.stateKey, listeners)
  }

  // convenience method to remove window listeners for a given gesture
  protected removeWindowListeners = () => {
    this.controller.removeWindowListeners(this.stateKey)
  }

  /**
   * Utility function to get kinematics of the gesture
   * @values values we want to calculate the kinematics from
   * @event
   * @returns set of values including movement, velocity, velocities, distance and direction
   */
  protected abstract getKinematics(values: Vector2, event: UseGestureEvent): PartialGestureState<T>

  // should return the bindings for a given gesture
  public abstract addBindings(): void

  protected getMovement(values: Vector2, state: GestureState<T> = this.state): PartialGestureState<T> {
    const { threshold } = this.config
    const [t0, t1] = threshold
    const { _intentional: intentional, initial, offset: prevOffset, movement: prevMovement } = state
    let [i0, i1] = intentional
    const [_m0, _m1] = subV(values, initial)

    if (i0 === false) i0 = getIntentional(_m0, t0)
    if (i1 === false) i1 = getIntentional(_m1, t1)

    const intentionalityCheck = this.checkIntentionality([i0, i1], [_m0, _m1], state)

    const { _intentional, _blocked } = intentionalityCheck
    const [_i0, _i1] = _intentional!

    if (_blocked) return intentionalityCheck

    const movement = [_i0 !== false ? _m0 - _i0 : 0, _i1 !== false ? _m1 - _i1 : 0]
    // delta is the difference between the current and previous value vectors
    const delta = subV(movement, prevMovement)

    const offset = addV(prevOffset, delta)

    return {
      ...intentionalityCheck,
      movement,
      offset,
      delta,
    } as PartialGestureState<T>
  }

  protected checkIntentionality(
    _intentional: [FalseOrNumber, FalseOrNumber],
    _movement: Vector2,
    _state: PartialGestureState<T>
  ): PartialGestureState<T> {
    return { _intentional, _blocked: false } as PartialGestureState<T>
  }

  protected getGenericPayload(event: UseGestureEvent) {
    return { event, time: event.timeStamp, args: this.args, previous: this.state.values }
  }

  protected getStartGestureState = (values: Vector2) => {
    return { ...clone(initialState[this.stateKey]), _active: true, values, initial: values, offset: this.state.offset }
  }

  protected updateSharedState(sharedState: Partial<SharedGestureState> | null) {
    Object.assign(this.controller.state.shared, sharedState)
  }

  protected updateGestureState(gestureState: PartialGestureState<T> | null) {
    Object.assign(this.state, gestureState)
  }

  // fire the gesture handler defined by the user
  protected fireGestureHandler = (forceFlag?: boolean): void => {
    if (this.state._blocked) {
      this.state._active = false
      this.clean()
      return
    }

    const [intentionalX, intentionalY] = this.state._intentional

    if (!forceFlag && intentionalX === false && intentionalY === false) return

    const { _active, active, values } = this.state

    this.state.active = _active
    this.state.first = _active && !active
    this.state.last = !_active

    const state = {
      ...this.controller.state.shared,
      ...this.state,
      [this.ingKey]: _active,
      [this.valueKey]: values,
    }

    const newMemo = this.handler(state)
    this.state.memo = newMemo !== void 0 ? newMemo : this.state.memo
    if (!_active) this.clean()
  }

  protected clean = noop
}
