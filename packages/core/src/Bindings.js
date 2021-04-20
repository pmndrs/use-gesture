import { toReactHandlerProp } from './events'

export function noop() {}

function chainFns(...fns) {
  if (fns.length === 0) return noop
  if (fns.length === 1) return fns[0]

  return function () {
    let result
    for (const fn of fns) {
      result = fn.apply(this, arguments) || result
    }
    return result
  }
}

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
      props[handlerProp] = chainFns(...this._bindings[device][action])
    }
  }
  return props
}
