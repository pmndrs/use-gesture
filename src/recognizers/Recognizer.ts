import Controller from '../Controller'
import {
  Coordinates,
  DistanceAngle,
  StateKey,
  GestureState,
  GestureKey,
  SharedGestureState,
  Fn,
  UseGestureEvent,
  Vector2,
  IngKey,
  Handler,
} from '../types'
import { noop } from '../utils/utils'

type PayloadFromEvent = {
  values: Vector2
  gesturePayload?: Partial<GestureState>
  sharedPayload?: Partial<SharedGestureState>
}

/**
 * Recognizer abstract class
 * @template GestureType whether the Recognizer should deal with coordinates or distance / angle
 */
export default abstract class Recognizer<GestureType extends Coordinates | DistanceAngle> {
  protected stateKey!: StateKey
  protected ingKey!: IngKey

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
  constructor(protected readonly gestureKey: GestureKey, protected readonly controller: Controller, protected readonly args: any[] = []) {}

  // get the gesture config
  protected get config() {
    return this.controller.config[this.gestureKey]!
  }
  // is the gesture enabled
  protected get enabled(): boolean {
    return this.controller.config.enabled && this.config.enabled
  }
  // get the controller state for a given gesture
  protected get state() {
    return this.controller.state[this.stateKey] as GestureState<GestureType>
  }
  // get the gesture handler
  protected get handler() {
    return this.controller.handlers[this.gestureKey]! as Handler<GestureType>
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

  protected abstract getPayloadFromEvent(event: UseGestureEvent): PayloadFromEvent

  /**
   * Utility function to get kinematics of the gesture
   * @values values we want to calculate the kinematics from
   * @event
   * @returns set of values including movement, velocity, velocities, distance and direction
   */
  protected abstract getKinematics(values: [number, number | undefined], event: UseGestureEvent): Partial<GestureState<GestureType>>

  // should return the bindings for a given gesture
  public abstract addBindings(): void

  /**
   * convenience method to update the controller state for a given gesture
   * @param sharedState shared partial state object
   * @param gestureState partial state object for the gesture handled by the recognizer
   * @param [gestureFlag] if set, will also fire the gesture handler set by the user
   */
  protected updateState = (sharedState: Partial<SharedGestureState> | null, gestureState: Partial<GestureState<GestureType>>): void => {
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

    const {
      movement: [movX, movY],
    } = state

    const [thresholdX, thresholdY] = this.config.threshold
    state.movement = [intentionalX ? movX - thresholdX : 0, intentionalY ? movY - thresholdY : 0]

    const newMemo = this.handler(state)
    this.state.memo = newMemo !== void 0 ? newMemo : this.state.memo
  }

  protected clean = noop
}
