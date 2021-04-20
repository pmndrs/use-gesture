import { DragEngine } from './DragEngineCore'
import { V } from '../../Vector'

const DISPLACEMENT = 10

const KEYS_DELTA_MAP = {
  ArrowRight: (factor = 1) => [DISPLACEMENT * factor, 0],
  ArrowLeft: (factor = 1) => [-DISPLACEMENT * factor, 0],
  ArrowUp: (factor = 1) => [0, -DISPLACEMENT * factor],
  ArrowDown: (factor = 1) => [0, DISPLACEMENT * factor]
}

DragEngine.prototype.keydown = function (event) {
  const deltaFn = KEYS_DELTA_MAP[event.key]

  if (deltaFn) {
    const factor = event.shiftKey ? 10 : event.altKey ? 0.1 : 1
    const delta = deltaFn(factor)

    this.start()
    this.state._keyboardActive = true

    V.addTo(this.state.movement, delta)
    this.state.offset = V.add(this.state.lastOffset, this.state.movement)
    this.state.event = event

    this.emit()
  }
}

DragEngine.prototype.keyup = function (event) {
  if (!(event.key in KEYS_DELTA_MAP)) return
  this.state.event = event
  this.state._keyboardActive = false
  this.end()
  this.emit()
}
