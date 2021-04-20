import { EventStore } from '../../EventStore'
import { ConfigMap } from '../../imports'
import { dragConfigResolver } from '../../config/drag'

ConfigMap.set('drag', dragConfigResolver)

export function DragEngine(ctrl) {
  this.ctrl = ctrl
  ctrl._eventStores.drag = new EventStore()
  if (!this.state) {
    this.state = {}
    this.state.offset = [0, 0]
    this.state.lastOffset = [0, 0]
    this.reset()
  }
}

DragEngine.prototype = {
  get state() {
    return this.ctrl.state.drag
  },
  set state(state) {
    this.ctrl.state.drag = state
  },
  get eventStore() {
    return this.ctrl._eventStores.drag
  },
  get config() {
    return this.ctrl._config.drag
  },
  reset() {
    this.state._pointerActive = false
    this.state._keyboardActive = false
    this.state._active = false
    this.state.active = false
    this.state.pointerId = undefined
    this.state.delta = [0, 0]
    this.state.movement = [0, 0]
    this.state.lastOffset = this.state.offset
  },
  merge(state) {
    Object.assign(this.ctrl.state.drag, state)
  },
  emit() {
    const state = this.state
    state.first = state._active && !state.active
    state.last = !state._active && state.active
    state.active = state._active
    this.ctrl._handlers.drag({ ...state })
  }
}

DragEngine.prototype.start = function () {
  if (!this.state._active) {
    this.reset()
    this.state._active = true
  }
}

DragEngine.prototype.end = function () {
  this.state._active = this.state._pointerActive || this.state._keyboardActive
}

DragEngine.prototype.getBindings = function () {
  const bindings = [
    [this.config.device, 'down', this.down.bind(this)],
    ['key', 'down', this.keydown.bind(this)],
    ['key', 'up', this.keyup.bind(this)]
  ]
  if (this.config.r3f) {
    bindings.push([this.config.device, 'move', this.move.bind(this)])
    bindings.push([this.config.device, 'up', this.up.bind(this)])
  }
  return bindings
}
