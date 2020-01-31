import { WheelEvent } from 'react'
import CoordinatesRecognizer from './CoordinatesRecognizer'
import Controller from '../Controller'
import { UseGestureEvent, IngKey } from '../types'
import { getWheelEventValues, getGenericEventData } from '../utils/event'
import { addV, calculateDistance, calculateDirection } from '../utils/math'

export default class WheelRecognizer extends CoordinatesRecognizer<'wheel'> {
  ingKey = 'wheeling' as IngKey

  constructor(controller: Controller, args: any[]) {
    super('wheel', controller, args)
  }

  private wheelShouldRun = (event: UseGestureEvent<WheelEvent>) => {
    if (event.ctrlKey && 'pinch' in this.controller.handlers) return false
    return this.enabled
  }

  private getValuesFromEvent = (event: UseGestureEvent<WheelEvent>) => {
    const { values: prevValues } = this.state
    const { values } = getWheelEventValues(event)
    return { values: addV(values, prevValues) }
  }

  onWheel = (event: UseGestureEvent<WheelEvent>): void => {
    if (!this.wheelShouldRun(event)) return
    this.clearTimeout()
    this.setTimeout(this.onWheelEnd)

    if (!this.state._active) this.onWheelStart(event)
    else this.onWheelChange(event)
  }

  onWheelStart = (event: UseGestureEvent<WheelEvent>): void => {
    const { values } = this.getValuesFromEvent(event)

    this.updateSharedState(getGenericEventData(event))

    const startState = {
      ...this.getStartGestureState(values, event),
      ...this.getGenericPayload(event, true),
      initial: this.state.values,
    }

    const movementDetection = this.getMovement(values, startState)
    const delta = movementDetection.delta!

    this.updateGestureState({
      ...startState,
      ...movementDetection,
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

  onWheelEnd = (): void => {
    this.state._active = false
    this.updateGestureState({ ...this.getMovement(this.state.values), velocities: [0, 0], velocity: 0 })
    this.fireGestureHandler()
  }

  addBindings(): void {
    this.controller.addBindings('onWheel', this.onWheel)
  }
}
