import { commonConfigResolver } from './commonConfigResolver'

export const DEFAULT_TAP_TIMEOUT = 180
export const DEFAULT_LONG_PRESS_TIMEOUT = 0
export const DEFAULT_TAP_MOVE_THRESHOLD = 10

export const tapConfigResolver = {
  ...commonConfigResolver,
  // CoordinatesEngine compatibility - tap doesn't use axis locking
  axis(_value?: undefined): undefined {
    return undefined
  },
  axisThreshold(_value = 0) {
    return 0
  },
  lockDirection(_value = false) {
    return false
  },
  tapDiscrimination(value = false) {
    return value
  },
  tapTimeout(value = DEFAULT_TAP_TIMEOUT) {
    return value
  },
  longPressTimeout(value = DEFAULT_LONG_PRESS_TIMEOUT) {
    return value
  },
  moveThreshold(value = DEFAULT_TAP_MOVE_THRESHOLD) {
    return value
  },
  mouseOnly(value = true) {
    return value
  },
  pointerButtons(value: number | number[] | -1 = 1) {
    return value
  },
  pointerCapture(value = true) {
    return value
  }
}
