import { Engine } from '../Engine'
import { ConfigResolverMap } from '../../imports'
import { CoordinatesEngine } from '../CoordinatesEngine'
import { pinchConfigResolver } from '../../config/pinchConfigResolver'

import type { Controller } from '../../Controller'
import { Vector2, WebKitGestureEvent } from '../../types'

ConfigResolverMap.set('pinch', pinchConfigResolver)

export interface PinchEngineConstructor {
  new (ctrl: Controller, args: any[]): PinchEngine
}

export interface PinchEngine extends Engine<'pinch'> {
  cancel(this: PinchEngine): void
  wheel(this: PinchEngine, event: WheelEvent): void
  gestureStart(this: PinchEngine, event: WebKitGestureEvent): void
  gestureMove(this: PinchEngine, event: WebKitGestureEvent): void
  gestureEnd(this: PinchEngine, event: WebKitGestureEvent): void
  touchStart(this: PinchEngine, event: TouchEvent): void
  touchMove(this: PinchEngine, event: TouchEvent): void
  touchEnd(this: PinchEngine, event: TouchEvent): void
  pointerStart(this: PinchEngine, event: PointerEvent): void
  pointerMove(this: PinchEngine, event: PointerEvent): void
  pinchStart(
    this: PinchEngine,
    event: PointerEvent | TouchEvent,
    payload: { distance: number; angle: number; origin: Vector2 }
  ): void
  pinchMove(
    this: PinchEngine,
    event: PointerEvent | TouchEvent,
    payload: { distance: number; angle: number; origin: Vector2 }
  ): void
  pointerEnd(this: PinchEngine, event: PointerEvent): void
  wheelStart(this: PinchEngine, event: WheelEvent): void
  wheelChange(this: PinchEngine, event: WheelEvent): void
  wheelEnd(this: PinchEngine): void
}

export const PinchEngine: PinchEngineConstructor = function (this: PinchEngine, ctrl: Controller, args: any[]) {
  // @ts-ignore
  CoordinatesEngine.call(this, ctrl, args, 'pinch')
  this.ingKey = 'pinching'
} as any

PinchEngine.prototype = Object.create(Engine.prototype)

PinchEngine.prototype.init = function () {
  this.state.offset = [1, 0]
  this.state.lastOffset = [1, 0]
  this.state._pointerEvents = new Map()
} as PinchEngine['init']

// superseeds generic Engine reset call
PinchEngine.prototype.reset = function (this: PinchEngine) {
  Engine.prototype.reset.call(this)
  const state = this.state
  state._touchIds = []
  state.canceled = false
  state.cancel = this.cancel.bind(this)
  state.turns = 0
} as PinchEngine['init']

PinchEngine.prototype.computeOffset = function () {
  const { movement, lastOffset } = this.state
  this.state.offset = [(1 + movement[0]) * lastOffset[0], movement[1] + lastOffset[1]]
} as PinchEngine['init']

PinchEngine.prototype.computeMovement = function () {
  const { offset, lastOffset } = this.state
  this.state.movement = [offset[0] / lastOffset[0] - 1, offset[1] - lastOffset[1]]
} as PinchEngine['computeMovement']

PinchEngine.prototype.cancel = function () {
  const state = this.state
  if (state.canceled) return
  setTimeout(() => {
    state.canceled = true
    state._active = false
    // we run compute with no event so that kinematics won't be computed
    this.compute()
    this.emit()
  }, 0)
} as PinchEngine['cancel']

PinchEngine.prototype.bind = function (this: PinchEngine, bindFunction) {
  const device = this.config.device
  if (!!device) {
    // @ts-ignore
    bindFunction(device, 'start', this[device + 'Start'].bind(this))
    // @ts-ignore
    bindFunction(device, 'change', this[device + 'Move'].bind(this))
    // @ts-ignore
    bindFunction(device, 'end', this[device + 'End'].bind(this))
  } else bindFunction('wheel', '', this.wheel.bind(this))
} as PinchEngine['bind']
