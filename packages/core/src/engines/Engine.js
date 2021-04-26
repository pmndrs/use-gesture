import { call } from '../utils/fn'
import { V, rubberbandIfOutOfBounds } from '../utils/maths'

export function Engine(ctrl, args, key) {
  this.ctrl = ctrl
  this.key = key
  this.args = args

  if (!this.state) {
    this.state = {}
    this.reset()
    if (this.init) this.init()
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
  get timeoutStore() {
    return this.ctrl._gestureTimeoutStores[this.key]
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
  state._active = state.active = state._blocked = state._force = false
  state._step = [false, false]
  state._intentional = false
  state._movement = [0, 0]
  state._threshold = this.config.threshold
  state.memo = state.axis = undefined
  state.direction = [0, 0]
  state.distance = [0, 0]
  state.velocity = [0, 0]
  state.movement = [0, 0]
  state.delta = [0, 0]
  state.timeStamp = 0
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
    state._bounds = call(this.config.bounds, state)
    if (this.setup) this.setup(event)
  }
}

Engine.prototype.compute = function (event) {
  const state = this.state
  const shared = this.shared

  const [_m0, _m1] = state._movement
  const [_t0, _t1] = state._threshold
  let [_s0, _s1] = state._step

  if (_s0 === false) _s0 = Math.abs(_m0) >= _t0 && Math.sign(_m0) * _t0
  if (_s1 === false) _s1 = Math.abs(_m1) >= _t1 && Math.sign(_m1) * _t1

  state._intentional = _s0 !== false || _s1 !== false

  if (!state._intentional) return

  state.first = state._active && !state.active
  state.last = !state._active && state.active
  state.active = shared[this.ingKey] = state._active

  // it is possible that this function is run by cancel with no event. If so,
  // no need to calculate kinematics and other stuff.
  if (event && state.event !== event) {
    state.event = event
    const dt = event.timeStamp - state.timeStamp
    state.timeStamp = event.timeStamp

    if (state.first) state.startTime = state.timeStamp
    state.elapsedTime = state.timeStamp - state.startTime

    // calculate velocity if time delta is strictly positive
    if (!state.first && !state.last && dt > 0) {
      state._step = [_s0, _s1]

      const movement = [0, 0]

      movement[0] = _s0 !== false ? _m0 - _s0 : 0
      movement[1] = _s1 !== false ? _m1 - _s1 : 0

      if (this.intent) this.intent(movement)

      if (state._active && !state._blocked) {
        state.delta = V.sub(movement, state.movement)
        state.movement = movement

        const absoluteDelta = state.delta.map(Math.abs)

        V.addTo(state.distance, absoluteDelta)
        this.computeOffset()

        state.direction = state.delta.map(Math.sign)
        state.velocity = [absoluteDelta[0] / dt, absoluteDelta[1] / dt]
      }
    }

    const rubberband = state._active ? this.config.rubberband : [0, 0]
    state.offset = computeRubberband(state._bounds, state.offset, rubberband)
  }
}

Engine.prototype.emit = function () {
  const state = this.state
  const shared = this.shared

  if (!state._active) this.clean()

  if ((state._blocked || !state._intentional) && !state._force) return

  const memo = this.handler({
    ...shared,
    ...state,
    args: this.args
  })

  // Sets memo to the returned value of the handler (unless it's  undefined)
  if (memo !== undefined) state.memo = memo
}

Engine.prototype.clean = function () {
  this.eventStore.clean()
}

function computeRubberband(bounds, [Vx, Vy], [Rx, Ry]) {
  const [[X0, X1], [Y0, Y1]] = bounds
  return [rubberbandIfOutOfBounds(Vx, X0, X1, Rx), rubberbandIfOutOfBounds(Vy, Y0, Y1, Ry)]
}
