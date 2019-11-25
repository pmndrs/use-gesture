import { WheelEvent } from 'react'
import CoordinatesRecognizer from './CoordinatesRecognizer'
import Controller from '../Controller'
import { UseGestureEvent, StateKey, IngKey } from '../types'
import { getWheelEventValues, getGenericEventData } from '../utils/event'
import { addV, calculateDistance, calculateDirection } from '../utils/math'

export default class WheelRecognizer extends CoordinatesRecognizer<'wheel'> {
  stateKey = 'wheel' as StateKey<'wheel'>
  ingKey = 'wheeling' as IngKey

  constructor(controller: Controller, args: any[]) {
    super('wheel', controller, args)
  }

  private wheelShouldRun = (event: UseGestureEvent<WheelEvent>) => {
    if (event.ctrlKey && 'pinch' in this.controller.handlers) return
    return this.enabled
  }

  private getValuesFromEvent = (event: UseGestureEvent<WheelEvent>) => {
    const { values: prevValues } = this.state
    const { values } = getWheelEventValues(event)
    return { values: addV(values, prevValues), delta: values }
  }

  onWheel = (event: UseGestureEvent<WheelEvent>): void => {
    if (!this.wheelShouldRun(event)) return
    this.clearTimeout()
    this.setTimeout(this.onWheelEnd)

    if (!this.state._active) this.onWheelStart(event)
    else this.onWheelChange(event)
  }

  onWheelStart = (event: UseGestureEvent<WheelEvent>): void => {
    const { values, delta } = this.getValuesFromEvent(event)

    this.updateSharedState(getGenericEventData(event))

    const startState = {
      ...this.getStartGestureState(values, event),
      ...this.getGenericPayload(event, true),
      initial: this.state.values,
    }

    this.updateGestureState({
      ...startState,
      ...this.getMovement(values, startState),
      offset: values,
      distance: calculateDistance(delta),
      direction: calculateDirection(delta),
    })

    this.fireGestureHandler()
  }

  onWheelChange = (event: UseGestureEvent<WheelEvent>): void => {
    const genericEventData = getGenericEventData(event)

    this.updateSharedState(genericEventData)

    const { values } = this.getValuesFromEvent(event)
    const kinematics = this.getKinematics(values, event)

    this.updateGestureState({
      ...this.getGenericPayload(event),
      ...kinematics,
    })

    this.fireGestureHandler()
  }

  onWheelEnd = (event: UseGestureEvent): void => {
    this.state._active = false

    this.updateGestureState({
      event,
      ...this.getMovement(this.state.values),
    })
    this.fireGestureHandler()
  }

  addBindings(): void {
    this.controller.addBindings('onWheel', this.onWheel)
  }
}