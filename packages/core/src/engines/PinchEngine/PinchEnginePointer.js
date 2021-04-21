import { PinchEngine } from './PinchEngineCore'
import { Touches } from '../../utils/events'

PinchEngine.prototype.touchStart = function (event) {
  this.ctrl.setEventIds(event)

  if (this.state._active) return

  if (this.ctrl._touchIds.size < 2) return

  this.start(event)
  this.state._touchIds = Array.from(this.ctrl._touchIds).slice(0, 2)
  const payload = Touches.distanceAngle(event, this.state._touchIds)

  this.state.origin = payload.origin
  this.state.values = [payload.distance, payload.angle]
  this.state.initial = this.state.values
  this.state.turns = 0

  this.emit()
}

PinchEngine.prototype.touchMove = function (event) {
  if (!this.state._active) return

  const state = this.state

  const payload = Touches.distanceAngle(event, state._touchIds)

  const prev_a = state.values[1]
  const delta_a = payload.angle - prev_a
  let next_turns = state.turns
  if (Math.abs(delta_a) > 270) next_turns += Math.sign(delta_a)

  state.values = [payload.distance, payload.angle - 360 * next_turns]
  state.origin = payload.origin
  state._movement = [state.values[0] / state.initial[0] - 1, state.values[1] - state.initial[1]]

  this.emit()
}

PinchEngine.prototype.touchEnd = function (event) {
  this.ctrl.setEventIds(event)
  if (!this.state._active) return

  if (this.state._touchIds.some((id) => !this.ctrl._touchIds.has(id))) {
    this.state._active = false
    this.emit()
  }
}
