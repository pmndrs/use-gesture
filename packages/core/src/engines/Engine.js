import { call } from '../utils/fn'
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
  this.state._blocked = false
  this.state._force = false
  this.state._movement = [0, 0]
  this.state._intentional = [false, false]
  this.state._threshold = this.config.threshold
  this.state._bounds = [
    [-Infinity, Infinity],
    [-Infinity, Infinity]
  ]

  this.state.distance = [0, 0]
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
    this.state._from = call(this.config.from, this.state)
    this.state.lastOffset = this.state._from
    if (this.setup) this.setup(event)
  }
}

Engine.prototype.compute = function (event) {
  const state = this.state
  state.event = event

  const [_mx, _my] = state._movement
  const [_tx, _ty] = state._threshold
  let [_ix, _iy] = state._intentional

  if (_ix === false) _ix = Math.abs(_mx) >= _tx && Math.sign(_mx) * _tx
  if (_iy === false) _iy = Math.abs(_my) >= _ty && Math.sign(_my) * _ty

  state._blocked = _ix === false && _iy === false

  if (state._blocked) return

  state._intentional = [_ix, _iy]

  const mx = _ix !== false ? _mx - _ix : 0
  const my = _iy !== false ? _my - _iy : 0

  const movement = V.clamp([mx, my], state._bounds[0], state._bounds[1])

  state.delta = V.sub(movement, state.movement)
  state.movement = movement
  V.addTo(state.distance, state.delta.map(Math.abs))
  state.offset = V.add(state.lastOffset, state.movement)
  state.first = state._active && !state.active
  if (state.first) state.startTime = state.event.timeStamp

  state.elapsedTime = state.event.timeStamp - state.startTime
  state.last = !state._active && state.active
  state.active = state._active
}

Engine.prototype.emit = function () {
  const state = this.state

  if (state._blocked && !state._force) return

  this.handler({
    ...state,
    args: this.args
  })

  if (!state._active) this.clean()
}

Engine.prototype.clean = function () {
  this.eventStore.clean()
}
