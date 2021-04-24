import { Bindings } from './Bindings'
import { EngineMap } from './imports'
import { parse } from './config/resolver'
import { Touches, isTouch } from './utils/events'
import { EventStore } from './EventStore'

export function Controller(handlers) {
  this._gestures = new Set()
  this._targetEventStore = new EventStore(this)
  this._gestureEventStores = {}
  this._handlers = {}
  this._config = {}
  this._pointerIds = new Set()
  this._touchIds = new Set()
  this.state = {}

  resolveGestures(this, handlers)
}

Controller.prototype.setupGesture = function (gestureKey) {
  this._gestures.add(gestureKey)
  this._gestureEventStores[gestureKey] = new EventStore(this)
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

Controller.prototype.applyConfig = function (config, gestureKey) {
  this._config = parse(config, gestureKey)
  console.log(this._config)
}

Controller.prototype.clean = function () {
  this._targetEventStore.clean()
  for (const key in this._gestureEventStores) {
    this._gestureEventStores[key].clean()
  }
}

Controller.prototype.effect = function () {
  if (this._config.shared.target) this.bind()
  return () => this._targetEventStore.clean()
}

Controller.prototype.bind = function (...args) {
  const bindings = new Bindings()
  const sharedConfig = this._config.shared
  const capture = sharedConfig.eventOptions.capture

  if (sharedConfig.enabled) {
    for (const gestureKey of this._gestures) {
      if (this._config[gestureKey].enabled) {
        const Engine = EngineMap.get(gestureKey)
        new Engine(this, args).bind(bindings)
      }
    }
  }

  if (sharedConfig.target) {
    // If config.target is set we add event listeners to it and return the clean function.
    bindings.bindToEventStore(this._targetEventStore, sharedConfig.target())
  } else {
    // If not, we return an object that contains gesture handlers mapped to react handler event keys.
    return bindings.toPropsHandlers(capture)
  }
}

function resolveGestures(ctrl, internalHandlers) {
  if (internalHandlers.drag) ctrl.setupGesture('drag')
  if (internalHandlers.wheel) ctrl.setupGesture('wheel')
  if (internalHandlers.scroll) ctrl.setupGesture('scroll')
  if (internalHandlers.move) ctrl.setupGesture('move')
  if (internalHandlers.pinch) ctrl.setupGesture('pinch')
  if (internalHandlers.hover) ctrl.setupGesture('hover')
}
