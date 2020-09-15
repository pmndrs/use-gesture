import '../recognizers/MoveRecognizer'
import { UseHoverConfig, Handler } from '../types'
import { buildHoverConfig } from './buildConfig'
import useRecognizers from './useRecognizers'

/**
 * Hover hook.
 *
 * @param handler - the function fired every time the hover gesture updates
 * @param [config={}] - the config object including generic options and hover options
 */
export function useHover<Config = UseHoverConfig>(handler: Handler<'hover'>, config: Config | {} = {}) {
  return useRecognizers<Config>({ hover: handler }, buildHoverConfig(config))
}
