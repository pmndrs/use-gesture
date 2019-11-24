import React from 'react'
import useRecognizers from './useRecognizers'
import DragRecognizer from '../recognizers/DragRecognizer'
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
import { getInternalGenericOptions, getInternalDragOptions } from '../utils/config'

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
  const { drag, ...restConfig } = config

  const mergedConfig: InternalConfig = getInternalGenericOptions(restConfig)

  const classes: RecognizerClasses = []
  const internalHandlers: Partial<InternalHandlers> = {}

  if (actions.has('onDrag')) {
    classes.push(DragRecognizer)
    internalHandlers.drag = includeStartEndHandlers(handlers, 'onDrag')
    mergedConfig.drag = getInternalDragOptions(drag)
  }

  return useRecognizers<Config>(internalHandlers, classes, mergedConfig)
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
const includeStartEndHandlers = (handlers: UserHandlersPartial, handlerKey: HandlerKey) => {
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
