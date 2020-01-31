import useRecognizers from './useRecognizers'
import MoveRecognizer from '../recognizers/MoveRecognizer'
import { Handler, InternalConfig, HookReturnType, UseHoverConfig } from '../types'
import { getInternalGenericOptions } from '../utils/config'

/**
 * @public
 *
 * Hover hook.
 *
 * @param {Handler<'hover'>} handler - the function fired every time the hover gesture updates
 * @param {(Config | {})} [config={}] - the config object including generic options and hover options
 * @returns {(...args: any[]) => HookReturnType<Config>}
 */
export function useHover<Config extends UseHoverConfig>(
  handler: Handler<'hover'>,
  config: Config | {} = {}
): (...args: any[]) => HookReturnType<Config> {
  const { domTarget, eventOptions, window, ...hover } = config as UseHoverConfig

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
    hover: { enabled: true, ...hover },
  }

  return useRecognizers<Config>({ hover: handler }, [MoveRecognizer], mergedConfig)
}
