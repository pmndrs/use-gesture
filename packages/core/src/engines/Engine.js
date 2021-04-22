import { V } from '../utils/maths'

export function Engine(ctrl, args, key) {
  this.ctrl = ctrl
  this.key = key
  this.args = args

  if (!this.state) {
    this.state = {}
    this.state.offset = [0, 0]
    this.state.lastOffset = [0, 0]
    this.reset()
  }
}

Engine.prototype = {
  get state() {
    return this.ctrl.state[this.key]
  },
  set state(state) {
    this.ctrl.state[this.key] = state
  },
  get eventStore() {
    return this.ctrl._gestureEventStores[this.key]
  },
  get config() {
    return this.ctrl._config[this.key]
  },
  get shared() {
    return this.ctrl._config.shared
  },
  get handler() {
    return this.ctrl._handlers[this.key]
  },
  merge(state) {
    Object.assign(this.ctrl.state[this.key], state)
  }
}

Engine.prototype.reset = function () {
  this.state._active = false
  this.state._movement = [0, 0]
  this.state._bounds = [
    [-Infinity, Infinity],
    [-Infinity, Infinity]
  ]

  this.state.active = false
  this.state.delta = [0, 0]
  this.state.movement = [0, 0]
  this.state.lastOffset = this.state.offset
}

Engine.prototype.start = function (event) {
  if (!this.state._active) {
    this.reset()
    this.state.event = event
    this.state._active = true
    if (this.setup) this.setup(event)
  }
}

Engine.prototype.emit = function () {
  const state = this.state

  const movement = V.clamp(state._movement, state._bounds[0], state._bounds[1])
  state.delta = V.sub(movement, state.movement)
  state.movement = movement
  state.offset = V.add(state.lastOffset, state.movement)

  state.first = state._active && !state.active
  state.last = !state._active && state.active
  state.active = state._active

  this.handler({
    ...state,
    args: this.args
  })

  if (!state._active) this.clean()
}

Engine.prototype.clean = function () {
  this.eventStore.clean()
}
