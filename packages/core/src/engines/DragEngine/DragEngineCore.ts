import { CoordinatesEngine } from '../CoordinatesEngine'
import { ConfigResolverMap } from '../../imports'
import { dragConfigResolver } from '../../config/dragConfigResolver'
import { coordinatesConfigResolver } from '../../config/coordinatesConfigResolver'
import type { Controller } from '../../Controller'
import { Vector2 } from '../../types'

ConfigResolverMap.set('drag', dragConfigResolver)

export interface DragEngineConstructor {
  new (ctrl: Controller, args: any[]): DragEngine
}

export interface DragEngine extends CoordinatesEngine<'drag'> {
  cancel(this: DragEngine): void
  setActive(this: DragEngine, flag: { pointer?: boolean; keyboard?: boolean }): void
  pointerDown(this: DragEngine, event: PointerEvent): void
  pointerMove(this: DragEngine, event: PointerEvent): void
  pointerUp(this: DragEngine, event: PointerEvent): void
  pointerClick(this: DragEngine, event: PointerEvent): void
  pointerClean(this: DragEngine): void
  setupPointer(this: DragEngine, event: PointerEvent): void
  setupDelayTrigger(this: DragEngine, event: PointerEvent): void
  startPointerDrag(this: DragEngine, event: PointerEvent): void
  setupScrollPrevention(this: DragEngine, event: PointerEvent): void
  preventScroll(this: DragEngine, event: PointerEvent): void
  keyDown(this: DragEngine, event: KeyboardEvent): void
  keyUp(this: DragEngine, event: KeyboardEvent): void
}

export const DragEngine: DragEngineConstructor = function (this: DragEngine, ctrl: Controller, args: any[]) {
  this.ingKey = 'dragging'
  // @ts-ignore
  CoordinatesEngine.call(this, ctrl, args, 'drag')
} as any

DragEngine.prototype = Object.create(CoordinatesEngine.prototype)

// superseeds generic Engine reset call
DragEngine.prototype.reset = function (this: DragEngine) {
  CoordinatesEngine.prototype.reset.call(this)
  const state = this.state
  state._pointerId = undefined
  state._pointerActive = false
  state._keyboardActive = false
  state._preventScroll = false
  state._delayed = false
  state.swipe = [0, 0]
  state.tap = false
  state.canceled = false
  state.cancel = this.cancel.bind(this)
} as DragEngine['reset']

DragEngine.prototype.setup = function (this: DragEngine) {
  const state = this.state

  if (state._bounds instanceof HTMLElement) {
    const boundRect = state._bounds.getBoundingClientRect()
    const targetRect = (state.target as HTMLElement).getBoundingClientRect()
    const _bounds = {
      left: boundRect.left - targetRect.left + state.offset[0],
      right: boundRect.right - targetRect.right + state.offset[0],
      top: boundRect.top - targetRect.top + state.offset[1],
      bottom: boundRect.bottom - targetRect.bottom + state.offset[1]
    }
    state._bounds = coordinatesConfigResolver.bounds(_bounds) as [Vector2, Vector2]
  }
} as DragEngine['setup']

DragEngine.prototype.cancel = function () {
  const state = this.state
  if (state.canceled) return
  setTimeout(() => {
    state.canceled = true
    state._active = false
    // we run compute with no event so that kinematics won't be computed
    this.compute()
    this.emit()
  }, 0)
} as DragEngine['cancel']

DragEngine.prototype.setActive = function ({ pointer, keyboard } = {}) {
  this.state._active = (pointer ?? this.state._pointerActive) || (keyboard ?? this.state._keyboardActive)
} as DragEngine['setActive']

// superseeds Engine clean function
DragEngine.prototype.clean = function () {
  this.pointerClean()
  this.state._pointerActive = false
  this.state._keyboardActive = false
  CoordinatesEngine.prototype.clean.call(this)
}

DragEngine.prototype.bind = function (this: DragEngine, bindFunction) {
  const device = this.config.device

  bindFunction(device, 'start', this.pointerDown.bind(this))
  bindFunction('key', 'down', this.keyDown.bind(this))
  bindFunction('key', 'up', this.keyUp.bind(this))

  if (this.config.r3f) {
    bindFunction(device, 'change', this.pointerMove.bind(this))
    bindFunction(device, 'end', this.pointerUp.bind(this))
  }
  if (this.config.filterTaps) {
    bindFunction('click', '', this.pointerClick.bind(this), { capture: true })
  }
} as DragEngine['bind']
