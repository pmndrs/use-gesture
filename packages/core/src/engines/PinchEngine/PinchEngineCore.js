import { Engine } from '../Engine'
import { ConfigMap } from '../../imports'
import { pinchConfigResolver } from '../../config/pinch'

ConfigMap.set('pinch', pinchConfigResolver)

export function PinchEngine(ctrl) {
  Engine.call(this, ctrl, 'pinch')
  this.configResolver = pinchConfigResolver
}

PinchEngine.prototype = Object.create(Engine.prototype)

PinchEngine.prototype.end = function () {
  this.state._active = false
}

PinchEngine.prototype.bind = function (bindings) {
  const device = this.config.device

  bindings.add(device, 'start', this.touchStart.bind(this))
  bindings.add(device, 'change', this.touchMove.bind(this))
  bindings.add(device, 'end', this.touchEnd.bind(this))
}
