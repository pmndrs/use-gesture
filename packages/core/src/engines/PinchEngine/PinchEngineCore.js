import { Engine } from '../Engine'
import { ConfigResolverMap } from '../../imports'
import { pinchConfigResolver } from '../../config/pinchConfigResolver'

ConfigResolverMap.set('pinch', pinchConfigResolver)

export function PinchEngine(...args) {
  Engine.call(this, ...args, 'pinch')
}

PinchEngine.prototype = Object.create(Engine.prototype)

PinchEngine.prototype.bind = function (bindings) {
  const device = this.config.device

  bindings.add(device, 'start', this.touchStart.bind(this))
  bindings.add(device, 'change', this.touchMove.bind(this))
  bindings.add(device, 'end', this.touchEnd.bind(this))
}
