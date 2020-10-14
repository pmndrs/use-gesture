import { UseWheelConfig, Handler, EventTypes } from '../types'
import { _buildWheelConfig } from './buildConfig'
import useRecognizers from './useRecognizers'
import { RecognizersMap } from '../recognizers/Recognizer'
import { WheelRecognizer } from '../recognizers/WheelRecognizer'
import memoize from '../utils/memoize-one'
import isEqual from '../utils/react-fast-compare'
import { useRef } from 'react'

/**
 * Wheel hook.
 *
 * @param handler - the function fired every time the wheel gesture updates
 * @param the config object including generic options and wheel options
 */
export function useWheel<K = EventTypes['wheel']>(handler: Handler<'wheel', K>, config: UseWheelConfig | {} = {}) {
  RecognizersMap.set('wheel', WheelRecognizer)
  const buildWheelConfig = useRef<any>()
  if (!buildWheelConfig.current) {
    buildWheelConfig.current = memoize(_buildWheelConfig, isEqual)
  }
  return useRecognizers<UseWheelConfig>({ wheel: handler }, buildWheelConfig.current(config))
}
