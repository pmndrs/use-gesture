import { Controller } from '../Controller'
import { EventStore } from '../EventStore'
import { TimeoutStore } from '../TimeoutStore'
import { getEventDetails } from '../utils/events'
import { call } from '../utils/fn'
import { V, computeRubberband } from '../utils/maths'
import { GestureKey, Handler, IngKey, InternalConfig, State, Vector2 } from '../types'

export interface EngineConstructor {
  new <Key extends GestureKey>(ctrl: Controller, args: any[], key: Key): Engine<Key>
}

export interface Engine<Key extends GestureKey = GestureKey> {
  /**
   * The Controller handling state.
   */
  ctrl: Controller
  /**
   * The gesture key ('drag' | 'pinch' | 'wheel' | 'scroll' | 'move' | 'hover')
   */
  key: Key
  /**
   * The key representing the active state of the gesture in the shared state.
   * ('dragging' | 'pinching' | 'wheeling' | 'scrolling' | 'moving' | 'hovering')
   */
  ingKey: IngKey
  /**
   * The arguments passed to the `bind` function.
   */
  args: any[]
  /**
   * Shortcut to the gesture state read from the Controller.
   */
  state: NonNullable<State[Key]>
  /**
   * Shortcut to the shared state read from the Controller
   */
  shared: State['shared']
  /**
   * Shortcut to the gesture config read from the Controller.
   */
  config: NonNullable<InternalConfig[Key]>
  /**
   * Shortcut to the shared config read from the Controller.
   */
  sharedConfig: InternalConfig['shared']
  /**
   * Shortcut to the gesture event store read from the Controller.
   */
  eventStore: EventStore
  /**
   * Shortcut to the gesture timeout store read from the Controller.
   */
  timeoutStore: TimeoutStore
  /**
   * Shortcut to the gesture handler read from the Controller.
   */
  handler: Handler<Key>
  /**
   * Function that some gestures can use to add initilization
   * properties to the state when it is created.
   */
  init?(this: Engine<Key>): void
  /**
   * Setup function that some gestures can use to set additional properties of
   * the state when the gesture starts.
   */
  setup?(this: Engine<Key>): void
  /**
   * Function used by some gestures to determine the intentionality of a
   * a movement depending on thresholds. The intent function can change the
   * `state._active` or `state._blocked` flags if the gesture isn't intentional.
   * @param movement
   */
  intent?(this: Engine<Key>, movement: Vector2): void
  /**
   * Function that resets the state.
   */
  reset(this: Engine<Key>): void
  /**
   * Function ran at the start of the gesture.
   * @param event
   */
  start(this: Engine<Key>, event: NonNullable<State[Key]>['event']): void
  /**
   * Computes all sorts of state attributes, including kinematics.
   * @param event
   */
  compute(this: Engine<Key>, event?: NonNullable<State[Key]>['event']): void
  /**
   * Function implemented by gestures that compute the offset from the state
   * movement.
   */
  computeOffset(this: Engine<Key>): void
  /**
   * Function implemented by the gestures that compute the movement from the
   * corrected offset (after bounds and potential rubberbanding).
   */
  computeMovement(this: Engine<Key>): void
  /**
   * Fires the gesture handler.
   */
  emit(this: Engine<Key>): void
  /**
   * Cleans the gesture timeouts and event listeners.
   */
  clean(this: Engine<Key>): void
  /**
   * Executes the bind function so that listeners are properly set by the
   * Controller.
   * @param bindFunction
   */
  bind(
    this: Engine<Key>,
    bindFunction: (
      device: string,
      action: string,
      handler: (event: any) => void,
      options?: AddEventListenerOptions
    ) => void
  ): void
}

export const Engine: EngineConstructor = function <Key extends GestureKey>(
  this: Engine<Key>,
  ctrl: Controller,
  args: any[],
  key: Key
) {
  this.ctrl = ctrl
  this.key = key
  this.args = args

  if (!this.state) {
    this.state = {
      values: [0, 0],
      initial: [0, 0]
    } as any
    if (this.init) this.init()
    this.reset()
  }
} as any

Engine.prototype = {
  get state() {
    return this.ctrl.state[this.key]
  },
  set state(state) {
    this.ctrl.state[this.key] = state
  },
  get shared() {
    return this.ctrl.state.shared
  },
  get eventStore() {
    return this.ctrl._gestureEventStores[this.key]
  },
  get timeoutStore() {
    return this.ctrl._gestureTimeoutStores[this.key]
  },
  get config() {
    return this.ctrl._config[this.key]
  },
  get sharedConfig() {
    return this.ctrl._config.shared
  },
  get handler() {
    return this.ctrl._handlers[this.key]
  }
}

Engine.prototype.reset = function () {
  const { state, shared, config, ingKey } = this
  const { transform, threshold } = config
  shared[ingKey] = state._active = state.active = state._blocked = state._force = false
  state._step = [false, false]
  state.intentional = false
  state._movement = [0, 0]

  // the _threshold is the difference between a [0,0] origin offset converted to
  // its new space coordinates
  state._threshold = V.sub(transform(threshold), transform([0, 0])).map(Math.abs) as Vector2
  // prettier-ignore
  state._bounds = [[-Infinity, Infinity], [-Infinity, Infinity]]
  state.axis = undefined
  state.memo = undefined
  state.direction = [0, 0]
  state.distance = [0, 0]
  state.velocity = [0, 0]
  state.movement = [0, 0]
  state.delta = [0, 0]
  state.timeStamp = 0
} as Engine['reset']

Engine.prototype.start = function (event) {
  const state = this.state
  const config = this.config
  if (!state._active) {
    this.reset()
    state._active = true
    state.target = event.currentTarget!
    state.initial = state.values
    state.lastOffset = config.from ? call(config.from, state) : state.offset
    state.offset = state.lastOffset
  }
} as Engine['start']

Engine.prototype.compute = function (event) {
  const state = this.state
  const config = this.config
  const shared = this.shared

  if (event) {
    // sets the shared state with event properties
    state.event = event
    shared.touches = this.ctrl._pointerIds.size || this.ctrl._touchIds.size
    shared.locked = !!document.pointerLockElement
    Object.assign(shared, getEventDetails(event))
    shared.down = shared.pressed = shared.buttons > 0 || shared.touches > 0
  }

  const [_m0, _m1] = config.transform(state._movement)
  const [_t0, _t1] = state._threshold
  // Step will hold the threshold at which point the gesture was triggered. The
  // threshold is signed depending on which direction triggered it.
  let [_s0, _s1] = state._step

  if (_s0 === false) _s0 = Math.abs(_m0) >= _t0 && Math.sign(_m0) * _t0
  if (_s1 === false) _s1 = Math.abs(_m1) >= _t1 && Math.sign(_m1) * _t1

  state.intentional = _s0 !== false || _s1 !== false

  if (!state.intentional) return

  state._step = [_s0, _s1]

  const movement: Vector2 = [0, 0]

  movement[0] = _s0 !== false ? _m0 - _s0 : 0
  movement[1] = _s1 !== false ? _m1 - _s1 : 0

  // let's run intentionality check.
  if (this.intent) this.intent(movement)

  if ((state._active && !state._blocked) || state.active) {
    state.first = state._active && !state.active
    state.last = !state._active && state.active
    state.active = shared[this.ingKey] = state._active

    if (event) {
      const dt = event.timeStamp - state.timeStamp
      state.timeStamp = event.timeStamp

      if (state.first) {
        if ('bounds' in config) state._bounds = call(config.bounds, state)
        state.startTime = state.timeStamp
        if (this.setup) this.setup()
      }

      state.elapsedTime = state.timeStamp - state.startTime

      const previousMovement = state.movement
      state.movement = movement

      const absoluteDelta = state.delta.map(Math.abs) as Vector2

      V.addTo(state.distance, absoluteDelta)
      this.computeOffset()

      if (!state.first && !state.last && dt > 0) {
        // calculates kinematics unless the gesture starts or ends
        state.delta = V.sub(movement, previousMovement)
        state.direction = state.delta.map(Math.sign) as Vector2
        state.velocity = [absoluteDelta[0] / dt, absoluteDelta[1] / dt]
      }
    }
  }

  // @ts-ignore
  const rubberband: Vector2 = state._active ? config.rubberband || [0, 0] : [0, 0]
  state.offset = computeRubberband(state._bounds, state.offset, rubberband)
  this.computeMovement()
} as Engine['compute']

Engine.prototype.emit = function () {
  const state = this.state
  const shared = this.shared
  const config = this.config

  if (!state._active) this.clean()

  // we don't trigger the handler if the gesture is blockedor non intentional,
  // unless the `_force` flag was set or the `triggerAllEvents` option was set
  // to true in the config.
  if ((state._blocked || !state.intentional) && !state._force && !config.triggerAllEvents) return

  const memo = this.handler({
    ...shared,
    ...state,
    args: this.args
  })

  // Sets memo to the returned value of the handler (unless it's  undefined)
  if (memo !== undefined) state.memo = memo
} as Engine['emit']

Engine.prototype.clean = function () {
  this.eventStore.clean()
  this.timeoutStore.clean()
} as Engine['clean']
