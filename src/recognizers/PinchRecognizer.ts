import { TouchEvent } from 'react'
import DistanceAngleRecognizer from './DistanceAngleRecognizer'
import Controller from '../Controller'
import { UseGestureEvent, StateKey, IngKey } from '../types'
import { noop } from '../utils/utils'
import { getGenericEventData, getTwoTouchesEventData } from '../utils/event'

export default class PinchRecognizer extends DistanceAngleRecognizer<'pinch'> {
  stateKey = 'pinch' as StateKey<'pinch'>
  ingKey = 'pinching' as IngKey

  constructor(controller: Controller, args: any[]) {
    super('pinch', controller, args)
  }

  private pinchShouldStart = (event: UseGestureEvent) => {
    const { touches } = getGenericEventData(event)
    return this.enabled && touches === 2
  }

  onPinchStart = (event: UseGestureEvent<TouchEvent>) => {
    if (!this.pinchShouldStart(event)) return

    const { values, origin } = getTwoTouchesEventData(event)

    this.updateSharedState(getGenericEventData(event))

    const startState = {
      ...this.getStartGestureState(values, event),
      ...this.getGenericPayload(event, true),
    }

    this.updateGestureState({
      ...startState,
      ...this.getMovement(values, startState),
      origin,
      cancel: () => this.onCancel(event),
    })

    this.fireGestureHandler()
  }

  onPinchChange = (event: UseGestureEvent<TouchEvent>): void => {
    const { canceled, timeStamp, _active } = this.state
    if (canceled || !_active) return
    const genericEventData = getGenericEventData(event)
    if (genericEventData.touches !== 2 || event.timeStamp === timeStamp) return

    this.updateSharedState(genericEventData)

    const { values, origin } = getTwoTouchesEventData(event)
    const kinematics = this.getKinematics(values, event)

    this.updateGestureState({
      ...this.getGenericPayload(event),
      ...kinematics,
      origin,
      cancel: () => this.onCancel(event),
    })

    this.fireGestureHandler()
  }

  onPinchEnd = (event: UseGestureEvent): void => {
    this.state._active = false
    this.updateSharedState({ down: false, touches: 0 })

    this.updateGestureState({
      event,
      ...this.getMovement(this.state.values),
    })
    this.fireGestureHandler()
  }

  onCancel = (event: UseGestureEvent): void => {
    this.updateGestureState({ canceled: true, cancel: noop })
    requestAnimationFrame(() => this.onPinchEnd(event))
  }

  addBindings(): void {
    this.controller.addBindings('onTouchStart', this.onPinchStart)
    this.controller.addBindings('onTouchMove', this.onPinchChange)
    this.controller.addBindings(['onTouchEnd', 'onTouchCancel'], this.onPinchEnd)
  }
}
