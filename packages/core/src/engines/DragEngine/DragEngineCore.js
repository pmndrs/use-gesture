import { Engine } from '../Engine'
import { ConfigResolverMap } from '../../imports'
import { dragConfigResolver } from '../../config/dragConfigResolver'
import { call } from '../../utils/fn'

ConfigResolverMap.set('drag', dragConfigResolver)

export function DragEngine(...args) {
  Engine.call(this, ...args, 'drag')
}

DragEngine.prototype = Object.create(Engine.prototype)

// super seeds generic Engine reset call
DragEngine.prototype.reset = function () {
  Engine.prototype.reset.call(this)
  this.state._pointerId = undefined
  this.state._pointerActive = false
  this.state._keyboardActive = false
}

DragEngine.prototype.setup = function (event) {
  let bounds = call(this.config.bounds, this.state)

  if (bounds instanceof HTMLElement) {
    const boundRect = bounds.getBoundingClientRect()
    const targetRect = event.currentTarget.getBoundingClientRect()
    bounds = {
      left: boundRect.left - targetRect.left,
      right: boundRect.right - targetRect.right,
      top: boundRect.top - targetRect.top,
      bottom: boundRect.bottom - targetRect.bottom
    }
  }
  this.state._bounds = dragConfigResolver.bounds(bounds)
}

DragEngine.prototype.end = function () {
  this.state._active = this.state._pointerActive || this.state._keyboardActive
}

DragEngine.prototype.bind = function (bindings) {
  const device = this.config.device

  bindings.add(device, 'start', this.pointerDown.bind(this))
  bindings.add('key', 'down', this.keyDown.bind(this))
  bindings.add('key', 'up', this.keyUp.bind(this))

  if (this.config.r3f) {
    bindings.add(device, 'change', this.pointerMove.bind(this))
    bindings.add(device, 'end', this.pointerUp.bind(this))
  }
}
