import { Handler, UseHoverConfig, EventTypes } from '../types'
import { _buildHoverConfig } from './buildConfig'
import useRecognizers from './useRecognizers'
import { RecognizersMap } from '../recognizers/Recognizer'
import { MoveRecognizer } from '../recognizers/MoveRecognizer'
import memoize from '../utils/memoize-one'
import isEqual from '../utils/react-fast-compare'
import { useRef } from 'react'

/**
 * Hover hook.
 *
 * @param handler - the function fired every time the hover gesture updates
 * @param [config={}] - the config object including generic options and hover options
 */
export function useHover<K = EventTypes['hover']>(handler: Handler<'hover', K>, config: UseHoverConfig | {} = {}) {
  RecognizersMap.set('hover', MoveRecognizer)
  const buildHoverConfig = useRef<any>()
  if (!buildHoverConfig.current) {
    buildHoverConfig.current = memoize(_buildHoverConfig, isEqual)
  }
  return useRecognizers<UseHoverConfig>({ hover: handler }, buildHoverConfig.current(config))
}
