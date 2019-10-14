import { mappedKeys, genericEndState, initialState } from '../defaults'
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
  UseGestureEvent,
  Vector2,
} from '../types'
import { noop, subV, calculateAllKinematics } from '../utils'

type PayloadFromEvent = {
  values: Vector2
  gesturePayload?: Partial<GestureState>
  sharedPayload?: Partial<SharedGestureState>
}

/**
 * Recognizer abstract class
 * @template GestureType whether the Recognizer should deal with coordinates or distance / angle
 */
export default abstract class Recognizer<GestureType extends Coordinates | DistanceAngle = Coordinates | DistanceAngle> {
  protected stateKey: StateKey
  protected sharedStartState?: Partial<SharedGestureState>
  protected sharedEndState?: Partial<SharedGestureState>

  /**
   * Continuous gestures are scroll or wheel, where the next gesture continues the previous one.
   * In other words, these gestures also start with a delta.
   */
  protected continuousGesture = false

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
  public abstract getEventBindings(): [ReactEventHandlerKey | ReactEventHandlerKey[], Fn][]

  /**
   * convenience method to update the controller state for a given gesture
   * @param sharedState shared partial state object
   * @param gestureState partial state object for the gesture handled by the recognizer
   * @param [gestureFlag] if set, will also fire the gesture handler set by the user
   */
  protected updateState = (sharedState: Partial<SharedGestureState> | null, gestureState: Partial<GestureState<GestureType>>): void => {
    this.controller.updateState(sharedState, gestureState, this.stateKey)
  }

  protected fireGestureHandler = (gestureFlag: GestureFlag): void => {
    this.controller.fireGestureHandler(this.gestureKey, gestureFlag)
  }

  // generic onStart function
  protected onStart = (event: UseGestureEvent, payload?: Partial<GestureState<GestureType>>): void => {
    const { values, gesturePayload, sharedPayload } = this.getPayloadFromEvent(event)

    // TODO probably needs some rework, initialState and resetState should be different

    const startState: GestureState<GestureType> = {
      ...(initialState[this.stateKey] as GestureState<GestureType>),
      values,
      event,
      first: true,
      active: true,
      time: event.timeStamp,
      args: this.args,
    }

    const { values: prevValues, offset } = this.state

    if (this.continuousGesture) {
      startState.initial = startState.previous = prevValues
      startState.delta = startState.movement = subV(values, prevValues)
      startState.offset = values
      Object.assign(startState, calculateAllKinematics(startState.movement, startState.delta, 0))
    } else {
      startState.initial = startState.previous = values
      startState.offset = offset
    }

    this.updateState({ ...this.sharedStartState, ...sharedPayload }, { ...startState, ...gesturePayload, ...payload })
    this.fireGestureHandler(GestureFlag.OnStart)
  }

  // generic onChange function
  protected onChange = (event: UseGestureEvent, payload?: Partial<GestureState<GestureType>>): void => {
    const { values, gesturePayload, sharedPayload } = this.getPayloadFromEvent(event)
    const kinematics = this.getKinematics(values, event)
    this.updateState({ ...sharedPayload }, { first: false, ...kinematics, ...gesturePayload, ...payload })
    this.fireGestureHandler(GestureFlag.OnChange)
  }

  // generic onEnd function
  protected onEnd = (event: UseGestureEvent, payload?: Partial<GestureState<GestureType>>): void => {
    if (!this.state.active) return
    this.removeWindowListeners()
    this.updateState(this.sharedEndState!, { event, ...genericEndState, ...payload } as Partial<GestureState<GestureType>>)
    this.fireGestureHandler(GestureFlag.OnEnd)
  }

  // generic cancel function
  protected onCancel = (event: UseGestureEvent): void => {
    this.updateState(null, { canceled: true, cancel: noop } as Partial<GestureState<GestureType>>)
    requestAnimationFrame(() => this.onEnd(event))
  }

  // generic gesture handler for timeout-based gestures
  protected timeoutHandler = (event: UseGestureEvent) => {
    if (!this.enabled) return

    this.clearTimeout()
    this.setTimeout(this.onEnd)

    if (!this.state.active) this.onStart(event)
    else this.onChange(event)
  }
}
