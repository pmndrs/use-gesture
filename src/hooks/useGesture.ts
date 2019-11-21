import React from 'react'
import useRecognizers from './useRecognizers'
import DragRecognizer from '../recognizers/DragRecognizer'
import {
  GenericConfig,
  DragConfig,
  InternalFullConfig,
  HandlerKey,
  UserHandlersPartial,
  InternalHandlers,
  UserHandlers,
  RecognizerClasses,
} from '../types'
import { getGenericConfig, getDragConfig } from '../utils/config'

type UseGestureUserConfig = Partial<GenericConfig> & { drag?: Partial<DragConfig> }

export function useGesture(handlers: UserHandlersPartial, config: UseGestureUserConfig = {}) {
  const [actions] = React.useState(() => new Set(Object.keys(handlers).map(k => k.replace(/End|Start/, ''))))

  const { drag, ...restConfig } = config

  const mergedConfig: InternalFullConfig = getGenericConfig(restConfig)

  const classes: RecognizerClasses = []
  const internalHandlers: Partial<InternalHandlers> = {}

  if (actions.has('onDrag')) {
    classes.push(DragRecognizer)
    internalHandlers.drag = includeStartEndHandlers(handlers, 'onDrag')
    mergedConfig.drag = getDragConfig(drag)
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
