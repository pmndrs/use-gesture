import { DragEngine } from './DragEngineCore'
import { Pointer } from '../../utils/events'
import { V } from '../../utils/maths'

DragEngine.prototype.setupPointer = function (event) {
  let device = this.config.device

  const target = event.currentTarget

  if (this.config.lock) {
    target.requestPointerLock()
  }
  if (device === 'touch' || this.config.capture) {
    if (this.config.capture) {
      target.setPointerCapture(event.pointerId)
    }
    if (!this.config.r3f) {
      if (document.pointerLockElement === target) device = 'mouse'
      this.eventStore.add(target, device, 'move', this.move.bind(this))
      this.eventStore.add(target, device, 'up', this.up.bind(this))
    }
  } else {
    if (!this.config.r3f) {
      this.eventStore.add(window, device, 'move', this.move.bind(this))
      this.eventStore.add(window, device, 'up', this.up.bind(this))
    }
  }
}

DragEngine.prototype.down = function (event) {
  if (this.state._pointerActive) return

  this.start(event)
  this.state.event = event

  this.state.pointerId = Pointer.id(event)
  this.state.values = Pointer.values(event)
  this.state.initial = this.state.values

  this.state._pointerActive = true
  this.setupPointer(event)

  this.emit()
}

DragEngine.prototype.move = function (event) {
  if (!this.state._active) return
  const id = Pointer.id(event)
  if (this.state.pointerId && id !== this.state.pointerId) return

  this.state.event = event

  const values = Pointer.values(event)
  let delta

  if (document.pointerLockElement === event.target) {
    delta = [event.movementX, event.movementY]
  } else {
    delta = V.sub(values, this.state.values)
    this.state.values = values
  }

  V.addTo(this.state._movement, delta)
  this.emit()
}

DragEngine.prototype.up = function (event) {
  if (!this.state._active) return

  const id = Pointer.id(event)
  if (this.state.pointerId && id !== this.state.pointerId) return

  this.state.event = event
  this.state._pointerActive = false
  this.pointerClean(event)

  this.end(event)
  this.emit()
}

DragEngine.prototype.pointerClean = function (event) {
  if (this.config.lock && document.pointerLockElement === event.target) {
    document.exitPointerLock()
  }
  if (this.config.capture && (this.config.r3f || event.target.hasPointerCapture(event.pointerId))) {
    event.target.releasePointerCapture(event.pointerId)
  }
  this.eventStore.clean()
}
