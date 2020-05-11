import {} from 'react'
import CoordinatesRecognizer from './CoordinatesRecognizer'
import { UseGestureEvent } from '../types'
import { getGenericEventData, getPointerEventValues } from '../utils/event'
import { getStartGestureState, getGenericPayload } from './Recognizer'
import { addBindings } from '../Controller'

export default class MoveRecognizer extends CoordinatesRecognizer<'move'> {
  readonly ingKey = 'moving'
  readonly stateKey = 'move'

  debounced = true

  onMove = (event: UseGestureEvent): void => {
    if (!this.enabled) return
    this.setTimeout(this.onMoveEnd)

    if (!this.state._active) this.onMoveStart(event)
    else this.onMoveChange(event)
  }

  onMoveStart = (event: UseGestureEvent): void => {
    const values = getPointerEventValues(event)

    this.updateSharedState(getGenericEventData(event))

    this.updateGestureState({
      ...getStartGestureState(this, values, event),
      ...getGenericPayload(this, event, true),
    })


    this.updateGestureState(this.getMovement(values))
    this.fireGestureHandler()
  }

  onMoveChange = (event: UseGestureEvent): void => {
    const genericEventData = getGenericEventData(event)

    this.updateSharedState(genericEventData)

    const values = getPointerEventValues(event)
    const kinematics = this.getKinematics(values, event)

    this.updateGestureState({
      ...getGenericPayload(this, event),
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
      const values = getPointerEventValues(event)

      const state = {
        ...this.controller.state.shared,
        ...this.state,
        ...getGenericPayload(this, event, true),
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
      const values = getPointerEventValues(event)

      const state = {
        ...this.controller.state.shared,
        ...this.state,
        ...getGenericPayload(this, event),
        values,
        active: false,
      }

      this.controller.handlers.hover!({ ...state, ...this.mapStateValues(state) })
    }
  }

  addBindings(bindings: any): void {
    if ('move' in this.controller.handlers) {
      addBindings(bindings, 'onPointerMove', this.onMove)
    }
    if ('hover' in this.controller.handlers) {
      addBindings(bindings, 'onPointerEnter', this.onPointerEnter)
      addBindings(bindings, 'onPointerLeave', this.onPointerLeave)
    }
  }
}
