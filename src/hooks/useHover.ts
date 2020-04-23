import useRecognizers from './useRecognizers'
import MoveRecognizer from '../recognizers/MoveRecognizer'
import { Handler, UseHoverConfig } from '../types'
import { buildHoverConfig } from './buildConfig'

/**
 * Hover hook.
 *
 * @param handler - the function fired every time the hover gesture updates
 * @param [config={}] - the config object including generic options and hover options
 */
export function useHover(handler: Handler<'hover'>, config: UseHoverConfig | {} = {}) {
  return useRecognizers<UseHoverConfig>({ hover: handler }, [MoveRecognizer], buildHoverConfig(config))
}
