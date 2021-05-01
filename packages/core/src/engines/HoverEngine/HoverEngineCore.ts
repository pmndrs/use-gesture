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
  pointerEnter(this: HoverEngine, event: PointerEvent): void
  pointerLeave(this: HoverEngine, event: PointerEvent): void
}

export const HoverEngine: HoverEngineConstructor = function (this: HoverEngine, ctrl: Controller, args: any[]) {
  // @ts-ignore
  CoordinatesEngine.call(this, ctrl, args, 'hover')
  this.ingKey = 'hovering'
} as any

HoverEngine.prototype = Object.create(CoordinatesEngine.prototype)

HoverEngine.prototype.pointerEnter = function (event) {
  this.start(event)
  this.state.values = Pointer.values(event)

  this.compute(event)
  this.emit()
} as HoverEngine['pointerEnter']

HoverEngine.prototype.pointerLeave = function (event) {
  if (!this.state._active) return
  this.state._active = false
  const values = Pointer.values(event)
  this.state._movement = V.sub(values, this.state.values)
  this.state.values = values

  this.compute(event)
  this.state.delta = this.state.movement
  this.emit()
} as HoverEngine['pointerLeave']

HoverEngine.prototype.bind = function (this: HoverEngine, bindFunction) {
  bindFunction('pointer', 'enter', this.pointerEnter.bind(this))
  bindFunction('pointer', 'leave', this.pointerLeave.bind(this))
} as HoverEngine['bind']
