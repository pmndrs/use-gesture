import { Engine } from '../Engine'
import { ConfigResolverMap } from '../../imports'
import { pinchConfigResolver } from '../../config/pinchConfigResolver'

ConfigResolverMap.set('pinch', pinchConfigResolver)

export function PinchEngine(...args) {
  Engine.call(this, ...args, 'pinch')
  this.ingKey = 'pinching'
  this.state.offset = [1, 0]
  this.state.lastOffset = [1, 0]
}

PinchEngine.prototype = Object.create(Engine.prototype)

PinchEngine.prototype.computeOffset = function () {
  const state = this.state
  state.offset = [(1 + state.movement[0]) * state.lastOffset[0], state.movement[1] + state.lastOffset[1]]
}

PinchEngine.prototype.bind = function (bindFunction) {
  const device = this.config.device

  bindFunction(device, 'start', this.touchStart.bind(this))
  bindFunction(device, 'change', this.touchMove.bind(this))
  bindFunction(device, 'end', this.touchEnd.bind(this))
}
