import useRecognizers from './useRecognizers'
import DragRecognizer from '../recognizers/DragRecognizer'
import { Handler, InternalConfig, HookReturnType, UseDragConfig } from '../types'
import { getInternalGenericOptions, getInternalDragOptions } from '../utils/config'

export function useDrag<Config extends UseDragConfig>(
  handler: Handler<'drag'>,
  config: Config | {} = {}
): (...args: any[]) => HookReturnType<Config> {
  const { domTarget, eventOptions, window, ...drag } = config as UseDragConfig
  // every time the config changes, we update the controller config (might be optimized)
  const mergedConfig: InternalConfig = {
    ...getInternalGenericOptions({ domTarget, eventOptions, window }),
    drag: getInternalDragOptions(drag),
  }

  console.log(mergedConfig)

  return useRecognizers<Config>({ drag: handler }, [DragRecognizer], mergedConfig)
}
