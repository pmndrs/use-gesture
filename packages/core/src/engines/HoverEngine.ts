import { ConfigResolverMap } from '../imports'
import { hoverConfigResolver } from '../config/hoverConfigResolver'
import { CoordinatesEngine } from './CoordinatesEngine'
import { Pointer } from '../utils/events'
import { V } from '../utils/maths'

ConfigResolverMap.set('hover', hoverConfigResolver)

export class HoverEngine extends CoordinatesEngine<'hover'> {
  ingKey = 'hovering' as const

  enter(event: PointerEvent) {
    this.start(event)
    this.state.values = Pointer.values(event)

    this.compute(event)
    this.emit()
  }

  leave(event: PointerEvent) {
    const state = this.state
    if (!state._active) return
    state._active = false
    const values = Pointer.values(event)
    state._movement = state._delta = V.sub(values, state.values)
    state.values = values

    this.compute(event)
    state.delta = state.movement
    this.emit()
  }

  bind(bindFunction: any) {
    bindFunction('mouse', 'enter', this.enter.bind(this))
    bindFunction('mouse', 'leave', this.leave.bind(this))
  }
}
