import { Engine } from './Engine'
import { V } from '../utils/maths'
import { CoordinatesKey, Vector2 } from '../types'

function selectAxis([dx, dy]: Vector2) {
  const d = Math.abs(dx) - Math.abs(dy)
  if (d > 0) return 'x'
  if (d < 0) return 'y'
  return undefined
}

function restrictVectorToAxis(v: Vector2, axis?: 'x' | 'y') {
  switch (axis) {
    case 'x':
      v[1] = 0
      break // [ x, 0 ]
    case 'y':
      v[0] = 0
      break // [ 0, y ]
  }
}

export abstract class CoordinatesEngine<Key extends CoordinatesKey> extends Engine<Key> {
  aliasKey = 'xy'

  reset() {
    super.reset()
    this.state.axis = undefined
  }

  init() {
    this.state.offset = [0, 0]
    this.state.lastOffset = [0, 0]
  }

  computeOffset() {
    this.state.offset = V.add(this.state.lastOffset, this.state.movement)
  }

  computeMovement() {
    this.state.movement = V.sub(this.state.offset, this.state.lastOffset)
  }

  intent(v: Vector2) {
    this.state.axis = this.state.axis || selectAxis(v)

    // We block the movement if either:
    // - config.lockDirection or config.axis was set but axis isn't detected yet
    // - config.axis was set but is different than detected axis
    this.state._blocked =
      ((this.config.lockDirection || !!this.config.axis) && !this.state.axis) ||
      (!!this.config.axis && this.config.axis !== this.state.axis)

    if (this.state._blocked) return

    if (this.config.axis || this.config.lockDirection) {
      restrictVectorToAxis(v, this.state.axis)
    }
  }
}
