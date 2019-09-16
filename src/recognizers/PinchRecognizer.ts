import { TouchEvent } from 'react'
import DistanceAngleRecognizer from './DistanceAngleRecognizer'
import { noop, getTwoTouchesEventData } from '../utils'
import GestureController from '../controllers/GestureController'
import { TransformedEvent, GestureFlag, ReactEventHandlerKey, Fn } from '../types'

export default class PinchRecognizer extends DistanceAngleRecognizer {
  sharedEndState = { pinching: false, down: false, touches: 0 }

  constructor(controller: GestureController, args: any[]) {
    super('pinch', controller, args)
  }

  onStart = (event: TransformedEvent<TouchEvent>): void => {
    if (!this.enabled || event.touches.length !== 2) return

    const { da, origin, ...rest } = getTwoTouchesEventData(event)

    const startState = this.getStartState(da, event)
    this.updateState(
      { ...rest, pinching: true, down: true },
      { ...startState, origin, cancel: () => this.onCancel(event) },
      GestureFlag.OnStart
    )
  }

  onChange = (event: TransformedEvent<TouchEvent>): void => {
    const { canceled, active, time } = this.state
    if (canceled || !active || event.touches.length !== 2 || event.timeStamp === time) return

    const { da, origin, ...rest } = getTwoTouchesEventData(event)

    const kinematics = this.getKinematics(da, event)
    const cancel = () => this.onCancel(event)

    this.updateState(rest, { ...kinematics, origin, first: false, cancel }, GestureFlag.OnChange)
  }

  onCancel = (event: TransformedEvent<TouchEvent>): void => {
    this.updateState(null, { canceled: true, cancel: noop })
    requestAnimationFrame(() => this.onEnd(event))
  }

  getEventBindings(): [ReactEventHandlerKey | ReactEventHandlerKey[], Fn][] {
    return [['onTouchStart', this.onStart], ['onTouchMove', this.onChange], [['onTouchEnd', 'onTouchCancel'], this.onEnd]]
  }
}
