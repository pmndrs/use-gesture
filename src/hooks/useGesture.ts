import useRecognizers from './useRecognizers'
import DragRecognizer from '../recognizers/DragRecognizer'
import WheelRecognizer from '../recognizers/WheelRecognizer'
import MoveRecognizer from '../recognizers/MoveRecognizer'
import PinchRecognizer from '../recognizers/PinchRecognizer'
import ScrollRecognizer from '../recognizers/ScrollRecognizer'
import {
  getInternalGenericOptions,
  getInternalDragOptions,
  getInternalCoordinatesOptions,
  getInternalDistanceAngleOptions,
} from '../utils/config'
import {
  InternalConfig,
  HandlerKey,
  UserHandlersPartial,
  InternalHandlers,
  UserHandlers,
  RecognizerClass,
  UseGestureConfig,
  HookReturnType,
} from '../types'

export function wrapStart(fn: Function) {
  return function (this: any, { first }: any) {
    if (first) fn.apply(this, arguments)
  }
}

export function wrapEnd(fn: Function) {
  return function (this: any, { last }: any) {
    if (last) fn.apply(this, arguments)
  }
}

const RE_NOT_NATIVE = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/

function sortHandlers(handlers: UserHandlersPartial) {
  const native: any = {}
  const handle: any = {}
  const actions = new Set()

  for (let key in handlers) {
    if (RE_NOT_NATIVE.test(key)) {
      actions.add(RegExp.lastMatch)
      handle[key] = (handlers as any)[key]
    } else {
      native[key] = (handlers as any)[key]
    }
  }

  return [handle, native, actions]
}

/**
 * @public
 *
 * The most complete gesture hook, allowing support for multiple gestures.
 *
 * @param {UserHandlersPartial} handlers - an object with on[Gesture] keys containg gesture handlers
 * @param {UseGestureConfig} [config={}] - the full config object
 * @returns {(...args: any[]) => HookReturnType<Config>}
 */
export function useGesture<Config extends UseGestureConfig>(
  _handlers: UserHandlersPartial,
  config: UseGestureConfig = {}
): (...args: any[]) => HookReturnType<Config> {
  const [handlers, nativeHandlers, actions] = sortHandlers(_handlers)

  /**
   * Here we compute the derived internal config based on the provided config object.
   * We decompose the config into its generic and gesture options and compute each.
   * TODO: this is currently done on every render!
   */
  const { drag, wheel, move, scroll, pinch, hover, eventOptions, window, domTarget, enabled } = config

  const mergedConfig: InternalConfig = getInternalGenericOptions({ eventOptions, window, domTarget, enabled })

  const classes: RecognizerClass[] = []
  const internalHandlers: Partial<InternalHandlers> = {}

  // will hold reference to native handlers such as onClick, onMouseDown, etc.

  if (actions.has('onDrag')) {
    classes.push(DragRecognizer)
    internalHandlers.drag = includeStartEndHandlers(handlers, 'onDrag')
    mergedConfig.drag = getInternalDragOptions(drag)
  }
  if (actions.has('onWheel')) {
    classes.push(WheelRecognizer)
    internalHandlers.wheel = includeStartEndHandlers(handlers, 'onWheel')
    mergedConfig.wheel = getInternalCoordinatesOptions(wheel)
  }
  if (actions.has('onScroll')) {
    classes.push(ScrollRecognizer)
    internalHandlers.scroll = includeStartEndHandlers(handlers, 'onScroll')
    mergedConfig.scroll = getInternalCoordinatesOptions(scroll)
  }
  if (actions.has('onMove')) {
    classes.push(MoveRecognizer)
    internalHandlers.move = includeStartEndHandlers(handlers, 'onMove')
    mergedConfig.move = getInternalCoordinatesOptions(move)
  }
  if (actions.has('onPinch')) {
    classes.push(PinchRecognizer)
    internalHandlers.pinch = includeStartEndHandlers(handlers, 'onPinch')
    mergedConfig.pinch = getInternalDistanceAngleOptions(pinch)
  }
  if (actions.has('onHover')) {
    if (!actions.has('onMove')) classes.push(MoveRecognizer)
    internalHandlers.hover = handlers.onHover
    mergedConfig.hover = { enabled: true, ...hover }
  }

  return useRecognizers<Config>(internalHandlers, classes, mergedConfig, nativeHandlers)
}
/**
 * @private
 *
 * This utility function will integrate start and end handlers into the regular
 * handler function by using first and last conditions.
 *
 * @param {UserHandlersPartial} handlers - the handlers function object
 * @param {HandlerKey} handlerKey - the key for which to integrate start and end handlers
 * @returns
 */
function includeStartEndHandlers(handlers: UserHandlersPartial, handlerKey: HandlerKey) {
  const startKey = (handlerKey + 'Start') as keyof UserHandlers
  const endKey = (handlerKey + 'End') as keyof UserHandlers

  const fn = (state: any) => {
    let memo: any = undefined
    if (state.first && startKey in handlers) handlers[startKey]!(state)
    if (handlerKey in handlers) memo = handlers[handlerKey]!(state)
    if (state.last && endKey in handlers) handlers[endKey]!(state)
    return memo
  }
  return fn
}
