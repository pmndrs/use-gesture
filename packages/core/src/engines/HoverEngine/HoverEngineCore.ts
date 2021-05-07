import { ConfigResolverMap } from '../../imports'
import { hoverConfigResolver } from '../../config/hoverConfigResolver'
import { CoordinatesEngine } from '../CoordinatesEngine'
import { Pointer } from '../../utils/events'
import { V } from '../../utils/maths'
import type { Controller } from '../../Controller'

ConfigResolverMap.set('hover', hoverConfigResolver)

export interface HoverEngineConstructor {
  new (ctrl: Controller, args: any[]): HoverEngine
}

export interface HoverEngine extends CoordinatesEngine<'hover'> {
  enter(this: HoverEngine, event: PointerEvent): void
  leave(this: HoverEngine, event: PointerEvent): void
}

export const HoverEngine: HoverEngineConstructor = function (this: HoverEngine, ctrl: Controller, args: any[]) {
  this.ingKey = 'hovering'
  // @ts-ignore
  CoordinatesEngine.call(this, ctrl, args, 'hover')
} as any

HoverEngine.prototype = Object.create(CoordinatesEngine.prototype)

HoverEngine.prototype.enter = function (event) {
  this.start(event)
  this.state.values = Pointer.values(event)

  this.compute(event)
  this.emit()
} as HoverEngine['enter']

HoverEngine.prototype.leave = function (event) {
  const state = this.state
  if (!state._active) return
  state._active = false
  const values = Pointer.values(event)
  state._movement = state._delta = V.sub(values, state.values)
  state.values = values

  this.compute(event)
  state.delta = state.movement
  this.emit()
} as HoverEngine['leave']

HoverEngine.prototype.bind = function (this: HoverEngine, bindFunction) {
  bindFunction('mouse', 'enter', this.enter.bind(this))
  bindFunction('mouse', 'leave', this.leave.bind(this))
} as HoverEngine['bind']
