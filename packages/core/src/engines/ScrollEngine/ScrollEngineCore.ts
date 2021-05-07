import { ConfigResolverMap } from '../../imports'
import { scrollConfigResolver } from '../../config/scrollConfigResolver'
import { CoordinatesEngine } from '../CoordinatesEngine'
import { Scroll } from '../../utils/events'
import { V } from '../../utils/maths'
import type { Controller } from '../../Controller'

ConfigResolverMap.set('scroll', scrollConfigResolver)

export interface ScrollEngineConstructor {
  new (ctrl: Controller, args: any[]): ScrollEngine
}

export interface ScrollEngine extends CoordinatesEngine<'scroll'> {
  scroll(this: ScrollEngine, event: UIEvent): void
  scrollChange(this: ScrollEngine, event: UIEvent): void
  scrollEnd(this: ScrollEngine): void
}

export const ScrollEngine: ScrollEngineConstructor = function (this: ScrollEngine, ctrl: Controller, args: any[]) {
  this.ingKey = 'scrolling'
  // @ts-ignore
  CoordinatesEngine.call(this, ctrl, args, 'scroll')
} as any

ScrollEngine.prototype = Object.create(CoordinatesEngine.prototype)

ScrollEngine.prototype.scroll = function (event) {
  if (!this.state._active) this.start(event)
  this.scrollChange(event)
  this.timeoutStore.add('scrollEnd', this.scrollEnd.bind(this))
} as ScrollEngine['scroll']

ScrollEngine.prototype.scrollChange = function (event) {
  if (event.cancelable) event.preventDefault()
  const state = this.state
  const values = Scroll.values(event)
  state._delta = V.sub(values, state.values)
  V.addTo(state._movement, state._delta)
  state.values = values

  this.compute(event)
  this.emit()
} as ScrollEngine['scrollChange']

ScrollEngine.prototype.scrollEnd = function () {
  if (!this.state._active) return
  this.state._active = false
  this.compute()
  this.emit()
} as ScrollEngine['scrollEnd']

ScrollEngine.prototype.bind = function (this: ScrollEngine, bindFunction) {
  bindFunction('scroll', '', this.scroll.bind(this))
} as ScrollEngine['bind']
