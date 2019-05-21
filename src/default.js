import { noop } from './utils'

export const defaultConfig = {
  domTarget: undefined,
  event: { passive: true, capture: false },
  pointerEvents: false,
  window: typeof window !== 'undefined' ? window : undefined,
  transform: { x: x => x, y: y => y },
  enabled: true,
  drag: true,
  pinch: true,
  scroll: true,
  wheel: true,
  hover: true,
  move: true
}

export const initialCommon = {
  event: undefined,
  values: [0, 0],
  velocities: [0, 0],
  delta: [0, 0],
  initial: [0, 0],
  previous: [0, 0],
  transform: undefined,
  local: [0, 0],
  lastLocal: [0, 0],
  first: false,
  last: false,
  active: false,
  time: undefined,
  temp: undefined,
  cancel: noop,
  canceled: false,
  args: undefined
}

const initialXY = { xy: [0, 0], vxvy: [0, 0], velocity: 0, distance: 0, direction: [0, 0] } // xy coordinates
const initialDA = { da: [0, 0], vdva: [0, 0], origin: undefined, turns: 0 } // distance and angle

export const initialState = {
  shared: {
    hovering: undefined,
    scrolling: undefined,
    dragging: undefined,
    moving: undefined,
    pinching: undefined,
    touches: undefined,
    buttons: undefined,
    down: undefined,
    shiftKey: undefined,
    altKey: undefined,
    metaKey: undefined,
    ctrlKey: undefined
  },
  move: { ...initialCommon, ...initialXY },
  drag: { ...initialCommon, ...initialXY },
  scroll: { ...initialCommon, ...initialXY },
  wheel: { ...initialCommon, ...initialXY },
  pinch: { ...initialCommon, ...initialDA }
}

export const genericEndState = { first: false, last: true, active: false }
