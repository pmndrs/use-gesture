import {
  StateKey,
  StateObject,
  GestureState,
  SharedGestureState,
  GestureKey,
  Fn,
  ReactEventHandlerKey,
  GestureFlag,
  ReactEventHandlers,
  GestureConfig,
  GestureHandlers,
  HandlerKey,
  GestureHandlersPartial,
} from '../types'

import { initialState, mappedKeys } from '../defaults'
import { addListeners, removeListeners, gestureEventSupported, chainFns } from '../utils'

import DragRecognizer from '../recognizers/DragRecognizer'
import ScrollRecognizer from '../recognizers/ScrollRecognizer'
import WheelRecognizer from '../recognizers/WheelRecognizer'
import MoveRecognizer from '../recognizers/MoveRecognizer'
import HoverRecognizer from '../recognizers/HoverRecognizer'
import PinchRecognizer from '../recognizers/PinchRecognizer'
import PinchWheelRecognizer from '../recognizers/PinchWheelRecognizer'
import PinchWebKitGestureRecognizer from '../recognizers/PinchWebKitGestureRecognizer'
import Recognizer from 'recognizers/Recognizer'

type GestureTimeouts = Partial<{ [stateKey in StateKey]: number }>
type WindowListeners = Partial<{ [stateKey in StateKey]: [string, Fn][] }>
type Bindings = Partial<{ [eventName in ReactEventHandlerKey]: Fn[] | Fn }>

/**
 * Gesture controller will create gesture recognizers (which handle the gesture logic)
 * and keep track of the state for all gestures
 *
 * @template BinderType the type the bind function should return
 */
export default class GestureController {
  public state: StateObject = initialState // state for all gestures
  public timeouts: GestureTimeouts = {} // keeping track of timeouts for debounced gestures (such as move, scroll, wheel)
  public actions: Set<HandlerKey>
  private bindings: Bindings = {} // an object holding the handlers associated to the gestures
  private domListeners: [string, Fn][] = [] // when config.domTarget is set, we attach events directly to the dom
  private windowListeners: WindowListeners = {} // keeps track of window listeners added by gestures (drag only at the moment)
  constructor(public handlers: GestureHandlersPartial, public config: GestureConfig) {
    // if handlers contains {onDragStart, onDrag, onDragEnd, onMoveStart, onMove}
    // actions will include 'onDrag' and 'onMove'
    this.actions = new Set(Object.keys(this.handlers).map(k => <HandlerKey>k.replace(/End|Start/, '')))
  }

  /**
   * Function run on component unmount
   * Cleans timeouts and removes dom listeners set by the bind function
   */
  public clean = (): void => {
    this.cleanOnBind()
    Object.values(this.timeouts).forEach(clearTimeout)
    Object.keys(this.windowListeners).forEach(stateKey => this.removeWindowListeners(<StateKey>stateKey))
  }

  /**
   * Function run every time the bind function is run (ie on every render)
   * Reset the binding object and remove dom listeners attached to config.domTarget
   */
  private cleanOnBind = (): void => {
    this.bindings = {}
    const { domTarget } = this.config
    if (domTarget) {
      removeListeners(<EventTarget>domTarget, this.domListeners, this.config.event)
      this.domListeners = []
    }
  }

  /**
   * Commodity function to let gesture recognizer update global state
   * @param sharedState shared partial state object
   * @param gestureState partial gesture specific state object
   * @param stateKey the state key ('drag', 'move'...)
   */
  public updateState = (sharedState: Partial<SharedGestureState> | null, gestureState: Partial<GestureState>, stateKey: StateKey): void => {
    const newGestureState = { ...this.state[stateKey], ...gestureState }

    if ('da' in newGestureState) newGestureState.da = newGestureState.values
    else if ('xy' in newGestureState) newGestureState.xy = newGestureState.values

    this.state = {
      ...this.state,
      shared: { ...this.state.shared, ...sharedState },
      [stateKey]: newGestureState,
    }
  }

  // fire the gesture handler defined by the user
  public fireGestureHandler = (gestureKey: GestureKey, gestureFlag: GestureFlag): void => {
    // gets the state key and handler key from the gesture key
    // gestureKey: 'hover' -> stateKey: 'move', handlerKey: 'onHover'
    const { stateKey, handlerKey } = mappedKeys[gestureKey]
    const state = { ...this.state.shared, ...this.state[stateKey] }
    if (state.event) state.event.gesture = gestureKey

    if (gestureFlag === GestureFlag.OnStart) {
      const handlerStart = `${handlerKey}Start` as keyof GestureHandlers
      const handler = this.handlers[handlerStart] as any
      handler && handler(state)
    }

    // whenever a flag is set, we run the default on[Gesture] function
    // i.e. GestureFlag.OnStart would trigger both onDragStart and onDrag
    const handler = this.handlers[handlerKey] as any
    if (handler) {
      const newMemo = handler(state)
      this.state[stateKey].memo = newMemo !== void 0 ? newMemo : this.state[stateKey].memo
    }

    if (gestureFlag === GestureFlag.OnEnd) {
      const handlerEnd = `${handlerKey}End` as keyof GestureHandlers
      const handler = this.handlers[handlerEnd] as any
      handler && handler(state)
    }
  }

  /**
   * Commodity function to let recognizers simply add listeners to config.window
   * @param stateKey
   * @param listeners
   */
  public addWindowListeners = (stateKey: StateKey, listeners: [string, Fn][]): void => {
    if (!this.config.window) return
    // we use this.windowListeners to keep track of the listeners we add
    this.windowListeners[stateKey] = listeners
    addListeners(this.config.window, listeners, this.config.event)
  }

  // commodity function to let recognizers simply remove listeners from config.window
  public removeWindowListeners = (stateKey: StateKey): void => {
    if (!this.config.window) return
    const listeners = this.windowListeners[stateKey]
    if (listeners) {
      removeListeners(this.config.window, listeners, this.config.event)
      delete this.windowListeners[stateKey]
    }
  }

  /**
   * Adds a recognizer to this.bindings
   * @param recognizer
   */
  private addRecognizer = (recognizer: Recognizer): void => {
    recognizer.getEventBindings().map(this.addEventBindings)
  }

  /**
   * this.bindings is an object which keys match ReactEventHandlerKeys (onMouseMove, onTouchStart...).
   * Since a recognizer might want to bind a handler function to an event key already used by a previously
   * added recognizer, we need to make sure that each event key is an array of all the functions mapped for
   * that key.
   */
  private addEventBindings = ([eventNames, fn]: [ReactEventHandlerKey | ReactEventHandlerKey[], Fn]): void => {
    const eventNamesArray = !Array.isArray(eventNames) ? [eventNames] : eventNames

    eventNamesArray.forEach(eventName => {
      this.bindings[eventName] = this.bindings[eventName] ? [...(<Fn[]>this.bindings[eventName]), fn] : [fn]
    })
  }

  /**
   * When config.domTarget is set, this function will add dom listeners to it
   */
  private addDomTargetListeners = (): void => {
    const { domTarget } = this.config

    // we iterate on the entries of this.binding
    // for each event, we chain the array of functions mapped to it
    // and push it to this.domListeners
    Object.entries(this.bindings).forEach(([event, fns]) => {
      this.domListeners.push([event.substr(2).toLowerCase(), chainFns(...(<Fn[]>fns))])
    })

    addListeners(<EventTarget>domTarget, this.domListeners, this.config.event)
  }

  /**
   * getBindings will return an object that will be bound by users
   * to the react component they want to interact with
   */
  private getBindings = (): ReactEventHandlers => {
    const output: ReactEventHandlers = {}
    const captureString = this.config.event.capture ? 'Capture' : ''

    Object.entries(this.bindings).forEach(([event, fns]) => {
      const fnsArray = Array.isArray(fns) ? fns : [fns]
      const key = (event + captureString) as ReactEventHandlerKey
      output[key] = chainFns(...(<Fn[]>fnsArray))
    })

    return output
  }

  public bind = (...args: any[]): Fn | ReactEventHandlers => {
    const { domTarget } = this.config

    const genuineHandlers = { ...this.handlers }

    // cleaning before adding
    this.cleanOnBind()

    if (this.actions.has('onDrag')) {
      this.addRecognizer(new DragRecognizer(this, args))
      delete genuineHandlers.onDrag
      delete genuineHandlers.onDragStart
      delete genuineHandlers.onDragEnd
    }
    if (this.actions.has('onScroll')) {
      this.addRecognizer(new ScrollRecognizer(this, args))
      delete genuineHandlers.onScroll
      delete genuineHandlers.onScrollStart
      delete genuineHandlers.onScrollEnd
    }
    if (this.actions.has('onWheel')) {
      this.addRecognizer(new WheelRecognizer(this, args))
      delete genuineHandlers.onWheel
      delete genuineHandlers.onWheelStart
      delete genuineHandlers.onWheelEnd
    }
    if (this.actions.has('onMove')) {
      this.addRecognizer(new MoveRecognizer(this, args))
      delete genuineHandlers.onMove
      delete genuineHandlers.onMoveStart
      delete genuineHandlers.onMoveEnd
    }
    if (this.actions.has('onHover')) {
      this.addRecognizer(new HoverRecognizer(this, args))
      delete genuineHandlers.onHover
    }
    if (this.actions.has('onPinch')) {
      // since react doesn't have handlers for gesture events we can only use them
      // domTarget is set (and when the browser supprots them).
      if (domTarget && gestureEventSupported()) {
        this.addRecognizer(new PinchWebKitGestureRecognizer(this, args))
      } else {
        this.addRecognizer(new PinchRecognizer(this, args))
        this.addRecognizer(new PinchWheelRecognizer(this, args))
      }
      delete genuineHandlers.onPinch
      delete genuineHandlers.onPinchStart
      delete genuineHandlers.onPinchEnd
    }

    // we also add event bindings for genuine handlers
    Object.entries(genuineHandlers).map(([event, fn]) => {
      // we're cheating when it comes to event type :(
      this.addEventBindings([<ReactEventHandlerKey>event, <Fn>fn])
    })

    // if config.domTarget is set we add event listeners to it and return the clean function
    if (domTarget) {
      this.addDomTargetListeners()
      return this.clean
    }

    // if not, we return an object that contains gesture handlers mapped to react handler event keys
    return this.getBindings()
  }
}
