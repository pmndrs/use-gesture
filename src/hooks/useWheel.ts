import useRecognizers from './useRecognizers'
import WheelRecognizer from '../recognizers/WheelRecognizer'
import { Handler, InternalConfig, HookReturnType, UseWheelConfig } from '../types'
import { getInternalGenericOptions, getInternalCoordinatesOptions } from '../utils/config'

/**
 * @public
 *
 * Wheel hook.
 *
 * @param {Handler<'wheel'>} handler - the function fired every time the wheel gesture updates
 * @param {(Config | {})} [config={}] - the config object including generic options and wheel options
 * @returns {(...args: any[]) => HookReturnType<Config>}
 */
export function useWheel<Config extends UseWheelConfig>(
  handler: Handler<'wheel'>,
  config: Config | {} = {}
): (...args: any[]) => HookReturnType<Config> {
  const { domTarget, eventOptions, window, ...wheel } = config as UseWheelConfig

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
    wheel: getInternalCoordinatesOptions(wheel),
  }

  return useRecognizers<Config>({ wheel: handler }, [WheelRecognizer], mergedConfig)
}
