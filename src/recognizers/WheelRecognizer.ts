import CoordinatesRecognizer from './CoordinatesRecognizer'
import { addV, getWheelEventData } from '../utils'
import GestureController from '../controllers/GestureController'
import { TransformedEvent, GestureFlag, ReactEventHandlerKey } from '../../types/events.d'
import { genericEndState } from '../defaults'
import { Fn } from '../../types/common.d'

export default class WheelRecognizer<BinderType> extends CoordinatesRecognizer<BinderType> {
  constructor(controller: GestureController<BinderType>, args: any[]) {
    super('wheel', controller, args)
  }

  onChange = (event: TransformedEvent<WheelEvent>): void => {
    if (!this.isEnabled()) return

    this.clearTimeout()
    this.setTimeout(this.onEnd, 100)

    const { values: eventValues, ...rest } = getWheelEventData(event)
    const values = addV(eventValues, this.getState().values)

    if (!this.getState().active) {
      const startState = this.getStartState({ args: this.args, event, values })
      this.updateState({ wheeling: true, ...rest }, startState, GestureFlag.OnStart)
    } else {
      const kinematics = this.getKinematics({ values, event })
      this.updateState(rest, { ...kinematics, first: false }, GestureFlag.OnChange)
    }
  }

  onEnd = (): void => {
    if (!this.getState().active) return
    this.updateState({ wheeling: false }, { ...genericEndState, velocity: 0, velocities: [0, 0] }, GestureFlag.OnEnd)
  }

  getEventBindings(): [ReactEventHandlerKey | ReactEventHandlerKey[], Fn][] {
    return [['onWheel', this.onChange]]
  }
}
