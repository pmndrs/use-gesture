import { CoordinatesEngine } from './CoordinatesEngine'
import { wheelValues } from '../utils/events'
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
    const state = this.state
    state._delta = wheelValues(event)
    V.addTo(state._movement, state._delta)

    // _movement rolls back to when it passed the bounds.
    const [ox, oy] = state.overflow
    const [dx, dy] = state._delta
    const [dirx, diry] = state._direction

    if ((ox < 0 && dx > 0 && dirx < 0) || (ox > 0 && dx < 0 && dirx > 0)) {
      state._movement[0] = state._movementBound[0] as number
    }

    if ((oy < 0 && dy > 0 && diry < 0) || (oy > 0 && dy < 0 && diry > 0)) {
      state._movement[1] = state._movementBound[1] as number
    }

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
