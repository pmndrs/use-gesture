import React from 'react'
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
  getInternalWheelOptions,
} from '../utils/config'
import {
  InternalConfig,
  HandlerKey,
  UserHandlersPartial,
  InternalHandlers,
  UserHandlers,
  RecognizerClasses,
  UseGestureConfig,
  HookReturnType,
} from '../types'

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
  handlers: UserHandlersPartial,
  config: UseGestureConfig = {}
): (...args: any[]) => HookReturnType<Config> {
  /**
   * If handlers contains {onDragStart, onDrag, onDragEnd, onMoveStart, onMove}
   * actions will include 'onDrag' and 'onMove.
   */
  const [actions] = React.useState(() => new Set(Object.keys(handlers).map(k => k.replace(/End|Start/, ''))))

  /**
   * Here we compute the derived internal config based on the provided config object.
   * We decompose the config into its generic and gesture options and compute each.
   * TODO: this is currently done on every render!
   */
  const { drag, wheel, move, scroll, pinch, hover, ...restConfig } = config

  const mergedConfig: InternalConfig = getInternalGenericOptions(restConfig)

  const classes: RecognizerClasses = []
  const internalHandlers: Partial<InternalHandlers> = {}

  // will hold reference to native handlers such as onClick, onMouseDown, etc.
  const _nativeHandlers = { ...handlers }

  if (actions.has('onDrag')) {
    classes.push(DragRecognizer)
    internalHandlers.drag = includeStartEndHandlers(handlers, 'onDrag', _nativeHandlers)
    mergedConfig.drag = getInternalDragOptions(drag)
  }
  if (actions.has('onWheel')) {
    classes.push(WheelRecognizer)
    internalHandlers.wheel = includeStartEndHandlers(handlers, 'onWheel', _nativeHandlers)
    mergedConfig.wheel = getInternalWheelOptions(wheel)
  }
  if (actions.has('onScroll')) {
    classes.push(ScrollRecognizer)
    internalHandlers.scroll = includeStartEndHandlers(handlers, 'onScroll', _nativeHandlers)
    mergedConfig.scroll = getInternalCoordinatesOptions(scroll)
  }
  if (actions.has('onMove')) {
    classes.push(MoveRecognizer)
    internalHandlers.move = includeStartEndHandlers(handlers, 'onMove', _nativeHandlers)
    mergedConfig.move = getInternalCoordinatesOptions(move)
  }
  if (actions.has('onPinch')) {
    classes.push(PinchRecognizer)
    internalHandlers.pinch = includeStartEndHandlers(handlers, 'onPinch', _nativeHandlers)
    mergedConfig.pinch = getInternalDistanceAngleOptions(pinch)
  }
  if (actions.has('onHover')) {
    if (!actions.has('onMove')) classes.push(MoveRecognizer)
    internalHandlers.hover = handlers.onHover
    mergedConfig.hover = { enabled: true, ...hover }
    delete _nativeHandlers.onHover
  }

  return useRecognizers<Config>(internalHandlers, classes, mergedConfig, _nativeHandlers)
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
function includeStartEndHandlers(
  handlers: UserHandlersPartial,
  handlerKey: HandlerKey,
  _nativeHandlers: UserHandlersPartial
) {
  const startKey = (handlerKey + 'Start') as keyof UserHandlers
  const endKey = (handlerKey + 'End') as keyof UserHandlers

  delete _nativeHandlers[handlerKey]
  delete _nativeHandlers[startKey]
  delete _nativeHandlers[endKey]

  const fn = (state: any) => {
    let memo: any = undefined
    if (state.first && startKey in handlers) handlers[startKey]!(state)
    if (handlerKey in handlers) memo = handlers[handlerKey]!(state)
    if (state.last && endKey in handlers) handlers[endKey]!(state)
    return memo
  }
  return fn
}
