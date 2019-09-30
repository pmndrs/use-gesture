import { WheelEvent } from 'react'
import DistanceAngleRecognizer from './DistanceAngleRecognizer'
import { getWheelEventData } from '../utils'
import GestureController from '../controllers/GestureController'
import { UseGestureEvent, ReactEventHandlerKey, Fn } from '../types'

export default class PinchWheelRecognizer extends DistanceAngleRecognizer {
  sharedStartState = { pinching: true }
  sharedEndState = { pinching: false }

  constructor(controller: GestureController, args: any[]) {
    super('pinch', controller, args)
  }

  getPayloadFromEvent(event: UseGestureEvent<WheelEvent>) {
    const {
      xy: [, delta_d],
      ...sharedPayload
    } = getWheelEventData(event)
    const {
      da: [prev_d, prev_a],
    } = this.state
    const d = prev_d - delta_d
    const a = prev_a !== void 0 ? prev_a : 0
    return { values: [d, a] as [number, number], sharedPayload }
  }

  onWheel = (event: UseGestureEvent<WheelEvent>): void => {
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
