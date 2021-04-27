import { DragEngine } from './DragEngineCore'
import { Pointer } from '../../utils/events'
import { V } from '../../utils/maths'

DragEngine.prototype.setupPointer = function (event) {
  let device = this.config.device

  const target = event.target

  if (process.env.NODE_ENV === 'development') {
    try {
      if (device === 'pointer') {
        const currentTarget = this.config.r3f ? event.sourceEvent.currentTarget : event.currentTarget
        const style = window.getComputedStyle(currentTarget)
        if (style.touchAction === 'auto') {
          // eslint-disable-next-line no-console
          console.warn(
            `[@use-gesture]: The drag target has its \`touch-action\` style property set to \`auto\`. It is recommended to add \`touch-action: 'none'\` so that the drag gesture behaves correctly on touch-enabled devices. For more information read this: https://use-gesture.netlify.app/docs/extras/#touch-action.\n\nThis message will only show in development mode. It won't appear in production. If this is intended, you can ignore it.`,
            currentTarget
          )
        }
      }
    } catch {}
  }

  if (this.config.pointerLock) {
    target.requestPointerLock()
  }
  if (device === 'touch' || this.config.pointerCapture) {
    if (this.config.pointerCapture) {
      target.setPointerCapture(event.pointerId)
    }
    if (!this.config.r3f) {
      if (document.pointerLockElement === target) device = 'mouse'
      this.eventStore.add(target, device, 'change', this.pointerMove.bind(this))
      this.eventStore.add(target, device, 'end', this.pointerUp.bind(this))
    }
  } else {
    if (!this.config.r3f) {
      this.eventStore.add(this.shared.window, device, 'change', this.pointerMove.bind(this))
      this.eventStore.add(this.shared.window, device, 'end', this.pointerUp.bind(this))
    }
  }
}

DragEngine.prototype.pointerDown = function (event) {
  this.ctrl.setEventIds(event)

  if (this.state._pointerActive) return

  this.start(event)
  this.setupPointer(event)

  this.state.values = Pointer.values(event)
  this.state.initial = this.state.values

  this.state._pointerId = Pointer.id(event)
  this.state._pointerActive = true

  this.compute(event)
  this.emit()
}

DragEngine.prototype.pointerMove = function (event) {
  const state = this.state
  if (!state._pointerActive) return
  const id = Pointer.id(event)
  if (state._pointerId && id !== state._pointerId) return

  const values = Pointer.values(event)
  let delta

  if (document.pointerLockElement === event.target) {
    delta = [event.movementX, event.movementY]
  } else {
    delta = V.sub(values, state.values)
    state.values = values
  }

  V.addTo(state._movement, delta)
  this.compute(event)
  this.emit()
}

DragEngine.prototype.pointerUp = function (event) {
  this.ctrl.setEventIds(event)
  const state = this.state
  const config = this.config

  if (!state._pointerActive) return
  const id = Pointer.id(event)
  if (state._pointerId && id !== state._pointerId) return

  this.setActive({ pointer: false })
  this.compute(event)

  const [dx, dy] = state.distance
  state.tap = dx <= 3 && dy <= 3

  if (state.tap && config.filterTaps) {
    state._force = true
  } else {
    const [dirx, diry] = state.direction
    const [vx, vy] = state.velocity
    const [mx, my] = state.movement
    const [svx, svy] = config.swipe.velocity
    const [sx, sy] = config.swipe.distance
    const sdt = config.swipe.duration

    if (state.elapsedTime < sdt) {
      if (Math.abs(vx) > svx && Math.abs(mx) > sx) state.swipe[0] = dirx
      if (Math.abs(vy) > svy && Math.abs(my) > sy) state.swipe[1] = diry
    }
  }

  this.emit()
}

DragEngine.prototype.pointerClean = function () {
  const state = this.state
  if (!state._pointerActive) return
  const event = state.event
  if (this.config.pointerLock && document.pointerLockElement === state.target) {
    document.exitPointerLock()
  }
  if (this.config.capture && (this.config.r3f || state.target.hasPointerCapture(event.pointerId))) {
    state.target.releasePointerCapture(event.pointerId)
  }
}

DragEngine.prototype.click = function (event) {
  if (!this.state.tap) event.stopPropagation()
}
