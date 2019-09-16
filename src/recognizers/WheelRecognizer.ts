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
    if (!this.enabled) return
    if (event.ctrlKey && this.controller.actions.has('onPinch')) return

    this.clearTimeout()
    this.setTimeout(this.onEnd)

    const { xy: prevXY, active } = this.state
    const { xy, ...rest } = getWheelEventData(event)
    const values = addV(xy, prevXY)

    if (!active) {
      const startState = this.getStartState(values, event)
      this.updateState({ wheeling: true, ...rest }, startState, GestureFlag.OnStart)
    } else {
      const kinematics = this.getKinematics(values, event)
      this.updateState(rest, { ...kinematics, first: false }, GestureFlag.OnChange)
    }
  }

  onEnd = (): void => {
    if (!this.getState().active) return
    this.updateState({ wheeling: false }, { ...genericEndState, velocity: 0, vxvy: [0, 0] }, GestureFlag.OnEnd)
  }

  getEventBindings(): [ReactEventHandlerKey | ReactEventHandlerKey[], Fn][] {
    return [['onWheel', this.onChange]]
  }
}
