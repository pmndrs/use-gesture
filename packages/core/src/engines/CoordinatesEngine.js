import { Engine } from './Engine'

export function CoordinatesEngine(...args) {
  Engine.call(this, ...args)
}

CoordinatesEngine.prototype = Object.create(Engine.prototype)

CoordinatesEngine.prototype.intent = function (v) {
  const state = this.state

  if (!state.axis) {
    const axisMovementDifference = Math.abs(v[0]) - Math.abs(v[1])
    if (axisMovementDifference < 0) state.axis = 'y'
    else if (axisMovementDifference > 0) state.axis = 'x'
  }

  if (this.config.lockDirection) {
    if (state.axis === 'x') v[1] = 0
    else if (state.axis === 'y') v[0] = 0
  } else if (state.axis && this.config.axis) {
    if (state.axis !== this.config.axis) state._active = false
    else if (state.axis === 'x') v[1] = 0
    else if (state.axis === 'y') v[0] = 0
  }
}
