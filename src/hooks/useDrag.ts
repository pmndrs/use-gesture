import isEqual from "../utils/react-fast-compare"
import memoize from '../utils/memoize-one'

import useRecognizers from './useRecognizers'
import DragRecognizer from '../recognizers/DragRecognizer'
import { Handler, InternalConfig, UseDragConfig } from '../types'
import { getInternalGenericOptions, getInternalDragOptions } from '../utils/config'

const buildConfig = memoize(({ domTarget, eventOptions, window, ...rest }: UseDragConfig) => ({
  ...getInternalGenericOptions({ domTarget, eventOptions, window }),
  drag: getInternalDragOptions(rest),
}) as InternalConfig, isEqual)

/**
 * Drag hook.
 *
 * @param handler - the function fired every time the drag gesture updates
 * @param [config={}] - the config object including generic options and drag options
 */
export function useDrag(handler: Handler<'drag'>, config: UseDragConfig | {} = {}) {
  return useRecognizers<UseDragConfig>({ drag: handler }, [DragRecognizer], buildConfig(config))
}
