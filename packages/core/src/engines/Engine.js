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
  const state = this.state
  state._active = false
  state._blocked = false
  state._force = false
  state._movement = [0, 0]
  state._intentional = [false, false]
  state._threshold = this.config.threshold
  state._bounds = [
    [-Infinity, Infinity],
    [-Infinity, Infinity]
  ]

  state.active = false
  state.memo = undefined
  state.direction = [0, 0]
  state.distance = [0, 0]
  state.velocity = [0, 0]
  state.delta = [0, 0]
  state.movement = [0, 0]
  state.timeStamp = 0
  state.lastOffset = state.offset
}

Engine.prototype.start = function (event) {
  const state = this.state
  if (!state._active) {
    this.reset()
    state.event = event
    state._active = true
    state.lastOffset = this.config.from ? call(this.config.from, state) : state.offset
    state.offset = state.lastOffset
    state.timeStamp = event.timeStamp
    if (this.setup) this.setup(event)
  }
}

Engine.prototype.compute = function (event) {
  const state = this.state
  const shared = this.shared

  const [_mx, _my] = state._movement
  const [_tx, _ty] = state._threshold
  let [_ix, _iy] = state._intentional

  if (_ix === false) _ix = Math.abs(_mx) >= _tx && Math.sign(_mx) * _tx
  if (_iy === false) _iy = Math.abs(_my) >= _ty && Math.sign(_my) * _ty

  state._blocked = _ix === false && _iy === false

  if (state._blocked) return

  state.first = state._active && !state.active
  state.last = !state._active && state.active
  state.active = shared[this.ingKey] = state._active

  // it is possible that this function is run by cancel with no event. If so,
  // no need to calculate kinematics and other stuff.
  if (!event || state.event === event) return

  state.event = event
  const dt = event.timeStamp - state.timeStamp
  state.timeStamp = event.timeStamp

  if (state.first) state.startTime = state.timeStamp
  state.elapsedTime = state.timeStamp - state.startTime

  // calculate velocity if time delta is strictly positive
  if (!state.first && !state.last && dt > 0) {
    state._intentional = [_ix, _iy]

    const mx = _ix !== false ? _mx - _ix : 0
    const my = _iy !== false ? _my - _iy : 0

    const movement = V.clamp([mx, my], state._bounds[0], state._bounds[1])

    state.delta = V.sub(movement, state.movement)
    state.movement = movement

    const absoluteDelta = state.delta.map(Math.abs)

    V.addTo(state.distance, absoluteDelta)
    state.offset = V.add(state.lastOffset, state.movement)
    state.direction = state.delta.map(Math.sign)
    state.velocity = [absoluteDelta[0] / dt, absoluteDelta[1] / dt]
  }
}

Engine.prototype.emit = function () {
  const state = this.state
  const shared = this.shared

  if (state._blocked && !state._force) return

  const memo = this.handler({
    ...shared,
    ...state,
    args: this.args
  })

  // Sets memo to the returned value of the handler (unless it's  undefined)
  if (memo !== undefined) state.memo = memo

  if (!state._active) {
    this.clean()
  }
}

Engine.prototype.clean = function () {
  this.eventStore.clean()
}
