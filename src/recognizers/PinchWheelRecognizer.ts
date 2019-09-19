import { WheelEvent } from 'react'
import DistanceAngleRecognizer from './DistanceAngleRecognizer'
import { getWheelEventData } from '../utils'
import GestureController from '../controllers/GestureController'
import { TransformedEvent, ReactEventHandlerKey, Fn } from '../types'

export default class PinchWheelRecognizer extends DistanceAngleRecognizer {
  sharedStartState = { pinching: true }
  sharedEndState = { pinching: false }

  constructor(controller: GestureController, args: any[]) {
    super('pinch', controller, args)
  }

  getPayloadFromEvent(event: TransformedEvent<WheelEvent>) {
    const { xy, ...sharedPayload } = getWheelEventData(event)
    const d = this.state.da[0] - xy[1]
    return { values: [d, undefined] as [number, number | undefined], sharedPayload }
  }

  onWheel = (event: TransformedEvent<WheelEvent>): void => {
    if (!event.ctrlKey) return

    if (!this.controller.config.passiveEvents) event.preventDefault()
    else if (process.env.NODE_ENV === 'development')
      console.warn(
        'To support zoom on trackpads, try using the `domTarget` option and `config.event.passive` set to `false`. This message will only appear in development mode.'
      )

    this.timeoutHandler(event)
  }

  getEventBindings(): [ReactEventHandlerKey | ReactEventHandlerKey[], Fn][] {
    return [['onWheel', this.onWheel]]
  }
}
