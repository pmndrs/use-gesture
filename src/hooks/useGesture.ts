import React from 'react'
import useRecognizers, { createRecognizer } from './useRecognizers'
import DragRecognizer from '../recognizers/DragRecognizer'
import { GenericConfig, DragConfig, InternalFullConfig, HandlerKey, GestureHandlersPartial } from '../types'
import { getGenericConfig, getDragConfig } from '../utils/config'

type UseGestureUserConfig = Partial<GenericConfig & { drag: DragConfig }>

export function useGesture(handlers: GestureHandlersPartial, config: UseGestureUserConfig = {}) {
  const actions = React.useRef<Set<HandlerKey>>()

  if (!actions.current) {
    actions.current = new Set(Object.keys(handlers).map(k => <HandlerKey>k.replace(/End|Start/, '')))
  }

  const { drag, ...restConfig } = config

  const mergedConfig: InternalFullConfig = getGenericConfig(restConfig)

  const recognizerCreators = []

  if (actions.current.has('onDrag')) {
    recognizerCreators.push(createRecognizer(handlers.onDrag!, DragRecognizer))
    mergedConfig.drag = getDragConfig(drag)
  }

  return useRecognizers(recognizerCreators, mergedConfig)
}
