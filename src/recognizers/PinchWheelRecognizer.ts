import { WheelEvent } from 'react'
import DistanceAngleRecognizer from './DistanceAngleRecognizer'
import { getWheelEventData } from '../utils'
import GestureController from '../controllers/GestureController'
import { TransformedEvent, GestureFlag, ReactEventHandlerKey, Fn } from '../types'
import { genericEndState } from '../defaults'

export default class PinchWheelRecognizer extends DistanceAngleRecognizer {
  constructor(controller: GestureController, args: any[]) {
    super('pinch', controller, args)
  }

  onChange = (event: TransformedEvent<WheelEvent>): void => {
    if (!this.isEnabled() || !event.ctrlKey) return

    if (!this.controller.config.passiveEvents) event.preventDefault()
    else if (process.env.NODE_ENV === 'development')
      console.warn(
        'To support zoom on trackpads, try using the `domTarget` option and `config.event.passive` set to `false`. This message will only appear in development mode.'
      )
    this.clearTimeout()
    this.setTimeout(this.onEnd)

    const { xy, ...rest } = getWheelEventData(event)
    const d = this.getState().da[0] - xy[1]

    if (!this.getState().active) {
      const startState = this.getStartState([d, 0], event)
      this.updateState({ pinching: true, ...rest }, startState, GestureFlag.OnStart)
    } else {
      const kinematics = this.getKinematics([d, undefined], event)
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
