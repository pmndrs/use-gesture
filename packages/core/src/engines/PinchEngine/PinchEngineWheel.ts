import { PinchEngine } from './PinchEngineCore'
import { Wheel } from '../../utils/events'
import { V } from '../../utils/maths'

const PINCH_WHEEL_RATIO = 60

PinchEngine.prototype.wheel = function (event) {
  if (!event.ctrlKey) return
  if (!this.state._active) this.wheelStart(event)
  else this.wheelChange(event)
  this.timeoutStore.add('wheelEnd', this.wheelEnd.bind(this))
} as PinchEngine['wheel']

PinchEngine.prototype.wheelStart = function (event) {
  if (event.cancelable) event.preventDefault()
  else if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn(
      `[@use-gesture]: To properly support zoom on trackpads, try using the \`target\` option and \`config.eventOptions.passive\` set to \`false\`. This message will only appear in development mode.`,
      event.currentTarget
    )
  }
  this.start(event)
  this.wheelChange(event)
} as PinchEngine['wheelStart']

PinchEngine.prototype.wheelChange = function (event) {
  if (event.cancelable) event.preventDefault()
  const state = this.state
  state._delta = [-Wheel.values(event)[1] / PINCH_WHEEL_RATIO, 0]
  V.addTo(state._movement, state._delta)

  this.state.origin = [event.clientX, event.clientY]

  this.compute(event)
  this.emit()
} as PinchEngine['wheelChange']

PinchEngine.prototype.wheelEnd = function () {
  if (!this.state._active) return
  this.state._active = false
  this.compute()
  this.emit()
} as PinchEngine['wheelEnd']
