import React from 'react'
import GestureController from './controllers/GestureController'
import { Handler, GestureHandlersPartial } from './types/'
import { GestureConfig } from './types/config'
import { Coordinates } from './types/states'
import { Fn } from './types/common'
import { ReactEventHandlers } from './types/events'

/** API
 * Default Drag:
 * const bind = useGesture(() => { ... })
 *
 * Handlers object:
 * const bind = useGesture({ onDrag: () => { ... }, onMove: () => { ... } })
 *
 * DomTarget:
 * const bind = useGesture({ onScroll: () => { ... } }, { domTarget: window })
 * React.useEffect(bind, [bind])
 */

type GetBinderTypeFromDomTarget<T extends Partial<GestureConfig>> = T['domTarget'] extends object ? Fn : ReactEventHandlers

export function useGesture<Config extends Partial<GestureConfig>>(
  handlers: GestureHandlersPartial | Handler<Coordinates>,
  config?: Config
): (...args: any[]) => GetBinderTypeFromDomTarget<Config> {
  // the gesture controller will keep track of all gesture states
  const gestureController = React.useRef<GestureController>()

  if (!gestureController.current) {
    // we initialize the gesture controller once
    gestureController.current = new GestureController(handlers, config)
  }

  React.useEffect(() => {
    // every time handlers or config change, we let the gesture controller compute
    // them so that the gesture handlers functions are aware of the changes
    gestureController.current!.setHandlersAndConfig(handlers, config)
  }, [handlers, config])

  // when the user component unmounts, we run our gesture controller clean function
  React.useEffect(() => gestureController.current!.clean, [])

  // we return the bind function of our controller, which returns an binding object or
  // a cleaning function depending on whether config.domTarget is set
  return gestureController.current.bind as (...args: any[]) => GetBinderTypeFromDomTarget<Config>
}
