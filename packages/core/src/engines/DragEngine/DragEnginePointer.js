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
  if (!this.state._active) return
  const id = Pointer.id(event)
  if (this.state._pointerId && id !== this.state._pointerId) return

  const values = Pointer.values(event)
  let delta

  if (document.pointerLockElement === event.target) {
    delta = [event.movementX, event.movementY]
  } else {
    delta = V.sub(values, this.state.values)
    this.state.values = values
  }

  V.addTo(this.state._movement, delta)
  this.compute(event)
  this.emit()
}

DragEngine.prototype.pointerUp = function (event) {
  this.ctrl.setEventIds(event)

  if (!this.state._active) return

  const id = Pointer.id(event)
  if (this.state._pointerId && id !== this.state._pointerId) return

  this.state.event = event
  this.state._pointerActive = false
  this.pointerClean(event)

  this.end()
  this.compute(event)

  const [dx, dy] = this.state.distance
  this.state.tap = dx <= 3 && dy <= 3

  if (this.state.tap && this.config.filterTaps) {
    this.state._force = true
  }

  this.emit()
}

DragEngine.prototype.pointerClean = function (event) {
  if (this.config.pointerLock && document.pointerLockElement === event.target) {
    document.exitPointerLock()
  }
  if (this.config.capture && (this.config.r3f || event.target.hasPointerCapture(event.pointerId))) {
    event.target.releasePointerCapture(event.pointerId)
  }
  this.eventStore.clean()
}

DragEngine.prototype.click = function (event) {
  if (!this.state.tap) event.stopPropagation()
}
