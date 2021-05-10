import { CoordinatesEngine } from './CoordinatesEngine'
import { Wheel } from '../utils/events'
import { V } from '../utils/maths'

export interface WheelEngine extends CoordinatesEngine<'wheel'> {
  wheel(this: WheelEngine, event: WheelEvent): void
  wheelChange(this: WheelEngine, event: WheelEvent): void
  wheelEnd(this: WheelEngine): void
}

export class WheelEngine extends CoordinatesEngine<'wheel'> {
  ingKey = 'wheeling' as const

  wheel(event: WheelEvent) {
    if (!this.state._active) this.start(event)
    this.wheelChange(event)
    this.timeoutStore.add('wheelEnd', this.wheelEnd.bind(this))
  }

  wheelChange(event: WheelEvent) {
    if (event.cancelable) event.preventDefault()
    const state = this.state
    state._delta = Wheel.values(event)
    V.addTo(this.state._movement, state._delta)

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
    bindFunction('wheel', '', this.wheel.bind(this))
  }
}
