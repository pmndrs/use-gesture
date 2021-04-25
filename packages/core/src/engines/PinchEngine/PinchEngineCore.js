import { Engine } from '../Engine'
import { ConfigResolverMap } from '../../imports'
import { pinchConfigResolver } from '../../config/pinchConfigResolver'

ConfigResolverMap.set('pinch', pinchConfigResolver)

export function PinchEngine(...args) {
  Engine.call(this, ...args, 'pinch')
  this.ingKey = 'pinching'
}

PinchEngine.prototype = Object.create(Engine.prototype)

PinchEngine.prototype.bind = function (bindFunction) {
  const device = this.config.device

  bindFunction(device, 'start', this.touchStart.bind(this))
  bindFunction(device, 'change', this.touchMove.bind(this))
  bindFunction(device, 'end', this.touchEnd.bind(this))
}
