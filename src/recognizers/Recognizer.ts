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
  TransformedEvent,
  TransformType,
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

  // is the gesture enabled
  protected get enabled(): boolean {
    return this.controller.config.enabled && this.controller.config[this.gestureKey]
  }
  // get the controller state for a given gesture
  protected get state() {
    return this.controller.state[this.stateKey] as GestureState<GestureType>
  }

  // convenience method to set a timeout for a given gesture
  protected setTimeout = (callback: (...args: any[]) => void, ms: number = 140, ...args: any[]): void => {
    this.controller.timeouts[this.stateKey] = window.setTimeout(callback, ms, ...args)
  }

  // convenience method to clear a timeout for a given gesture
  protected clearTimeout = () => {
    clearTimeout(this.controller.timeouts[this.stateKey])
  }

  protected getTransform = (event: TransformedEvent): TransformType =>
    this.state.transform || event.transform || this.controller.config.transform

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
