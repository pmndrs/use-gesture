import useRecognizers from './useRecognizers'
import DragRecognizer from '../recognizers/DragRecognizer'
import { Handler, GenericConfig, DragConfig, InternalFullConfig, HookReturnType } from '../types'
import { getGenericConfig, getDragConfig } from '../utils/config'

type UseDragUserConfig = Partial<GenericConfig & DragConfig>

export function useDrag<Config extends UseDragUserConfig>(
  handler: Handler<'drag'>,
  config: Config | {} = {}
): (...args: any[]) => HookReturnType<Config> {
  const { domTarget, eventOptions, window, ...drag } = <UseDragUserConfig>config
  // every time the config changes, we update the controller config (might be optimized)
  const mergedConfig: InternalFullConfig = {
    ...getGenericConfig({ domTarget, eventOptions, window }),
    drag: getDragConfig(drag),
  }

  return useRecognizers<Config>({ drag: handler }, [DragRecognizer], mergedConfig)
}
