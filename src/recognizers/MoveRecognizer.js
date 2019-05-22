import CoordinatesRecognizer from './CoordinatesRecognizer'
import { getPointerEventData, GESTURE_ONCHANGE, GESTURE_ONSTART, GESTURE_ONEND } from '../utils'
import { genericEndState } from '../default'

export default class MoveRecognizer extends CoordinatesRecognizer {
  constructor(...args) {
    super('move', ...args)
  }

  onChange = event => {
    if (!this.isEnabled()) return

    this.clearTimeout()
    this.setTimeout(this.onEnd, 100)

    const { values, ...rest } = getPointerEventData(event)

    if (!this.getState().active) {
      const startState = this.getStartState({ args: this.args, event, values })
      this.updateState({ moving: true, ...rest }, startState, GESTURE_ONSTART)
    } else {
      const kinematics = this.getKinematics({ values, event })
      this.updateState(rest, { ...kinematics, first: false }, GESTURE_ONCHANGE)
    }
  }

  onEnd = () => {
    if (!this.getState().active) return
    this.updateState({ moving: false }, { ...genericEndState, velocity: 0, velocities: [0, 0] }, GESTURE_ONEND)
  }

  getEventBindings = () => {
    if (this.hasPointerEvents()) {
      return [['onPointerMove', this.onChange]]
    }
    return [['onMouseMove', this.onChange]]
  }
}
