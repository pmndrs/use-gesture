import { UseDragConfig, Handler, EventTypes } from '../types'
import { buildDragConfig } from './buildConfig'
import useRecognizers from './useRecognizers'
import { RecognizersMap } from '../recognizers/Recognizer'
import { DragRecognizer } from '../recognizers/DragRecognizer'

/**
 * Drag hook.
 *
 * @param handler - the function fired every time the drag gesture updates
 * @param [config={}] - the config object including generic options and drag options
 */
export function useDrag<K = EventTypes['drag']>(handler: Handler<'drag', K>, config: UseDragConfig | {} = {}) {
  RecognizersMap.set('drag', DragRecognizer)
  
  return useRecognizers<UseDragConfig>({ drag: handler }, buildDragConfig(config))
}
