import { CoordinatesEngine } from './CoordinatesEngine'
import { wheelValues } from '../utils/events'

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
    const state = this.state
    state._delta = wheelValues(event)

    const [ox, oy] = state.overflow
    const [dx, dy] = state._delta

    if (!((ox < 0 && dx < 0) || (ox > 0 && dx > 0))) state._movement[0] += dx
    if (!((oy < 0 && dy < 0) || (oy > 0 && dy > 0))) state._movement[1] += dy

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
