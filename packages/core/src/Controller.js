import { Bindings } from './Bindings'
import { EngineMap, ConfigMap } from './imports'
import { resolveWith } from './config/resolver'
import { Touches, isTouch } from './utils/events'

export function Controller(handlers) {
  this._classes = resolveClasses(handlers)
  this._eventStores = {}
  this._handlers = {}
  this._config = {}
  this._pointerIds = new Set()
  this._touchIds = new Set()

  this.state = {}
}

Controller.prototype.setEventIds = function (event) {
  if (isTouch(event)) {
    this._touchIds = new Set(Touches.ids(event))
  } else if ('pointerId' in event) {
    if (event.type === 'pointerup') this._pointerIds.delete(event.pointerId)
    else this._pointerIds.add(event.pointerId)
  }
}

Controller.prototype.applyHandlers = function (handlers) {
  this._handlers = handlers
}

Controller.prototype.applyConfig = function (config) {
  for (const key in config) {
    const resolver = ConfigMap.get(key)
    this._config[key] = resolveWith(config[key], resolver)
  }
}

Controller.prototype.bind = function () {
  const bindings = new Bindings()
  for (const Engine of this._classes) new Engine(this).bind(bindings)
  return bindings.toPropsHandlers()
}

function resolveClasses(internalHandlers) {
  const classes = new Set()

  if (internalHandlers.drag) classes.add(EngineMap.get('drag'))
  if (internalHandlers.wheel) classes.add(EngineMap.get('wheel'))
  if (internalHandlers.scroll) classes.add(EngineMap.get('scroll'))
  if (internalHandlers.move) classes.add(EngineMap.get('move'))
  if (internalHandlers.pinch) classes.add(EngineMap.get('pinch'))
  if (internalHandlers.hover) classes.add(EngineMap.get('hover'))

  return classes
}
