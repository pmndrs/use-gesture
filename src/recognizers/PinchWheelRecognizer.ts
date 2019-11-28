import { WheelEvent } from 'react'
import DistanceAngleRecognizer from './DistanceAngleRecognizer'
import Controller from '../Controller'
import { UseGestureEvent, StateKey, IngKey, Vector2 } from '../types'
import { getWheelEventValues, getGenericEventData } from '../utils/event'

export default class WheelRecognizer extends DistanceAngleRecognizer<'pinch'> {
  stateKey = 'pinch' as StateKey<'pinch'>
  ingKey = 'pinching' as IngKey

  constructor(controller: Controller, args: any[]) {
    super('pinch', controller, args)
  }

  private wheelShouldRun = (event: UseGestureEvent<WheelEvent>) => {
    return this.enabled && event.ctrlKey
  }

  private getValuesFromEvent = (event: UseGestureEvent<WheelEvent>) => {
    const {
      values: [, delta_d],
    } = getWheelEventValues(event)
    const {
      values: [prev_d, prev_a],
    } = this.state
    const d = prev_d - delta_d
    const a = prev_a !== void 0 ? prev_a : 0

    return {
      values: [d, a] as Vector2,
      origin: [event.clientX, event.clientY] as Vector2,
      delta: [0, delta_d] as Vector2,
    }
  }

  onWheel = (event: UseGestureEvent<WheelEvent>): void => {
    if (!this.wheelShouldRun(event)) return
    this.clearTimeout()
    this.setTimeout(this.onWheelEnd)

    if (!this.state._active) this.onWheelStart(event)
    else this.onWheelChange(event)
  }

  onWheelStart = (event: UseGestureEvent<WheelEvent>): void => {
    const { values, delta, origin } = this.getValuesFromEvent(event)

    if (!this.controller.config.eventOptions.passive) {
      event.preventDefault()
    } else if (process.env.NODE_ENV === 'development') {
      console.warn(
        'To support zoom on trackpads, try using the `domTarget` option and `config.event.passive` set to `false`. This message will only appear in development mode.'
      )
    }

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
      delta,
      origin,
    })

    this.fireGestureHandler()
  }

  onWheelChange = (event: UseGestureEvent<WheelEvent>): void => {
    const genericEventData = getGenericEventData(event)

    this.updateSharedState(genericEventData)

    const { values, origin, delta } = this.getValuesFromEvent(event)
    const kinematics = this.getKinematics(values, event)

    this.updateGestureState({
      ...this.getGenericPayload(event),
      ...kinematics,
      origin,
      delta,
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
