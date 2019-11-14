import React from 'react'
import useRecognizers from './useRecognizers'
import DragRecognizer from '../recognizers/DragRecognizer'
import {
  GenericConfig,
  DragConfig,
  InternalFullConfig,
  HandlerKey,
  Fn,
  UserHandlersPartial,
  InternalHandlers,
  RecognizerClass,
  Coordinates,
  DistanceAngle,
  UserHandlers,
} from '../types'
import { getGenericConfig, getDragConfig } from '../utils/config'
import { chainFns } from '../utils/utils'

type UseGestureUserConfig = Partial<GenericConfig> & { drag?: Partial<DragConfig> }

export function useGesture(handlers: UserHandlersPartial, config: UseGestureUserConfig = {}) {
  const actions = React.useRef<Set<HandlerKey>>()

  if (!actions.current) {
    actions.current = new Set(Object.keys(handlers).map(k => <HandlerKey>k.replace(/End|Start/, '')))
  }

  const { drag, ...restConfig } = config

  const mergedConfig: InternalFullConfig = getGenericConfig(restConfig)

  const classes: (RecognizerClass<Coordinates> | RecognizerClass<DistanceAngle>)[] = []
  const internalHandlers: Partial<InternalHandlers> = {}

  if (actions.current.has('onDrag')) {
    classes.push(DragRecognizer)
    internalHandlers.drag = fillGestureActions(handlers, 'onDrag')
    mergedConfig.drag = getDragConfig(drag)
  }

  return useRecognizers(internalHandlers, classes, mergedConfig)
}

const fillGestureActions = (handlers: UserHandlersPartial, handlerKey: HandlerKey) => {
  const gestureActions: Fn[] = []
  const startKey = (handlerKey + 'Start') as keyof UserHandlers
  const endKey = (handlerKey + 'End') as keyof UserHandlers
  if (handlers[startKey]) gestureActions.push((state: any) => state.first && handlers[startKey]!(state))
  if (handlers[handlerKey]) gestureActions.push(handlers[handlerKey]!)
  if (handlers[endKey]) gestureActions.push((state: any) => state.last && handlers[endKey]!(state))

  return chainFns(...gestureActions)
}
