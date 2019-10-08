import { noop } from './utils'
import { GestureConfig, HandlerKey, CommonGestureState, Coordinates, DistanceAngle, StateObject, StateKey, GestureKey } from './types'

type MappedKeys = { [K in GestureKey]: { stateKey: StateKey; handlerKey: HandlerKey } }

/**
 * Some gestures might use the state key from another gesture (i.e. hover)
 * so mappedKeys is a commodity object to get the state key and handler key
 * for every gesture
 */
export const mappedKeys: MappedKeys = {
  drag: { stateKey: 'drag', handlerKey: 'onDrag' },
  pinch: { stateKey: 'pinch', handlerKey: 'onPinch' },
  move: { stateKey: 'move', handlerKey: 'onMove' },
  scroll: { stateKey: 'scroll', handlerKey: 'onScroll' },
  wheel: { stateKey: 'wheel', handlerKey: 'onWheel' },
  hover: { stateKey: 'move', handlerKey: 'onHover' },
}

// default config (will extend user config)
export const defaultConfig: GestureConfig = {
  domTarget: undefined,
  event: { passive: true, capture: false },
  window: typeof window !== 'undefined' ? window : undefined,
  dragDelay: false,
  passiveEvents: true,
  pointerEvents: false,
  enabled: true,
  drag: true,
  pinch: true,
  scroll: true,
  wheel: true,
  hover: true,
  move: true,
}

// common initial state for all gestures
export const initialCommon: CommonGestureState = {
  event: undefined,
  currentTarget: undefined,
  pointerId: undefined,
  delta: [0, 0],
  movement: [0, 0],
  offset: [0, 0],
  direction: [0, 0],
  initial: [0, 0],
  previous: [0, 0],
  first: false,
  last: false,
  active: false,
  time: undefined,
  cancel: noop,
  canceled: false,
  memo: undefined,
  args: undefined,
}

// initial state for coordinates-based gestures
const initialCoordinates: Coordinates = { xy: [0, 0], vxvy: [0, 0], velocity: 0, distance: 0 } // xy coordinates

// initial state for distance and angle-based gestures (pinch)
const initialDistanceAngle: DistanceAngle = { da: [0, 0], vdva: [0, 0], origin: undefined, turns: 0 } // distance and angle

// initial state object (used by the gesture controller)
export const initialState: StateObject = {
  shared: {
    hovering: false,
    scrolling: false,
    wheeling: false,
    dragging: false,
    moving: false,
    pinching: false,
    touches: 0,
    buttons: 0,
    down: false,
    shiftKey: false,
    altKey: false,
    metaKey: false,
    ctrlKey: false,
  },
  move: { ...initialCommon, ...initialCoordinates },
  drag: { ...initialCommon, ...initialCoordinates },
  scroll: { ...initialCommon, ...initialCoordinates },
  wheel: { ...initialCommon, ...initialCoordinates },
  pinch: { ...initialCommon, ...initialDistanceAngle },
}

// generic end state for all gestures
export const genericEndState: Partial<CommonGestureState> = { first: false, last: true, active: false }
