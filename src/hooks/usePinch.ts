import { UsePinchConfig, Handler, EventTypes } from '../types'
import { _buildPinchConfig } from './buildConfig'
import useRecognizers from './useRecognizers'
import { RecognizersMap } from '../recognizers/Recognizer'
import { PinchRecognizer } from '../recognizers/PinchRecognizer'
import memoize from '../utils/memoize-one'
import isEqual from '../utils/react-fast-compare'
import { useRef } from 'react'

/**
 * Pinch hook.
 *
 * @param handler - the function fired every time the pinch gesture updates
 * @param [config={}] - the config object including generic options and pinch options
 */
export function usePinch<K = EventTypes['pinch']>(handler: Handler<'pinch', K>, config: UsePinchConfig | {} = {}) {
  RecognizersMap.set('pinch', PinchRecognizer)
  const buildPinchConfig = useRef<any>()
  if (!buildPinchConfig.current) {
    buildPinchConfig.current = memoize(_buildPinchConfig, isEqual)
  }
  return useRecognizers<UsePinchConfig>({ pinch: handler }, buildPinchConfig.current(config))
}
