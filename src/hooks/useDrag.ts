import { UseDragConfig, Handler, EventTypes } from '../types'
import { _buildDragConfig } from './buildConfig'
import useRecognizers from './useRecognizers'
import { RecognizersMap } from '../recognizers/Recognizer'
import { DragRecognizer } from '../recognizers/DragRecognizer'
import memoize from '../utils/memoize-one'
import isEqual from '../utils/react-fast-compare'
import { useRef } from 'react'

/**
 * Drag hook.
 *
 * @param handler - the function fired every time the drag gesture updates
 * @param [config={}] - the config object including generic options and drag options
 */
export function useDrag<K = EventTypes['drag']>(handler: Handler<'drag', K>, config: UseDragConfig | {} = {}) {
  RecognizersMap.set('drag', DragRecognizer)
  const buildDragConfig = useRef<any>()
  if (!buildDragConfig.current) {
    buildDragConfig.current = memoize(_buildDragConfig, isEqual)
  }
  return useRecognizers<UseDragConfig>({ drag: handler }, buildDragConfig.current(config))
}
