import isEqual from "../utils/react-fast-compare"
import memoize from '../utils/memoize-one'
import useRecognizers from './useRecognizers'
import PinchRecognizer from '../recognizers/PinchRecognizer'
import { Handler, InternalConfig, UsePinchConfig } from '../types'
import { getInternalGenericOptions, getInternalDistanceAngleOptions } from '../utils/config'


const buildConfig = memoize(({ domTarget, eventOptions, window, ...rest }: UsePinchConfig) => ({
  ...getInternalGenericOptions({ domTarget, eventOptions, window }),
  pinch: getInternalDistanceAngleOptions(rest),
}) as InternalConfig, isEqual)


/**
 * Pinch hook.
 *
 * @param handler - the function fired every time the pinch gesture updates
 * @param [config={}] - the config object including generic options and pinch options
 */
export function usePinch(handler: Handler<'pinch'>, config: UsePinchConfig|{} = {}) {
  return useRecognizers<UsePinchConfig>({ pinch: handler }, [PinchRecognizer], buildConfig(config))
}
