import Controller from '../Controller'
import {
  StateKey,
  SharedGestureState,
  IngKey,
  InternalConfig,
  GestureState,
  PartialGestureState,
  Vector2,
  FullGestureState,
  RecognizerClass,
} from '../types'
import { getInitialState } from '../utils/state'
import { rubberbandIfOutOfBounds } from '../utils/rubberband'
import { subV, addV, sign } from '../utils/math'
import { valueFn } from '../utils/utils'

export const RecognizersMap = new Map<string, RecognizerClass>()

/**
 * @private
 * Recognizer abstract class.
 */
export default abstract class Recognizer<T extends StateKey = StateKey> {
  abstract readonly ingKey: IngKey // dragging, scrolling, etc.
  protected debounced: Boolean = true
  abstract readonly stateKey: T

  /**
   * Creates an instance of a gesture recognizer.
   * @param stateKey drag, move, pinch, etc.
   * @param controller the controller attached to the gesture
   * @param [args] the args that should be passed to the gesture handler
   */
  constructor(readonly controller: Controller, readonly args: any[] = []) {}

  // Returns the gesture config
  get config(): NonNullable<InternalConfig[T]> {
    return this.controller.config[this.stateKey]!
  }

  // Is the gesture enabled
  get enabled(): boolean {
    return this.controller.config.enabled && this.config.enabled
  }

  // Returns the controller state for a given gesture
  get state(): GestureState<T> {
    return this.controller.state[this.stateKey]
  }

  // Returns the gesture handler
  get handler() {
    return this.controller.handlers[this.stateKey]!
  }

  // Convenience method to update the shared state
  protected updateSharedState(sharedState: Partial<SharedGestureState> | null) {
    Object.assign(this.controller.state.shared, sharedState)
  }

  // Convenience method to update the gesture state
  protected updateGestureState(gestureState: PartialGestureState<T> | null) {
    Object.assign(this.state, gestureState)
  }

  // Convenience method to set a timeout for a given gesture
  protected setTimeout = (callback: (...args: any[]) => void, ms: number = 140, ...args: any[]): void => {
    clearTimeout(this.controller.timeouts[this.stateKey])
    this.controller.timeouts[this.stateKey] = window.setTimeout(callback, ms, ...args)
  }

  // Convenience method to clear a timeout for a given gesture
  protected clearTimeout = () => {
    clearTimeout(this.controller.timeouts[this.stateKey])
  }

  protected abstract getKinematics(values: Vector2, event: React.UIEvent | UIEvent): PartialGestureState<T>
  protected abstract getInternalMovement(values: Vector2, state: GestureState<T>): Vector2
  protected abstract mapStateValues(state: GestureState<T>): PartialGestureState<T>

  public abstract addBindings(bindings: any): void

  /**
   * Returns state properties depending on the movement and state.
   *
   * Should be overriden for custom behavior, doesn't do anything in the implementation
   * below.
   */
  protected checkIntentionality(
    _intentional: [false | number, false | number],
    _movement: Vector2
  ): PartialGestureState<T> {
    return { _intentional, _blocked: false } as PartialGestureState<T>
  }

  /**
   * Returns basic movement properties for the gesture based on the next values and current state.
   */
  protected getMovement(values: Vector2): PartialGestureState<T> {
    const { initial, rubberband, threshold: T } = this.config

    const { _initial, _active, _intentional: intentional, lastOffset, movement: prevMovement } = this.state
    const M = this.getInternalMovement(values, this.state)

    const i0 = intentional[0] === false ? getIntentionalDisplacement(M[0], T[0]) : intentional[0]
    const i1 = intentional[1] === false ? getIntentionalDisplacement(M[1], T[1]) : intentional[1]

    // Get gesture specific state properties based on intentionality and movement.
    const intentionalityCheck = this.checkIntentionality([i0, i1], M)
    if (intentionalityCheck._blocked) {
      return { ...intentionalityCheck, _movement: M, delta: [0, 0] }
    }

    const _intentional = intentionalityCheck._intentional!
    const _movement = M

    if (_intentional[0] !== false && intentional[0] === false) _initial[0] = valueFn(initial)[0]
    if (_intentional[1] !== false && intentional[1] === false) _initial[1] = valueFn(initial)[1]

    /**
     * The movement sent to the handler has 0 in its dimensions when intentionality is false.
     * It is calculated from the actual movement minus the threshold.
     */
    let movement: Vector2 = [
      _intentional[0] !== false ? M[0] - _intentional[0] : valueFn(initial)[0],
      _intentional[1] !== false ? M[1] - _intentional[1] : valueFn(initial)[1],
    ]

    const offset = addV(movement, lastOffset)

    /**
     * Rubberband should be 0 when the gesture is no longer active, so that movement
     * and offset can return within their bounds.
     */
    const _rubberband: Vector2 = _active ? rubberband : [0, 0]
    movement = computeRubberband(this, addV(movement, _initial), _rubberband)

    return {
      ...intentionalityCheck,
      _initial,
      _movement,
      movement,
      values,
      offset: computeRubberband(this, offset, _rubberband),
      delta: subV(movement, prevMovement),
    } as PartialGestureState<T>
  }

  // Cleans the gesture. Can be overriden by gestures.
  protected clean() {
    this.clearTimeout()
  }

  /**
   * Fires the gesture handler
   */
  protected fireGestureHandler = (): FullGestureState<T> | null => {
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

    // If the gesture has no intentional dimension, don't fire the handler.
    const [intentionalX, intentionalY] = this.state._intentional
    const isGestureIntentional = intentionalX !== false || intentionalY !== false
    // if (!forceFlag && intentionalX === false && intentionalY === false) return null

    if (isGestureIntentional) {
      const prev_active = this.state.active
      const next_active = this.state._active

      this.state.active = next_active
      this.state.first = next_active && !prev_active
      this.state.last = prev_active && !next_active

      this.controller.state.shared[this.ingKey] = next_active // Sets dragging, pinching, etc. to the gesture active state
    }
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
    if (!this.state._active) this.clean()

    return state
  }
}

//--------------------------------------------

function getIntentionalDisplacement(movement: number, threshold: number): number | false {
  if (Math.abs(movement) >= threshold) {
    return sign(movement) * threshold
  } else {
    return false
  }
}

function computeRubberband({ config: { bounds } }: Recognizer, [Vx, Vy]: Vector2, [Rx, Ry]: Vector2): Vector2 {
  const [[X1, X2], [Y1, Y2]] = bounds

  return [rubberbandIfOutOfBounds(Vx, X1, X2, Rx), rubberbandIfOutOfBounds(Vy, Y1, Y2, Ry)]
}

/**
 * Returns a generic, common payload for all gestures from an event.
 */
export function getGenericPayload({ state, args }: Recognizer, event: React.UIEvent | UIEvent, isStartEvent?: boolean) {
  const { timeStamp, type: _lastEventType } = event
  const previous = state.values
  const elapsedTime = isStartEvent ? 0 : timeStamp - state.startTime!
  return { _lastEventType, event, timeStamp, elapsedTime, args, previous }
}

/**
 * Returns the reinitialized start state for the gesture.
 * Should be common to all gestures.
 */
export function getStartGestureState<T extends StateKey>(
  recognizer: Recognizer<T>,
  values: Vector2,
  event: React.UIEvent | UIEvent
) {
  const offset = recognizer.state.offset
  const startTime = event.timeStamp

  return {
    ...getInitialState()[recognizer.stateKey],
    _active: true,
    values,
    initial: values,
    offset,
    lastOffset: offset,
    startTime,
  }
}
