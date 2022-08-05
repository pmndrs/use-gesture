import { Controller } from '@use-gesture/core'
import type { DOMHandlers, GenericOptions, GestureKey, InternalHandlers, NativeHandlers } from '@use-gesture/core/types'
import { watchEffect } from 'vue'
import type { Events as VueEvents } from 'vue'

type Dict = Record<string, any>

const eventMap: Dict = {
  onKeyDown: 'onKeydown',
  onKeyup: 'onKeyup',
  onPointerCancel: 'onPointercancel',
  onPointerDown: 'onPointerdown',
  onPointerMove: 'onPointermove',
  onPointerEnter: 'onPointerenter',
  onPointerLeave: 'onPointerleave',
  onPointerUp: 'onPointerup',
  onWheel: 'onWheel',
  onScroll: 'onScroll'
}

function toVueProp(prop: string) {
  if (prop in eventMap) return eventMap[prop]

  return prop
}

export const normalizeProps = (props: Dict = {}) => {
  const normalized: Dict = {}
  for (const key in props) normalized[toVueProp(key)] = props[key]

  return normalized
}

type CombinedEventHandlers = VueEvents & DOMHandlers

type HookReturnType<Config extends GenericOptions> = Config['target'] extends object
  ? void
  : (...args: any[]) => CombinedEventHandlers

/**
 * Utility hook called by all gesture hooks and that will be responsible for
 * the internals.
 *
 * @param {InternalHandlers} handlers
 * @param {GenericOptions} config
 * @param {GestureKey} gestureKey
 * @param {NativeHandler} nativeHandlers
 * @returns nothing when config.target is set, a binding function when not.
 */
export function useRecognizers<Config extends GenericOptions>(
  handlers: InternalHandlers,
  config: Config | {} = {},
  gestureKey?: GestureKey,
  nativeHandlers?: NativeHandlers
): HookReturnType<Config> {
  const ctrl = new Controller(handlers)
  ctrl.applyHandlers(handlers, nativeHandlers)
  ctrl.applyConfig(config, gestureKey)

  watchEffect((onInvalidate) => {
    const cleanFn = ctrl.clean.bind(ctrl)
    const effectFn = ctrl.effect.bind(ctrl)

    onInvalidate(() => {
      cleanFn()
      effectFn()
    })
  })

  // When target is undefined we return the bind function of the controller which
  // returns prop handlers.
  // @ts-expect-error: Internal
  if (config.target === undefined) return ctrl.bind.bind(ctrl) as any

  return undefined as any
}
