import { toReactHandlerProp } from './utils/events'
import { chain } from './utils/fn'

export function Bindings() {
  this._bindings = {}
}

Bindings.prototype.add = function ([device, action, handler]) {
  this._bindings[device] = this._bindings[device] ?? {}
  this._bindings[device][action] = this._bindings[device][action] ?? []
  this._bindings[device][action].push(handler)
}

Bindings.prototype.addAll = function (bindings) {
  bindings.forEach((binding) => this.add(binding))
}

Bindings.prototype.toPropsHandlers = function () {
  const props = {}
  for (const device in this._bindings) {
    for (const action in this._bindings[device]) {
      const handlerProp = toReactHandlerProp(device, action)
      props[handlerProp] = chain(...this._bindings[device][action])
    }
  }
  return props
}
