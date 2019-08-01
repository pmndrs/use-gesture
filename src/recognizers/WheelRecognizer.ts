import { WheelEvent } from 'react'
import CoordinatesRecognizer from './CoordinatesRecognizer'
import { addV, getWheelEventData } from '../utils'
import GestureController from '../controllers/GestureController'
import { TransformedEvent, GestureFlag, ReactEventHandlerKey, Fn } from '../types'
import { genericEndState } from '../defaults'

export default class WheelRecognizer extends CoordinatesRecognizer {
  constructor(controller: GestureController, args: any[]) {
    super('wheel', controller, args)
  }

  onChange = (event: TransformedEvent<WheelEvent>): void => {
    if (!this.isEnabled()) return

    this.clearTimeout()
    this.setTimeout(this.onEnd)

    const { values: eventValues, ...rest } = getWheelEventData(event)
    const values = addV(eventValues, this.getState().values)

    if (!this.getState().active) {
      const startState = this.getStartState(values, event)
      this.updateState({ wheeling: true, ...rest }, startState, GestureFlag.OnStart)
    } else {
      const kinematics = this.getKinematics(values, event)
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
