import Controller from '../Controller'
import {
  StateKey,
  GestureKey,
  SharedGestureState,
  Fn,
  UseGestureEvent,
  IngKey,
  StatePayload,
  ValueKey,
  InternalFullConfig,
  Handler,
  GestureState,
  PartialGestureState,
} from '../types'
import { noop, clone } from '../utils/utils'
import { initialState } from '../utils/state'

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

  protected abstract getPayloadFromEvent(event: UseGestureEvent): StatePayload<T>

  /**
   * Utility function to get kinematics of the gesture
   * @values values we want to calculate the kinematics from
   * @event
   * @returns set of values including movement, velocity, velocities, distance and direction
   */
  protected abstract getKinematics(values: [number, number | undefined], event: UseGestureEvent): PartialGestureState<T>

  // should return the bindings for a given gesture
  public abstract addBindings(): void

  protected abstract startGesture(event: UseGestureEvent): StatePayload<T>

  protected onStart = (event: UseGestureEvent) => {
    const { sharedPayload, gesturePayload } = this.startGesture(event)
    const { values } = gesturePayload

    const generic = this.getGenericStatePayload(event)

    this.updateSharedState(sharedPayload)
    const init = {
      ...clone(initialState[this.stateKey]),
      ...gesturePayload,
      _active: true,
      event,
      values,
      initial: values,
      offset: this.state.offset,
      ...generic,
    }

    this.updateGestureState({
      ...init,
      ...this.getIntentionality(init.values, init),
    })

    this.fireGestureHandler()
  }

  protected getGenericStatePayload(event: UseGestureEvent) {
    return { event, time: event.timeStamp, args: this.args, previous: this.state.values }
  }

  protected abstract getIntentionality(...args: any): PartialGestureState<T>

  protected updateSharedState(sharedState: Partial<SharedGestureState> | null) {
    Object.assign(this.controller.state.shared, sharedState)
  }

  protected updateGestureState(gestureState: PartialGestureState<T> | null) {
    Object.assign(this.state, gestureState)
  }

  /**
   * convenience method to update the controller state for a given gesture
   * @param sharedState shared partial state object
   * @param gestureState partial state object for the gesture handled by the recognizer
   */
  protected updateState = (
    sharedState: Partial<SharedGestureState> | null = null,
    gestureState: PartialGestureState<T> | null = null
  ): void => {
    Object.assign(this.controller.state.shared, sharedState)
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

    if (this.state._active) {
      this.state.first = !this.state.active
      this.state.active = true
    } else {
      this.state.active = false
      this.state.last = true
      this.clean()
    }

    this.controller.state.shared[this.ingKey] = this.state.active

    const state = { ...this.controller.state.shared, ...this.state }

    // TODO possibly check this
    // @ts-ignore
    state[this.valueKey] = state.values

    const newMemo = this.handler(state)
    this.state.memo = newMemo !== void 0 ? newMemo : this.state.memo
  }

  protected clean = noop
}
