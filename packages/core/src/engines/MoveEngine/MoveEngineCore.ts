import { ConfigResolverMap } from '../../imports'
import { moveConfigResolver } from '../../config/moveConfigResolver'
import { CoordinatesEngine } from '../CoordinatesEngine'
import { Pointer } from '../../utils/events'
import { V } from '../../utils/maths'
import type { Controller } from '../../Controller'

ConfigResolverMap.set('move', moveConfigResolver)

export interface MoveEngineConstructor {
  new (ctrl: Controller, args: any[]): MoveEngine
}

export interface MoveEngine extends CoordinatesEngine<'move'> {
  move(this: MoveEngine, event: PointerEvent): void
  moveStart(this: MoveEngine, event: PointerEvent): void
  moveChange(this: MoveEngine, event: PointerEvent): void
  moveEnd(this: MoveEngine, event?: PointerEvent): void
}

export const MoveEngine: MoveEngineConstructor = function (this: MoveEngine, ctrl: Controller, args: any[]) {
  this.ingKey = 'moving'
  // @ts-ignore
  CoordinatesEngine.call(this, ctrl, args, 'move')
} as any

MoveEngine.prototype = Object.create(CoordinatesEngine.prototype)

MoveEngine.prototype.move = function (event) {
  if (!this.state._active) this.moveStart(event)
  else this.moveChange(event)
  this.timeoutStore.add('moveEnd', this.moveEnd.bind(this))
} as MoveEngine['move']

MoveEngine.prototype.moveStart = function (event) {
  this.start(event)
  const state = this.state
  state.values = Pointer.values(event)
  this.compute(event)
  state.initial = state.values
  this.emit()
} as MoveEngine['moveStart']

MoveEngine.prototype.moveChange = function (event) {
  const values = Pointer.values(event)
  const delta = V.sub(values, this.state.values)
  V.addTo(this.state._movement, delta)
  this.state.values = values

  this.compute(event)
  this.emit()
} as MoveEngine['moveChange']

MoveEngine.prototype.moveEnd = function (event) {
  if (!this.state._active) return
  this.state._active = false
  this.compute(event)
  this.emit()
} as MoveEngine['moveEnd']

MoveEngine.prototype.bind = function (this: MoveEngine, bindFunction) {
  bindFunction('mouse', 'change', this.move.bind(this))
  bindFunction('mouse', 'leave', this.moveEnd.bind(this))
} as MoveEngine['bind']
