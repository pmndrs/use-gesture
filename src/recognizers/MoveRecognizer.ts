import {} from 'react'
import CoordinatesRecognizer from './CoordinatesRecognizer'
import Controller from '../Controller'
import { UseGestureEvent, IngKey } from '../types'
import { getGenericEventData, getPointerEventValues } from '../utils/event'

export default class MoveRecognizer extends CoordinatesRecognizer<'move'> {
  
  ingKey = 'moving' as IngKey
  debounced = true

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

  onMoveEnd = (): void => {
    this.state._active = false

    this.updateGestureState({ ...this.getMovement(this.state.values), velocities: [0, 0], velocity: 0 })
    this.fireGestureHandler()
  }

  onPointerEnter = (event: UseGestureEvent): void => {
    this.controller.state.shared.hovering = true
    if (!this.controller.config.enabled) return

    if (this.controller.config.hover!.enabled) {
      const { values } = getPointerEventValues(event)

      const state = {
        ...this.controller.state.shared,
        ...this.state,
        ...this.getGenericPayload(event, true),
        values,
        active: true,
        hovering: true,
      }

      this.controller.handlers.hover!({ ...state, ...this.mapStateValues(state) })
    }

    if ('move' in this.controller.handlers) this.onMoveStart(event)
  }

  onPointerLeave = (event: UseGestureEvent): void => {
    this.controller.state.shared.hovering = false
    if ('move' in this.controller.handlers) this.onMoveEnd()

    if (this.controller.config.hover!.enabled) {
      const { values } = getPointerEventValues(event)

      const state = {
        ...this.controller.state.shared,
        ...this.state,
        ...this.getGenericPayload(event),
        values,
        active: false,
      }

      this.controller.handlers.hover!({ ...state, ...this.mapStateValues(state) })
    }
  }

  addBindings(): void {
    if (this.controller.config.pointer) {
      if ('move' in this.controller.handlers) {
        this.controller.addBindings('onPointerMove', this.onMove)
      }
      if ('hover' in this.controller.handlers) {
        this.controller.addBindings('onPointerEnter', this.onPointerEnter)
        this.controller.addBindings('onPointerLeave', this.onPointerLeave)
      }
    } else {
      if ('move' in this.controller.handlers) {
        this.controller.addBindings('onMouseMove', this.onMove)
      }
      if ('hover' in this.controller.handlers) {
        this.controller.addBindings('onMouseEnter', this.onPointerEnter)
        this.controller.addBindings('onMouseLeave', this.onPointerLeave)
      }
    }
  }
}
