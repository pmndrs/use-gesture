import { ConfigResolverMap } from '../imports'
import { moveConfigResolver } from '../config/moveConfigResolver'
import { CoordinatesEngine } from './CoordinatesEngine'
import { Pointer } from '../utils/events'
import { V } from '../utils/maths'

ConfigResolverMap.set('move', moveConfigResolver)

export class MoveEngine extends CoordinatesEngine<'move'> {
  ingKey = 'moving' as const

  move(event: PointerEvent) {
    if (!this.state._active) this.moveStart(event)
    else this.moveChange(event)
    this.timeoutStore.add('moveEnd', this.moveEnd.bind(this))
  }

  moveStart(event: PointerEvent) {
    this.start(event)
    const state = this.state
    state.values = Pointer.values(event)
    this.compute(event)
    state.initial = state.values
    this.emit()
  }

  moveChange(event: PointerEvent) {
    if (!this.state._active) return
    const values = Pointer.values(event)
    const state = this.state
    state._delta = V.sub(values, state.values)
    V.addTo(state._movement, state._delta)
    state.values = values

    this.compute(event)
    this.emit()
  }

  moveEnd(event?: PointerEvent) {
    if (!this.state._active) return
    this.state._active = false
    this.compute(event)
    this.emit()
  }

  bind(bindFunction: any) {
    bindFunction('mouse', 'change', this.move.bind(this))
    bindFunction('mouse', 'leave', this.moveEnd.bind(this))
  }
}
