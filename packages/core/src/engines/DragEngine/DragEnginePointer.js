import { DragEngine } from './DragEngineCore'
import { Pointer } from '../../events'
import { V } from '../../Vector'

DragEngine.prototype.setupPointer = function (event) {
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
  if (this.state._pointerActive) return

  this.start()
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

  if (document.pointerLockElement === event.target) {
    this.state.delta = [event.movementX, event.movementY]
  } else {
    this.state.delta = V.sub(values, this.state.values)
    this.state.values = values
  }

  V.addTo(this.state.movement, this.state.delta)
  this.state.offset = V.add(this.state.lastOffset, this.state.movement)
  this.emit()
}

DragEngine.prototype.up = function (event) {
  if (!this.state._active) return

  const id = Pointer.id(event)
  if (this.state.pointerId && id !== this.state.pointerId) return

  this.state.event = event
  this.state._pointerActive = false
  this.pointerClean(event)

  this.end()
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
