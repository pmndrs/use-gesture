import React from 'react'
import GestureController from './controllers/GestureController'
import { GestureHandlers, Handler } from '../types/web.d'
import { GestureConfig } from '../types/config.d'
import { ReactEventHandlers } from '../types/events.d'
import { Fn, AtLeastOneOf } from '../types/common.d'
import { Coordinates } from '../types/states.d'

type GetBinderTypeFromDomTarget<T extends Partial<GestureConfig>> = T['domTarget'] extends object ? Fn : ReactEventHandlers

export function useGesture<T extends Partial<GestureConfig>>(
  handlers: AtLeastOneOf<GestureHandlers> | Handler<Coordinates>,
  config?: T
): (...args: any[]) => GetBinderTypeFromDomTarget<T> {
  const gestureController = React.useRef<GestureController<GetBinderTypeFromDomTarget<T>>>()

  if (!gestureController.current) {
    gestureController.current = new GestureController<GetBinderTypeFromDomTarget<T>>(handlers, config)
  }

  React.useEffect(() => {
    gestureController.current!.setHandlersAndConfig(handlers, config)
  }, [handlers, config])

  React.useEffect(() => gestureController.current!.clean, [])

  return gestureController.current.bind
}
