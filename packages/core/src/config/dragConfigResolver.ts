import { DragConfig, InternalDragOptions, Vector2 } from '../types'
import { V } from '../utils/maths'
import { coordinatesConfigResolver } from './coordinatesConfigResolver'
import { SUPPORT } from './support'

export const DEFAULT_PREVENT_SCROLL_DELAY = 250
export const DEFAULT_DRAG_DELAY = 180
export const DEFAULT_SWIPE_VELOCITY = 0.5
export const DEFAULT_SWIPE_DISTANCE = 50
export const DEFAULT_SWIPE_DURATION = 250

export const dragConfigResolver = {
  ...coordinatesConfigResolver,
  pointerLock(
    this: InternalDragOptions,
    _v: any,
    _k: string,
    { pointer: { lock = false, touch = false } = {} }: DragConfig
  ) {
    this.useTouch = touch && SUPPORT.touch
    return lock && SUPPORT.pointerLock
  },
  device(this: InternalDragOptions, _v: any, _k: string) {
    if (this.useTouch) return 'touch'
    if (this.pointerLock) return 'mouse'
    if (SUPPORT.pointer) return 'pointer'
    if (SUPPORT.touch) return 'touch'
    return 'mouse'
  },
  preventScroll(
    this: InternalDragOptions,
    value: number | boolean = false,
    _k: string,
    { preventScrollAxis = 'y' }: DragConfig
  ) {
    if (preventScrollAxis) this.preventScrollAxis = preventScrollAxis
    if (!SUPPORT.touchscreen) return false
    if (typeof value === 'number') return value
    return value ? DEFAULT_PREVENT_SCROLL_DELAY : false
  },
  pointerCapture(this: InternalDragOptions, _v: any, _k: string, { pointer: { capture = true, buttons = 1 } = {} }) {
    this.pointerButtons = buttons
    return !this.pointerLock && this.device === 'pointer' && capture
  },
  threshold(
    this: InternalDragOptions,
    value: number | Vector2,
    _k: string,
    { filterTaps = false, tapsThreshold = 3, axis = undefined }
  ) {
    // TODO add warning when value is 0 and filterTaps or axis is set
    const threshold = V.toVector(value, filterTaps ? tapsThreshold : axis ? 1 : 0)
    this.filterTaps = filterTaps
    this.tapsThreshold = tapsThreshold
    return threshold
  },
  swipe(
    this: InternalDragOptions,
    { velocity = DEFAULT_SWIPE_VELOCITY, distance = DEFAULT_SWIPE_DISTANCE, duration = DEFAULT_SWIPE_DURATION } = {}
  ) {
    return {
      velocity: this.transform(V.toVector(velocity)),
      distance: this.transform(V.toVector(distance)),
      duration
    }
  },
  delay(value: number | boolean = 0) {
    switch (value) {
      case true:
        return DEFAULT_DRAG_DELAY
      case false:
        return 0
      default:
        return value
    }
  }
}

if (process.env.NODE_ENV === 'development') {
  Object.assign(dragConfigResolver, {
    useTouch(value: any) {
      if (value !== undefined) {
        throw Error(
          `[@use-gesture]: \`useTouch\` option has been renamed to \`pointer.touch\`. Use it as in \`{ pointer: { touch: true } }\`.`
        )
      }
      return NaN
    },
    experimental_preventWindowScrollY(value: any) {
      if (value !== undefined) {
        throw Error(
          `[@use-gesture]: \`experimental_preventWindowScrollY\` option has been renamed to \`preventScroll\`.`
        )
      }
      return NaN
    },
    swipeVelocity(value: any) {
      if (value !== undefined) {
        throw Error(
          `[@use-gesture]: \`swipeVelocity\` option has been renamed to \`swipe.velocity\`. Use it as in \`{ swipe: { velocity: 0.5 } }\`.`
        )
      }
      return NaN
    },
    swipeDistance(value: any) {
      if (value !== undefined) {
        throw Error(
          `[@use-gesture]: \`swipeDistance\` option has been renamed to \`swipe.distance\`. Use it as in \`{ swipe: { distance: 50 } }\`.`
        )
      }
      return NaN
    },
    swipeDuration(value: any) {
      if (value !== undefined) {
        throw Error(
          `[@use-gesture]: \`swipeDuration\` option has been renamed to \`swipe.duration\`. Use it as in \`{ swipe: { duration: 250 } }\`.`
        )
      }
      return NaN
    }
  })
}
