import React from 'react'
import useRecognizers, { createRecognizer } from './useRecognizers'
import DragRecognizer from '../recognizers/DragRecognizer'
import { Handler, Coordinates, GenericConfig, DragConfig, InternalFullConfig } from '../types'
import { getGenericConfig, getDragConfig } from '../utils/config'

type UseDragUserConfig = Partial<GenericConfig & DragConfig>

export function useDrag(handler: Handler<Coordinates>, config: UseDragUserConfig = {}) {
  const { domTarget, eventOptions, window, ...drag } = config

  // every time the config changes, we update the controller config (might be optimized)
  const mergedConfig: InternalFullConfig = React.useMemo(
    () => ({
      ...getGenericConfig({ domTarget, eventOptions, window }),
      drag: getDragConfig(drag),
    }),
    [config]
  )

  return useRecognizers(createRecognizer(handler, DragRecognizer), mergedConfig)
}
