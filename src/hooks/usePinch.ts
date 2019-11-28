import useRecognizers from './useRecognizers'
import PinchRecognizer from '../recognizers/PinchRecognizer'
import { Handler, InternalConfig, HookReturnType, UsePinchConfig } from '../types'
import { getInternalGenericOptions, getInternalDragOptions } from '../utils/config'

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
  const { domTarget, eventOptions, window, ...pinch } = config as UsePinchConfig

  /**
   * TODO: at the moment we recompute the config object at every render
   * this could probably be optimized
   */
  const mergedConfig: InternalConfig = {
    ...getInternalGenericOptions({
      domTarget,
      eventOptions,
      window,
    }),
    pinch: getInternalDragOptions(pinch),
  }

  return useRecognizers<Config>({ pinch: handler }, [PinchRecognizer], mergedConfig)
}
