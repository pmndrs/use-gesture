import Controller from '../Controller'
import {
  StateKey,
  SharedGestureState,
  Fn,
  UseGestureEvent,
  IngKey,
  InternalConfig,
  GestureState,
  PartialGestureState,
  Vector2,
  FalseOrNumber,
  FullGestureState,
} from '../types'
import { getInitialState } from '../utils/state'
import { subV, addV, getIntentionalDisplacement, rubberbandIfOutOfBounds } from '../utils/math'
import { valueFn } from '../utils/utils'

/**
 * @private
 * Recognizer abstract class.
 *
 * @protected
 * @abstract
 * @type {StateKey<T>} whether the Recognizer should deal with coordinates or distance / angle
 */
export default abstract class Recognizer<T extends StateKey> {
  protected abstract ingKey: IngKey // dragging, scrolling, etc.
  protected debounced: Boolean = true

  /**
   * Creates an instance of a gesture recognizer.
   * @param stateKey drag, move, pinch, etc.
   * @param controller the controller attached to the gesture
   * @param [args] the args that should be passed to the gesture handler
   */
  constructor(
    protected readonly stateKey: T,
    protected readonly controller: Controller,
    protected readonly args: any[] = []
  ) {}

  // Returns the gesture config
  protected get config(): NonNullable<InternalConfig[T]> {
    return this.controller.config[this.stateKey]!
  }

  // Is the gesture enabled
  protected get enabled(): boolean {
    return this.controller.config.enabled && this.config.enabled
  }

  // Returns the controller state for a given gesture
  protected get state(): GestureState<T> {
    return this.controller.state[this.stateKey]
  }

  // Returns the gesture handler
  protected get handler() {
    return this.controller.handlers[this.stateKey]!
  }

  // Conveninence method to update the shared state
  protected updateSharedState(sharedState: Partial<SharedGestureState> | null) {
    Object.assign(this.controller.state.shared, sharedState)
  }

  // Conveninence method to update the gesture state
  protected updateGestureState(gestureState: PartialGestureState<T> | null) {
    Object.assign(this.state, gestureState)
  }

  // Convenience method to set a timeout for a given gesture
  protected setTimeout = (callback: (...args: any[]) => void, ms: number = 140, ...args: any[]): void => {
    this.controller.timeouts[this.stateKey] = window.setTimeout(callback, ms, ...args)
  }

  // Convenience method to clear a timeout for a given gesture
  protected clearTimeout = () => {
    clearTimeout(this.controller.timeouts[this.stateKey])
  }

  // Convenience method to add window listeners for a given gesture
  protected addWindowListeners = (listeners: [string, Fn][]) => {
    this.controller.addWindowListeners(this.stateKey, listeners)
  }

  // Convenience method to remove window listeners for a given gesture
  protected removeWindowListeners = () => {
    this.controller.removeWindowListeners(this.stateKey)
  }

  /**
   * Utility function to get kinematics of the gesture.
   *
   * @abstract
   * @values - values we want to calculate the kinematics from
   * @event - the pointer event
   * @returns - set of values including movement, velocity, velocities, distance and direction
   */
  protected abstract getKinematics(values: Vector2, event: UseGestureEvent): PartialGestureState<T>

  protected abstract mapStateValues(state: GestureState<T>): PartialGestureState<T>

  // Should return the bindings to be added for a given gesture
  public abstract addBindings(): void

  /**
   * Returns a generic, common payload for all gestures from an event.
   *
   * @param {UseGestureEvent} event
   * @param {boolean} [isStartEvent]
   * @returns - the generic gesture payload
   */
  protected getGenericPayload(event: UseGestureEvent, isStartEvent?: boolean) {
    const { timeStamp, type } = event
    const { values, startTime } = this.state

    return {
      _lastEventType: type,
      event,
      timeStamp,
      elapsedTime: isStartEvent ? 0 : timeStamp - startTime!,
      args: this.args,
      previous: values,
    }
  }
  /**
   * Returns the reinitialized start state for the gesture.
   * Should be common to all gestures.
   *
   * @param {Vector2} values
   * @param {UseGestureEvent} event
   * @returns - the start state for the gesture
   */
  protected getStartGestureState = (values: Vector2, event: UseGestureEvent) => {
    return {
      ...getInitialState()[this.stateKey],
      _active: true,
      values,
      initial: values,
      offset: this.state.offset,
      lastOffset: this.state.offset,
      startTime: event.timeStamp,
    }
  }

  /**
   * Returns state properties depending on the movement and state.
   *
   * Should be overriden for custom behavior, doesn't do anything in the implementation
   * below.
   */
  protected checkIntentionality(
    _intentional: [FalseOrNumber, FalseOrNumber],
    _movement: Vector2,
    _state: PartialGestureState<T>
  ): PartialGestureState<T> {
    return { _intentional, _blocked: false } as PartialGestureState<T>
  }

  protected abstract getInternalMovement(values: Vector2, state: GestureState<T>): Vector2

  /**
   * Returns basic movement properties for the gesture based on the next values and current state.
   */
  protected getMovement(values: Vector2, state: GestureState<T> = this.state): PartialGestureState<T> {
    const { initial, threshold, rubberband } = this.config

    const [t0, t1] = threshold

    const { _initial, _active, _intentional: intentional, lastOffset, movement: prevMovement } = state
    let [i0, i1] = intentional

    const [_m0, _m1] = this.getInternalMovement(values, state)

    /**
     * For both dimensions of the gesture, check its intentionality on each frame.
     */
    if (i0 === false) {
      i0 = getIntentionalDisplacement(_m0, t0)
    }
    if (i1 === false) {
      i1 = getIntentionalDisplacement(_m1, t1)
    }

    // Get gesture specific state properties based on intentionality and movement.
    const intentionalityCheck = this.checkIntentionality([i0, i1], [_m0, _m1], state)

    const { _intentional, _blocked } = intentionalityCheck
    const [_i0, _i1] = _intentional!
    const _movement = [_m0, _m1]

    if (_i0 !== false && intentional[0] === false) _initial[0] = valueFn(initial)[0]
    if (_i1 !== false && intentional[1] === false) _initial[1] = valueFn(initial)[1]

    /**
     * If the gesture has been blocked (from gesture specific checkIntentionality),
     * stop right there.
     */
    if (_blocked) return { ...intentionalityCheck, _movement, delta: [0, 0] }

    /**
     * The movement sent to the handler has 0 in its dimensions when intentionality is false.
     * It is calculated from the actual movement minus the threshold.
     */
    let movement = [
      _i0 !== false ? _m0 - _i0 : valueFn(initial)[0],
      _i1 !== false ? _m1 - _i1 : valueFn(initial)[1],
    ] as Vector2
    const offset = addV(movement, lastOffset)

    /**
     * Rubberband should be 0 when the gesture is no longer active, so that movement
     * and offset can return within their bounds.
     */
    const _rubberband: Vector2 = _active ? rubberband : [0, 0]
    movement = this.rubberband(addV(movement, _initial), _rubberband) // rubberbanded movement

    return {
      ...intentionalityCheck,
      _initial,
      _movement,
      movement,
      offset: this.rubberband(offset, _rubberband), // rubberbanded offset
      delta: subV(movement, prevMovement),
    } as PartialGestureState<T>
  }

  // Runs rubberband on a vector
  protected rubberband = (vector: Vector2, rubberband: Vector2): Vector2 => {
    const { bounds } = this.config

    /**
     * [x, y]: [rubberband(x, min, max), rubberband(y, min, max)]
     */
    return vector.map((v, i) => rubberbandIfOutOfBounds(v, bounds[i][0], bounds[i][1], rubberband[i])) as Vector2
  }

  // Cleans the gesture. Can be overriden by gestures.
  protected clean() {
    this.clearTimeout()
    this.removeWindowListeners()
  }

  /**
   * Fires the gesture handler
   *
   * @param {boolean} [forceFlag] - if true, then the handler will fire even if the gesture is not intentional
   */
  protected fireGestureHandler = (forceFlag?: boolean): FullGestureState<T> | null => {
    /**
     * If the gesture has been blocked (this can happen when the gesture has started in an unwanted direction),
     * clean everything and don't do anything.
     */
    if (this.state._blocked) {
      // we need debounced gestures to end by themselves
      if (!this.debounced) {
        this.state._active = false
        this.clean()
      }
      return null
    }

    // If the gesture has no intentional dimension, don't do fire the handler.
    const [intentionalX, intentionalY] = this.state._intentional
    if (!forceFlag && intentionalX === false && intentionalY === false) return null

    const { _active, active } = this.state

    this.state.active = _active
    this.state.first = _active && !active // `first` is true when the gesture becomes active
    this.state.last = active && !_active // `last` is true when the gesture becomes inactive

    this.controller.state.shared[this.ingKey] = _active // Sets dragging, pinching, etc. to the gesture active state

    const state = {
      ...this.controller.state.shared,
      ...this.state,
      ...this.mapStateValues(this.state), // Sets xy or da to the gesture state values
    } as FullGestureState<T>

    // @ts-ignore
    const newMemo = this.handler(state)

    // Sets memo to the returned value of the handler (unless it's not undefined)
    this.state.memo = newMemo !== void 0 ? newMemo : this.state.memo

    // Cleans the gesture when the gesture is no longer active.
    if (!_active) this.clean()

    return state
  }
}
