import { Engine } from './Engine'
import { ConfigResolverMap } from '../imports'
import { pinchConfigResolver } from '../config/pinchConfigResolver'
import { Touches, Wheel, distanceAngle } from '../utils/events'
import { V } from '../utils/maths'
import { Vector2, WebKitGestureEvent } from '../types'

ConfigResolverMap.set('pinch', pinchConfigResolver)

const SCALE_ANGLE_RATIO_INTENT_DEG = 30
const SCALE_ANGLE_RATIO_INTENT_RAD = (SCALE_ANGLE_RATIO_INTENT_DEG / 180) * Math.PI
const PINCH_WHEEL_RATIO = 60

export class PinchEngine extends Engine<'pinch'> {
  readonly ingKey = 'pinching' as const

  init() {
    this.state.offset = [1, 0]
    this.state.lastOffset = [1, 0]
    this.state._pointerEvents = new Map()
  }

  // superseeds generic Engine reset call
  reset() {
    super.reset()
    const state = this.state
    state._touchIds = []
    state.canceled = false
    state.cancel = this.cancel.bind(this)
    state.turns = 0
  }

  computeOffset() {
    const { movement, lastOffset } = this.state
    this.state.offset = [(1 + movement[0]) * lastOffset[0], movement[1] + lastOffset[1]]
  }

  computeMovement() {
    const { offset, lastOffset } = this.state
    this.state.movement = [offset[0] / lastOffset[0] - 1, offset[1] - lastOffset[1]]
    // let's take profit from this function to set `values` alias to `xy`
    this.state.da = this.state.values
  }

  intent(v: Vector2) {
    const state = this.state
    if (!state.axis) {
      const angleScaleRatio = this.config.useRad ? SCALE_ANGLE_RATIO_INTENT_RAD : SCALE_ANGLE_RATIO_INTENT_DEG
      const axisMovementDifference = Math.abs(v[0]) * angleScaleRatio - Math.abs(v[1])
      if (axisMovementDifference < 0) state.axis = 'angle'
      else if (axisMovementDifference > 0) state.axis = 'scale'
    }

    if (this.config.lockDirection) {
      if (state.axis === 'scale') v[1] = 0
      else if (state.axis === 'angle') v[0] = 0
    }
  }

  cancel() {
    const state = this.state
    if (state.canceled) return
    setTimeout(() => {
      state.canceled = true
      state._active = false
      // we run compute with no event so that kinematics won't be computed
      this.compute()
      this.emit()
    }, 0)
  }

  touchStart(event: TouchEvent) {
    this.ctrl.setEventIds(event)
    const state = this.state
    const ctrlTouchIds = this.ctrl.touchIds

    if (state._active) {
      // check that the touchIds that initiated the gesture are still enabled
      // This is useful for when the page loses track of the pointers (minifying
      // gesture on iPad).
      if (state._touchIds.every((id) => ctrlTouchIds.has(id))) return
      // The gesture is still active, but probably didn't have the opportunity to
      // end properly, so we restart the pinch.
    }

    if (ctrlTouchIds.size < 2) return

    this.start(event)
    state._touchIds = Array.from(ctrlTouchIds).slice(0, 2) as [number, number]

    const payload = Touches.distanceAngle(event, state._touchIds)
    this.pinchStart(event, payload)
  }

  pointerStart(event: PointerEvent) {
    this.ctrl.setEventIds(event)
    ;(event.target as HTMLElement).setPointerCapture(event.pointerId)
    const state = this.state
    const _pointerEvents = state._pointerEvents
    const ctrlPointerIds = this.ctrl.pointerIds

    if (state._active) {
      // see touchStart comment
      if (Array.from(_pointerEvents.keys()).every((id) => ctrlPointerIds.has(id))) return
    }

    if (_pointerEvents.size < 2) {
      _pointerEvents.set(event.pointerId, event)
    }

    if (state._pointerEvents.size < 2) return

    this.start(event)

    // @ts-ignore
    const payload = distanceAngle(...Array.from(_pointerEvents.values()))
    this.pinchStart(event, payload)
  }

  pinchStart(event: PointerEvent | TouchEvent, payload: { distance: number; angle: number; origin: Vector2 }) {
    const state = this.state
    state.origin = payload.origin
    state.values = [payload.distance, payload.angle]
    state.initial = state.values

    this.compute(event)
    this.emit()
  }

  touchMove(event: TouchEvent) {
    if (!this.state._active) return
    const payload = Touches.distanceAngle(event, this.state._touchIds)
    this.pinchMove(event, payload)
  }

  pointerMove(event: PointerEvent) {
    const _pointerEvents = this.state._pointerEvents
    if (_pointerEvents.has(event.pointerId)) {
      _pointerEvents.set(event.pointerId, event)
    }
    if (!this.state._active) return
    // @ts-ignore
    const payload = distanceAngle(...Array.from(_pointerEvents.values()))
    this.pinchMove(event, payload)
  }

  pinchMove(event: PointerEvent | TouchEvent, payload: { distance: number; angle: number; origin: Vector2 }) {
    const state = this.state
    const prev_a = state.values[1]
    const delta_a = payload.angle - prev_a
    let delta_turns = 0
    if (Math.abs(delta_a) > 270) delta_turns += Math.sign(delta_a)
    state.values = [payload.distance, payload.angle - 360 * delta_turns]
    state.origin = payload.origin
    state.turns = delta_turns
    state._movement = [state.values[0] / state.initial[0] - 1, convertAngle(this, state.values[1] - state.initial[1])]
    this.compute(event)
    this.emit()
  }

  touchEnd(event: TouchEvent) {
    this.ctrl.setEventIds(event)
    if (!this.state._active) return

    if (this.state._touchIds.some((id) => !this.ctrl.touchIds.has(id))) {
      this.state._active = false

      this.compute(event)
      this.emit()
    }
  }

  pointerEnd(event: PointerEvent) {
    const state = this.state
    this.ctrl.setEventIds(event)
    try {
      // @ts-ignore r3f
      event.target.releasePointerCapture(event.pointerId)
    } catch {}

    if (state._pointerEvents.has(event.pointerId)) {
      state._pointerEvents.delete(event.pointerId)
    }

    if (!state._active) return

    if (state._pointerEvents.size < 2) {
      state._active = false
      this.compute(event)
      this.emit()
    }
  }

  gestureStart(event: WebKitGestureEvent) {
    if (event.cancelable) event.preventDefault()
    const state = this.state

    if (state._active) return

    this.start(event)
    state.values = [event.scale, event.rotation]
    state.origin = [event.clientX, event.clientY]
    this.compute(event)

    this.emit()
  }

  gestureMove(event: WebKitGestureEvent) {
    if (event.cancelable) event.preventDefault()

    if (!this.state._active) return

    const state = this.state
    state.values = [event.scale, event.rotation]
    state.origin = [event.clientX, event.clientY]
    const _previousMovement = state._movement
    state._movement = [event.scale - 1, convertAngle(this, event.rotation)]
    state._delta = V.sub(state._movement, _previousMovement)
    this.compute(event)
    this.emit()
  }

  gestureEnd(event: WebKitGestureEvent) {
    if (!this.state._active) return

    this.state._active = false

    this.compute(event)
    this.emit()
  }

  wheel(event: WheelEvent) {
    if (!event.ctrlKey) return
    if (!this.state._active) this.wheelStart(event)
    else this.wheelChange(event)
    this.timeoutStore.add('wheelEnd', this.wheelEnd.bind(this))
  }

  wheelStart(event: WheelEvent) {
    if (event.cancelable) event.preventDefault()
    else if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(
        `[@use-gesture]: To properly support zoom on trackpads, try using the \`target\` option and \`config.eventOptions.passive\` set to \`false\`. This message will only appear in development mode.`,
        event.currentTarget
      )
    }
    this.start(event)
    this.wheelChange(event)
  }

  wheelChange(event: WheelEvent) {
    if (event.cancelable) event.preventDefault()
    const state = this.state
    state._delta = [-Wheel.values(event)[1] / PINCH_WHEEL_RATIO, 0]
    V.addTo(state._movement, state._delta)

    this.state.origin = [event.clientX, event.clientY]

    this.compute(event)
    this.emit()
  }

  wheelEnd() {
    if (!this.state._active) return
    this.state._active = false
    this.compute()
    this.emit()
  }

  bind(bindFunction: any) {
    const device = this.config.device
    if (!!device) {
      // @ts-ignore
      bindFunction(device, 'start', this[device + 'Start'].bind(this))
      // @ts-ignore
      bindFunction(device, 'change', this[device + 'Move'].bind(this))
      // @ts-ignore
      bindFunction(device, 'end', this[device + 'End'].bind(this))
    } else bindFunction('wheel', '', this.wheel.bind(this))
  }
}

export function convertAngle(engine: PinchEngine, value: number) {
  if (engine.config.useRad) return (value / 180) * Math.PI
  return value
}
