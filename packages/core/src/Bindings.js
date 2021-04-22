import { toReactHandlerProp } from './utils/events'
import { chain } from './utils/fn'

export function Bindings() {
  this._bindings = {}
}

Bindings.prototype.add = function (device, action, handler) {
  this._bindings[device] = this._bindings[device] ?? {}
  this._bindings[device][action] = this._bindings[device][action] ?? []
  this._bindings[device][action].push(handler)
}

Bindings.prototype.toPropsHandlers = function (capture) {
  const props = {}
  for (const device in this._bindings) {
    for (const action in this._bindings[device]) {
      const handlerProp = toReactHandlerProp(device, action, capture)
      props[handlerProp] = chain(...this._bindings[device][action])
    }
  }
  return props
}

Bindings.prototype.bindToEventStore = function (eventStore, target) {
  for (const device in this._bindings) {
    for (const action in this._bindings[device]) {
      eventStore.add(target, device, action, chain(...this._bindings[device][action]))
    }
  }
}
