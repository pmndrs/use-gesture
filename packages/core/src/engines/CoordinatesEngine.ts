import { Engine } from './Engine'
import { V } from '../utils/maths'
import { CoordinatesKey, Vector2 } from '../types'

export abstract class CoordinatesEngine<Key extends CoordinatesKey> extends Engine<Key> {
  reset() {
    super.reset()
    this.state.axis = undefined
  }

  init() {
    this.state.offset = [0, 0]
    this.state.lastOffset = [0, 0]
  }

  computeOffset() {
    const state = this.state
    state.offset = V.add(state.lastOffset, state.movement)
  }

  computeMovement() {
    const { offset, lastOffset } = this.state
    this.state.movement = V.sub(offset, lastOffset)
    // let's take profit from this function to set `values` alias to `xy`
    this.state.xy = this.state.values
  }

  intent(v: Vector2) {
    const state = this.state

    if (!state.axis) {
      const axisMovementDifference = Math.abs(v[0]) - Math.abs(v[1])
      if (axisMovementDifference < 0) state.axis = 'y'
      else if (axisMovementDifference > 0) state.axis = 'x'
    }

    const axis = state.axis

    if (this.config.lockDirection) {
      if (axis) {
        state._blocked = false
        if (axis === 'x') v[1] = 0
        else if (axis === 'y') v[0] = 0
      } else {
        state._blocked = false
      }
    } else if (this.config.axis) {
      if (!!axis && axis === this.config.axis) {
        state._blocked = false
        if (axis === 'x') v[1] = 0
        else if (axis === 'y') v[0] = 0
      } else {
        state._blocked = true
      }
    }
  }
}
