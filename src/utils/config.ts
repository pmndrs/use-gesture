import { Vector2, GenericConfig, InternalGenericConfig, InternalDragConfig, DragConfig, Tuple } from '../types'
import { def } from './utils'

const DEFAULT_DRAG_DELAY = 180
const DEFAULT_RUBBERBAND = 0.15

// default config (will extend user config)
export const defaultConfig: GenericConfig = {
  domTarget: undefined,
  eventOptions: { passive: true, capture: false, pointer: false },
  window: typeof window !== 'undefined' ? window : undefined,
  enabled: true,
}

export const defaultDragConfig: DragConfig = {
  enabled: true,
  filterClicks: false,
  threshold: undefined,
  swipeVelocity: 0.5,
  swipeDistance: 100,
  axis: undefined,
  lockDirection: false,
  delay: false,
  xBounds: [false, false],
  yBounds: [false, false],
  rubberband: 0,
}

export const getGenericConfig = (config: Partial<GenericConfig>): InternalGenericConfig => {
  const { eventOptions: defaultEventOptions, window: defaultWindow, ...restDefault } = defaultConfig
  const { eventOptions, window, ...restConfig } = config

  const { passive, capture, pointer } = { ...defaultEventOptions, ...eventOptions }

  return {
    ...restDefault,
    ...restConfig,
    window: window || defaultWindow,
    eventOptions: { passive: !config.domTarget || !!passive, capture: !!capture },
    captureString: capture ? 'Capture' : '',
    pointer: !!pointer,
  }
}

export const getDragConfig = (dragConfig?: Partial<DragConfig>): InternalDragConfig => {
  const config = { ...defaultDragConfig, ...dragConfig }
  let {
    threshold,
    swipeVelocity,
    swipeDistance,
    delay,
    filterClicks,
    axis,
    lockDirection,
    xBounds,
    yBounds,
    rubberband,
    ...restDrag
  } = config

  if (threshold === void 0) {
    threshold = Math.max(0, filterClicks ? 3 : 0, lockDirection || axis ? 1 : 0)
  } else {
    filterClicks = true
  }

  if (typeof rubberband === 'boolean') rubberband = DEFAULT_RUBBERBAND

  const thresholdArray = def.array(threshold) as Vector2

  return {
    ...restDrag,
    filterClicks: filterClicks || thresholdArray[0] + thresholdArray[1] > 0,
    axis,
    lockDirection,
    threshold: thresholdArray,
    swipeVelocity: def.array(swipeVelocity) as Vector2,
    swipeDistance: def.array(swipeDistance) as Vector2,
    bounds1: replaceWithInfinity(xBounds),
    bounds2: replaceWithInfinity(yBounds),
    rubberband: def.array(rubberband) as Vector2,
    delay: typeof delay === 'number' ? delay : delay ? DEFAULT_DRAG_DELAY : 0,
  }
}

const replaceWithInfinity = (array: Tuple<number | boolean>): Vector2 => array.map(v => (typeof v === 'boolean' ? Infinity : v)) as Vector2
