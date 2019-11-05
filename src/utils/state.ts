import { noop } from './utils'
import { CommonGestureState, Coordinates, StateObject } from '../types'

// common initial state for all gestures
export const initialCommon: CommonGestureState = {
  event: undefined,
  currentTarget: undefined,
  pointerId: undefined,
  values: [0, 0],
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
// const initialDistanceAngle: DistanceAngle = { da: [0, 0], vdva: [0, 0], origin: undefined, turns: 0 } // distance and angle

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
  drag: { ...initialCommon, ...initialCoordinates, click: false, swipe: [0, 0] },
  // move: { ...initialCommon, ...initialCoordinates },
  // scroll: { ...initialCommon, ...initialCoordinates },
  // wheel: { ...initialCommon, ...initialCoordinates },
  // pinch: { ...initialCommon, ...initialDistanceAngle },
}
