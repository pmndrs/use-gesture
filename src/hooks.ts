import React from 'react'
import GestureController from './controllers/GestureController'
import { Handler, GestureHandlersPartial, GestureConfig, Coordinates, Fn, ReactEventHandlers, DistanceAngle } from './types'
import { defaultConfig } from './defaults'

/** API
 * const bind = useDrag(() => { ... })
 * const bind = usePinch(() => { ... })
 * const bind = useMove(() => { ... })
 * const bind = useScroll(() => { ... })
 * const bind = useWheel(() => { ... })
 *
 * Handlers object:
 * const bind = useGesture({ onDrag: () => { ... }, onMove: () => { ... } })
 *
 * DomTarget:
 * const bind = useGesture({ onScroll: () => { ... } }, { domTarget: window })
 * React.useEffect(bind, [bind])
 */

type PartialGestureConfig = Partial<Omit<GestureConfig, 'passiveEvents'>>
type GetBinderTypeFromDomTarget<T extends PartialGestureConfig> = T['domTarget'] extends object ? Fn : ReactEventHandlers

export function useGesture<Config extends PartialGestureConfig>(
  handlers: GestureHandlersPartial,
  config?: Config
): (...args: any[]) => GetBinderTypeFromDomTarget<Config> {
  // the gesture controller will keep track of all gesture states
  const gestureController = React.useRef<GestureController>()

  if (!gestureController.current) {
    // we initialize the gesture controller once
    gestureController.current = new GestureController(handlers, getDerivedConfig(config))
  }

  React.useEffect(() => {
    // every time handlers or config change, we let the gesture controller compute
    // them so that the gesture handlers functions are aware of the changes
    gestureController.current!.config = getDerivedConfig(config)
    gestureController.current!.handlers = handlers
  }, [handlers, config])

  // when the user component unmounts, we run our gesture controller clean function
  React.useEffect(() => gestureController.current!.clean, [])

  // we return the bind function of our controller, which returns an binding object or
  // a cleaning function depending on whether config.domTarget is set
  return gestureController.current.bind as (...args: any[]) => GetBinderTypeFromDomTarget<Config>
}

/* SHORTHAND HANDLERS */
export const useDrag = (handler: Handler<Coordinates>, config?: PartialGestureConfig) => useGesture({ onDrag: handler }, config)
export const useMove = (handler: Handler<Coordinates>, config?: PartialGestureConfig) => useGesture({ onMove: handler }, config)
export const useHover = (handler: Handler<Coordinates>, config?: PartialGestureConfig) => useGesture({ onHover: handler }, config)
export const useScroll = (handler: Handler<Coordinates>, config?: PartialGestureConfig) => useGesture({ onScroll: handler }, config)
export const useWheel = (handler: Handler<Coordinates>, config?: PartialGestureConfig) => useGesture({ onWheel: handler }, config)
export const usePinch = (handler: Handler<DistanceAngle>, config?: PartialGestureConfig) => useGesture({ onPinch: handler }, config)

function getDerivedConfig(config?: Partial<GestureConfig>): GestureConfig {
  const derivedConfig = { ...defaultConfig, ...config }
  const { domTarget } = derivedConfig
  const realDomTarget = domTarget && 'current' in domTarget ? domTarget.current : domTarget
  derivedConfig.domTarget = realDomTarget

  const passive = derivedConfig.event.passive !== void 0 ? derivedConfig.event.passive : true

  // TODO make test to check if passive is correctly passed to config

  // if there isn't a domtarget or if event.passive is true, then passiveEvents is true
  derivedConfig.passiveEvents = !derivedConfig.domTarget || passive

  return derivedConfig
}
