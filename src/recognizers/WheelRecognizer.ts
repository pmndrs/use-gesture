import { WheelEvent } from 'react'
import CoordinatesRecognizer from './CoordinatesRecognizer'
import { UseGestureEvent, IngKey } from '../types'
import { getWheelEventValues, getGenericEventData } from '../utils/event'
import { addV, calculateAllGeometry } from '../utils/math'
import { getStartGestureState, getGenericPayload } from './Recognizer'

export default class WheelRecognizer extends CoordinatesRecognizer<'wheel'> {
  readonly ingKey = 'wheeling' as IngKey
  readonly stateKey = 'wheel'
  debounced = true

  private wheelShouldRun = (event: UseGestureEvent<WheelEvent>) => {
    if (event.ctrlKey && 'pinch' in this.controller.handlers) return false
    return this.enabled
  }

  private getValuesFromEvent = (event: UseGestureEvent<WheelEvent>) => {
    const { values: prevValues } = this.state
    const { values } = getWheelEventValues(event)
    return { values: addV(values, prevValues) }
  }

  handleEvent = (event: UseGestureEvent<WheelEvent>): void => {
    if (!this.wheelShouldRun(event)) return
    this.clearTimeout()
    this.setTimeout(this.onEnd)

    this.updateSharedState(getGenericEventData(event))

    if (!this.state._active) {
      this.onStart(event)
    } else {
      this.onChange(event)
    }

    this.fireGestureHandler()
  }

  onStart = (event: UseGestureEvent<WheelEvent>): void => {
    const { values } = this.getValuesFromEvent(event)
    

    const startState = {
      ...getStartGestureState(this, values, event),
      ...getGenericPayload(this, event, true),
      initial: this.state.values,
    }

    const movementDetection = this.getMovement(values, startState)
    const delta = movementDetection.delta!

    this.updateGestureState({
      ...startState,
      ...movementDetection,
      ...calculateAllGeometry(delta),
    })
  }

  onChange = (event: UseGestureEvent<WheelEvent>): void => {
    const { values } = this.getValuesFromEvent(event)

    this.updateGestureState({
      ...getGenericPayload(this, event),
      ...this.getKinematics(values, event),
    })
  }

  onEnd = (): void => {
    this.state._active = false
    this.updateGestureState({ ...this.getMovement(this.state.values), velocities: [0, 0], velocity: 0 })
    this.fireGestureHandler()
  }

  addBindings(): void {
    this.controller.addBindings('onWheel', this.handleEvent)
  }
}
