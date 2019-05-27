import DistanceAngleRecognizer from './DistanceAngleRecognizer'
import { getWheelEventData } from '../utils'
import GestureController from '../controllers/GestureController'
import { TransformedEvent, GestureFlag, ReactEventHandlerKey } from '../../types/events.d'
import { genericEndState } from '../defaults'
import { Fn } from '../../types/common.d'

export default class PinchWheelRecognizer<BinderType> extends DistanceAngleRecognizer<BinderType> {
  constructor(controller: GestureController<BinderType>, args: any[]) {
    super('pinch', controller, args)
  }

  onChange = (event: TransformedEvent<WheelEvent>): void => {
    if (!this.isEnabled() || !event.ctrlKey) return
    event.preventDefault()

    this.clearTimeout()
    this.setTimeout(this.onEnd, 100)

    const { values, ...rest } = getWheelEventData(event)
    const d = this.getState().values[0] - values[1]

    if (!this.getState().active) {
      const startState = this.getStartState({ args: this.args, event, values: [d, 0] })
      this.updateState({ pinching: true, ...rest }, startState, GestureFlag.OnStart)
    } else {
      const kinematics = this.getKinematics({ values: [d, undefined], event })
      this.updateState(rest, { ...kinematics, first: false }, GestureFlag.OnChange)
    }
  }

  onEnd = (): void => {
    if (!this.getState().active) return
    this.updateState({ pinching: false, down: false, touches: 0 }, { ...genericEndState }, GestureFlag.OnEnd)
  }

  getEventBindings(): [ReactEventHandlerKey | ReactEventHandlerKey[], Fn][] {
    return [['onWheel', this.onChange]]
  }
}
