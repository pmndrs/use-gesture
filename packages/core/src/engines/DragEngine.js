import { EventStore } from '../EventStore'
import { VectorHelper } from '../utils'
import { ConfigMap } from '../imports'
import { dragConfigResolver } from '../config/drag'
import { PointerHelper } from '../events'

ConfigMap.set('drag', dragConfigResolver)

function resetDragState() {
  return {
    _active: false,
    active: false,
    pointerId: undefined,
    delta: [0, 0],
    movement: [0, 0]
  }
}

function initialDragState() {
  return {
    ...resetDragState(),
    offset: [0, 0],
    lastOffset: [0, 0]
  }
}

export function DragEngine(ctrl) {
  this.ctrl = ctrl
  ctrl._eventStores.drag = new EventStore()
  this.state = initialDragState()
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

DragEngine.prototype.setup = function (event) {
  let device = this.config.device

  if (this.config.lock) {
    event.target.requestPointerLock()
  }
  if (device === 'touch' || this.config.capture) {
    if (this.config.capture) {
      event.target.setPointerCapture(event.pointerId)
    }
    if (!this.config.r3f) {
      if (document.pointerLockElement === event.target) device = 'mouse'
      this.eventStore.add(event.target, device, 'move', this.move.bind(this))
      this.eventStore.add(event.target, device, 'up', this.up.bind(this))
    }
  } else {
    if (!this.config.r3f) {
      this.eventStore.add(window, device, 'move', this.move.bind(this))
      this.eventStore.add(window, device, 'up', this.up.bind(this))
    }
  }
}

DragEngine.prototype.down = function (event) {
  const state = resetDragState()
  state.event = event
  state.pointerId = PointerHelper.id(event)
  state.values = PointerHelper.values(event)
  state.initial = state.values
  state.lastOffset = this.state.offset
  state._active = true

  this.setup(event)
  this.merge(state)

  this.emit()
}

DragEngine.prototype.move = function (event) {
  if (!this.state._active) return

  const id = PointerHelper.id(event)
  if (this.state.pointerId && id !== this.state.pointerId) return

  const state = {}
  state.event = event

  if (document.pointerLockElement === event.target) {
    state.movement = VectorHelper.add([event.movementX, event.movementY], this.state.movement)
  } else {
    state.values = PointerHelper.values(event)
    state.movement = VectorHelper.sub(state.values, this.state.initial)
  }
  state.offset = VectorHelper.add(this.state.lastOffset, state.movement)
  this.merge(state)
  this.emit()
}

DragEngine.prototype.up = function (event) {
  if (!this.state._active) return

  const id = PointerHelper.id(event)
  if (this.state.pointerId && id !== this.state.pointerId) return

  this.state.event = event
  this.state._active = false
  this.clean(event)
  this.emit()
}

DragEngine.prototype.clean = function (event) {
  if (this.config.lock && document.pointerLockElement === event.target) {
    document.exitPointerLock()
  }
  if (this.config.capture && (this.config.r3f || event.target.hasPointerCapture(event.pointerId))) {
    event.target.releasePointerCapture(event.pointerId)
  }
  this.eventStore.clean()
}

DragEngine.prototype.getBindings = function () {
  const bindings = [[this.config.device, 'down', this.down.bind(this)]]
  if (this.config.r3f) {
    bindings.push([this.config.device, 'move', this.move.bind(this)])
    bindings.push([this.config.device, 'up', this.up.bind(this)])
  }
  return bindings
}
