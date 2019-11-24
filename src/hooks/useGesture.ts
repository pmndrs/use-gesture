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
} from '../types'

import { getInternalGenericOptions, getInternalDragOptions } from '../utils/config'

export function useGesture(handlers: UserHandlersPartial, config: UseGestureConfig = {}) {
  const [actions] = React.useState(() => new Set(Object.keys(handlers).map(k => k.replace(/End|Start/, ''))))

  const { drag, ...restConfig } = config

  const mergedConfig: InternalConfig = getInternalGenericOptions(restConfig)

  const classes: RecognizerClasses = []
  const internalHandlers: Partial<InternalHandlers> = {}

  if (actions.has('onDrag')) {
    classes.push(DragRecognizer)
    internalHandlers.drag = includeStartEndHandlers(handlers, 'onDrag')
    mergedConfig.drag = getInternalDragOptions(drag)
  }

  return useRecognizers(internalHandlers, classes, mergedConfig)
}

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
