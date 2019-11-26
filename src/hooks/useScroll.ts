import useRecognizers from './useRecognizers'
import MoveRecognizer from '../recognizers/MoveRecognizer'
import { Handler, InternalConfig, HookReturnType, UseScrollConfig } from '../types'
import { getInternalGenericOptions, getInternalCoordinatesOptions } from '../utils/config'

/**
 * @public
 *
 * Scroll hook.
 *
 * @param {Handler<'scroll'>} handler - the function fired every time the scroll gesture updates
 * @param {(Config | {})} [config={}] - the config object including generic options and scroll options
 * @returns {(...args: any[]) => HookReturnType<Config>}
 */
export function useScroll<Config extends UseScrollConfig>(
  handler: Handler<'scroll'>,
  config: Config | {} = {}
): (...args: any[]) => HookReturnType<Config> {
  const { domTarget, eventOptions, window, axis, lockDirection, ...move } = config as UseScrollConfig

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
    move: getInternalCoordinatesOptions(move),
  }

  return useRecognizers<Config>({ scroll: handler }, [MoveRecognizer], mergedConfig)
}
