import DragRecognizer from '../recognizers/DragRecognizer'
import { RecognizersMap } from '../recognizers/Recognizer'
import { UseDragConfig, Handler } from '../types'
import { buildDragConfig } from './buildConfig'
import useRecognizers from './useRecognizers'

/**
 * Drag hook.
 *
 * @param handler - the function fired every time the drag gesture updates
 * @param [config={}] - the config object including generic options and drag options
 */
export function useDrag<Config = UseDragConfig>(handler: Handler<'drag'>, config: Config | {} = {}) {
  return useRecognizers<Config>({ drag: handler }, buildDragConfig(config))
}

RecognizersMap.set('drag', DragRecognizer)
