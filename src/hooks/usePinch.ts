
import isEqual from "../utils/react-fast-compare"
import memoize from '../utils/memoize-one'
import useRecognizers from './useRecognizers'
import PinchRecognizer from '../recognizers/PinchRecognizer'
import { Handler, InternalConfig, HookReturnType, UsePinchConfig } from '../types'
import { getInternalGenericOptions, getInternalDistanceAngleOptions } from '../utils/config'


const buildConfig = memoize(({ domTarget, eventOptions, window, ...rest }: UsePinchConfig) => ({
  ...getInternalGenericOptions({ domTarget, eventOptions, window }),
  pinch: getInternalDistanceAngleOptions(rest),
}) as InternalConfig, isEqual)


/**
 * @public
 *
 * Pinch hook.
 *
 * @param {Handler<'pinch'>} handler - the function fired every time the pinch gesture updates
 * @param {(Config | {})} [config={}] - the config object including generic options and pinch options
 * @returns {(...args: any[]) => HookReturnType<Config>}
 */
export function usePinch<Config extends UsePinchConfig>(
  handler: Handler<'pinch'>,
  config: Config | {} = {}
): (...args: any[]) => HookReturnType<Config> {

  return useRecognizers<Config>(
    { pinch: handler }, 
    [PinchRecognizer], 
    buildConfig(config)
  )
}
