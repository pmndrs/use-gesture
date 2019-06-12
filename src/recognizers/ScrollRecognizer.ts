import CoordinatesRecognizer from './CoordinatesRecognizer'
import { getScrollEventData } from '../utils'
import GestureController from '../controllers/GestureController'
import { TransformedEvent, GestureFlag, ReactEventHandlerKey } from '../../types/events.d'
import { genericEndState } from '../defaults'
import { Fn } from '../../types/common.d'

export default class ScrollRecognizer extends CoordinatesRecognizer {
  constructor(controller: GestureController, args: any[]) {
    super('scroll', controller, args)
  }

  onChange = (event: TransformedEvent): void => {
    if (!this.isEnabled()) return

    this.clearTimeout()
    this.setTimeout(this.onEnd, 100)

    const { values, ...rest } = getScrollEventData(event)

    if (!this.getState().active) {
      const startState = this.getStartState(values, event)
      this.updateState({ scrolling: true, ...rest }, startState, GestureFlag.OnStart)
    } else {
      const kinematics = this.getKinematics(values, event)
      this.updateState(rest, { ...kinematics, first: false }, GestureFlag.OnChange)
    }
  }

  onEnd = (): void => {
    if (!this.getState().active) return
    this.updateState({ scrolling: false }, { ...genericEndState, velocity: 0, velocities: [0, 0] }, GestureFlag.OnEnd)
  }

  getEventBindings(): [ReactEventHandlerKey | ReactEventHandlerKey[], Fn][] {
    return [['onScroll', this.onChange]]
  }
}
