import { Engine } from './Engine'
import { V } from '../utils/maths'
import type { Controller } from '../Controller'
import { CoordinatesKey, GestureKey } from '../types'

export interface CoordinatesEngineConstructor {
  new <Key extends CoordinatesKey>(ctrl: Controller, args: any[], key: Key): CoordinatesEngine<Key>
}

export interface CoordinatesEngine<Key extends GestureKey = CoordinatesKey> extends Engine<Key> {}

export const CoordinatesEngine: CoordinatesEngineConstructor = function <Key extends CoordinatesKey>(
  this: CoordinatesEngine<Key>,
  ctrl: Controller,
  args: any[],
  key: Key
) {
  // @ts-ignore
  Engine.call(this, ctrl, args, key)
} as any

CoordinatesEngine.prototype = Object.create(Engine.prototype)

CoordinatesEngine.prototype.reset = function () {
  Engine.prototype.reset.call(this)
  this.state.axis = undefined
} as CoordinatesEngine['reset']

CoordinatesEngine.prototype.init = function () {
  this.state.offset = [0, 0]
  this.state.lastOffset = [0, 0]
} as CoordinatesEngine['init']

CoordinatesEngine.prototype.computeOffset = function () {
  const state = this.state
  state.offset = V.add(state.lastOffset, state.movement)
} as CoordinatesEngine['computeOffset']

CoordinatesEngine.prototype.computeMovement = function () {
  const { offset, lastOffset } = this.state
  this.state.movement = V.sub(offset, lastOffset)
  // let's take profit from this function to set `values` alias to `xy`
  this.state.xy = this.state.values
} as CoordinatesEngine['computeMovement']

CoordinatesEngine.prototype.intent = function (v) {
  const state = this.state

  if (!state.axis) {
    const axisMovementDifference = Math.abs(v[0]) - Math.abs(v[1])
    if (axisMovementDifference < 0) state.axis = 'y'
    else if (axisMovementDifference > 0) state.axis = 'x'
  }

  if (this.config.lockDirection) {
    if (state.axis === 'x') v[1] = 0
    else if (state.axis === 'y') v[0] = 0
  } else if (this.config.axis && !!state.axis) {
    if (state.axis !== this.config.axis) {
      state._blocked = true
    } else if (state.axis === 'x') v[1] = 0
    else if (state.axis === 'y') v[0] = 0
  }
} as CoordinatesEngine['intent']
