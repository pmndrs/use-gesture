import { noop } from './utils'
import { CommonGestureState, Coordinates, State, DistanceAngle, Vector2, DragState } from '../types'

function getInitial<T>(mixed: T): T & CommonGestureState {
  return {
    _active: false,
    _blocked: false,
    _intentional: [false, false],
    _movement: [0, 0],
    _initial: [0, 0],
    _bounds: [
      [-Infinity, Infinity],
      [-Infinity, Infinity],
    ],
    _lastEventType: undefined,
    event: undefined,
    target: undefined,
    pointerId: undefined,
    intentional: false,
    values: [0, 0],
    velocities: [0, 0],
    delta: [0, 0],
    movement: [0, 0],
    offset: [0, 0],
    lastOffset: [0, 0],
    direction: [0, 0],
    initial: [0, 0],
    previous: [0, 0],
    first: false,
    last: false,
    active: false,
    timeStamp: 0,
    startTime: 0,
    elapsedTime: 0,
    cancel: noop,
    canceled: false,
    memo: undefined,
    args: undefined,
    ...mixed,
  }
}

export function getInitialState(): State {
  const shared = {
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
  }

  const drag = getInitial<DragState & Coordinates>({
    axis: undefined,
    xy: [0, 0] as Vector2,
    vxvy: [0, 0] as Vector2,
    velocity: 0,
    distance: 0,
    _isTap: true,
    _delayedEvent: false,
    tap: false,
    swipe: [0, 0],
  })

  const pinch = getInitial<DistanceAngle>({
    da: [0, 0] as Vector2,
    vdva: [0, 0] as Vector2,
    // @ts-ignore origin can never be passed as undefined in userland
    origin: undefined,
    turns: 0,
  })

  const wheel = getInitial<Coordinates>({
    axis: undefined,
    xy: [0, 0] as Vector2,
    vxvy: [0, 0] as Vector2,
    velocity: 0,
    distance: 0,
  })

  const move = getInitial<Coordinates>({
    axis: undefined,
    xy: [0, 0] as Vector2,
    vxvy: [0, 0] as Vector2,
    velocity: 0,
    distance: 0,
  })

  const scroll = getInitial<Coordinates>({
    axis: undefined,
    xy: [0, 0] as Vector2,
    vxvy: [0, 0] as Vector2,
    velocity: 0,
    distance: 0,
  })

  return { shared, drag, pinch, wheel, move, scroll }
}
