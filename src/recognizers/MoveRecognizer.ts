import {} from 'react'
import CoordinatesRecognizer from './CoordinatesRecognizer'
import Controller from '../Controller'
import { UseGestureEvent, StateKey, IngKey } from '../types'
import { getGenericEventData, getPointerEventValues } from '../utils/event'

export default class MoveRecognizer extends CoordinatesRecognizer<'move'> {
  stateKey = 'move' as StateKey<'move'>
  ingKey = 'moving' as IngKey

  constructor(controller: Controller, args: any[]) {
    super('move', controller, args)
  }

  private moveShouldRun = () => {
    return this.enabled
  }

  onMove = (event: UseGestureEvent): void => {
    if (!this.moveShouldRun()) return
    this.clearTimeout()
    this.setTimeout(this.onMoveEnd)

    if (!this.state._active) this.onMoveStart(event)
    else this.onMoveChange(event)
  }

  onMoveStart = (event: UseGestureEvent): void => {
    const { values } = getPointerEventValues(event)

    this.updateSharedState(getGenericEventData(event))

    const startState = {
      ...this.getStartGestureState(values, event),
      ...this.getGenericPayload(event, true),
    }

    this.updateGestureState({
      ...startState,
      ...this.getMovement(values, startState),
    })

    this.fireGestureHandler()
  }

  onMoveChange = (event: UseGestureEvent): void => {
    const genericEventData = getGenericEventData(event)

    this.updateSharedState(genericEventData)

    const { values } = getPointerEventValues(event)
    const kinematics = this.getKinematics(values, event)

    this.updateGestureState({
      ...this.getGenericPayload(event),
      ...kinematics,
    })

    this.fireGestureHandler()
  }

  onMoveEnd = (event: UseGestureEvent): void => {
    this.state._active = false

    this.updateGestureState({
      event,
      ...this.getMovement(this.state.values),
    })
    this.fireGestureHandler()
  }

  addBindings(): void {
    if (this.controller.config.pointer) {
      this.controller.addBindings('onPointerMove', this.onMove)
    } else {
      this.controller.addBindings('onMouseMove', this.onMove)
    }
  }
}
