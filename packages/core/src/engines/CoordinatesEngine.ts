import { Engine } from './Engine'
import { V } from '../utils/maths'
import { CoordinatesKey, Vector2 } from '../types'


function selectAxis([ dx, dy ]: Vector2, axis?: 'x'|'y' = undefined) {
  if (axis) return axis;
  
  if (Math.abs(dx) > Math.abs(dy)) {
    return 'x'
  } else {
    return 'y'
  }
}

function restrictVectorToAxis(v: Vector2, axis: 'x'|'y'|undefined) {
  switch (axis) {
    case 'x': v[1] = 0; break; // [ x, 0 ]
    case 'y': v[0] = 0; break; // [ 0, y ]
  }
  return v;
}

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
    this.state.offset = V.add(this.state.lastOffset, this.state.movement)
  }

  computeMovement() {
    this.state.movement = V.sub(this.state.offset, this.state.lastOffset)
    // let's take profit from this function to set `values` alias to `xy`
    this.state.xy = this.state.values
  }

  intent(v: Vector2) {
    this.state.axis = selectAxis(v, this.state.axis)
    
    state._blocked =  this.config.lockDirection !== true && 
                      this.config.axis !== this.state.axis;
    
    if (state._blocked) return;
    
    restrictVectorToAxis(v, this.state.axis)
  }
}
