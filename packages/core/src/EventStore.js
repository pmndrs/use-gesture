import { toDomHandlerProp } from './events'

export function EventStore() {
  this.listeners = []
}

EventStore.prototype.add = function (element, device, action, handler, config) {
  const type = toDomHandlerProp(device, action)

  element.addEventListener(type, handler, config)
  this.listeners.push(() => element.removeEventListener(type, handler, config))
}

EventStore.prototype.clean = function () {
  this.listeners.forEach((remove) => remove())
  this.listeners = []
}
