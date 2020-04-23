import isEqual from "../utils/react-fast-compare"
import memoize from '../utils/memoize-one'

import useRecognizers from './useRecognizers'
import WheelRecognizer from '../recognizers/WheelRecognizer'
import { Handler, InternalConfig, UseWheelConfig } from '../types'
import { getInternalGenericOptions, getInternalCoordinatesOptions } from '../utils/config'


const buildConfig = memoize(({ domTarget, eventOptions, window, ...rest }: UseWheelConfig) => ({
  ...getInternalGenericOptions({ domTarget, eventOptions, window }),
  wheel: getInternalCoordinatesOptions(rest),
}) as InternalConfig, isEqual)


/**
 * Wheel hook.
 *
 * @param handler - the function fired every time the wheel gesture updates
 * @param the config object including generic options and wheel options
 */
export function useWheel(handler: Handler<'wheel'>, config: UseWheelConfig | {} = {}) {
  return useRecognizers<UseWheelConfig>({ wheel: handler }, [WheelRecognizer], buildConfig(config))
}
