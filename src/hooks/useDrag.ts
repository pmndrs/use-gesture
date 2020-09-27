import '../recognizers/DragRecognizer'
import { UseDragConfig, Handler, EventTypes } from '../types'
import { buildDragConfig } from './buildConfig'
import useRecognizers from './useRecognizers'

/**
 * Drag hook.
 *
 * @param handler - the function fired every time the drag gesture updates
 * @param [config={}] - the config object including generic options and drag options
 */
export function useDrag<K = EventTypes['drag']>(handler: Handler<'drag', K>, config: UseDragConfig | {} = {}) {
  return useRecognizers<UseDragConfig>({ drag: handler }, buildDragConfig(config))
}
