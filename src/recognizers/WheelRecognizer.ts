import { WheelEvent } from 'react'
import CoordinatesRecognizer from './CoordinatesRecognizer'
import { addV, getWheelEventData } from '../utils'
import GestureController from '../controllers/GestureController'
import { UseGestureEvent, ReactEventHandlerKey, Fn } from '../types'

export default class WheelRecognizer extends CoordinatesRecognizer {
  sharedStartState = { wheeling: true }
  sharedEndState = { wheeling: false, velocity: 0, vxvy: [0, 0] }
  continuousGesture = true

  constructor(controller: GestureController, args: any[]) {
    super('wheel', controller, args)
  }

  getPayloadFromEvent(event: UseGestureEvent<WheelEvent>) {
    const { xy: prevXY } = this.state
    const { xy, ...sharedPayload } = getWheelEventData(event)
    const values = addV(xy, prevXY)

    return { values, sharedPayload }
  }

  onWheel = (event: UseGestureEvent<WheelEvent>): void => {
    if (event.ctrlKey && this.controller.actions.has('onPinch')) return
    this.timeoutHandler(event)
  }

  getEventBindings(): [ReactEventHandlerKey | ReactEventHandlerKey[], Fn][] {
    return [['onWheel', this.onWheel]]
  }
}
