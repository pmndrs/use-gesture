import { ConfigResolverMap } from '../../imports'
import { wheelConfigResolver } from '../../config/wheelConfigResolver'
import { CoordinatesEngine } from '../CoordinatesEngine'
import { Wheel } from '../../utils/events'
import { V } from '../../utils/maths'
import type { Controller } from '../../Controller'

ConfigResolverMap.set('wheel', wheelConfigResolver)

export interface WheelEngineConstructor {
  new (ctrl: Controller, args: any[]): WheelEngine
}

export interface WheelEngine extends CoordinatesEngine<'wheel'> {
  wheel(this: WheelEngine, event: WheelEvent): void
  wheelChange(this: WheelEngine, event: WheelEvent): void
  wheelEnd(this: WheelEngine): void
}

export const WheelEngine: WheelEngineConstructor = function (this: WheelEngine, ctrl: Controller, args: any[]) {
  this.ingKey = 'wheeling'
  // @ts-ignore
  CoordinatesEngine.call(this, ctrl, args, 'wheel')
} as any

WheelEngine.prototype = Object.create(CoordinatesEngine.prototype)

WheelEngine.prototype.wheel = function (event) {
  if (!this.state._active) this.start(event)
  this.wheelChange(event)
  this.timeoutStore.add('wheelEnd', this.wheelEnd.bind(this))
} as WheelEngine['wheel']

WheelEngine.prototype.wheelChange = function (event) {
  if (event.cancelable) event.preventDefault()
  const state = this.state
  state._delta = Wheel.values(event)
  V.addTo(this.state._movement, state._delta)

  this.compute(event)
  this.emit()
} as WheelEngine['wheelChange']

WheelEngine.prototype.wheelEnd = function () {
  if (!this.state._active) return
  this.state._active = false
  this.compute()
  this.emit()
} as WheelEngine['wheelEnd']

WheelEngine.prototype.bind = function (this: WheelEngine, bindFunction) {
  bindFunction('wheel', '', this.wheel.bind(this))
} as WheelEngine['bind']
