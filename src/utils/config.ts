import { FullUserConfig, PartialUserConfig, InternalConfig, Vector2 } from '../types'

const DEFAULT_DRAG_DELAY = 180

// default config (will extend user config)
export const defaultConfig: FullUserConfig = {
  domTarget: undefined,
  eventOptions: { passive: true, capture: false, pointer: false },
  window: typeof window !== 'undefined' ? window : undefined,
  enabled: true,
  drag: {
    enabled: true,
    filterClicks: false,
    threshold: undefined,
    delay: false,
    swipeVelocity: 0.5,
    swipeDistance: 100,
    axis: undefined,
    lockDirection: false,
  },
}

/**
 * 2nd level merge of a1 into a2
 * @param a1 array to be merged
 * @param a2 default array
 */
const merge = <T>(a1: Partial<T>, a2: T): T =>
  Object.entries(a1).reduce((acc, [name, value]) => {
    // if value is an object (and not the window key object) we merge it with default
    if (typeof value === 'object' && name !== 'window' && name !== 'domTarget') {
      // @ts-ignore
      return { ...acc, [name]: { ...a2[name], ...value } }
    }
    // @ts-ignore
    // otherwise we just take the config value if it exists
    return { ...acc, [name]: a2[name] || value }
  }, a2)

const def = {
  array: <T>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value, value]),
}

export function getDerivedConfig(config: PartialUserConfig): InternalConfig {
  // first we merge the config with the default config
  const mergedConfig = merge(config, defaultConfig)

  const {
    eventOptions: { passive, capture, pointer },
    drag: dragConfig,
    ...restConfig
  } = mergedConfig

  let { threshold, swipeVelocity, swipeDistance, delay, filterClicks, axis, lockDirection, ...restDrag } = dragConfig

  if (threshold === void 0) {
    threshold = Math.max(0, filterClicks ? 3 : 0, lockDirection || axis ? 1 : 0)
  } else {
    filterClicks = true
  }

  const thresholdArray = def.array(threshold) as Vector2

  const drag = {
    ...restDrag,
    filterClicks: filterClicks || thresholdArray[0] + thresholdArray[1] > 0,
    axis,
    lockDirection,
    threshold: thresholdArray,
    swipeVelocity: def.array(swipeVelocity) as Vector2,
    swipeDistance: def.array(swipeDistance) as Vector2,
    delay: typeof delay === 'number' ? delay : delay ? DEFAULT_DRAG_DELAY : 0,
  }

  const derivedConfig = {
    ...restConfig,
    // if there isn't a domtarget or if event.passive is true, then passiveEvents is true
    eventOptions: { passive: !mergedConfig.domTarget || passive, capture },
    pointer: pointer,
    captureString: capture ? 'Capture' : '',
    drag,
  }

  return derivedConfig
}
