import useRecognizers from './useRecognizers'
import DragRecognizer from '../recognizers/DragRecognizer'
import { Handler, UseDragConfig } from '../types'
import { buildDragConfig } from './buildConfig'

/**
 * Drag hook.
 *
 * @param handler - the function fired every time the drag gesture updates
 * @param [config={}] - the config object including generic options and drag options
 */
export function useDrag(handler: Handler<'drag'>, config: UseDragConfig | {} = {}) {
  return useRecognizers<UseDragConfig>({ drag: handler }, [DragRecognizer], buildDragConfig(config))
}
