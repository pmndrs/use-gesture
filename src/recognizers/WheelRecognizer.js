import CoordinatesRecognizer from './CoordinatesRecognizer'
import { addV, getWheelEventData } from '../utils'
import { genericEndState } from '../default'
import { GESTURE_ONCHANGE, GESTURE_ONSTART, GESTURE_ONEND } from '../Handler'

export default class WheelRecognizer extends CoordinatesRecognizer {
  constructor(...args) {
    super('wheel', ...args)
  }

  onChange = event => {
    if (!this.isEnabled()) return

    this.clearTimeout()
    this.setTimeout(this.onEnd, 100)

    const { values: eventValues, ...rest } = getWheelEventData(event)
    const values = addV(eventValues, this.getState().values)

    if (!this.getState().active) {
      const startState = this.getStartState({ args: this.args, event, values })
      this.updateState({ wheeling: true, ...rest }, startState, GESTURE_ONSTART)
    } else {
      const kinematics = this.getKinematics({ values, event })
      this.updateState(rest, { ...kinematics, first: false }, GESTURE_ONCHANGE)
    }
  }

  onEnd = () => {
    if (!this.getState().active) return
    this.updateState({ wheeling: false }, { ...genericEndState, velocity: 0, velocities: [0, 0] }, GESTURE_ONEND)
  }

  getEventBindings = () => {
    return [['onWheel', this.onChange]]
  }
}
