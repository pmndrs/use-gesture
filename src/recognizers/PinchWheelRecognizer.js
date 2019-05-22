import DistanceAngleRecognizer from './DistanceAngleRecognizer'
import { getWheelEventData, GESTURE_ONCHANGE, GESTURE_ONSTART, GESTURE_ONEND } from '../utils'
import { genericEndState } from '../default'

export default class PinchWheelRecognizer extends DistanceAngleRecognizer {
  constructor(...args) {
    super('pinch', ...args)
  }

  onChange = event => {
    if (!this.isEnabled() || !event.ctrlKey) return
    event.preventDefault()

    this.clearTimeout()
    this.setTimeout(this.onEnd, 100)

    const { values, ...rest } = getWheelEventData(event)
    const d = this.getState().values[0] - values[1]

    if (!this.getState().active) {
      const startState = this.getStartState({ args: this.args, event, values: [d, 0] })
      this.updateState({ pinching: true, ...rest }, startState, GESTURE_ONSTART)
    } else {
      const kinematics = this.getKinematics({ values: [d], event })
      this.updateState(rest, { ...kinematics, first: false }, GESTURE_ONCHANGE)
    }
  }

  onEnd = () => {
    if (!this.getState().active) return
    this.updateState({ pinching: false, down: false, touches: 0 }, { ...genericEndState }, GESTURE_ONEND)
  }

  getEventBindings = () => {
    return [['onWheel', this.onChange]]
  }
}
