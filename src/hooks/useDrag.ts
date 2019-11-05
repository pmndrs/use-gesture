import useRecognizers, { createRecognizer } from './useRecognizers'
import DragRecognizer from '../recognizers/DragRecognizer'
import { Handler, Coordinates, GenericConfig, DragConfig } from '../types'

type UseDragUserConfig = Partial<GenericConfig & DragConfig>

export function useDrag(handler: Handler<Coordinates>, config: UseDragUserConfig = {}) {
  const { domTarget, eventOptions, window, ...drag } = config
  return useRecognizers(createRecognizer(handler, DragRecognizer), { domTarget, eventOptions, window, drag })
}
