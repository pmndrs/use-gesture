import { CoordinatesEngine } from './CoordinatesEngine'
import { pointerValues } from '../utils/events'
import { V } from '../utils/maths'

export class HoverEngine extends CoordinatesEngine<'hover'> {
  ingKey = 'hovering' as const

  enter(event: PointerEvent) {
    if (this.config.mouseOnly && event.pointerType !== 'mouse') return
    this.start(event)
    this.state.values = pointerValues(event)

    this.compute(event)
    this.emit()
  }

  leave(event: PointerEvent) {
    if (this.config.mouseOnly && event.pointerType !== 'mouse') return
    const state = this.state
    if (!state._active) return
    state._active = false
    const values = pointerValues(event)
    state._movement = state._delta = V.sub(values, state.values)
    state.values = values

    this.compute(event)
    state.delta = state.movement
    this.emit()
  }

  bind(bindFunction: any) {
    bindFunction('pointer', 'enter', this.enter.bind(this))
    bindFunction('pointer', 'leave', this.leave.bind(this))
  }
}
