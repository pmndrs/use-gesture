import { EngineMap } from './imports'
import { parse } from './config/resolver'
import { Touches, isTouch, toReactHandlerProp } from './utils/events'
import { EventStore } from './EventStore'
import { TimeoutStore } from './TimeoutStore'
import { chain } from './utils/fn'
import { GestureKey, InternalConfig, InternalHandlers, NativeHandlers, State, UserGestureConfig } from './types'

interface ControllerConstructor {
  new (handlers: InternalHandlers): Controller
}

export interface Controller {
  /**
   * The list of gestures handled by the Controller.
   */
  _gestures: Set<GestureKey>
  /**
   * The event store that keeps track of the config.target listeners.
   */
  _targetEventStore: EventStore
  /**
   * Object that keeps track of all gesture event listeners.
   */
  _gestureEventStores: { [key in GestureKey]?: EventStore }
  /**
   * Object that keeps track of all gesture timeouts.
   */
  _gestureTimeoutStores: { [key in GestureKey]?: TimeoutStore }
  /**
   * Gesture handlers.
   */
  _handlers: InternalHandlers
  /**
   * Native event handlers.
   */
  _nativeHandlers?: NativeHandlers
  /**
   * Computed configuration.
   */
  _config: InternalConfig
  /**
   * Pointer ids active on the target.
   */
  _pointerIds: Set<number>
  /**
   * Touch identifiers active on the target.
   */
  _touchIds: Set<number>
  /**
   * The Controller state reflecting the state of all gestures.
   */
  state: State
  /**
   * Sets pointer or touch ids based on the event.
   * @param event
   */
  setEventIds(this: Controller, event: TouchEvent | PointerEvent): void
  /**
   * Attaches handlers to the controller.
   * @param handlers
   * @param nativeHandlers
   */
  applyHandlers(this: Controller, handlers: InternalHandlers, nativeHandlers?: NativeHandlers): void
  /**
   * Compute and attaches a config to the controller.
   * @param config
   * @param gestureKey
   */
  applyConfig(this: Controller, config: UserGestureConfig, gestureKey?: GestureKey): void
  /**
   * Cleans all side effects (listeners, timeouts). When the gesture is
   * destroyed (in React, when the component is unmounted.)
   */
  clean(this: Controller): void
  /**
   * Executes side effects (attaching listeneds to a `config.target`). Ran on
   * each render.
   */
  effect(this: Controller): void
  /**
   * The bind function that can be returned by the gesture handler (a hook in
   * React for example.)
   * @param args
   */
  bind(this: Controller, ...args: any[]): NativeHandlers | void
}

export const Controller: ControllerConstructor = function (this: Controller, handlers: InternalHandlers) {
  this._gestures = new Set()
  this._targetEventStore = new EventStore(this)
  this._gestureEventStores = {}
  this._gestureTimeoutStores = {}
  this._handlers = {}
  this._nativeHandlers = {}
  this._config = {} as InternalConfig
  this._pointerIds = new Set()
  this._touchIds = new Set()
  this.state = { shared: {} } as State

  resolveGestures(this, handlers)
} as any

Controller.prototype.setEventIds = function (event) {
  if (isTouch(event)) {
    this._touchIds = new Set(Touches.ids(event as TouchEvent))
  } else if ('pointerId' in event) {
    if (event.type === 'pointerup') this._pointerIds.delete(event.pointerId)
    else this._pointerIds.add(event.pointerId)
  }
} as Controller['setEventIds']

Controller.prototype.applyHandlers = function (handlers, nativeHandlers) {
  this._handlers = handlers
  this._nativeHandlers = nativeHandlers
} as Controller['applyHandlers']

Controller.prototype.applyConfig = function (config, gestureKey) {
  this._config = parse(config, gestureKey)
} as Controller['applyConfig']

Controller.prototype.clean = function () {
  this._targetEventStore.clean()
  for (const key of this._gestures) {
    this._gestureEventStores[key]!.clean()
    this._gestureTimeoutStores[key]!.clean()
  }
} as Controller['clean']

Controller.prototype.effect = function () {
  if (this._config.shared.target) this.bind()
  return () => this._targetEventStore.clean()
} as Controller['effect']

Controller.prototype.bind = function (...args) {
  const sharedConfig = this._config.shared
  const eventOptions = sharedConfig.eventOptions
  const props: any = {}

  const bindFunction = sharedConfig.target
    ? bindToEventStore(this._targetEventStore, sharedConfig.target())
    : bindToProps(props, eventOptions)

  if (sharedConfig.enabled) {
    // Adding native handlers
    for (const eventKey in this._nativeHandlers) {
      // @ts-ignore
      bindFunction(eventKey, '', (event) => this._nativeHandlers[eventKey]({ ...this.state.shared, event, args }))
    }

    // Adding gesture handlers
    for (const gestureKey of this._gestures) {
      if (this._config[gestureKey]!.enabled) {
        const Engine = EngineMap.get(gestureKey)!
        // @ts-ignore
        new Engine(this, args).bind(bindFunction)
      }
    }
  }

  // If target isn't set, we return an object that contains gesture handlers
  // mapped to props handler event keys.
  if (!sharedConfig.target) {
    for (const handlerProp in props) {
      props[handlerProp] = chain(...props[handlerProp])
    }
    return props
  }
} as Controller['bind']

function setupGesture(ctrl: Controller, gestureKey: GestureKey) {
  ctrl._gestures.add(gestureKey)
  ctrl._gestureEventStores[gestureKey] = new EventStore(ctrl)
  ctrl._gestureTimeoutStores[gestureKey] = new TimeoutStore()
}

function resolveGestures(ctrl: Controller, internalHandlers: InternalHandlers) {
  if (internalHandlers.drag) setupGesture(ctrl, 'drag')
  if (internalHandlers.wheel) setupGesture(ctrl, 'wheel')
  if (internalHandlers.scroll) setupGesture(ctrl, 'scroll')
  if (internalHandlers.move) setupGesture(ctrl, 'move')
  if (internalHandlers.pinch) setupGesture(ctrl, 'pinch')
  if (internalHandlers.hover) setupGesture(ctrl, 'hover')
}

const bindToEventStore = (eventStore: EventStore, target: EventTarget) => (
  device: string,
  action: string,
  handler: (event: any) => void,
  options?: AddEventListenerOptions
) => {
  eventStore.add(target, device, action, handler, options)
}

const bindToProps = (props: any, eventOptions: AddEventListenerOptions) => (
  device: string,
  action: string,
  handler: (event: any) => void,
  options: AddEventListenerOptions = {}
) => {
  const capture = options.capture ?? eventOptions.capture
  const handlerProp = toReactHandlerProp(device, action, capture)
  props[handlerProp] = props[handlerProp] || []
  props[handlerProp].push(handler)
}
