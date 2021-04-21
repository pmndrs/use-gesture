import { DragEngine } from './DragEngineCore'
import { V } from '../../utils/maths'

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

    this.start(event)
    this.state._keyboardActive = true

    V.addTo(this.state._movement, delta)

    this.emit()
  }
}

DragEngine.prototype.keyup = function (event) {
  if (!(event.key in KEYS_DELTA_MAP)) return
  this.state.event = event
  this.state._keyboardActive = false
  this.end(event)
  this.emit()
}