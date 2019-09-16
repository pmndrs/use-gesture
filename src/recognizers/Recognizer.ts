import { mappedKeys } from '../defaults'
import GestureController from '../controllers/GestureController'
import {
  Coordinates,
  DistanceAngle,
  StateKey,
  GestureState,
  GestureKey,
  SharedGestureState,
  Fn,
  ReactEventHandlerKey,
  GestureFlag,
} from '../types'

/**
 * Recognizer abstract class
 * @template GestureType whether the Recognizer should deal with coordinates or distance / angle
 */
export default abstract class Recognizer<GestureType extends Coordinates | DistanceAngle> {
  protected stateKey: StateKey

  /**
   * Creates an instance of a gesture recognizer.
   * @param gestureKey drag, move, hover, pinch, etc.
   * @param controller the controller attached to the gesture
   * @param [args] the args that should be passed to the gesture handler
   */
  constructor(
    protected readonly gestureKey: GestureKey,
    protected readonly controller: GestureController,
    protected readonly args: any[] = []
  ) {
    // mapping this.stateKey to the state key the gesture handles
    // (ie hover actually deals with the move gesture state)
    this.stateKey = mappedKeys[gestureKey].stateKey
  }

  protected isEnabled = (): boolean => {
    return this.controller.config.enabled && this.controller.config[this.gestureKey]
  }

  // convenience method to set a timeout for a given gesture
  protected setTimeout = (callback: (...args: any[]) => void, ms: number = 140, ...args: any[]): void => {
    this.controller.timeouts[this.stateKey] = window.setTimeout(callback, ms, ...args)
  }

  // convenience method to clear a timeout for a given gesture
  protected clearTimeout = () => {
    clearTimeout(this.controller.timeouts[this.stateKey])
  }

  // get the controller state for a given gesture
  protected getState = (): GestureState<GestureType> => this.controller.state[this.stateKey] as GestureState<GestureType>
  // get the controller shared state
  protected getSharedState = () => this.controller.state.shared
  // gets the transform config of the controller
  protected getTransformConfig = () => this.controller.config.transform
  // checks if non passive events are supported
  protected supportsNonPassiveEvents = () => this.controller.config.domTarget && !this.controller.config.event.passive

  // convenience method to add window listeners for a given gesture
  protected addWindowListeners = (listeners: [string, Fn][]) => {
    this.controller.addWindowListeners(this.stateKey, listeners)
  }

  // convenience method to remove window listeners for a given gesture
  protected removeWindowListeners = () => {
    this.controller.removeWindowListeners(this.stateKey)
  }

  // should return the bindings for a given gesture
  public abstract getEventBindings(): [ReactEventHandlerKey | ReactEventHandlerKey[], Fn][]

  /**
   * convenience method to update the controller state for a given gesture
   * @param sharedState shared partial state object
   * @param gestureState partial state object for the gesture handled by the recognizer
   * @param [gestureFlag] if set, will also fire the gesture handler set by the user
   */
  protected updateState = (
    sharedState: Partial<SharedGestureState> | null,
    gestureState: Partial<GestureState<GestureType>>,
    gestureFlag?: GestureFlag
  ): void => {
    this.controller.updateState(sharedState, gestureState, this.gestureKey, gestureFlag)
  }
}
