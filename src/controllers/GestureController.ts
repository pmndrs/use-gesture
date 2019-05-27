import {
  Coordinates,
  DistanceAngle,
  StateKey,
  StateObject,
  GestureState,
  SharedGestureState,
  GestureKey,
  FullGestureState,
} from '../../types/states.d'
import { Fn, AtLeastOneOf } from '../../types/common.d'
import { ReactEventHandlerKey, GestureFlag, ReactEventHandlers } from '../../types/events.d'
import { GestureHandlers, Handler, HandlerKey } from '../../types/web.d'
import { GestureConfig } from '../../types/config.d'

import { defaultConfig, initialState, mappedKeys } from '../defaults'
import { addListeners, removeListeners, supportsGestureEvent, chainFns } from '../utils'

import DragRecognizer from '../recognizers/DragRecognizer'
import ScrollRecognizer from '../recognizers/ScrollRecognizer'
import WheelRecognizer from '../recognizers/WheelRecognizer'
import MoveRecognizer from '../recognizers/MoveRecognizer'
import HoverRecognizer from '../recognizers/HoverRecognizer'
import PinchRecognizer from '../recognizers/PinchRecognizer'
import PinchWheelRecognizer from '../recognizers/PinchWheelRecognizer'
import PinchWebKitGestureRecognizer from '../recognizers/PinchWebKitGestureRecognizer'
import CoordinatesRecognizer from '../recognizers/CoordinatesRecognizer'
import DistanceAngleRecognizer from '../recognizers/DistanceAngleRecognizer'

type GestureTimeouts = Partial<{ [stateKey in StateKey]: number }>
type WindowListeners = Partial<{ [stateKey in StateKey]: [string, Fn][] }>
type Bindings = Partial<{ [eventName in ReactEventHandlerKey]: Fn[] }>

export default class GestureController<BinderType extends ReactEventHandlers | Fn> {
  public handlers!: AtLeastOneOf<GestureHandlers>
  public config!: GestureConfig
  public state: StateObject = initialState
  public timeouts: GestureTimeouts = {}
  private bindings: Bindings = {}
  private domListeners: [string, Fn][] = []
  private windowListeners: WindowListeners = {}

  constructor(handlers: AtLeastOneOf<GestureHandlers> | Handler<Coordinates>, config?: Partial<GestureConfig>) {
    this.setHandlersAndConfig(handlers, config)
  }

  public setHandlersAndConfig = (handlers: AtLeastOneOf<GestureHandlers> | Handler<Coordinates>, config?: Partial<GestureConfig>) => {
    if (typeof handlers === 'function') handlers = { onDrag: handlers } as GestureHandlers
    else if (handlers.onAction) {
      handlers.onDrag = handlers.onAction
    }
    this.config = { ...defaultConfig, ...config }
    const { domTarget } = this.config
    const realDomTarget = domTarget && 'current' in domTarget ? domTarget.current : domTarget
    this.config.domTarget = realDomTarget

    this.handlers = handlers
  }

  public clean = (): void => {
    this.cleanOnRender()
    Object.values(this.timeouts).forEach(clearTimeout)
    Object.keys(this.windowListeners).forEach(stateKey => this.removeWindowListeners(<StateKey>stateKey))
  }

  private cleanOnRender = (): void => {
    this.bindings = {}
    const { domTarget } = this.config
    if (domTarget) {
      removeListeners(<EventTarget>domTarget, this.domListeners, this.config.event)
      this.domListeners = []
    }
  }

  public updateState = <T extends Coordinates | DistanceAngle>(
    sharedState: Partial<SharedGestureState> | null,
    gestureState: Partial<GestureState<T>>,
    gestureKey: GestureKey,
    flag?: GestureFlag
  ): void => {
    const stateKey = mappedKeys[gestureKey].stateKey

    this.state = {
      ...this.state,
      shared: { ...this.state.shared, ...sharedState },
      [stateKey]: { ...this.state[stateKey], ...(gestureState as object) },
    }

    if (flag) {
      this.fireGestureHandler(gestureKey, flag)
    }
  }

  // fire the gesture handler defined by the user
  public fireGestureHandler = (gestureKey: GestureKey, flag: GestureFlag): void => {
    const { stateKey, handlerKey } = mappedKeys[gestureKey]
    const state = { ...this.state.shared, ...this.state[stateKey] }

    if (gestureKey === 'pinch') {
      const pinchState = state as FullGestureState<DistanceAngle>
      pinchState.da = state.values // legacy state attribute for pinch gestures
      pinchState.vdva = state.velocities // legacy state attribute for pinch gestures
    } else {
      const coordinatesState = state as FullGestureState<Coordinates>
      coordinatesState.xy = state.values // legacy state attribute for xy gestures
      coordinatesState.vxvy = state.velocities // legacy state attribute for xy gestures
    }

    if (flag === GestureFlag.OnStart) {
      const handlerStart = `${handlerKey}Start` as keyof GestureHandlers
      const handler = this.handlers[handlerStart] as any
      handler && handler(state)
    }

    const handler = this.handlers[handlerKey] as any
    if (handler) {
      this.state[stateKey].temp = handler(state) || this.state[stateKey].temp
    }

    if (flag === GestureFlag.OnEnd) {
      const handlerEnd = `${handlerKey}End` as keyof GestureHandlers
      const handler = this.handlers[handlerEnd] as any
      handler && handler(state)
    }
  }

  public addWindowListeners = (stateKey: StateKey, listeners: [string, Fn][]): void => {
    if (!this.config.window) return
    this.windowListeners[stateKey] = listeners
    addListeners(this.config.window, listeners, this.config.event)
  }

  public removeWindowListeners = (stateKey: StateKey): void => {
    if (!this.config.window) return
    const listeners = this.windowListeners[stateKey]
    if (listeners) {
      removeListeners(this.config.window, listeners, this.config.event)
      delete this.windowListeners[stateKey]
    }
  }

  private addRecognizer = (recognizer: CoordinatesRecognizer<BinderType> | DistanceAngleRecognizer<BinderType>): void => {
    recognizer.getEventBindings().map(this.addEventBindings)
  }

  //TODO Fix <Fn[]>
  private addEventBindings = ([eventNames, fn]: [ReactEventHandlerKey | ReactEventHandlerKey[], Fn]): void => {
    const eventNamesArray = !Array.isArray(eventNames) ? [eventNames] : eventNames

    eventNamesArray.forEach(eventName => {
      this.bindings[eventName] = this.bindings[eventName] ? [...(<Fn[]>this.bindings[eventName]), fn] : [fn]
    })
  }

  private addDomTargetListeners = (): void => {
    const { domTarget } = this.config
    removeListeners(<EventTarget>domTarget, this.domListeners, this.config.event)
    this.domListeners = []

    Object.entries(this.bindings).forEach(([event, fns]) => {
      this.domListeners.push([event.substr(2).toLowerCase(), chainFns(...(<Fn[]>fns))])
    })

    addListeners(<EventTarget>domTarget, this.domListeners, this.config.event)
  }

  private getBindings = (): ReactEventHandlers => {
    const output: ReactEventHandlers = {}
    const captureString = this.config.event.capture ? 'Capture' : ''

    Object.entries(this.bindings).forEach(([event, fns]) => {
      const key = (event + captureString) as ReactEventHandlerKey
      output[key] = chainFns(...(<Fn[]>fns))
    })

    return output
  }

  public bind = (...args: any[]): BinderType => {
    // if handlers contains {onDragStart, onDrag, onDragEnd, onMoveStart, onMove}
    // actions will skip on[Gesture]["Start"|"End"] functions and include
    // ['onDrag', 'onMove']

    const actions: Set<HandlerKey | undefined> = new Set(
      Object.keys(this.handlers)
        .filter(k => k.indexOf('on') === 0)
        .map(k => {
          const match = k.match(/(on[A-Z][a-z]+)/)
          if (match) return <HandlerKey>match[1]
        })
    )

    const { domTarget } = this.config

    this.cleanOnRender()

    if (actions.has('onDrag')) {
      this.addRecognizer(new DragRecognizer<BinderType>(this, args))
    }
    if (actions.has('onScroll')) {
      this.addRecognizer(new ScrollRecognizer<BinderType>(this, args))
    }
    if (actions.has('onWheel')) {
      this.addRecognizer(new WheelRecognizer<BinderType>(this, args))
    }
    if (actions.has('onMove')) {
      this.addRecognizer(new MoveRecognizer<BinderType>(this, args))
    }
    if (actions.has('onHover')) {
      this.addRecognizer(new HoverRecognizer<BinderType>(this, args))
    }
    if (actions.has('onPinch')) {
      if (domTarget && supportsGestureEvent()) {
        this.addRecognizer(new PinchWebKitGestureRecognizer<BinderType>(this, args))
      } else {
        this.addRecognizer(new PinchRecognizer<BinderType>(this, args))
        this.addRecognizer(new PinchWheelRecognizer<BinderType>(this, args))
      }
    }

    if (domTarget) {
      this.addDomTargetListeners()
      return this.clean as BinderType
    }

    return this.getBindings() as BinderType
  }
}
