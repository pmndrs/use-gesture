import { parseMergedHandlers } from '@use-gesture/core'
import { registerAction } from '@use-gesture/core/actions'
import { Action, GestureHandlers, UserGestureConfig } from '@use-gesture/core/types'
import { Recognizer } from './Recognizer'

export function createGesture(actions: Action[]) {
  actions.forEach(registerAction)

  return function (target: EventTarget, _handlers: GestureHandlers, _config: UserGestureConfig | {} = {}) {
    const { handlers, nativeHandlers, config } = parseMergedHandlers(_handlers, _config)
    return new Recognizer(target, handlers, config, undefined, nativeHandlers)
  }
}
