import { PointerEvent } from 'react'
import CoordinatesRecognizer from './CoordinatesRecognizer'
import { noop, getPointerEventData } from '../utils'
import GestureController from '../controllers/GestureController'
import { TransformedEvent, GestureFlag, ReactEventHandlerKey } from '../../types/events.d'
import { Fn } from '../../types/common.d'
import { genericEndState } from '../defaults'

export default class DragRecognizer extends CoordinatesRecognizer {
  constructor(controller: GestureController, args: any[]) {
    super('drag', controller, args)
  }

  onStart = (event: TransformedEvent): void => {
    if (!this.isEnabled()) return

    const { values, ...rest } = getPointerEventData(event)
    // making sure we're not dragging the element when more than one finger press the screen
    if (rest.touches > 1) return

    const { currentTarget, pointerId } = event as PointerEvent
    if (this.pointerEventsEnabled()) {
      // if pointers events
      currentTarget && (currentTarget as any).setPointerCapture(pointerId)
    } else {
      this.removeWindowListeners()
      const dragListeners: [string, Fn][] = [
        ['mousemove', this.onChange],
        ['mouseup', this.onEnd],
        ['touchmove', this.onChange],
        ['touchend', this.onEnd],
        ['touchcancel', this.onEnd],
      ]
      this.addWindowListeners(dragListeners)
    }

    const startState = this.getStartState(values, event)

    this.updateState(
      { ...rest, dragging: true, down: true },
      { ...startState, currentTarget, pointerId, cancel: () => this.onCancel(event) },
      GestureFlag.OnStart
    )
  }

  onChange = (event: TransformedEvent): void => {
    const { canceled, active } = this.getState()
    if (canceled || !active) return

    const { values, ...rest } = getPointerEventData(event)

    if (rest.buttons === 0 && rest.touches === 0) {
      this.onEnd(event)
      return
    }

    const kinematics = this.getKinematics(values, event)
    const cancel = () => this.onCancel(event)

    this.updateState(rest, { ...kinematics, first: false, cancel }, GestureFlag.OnChange)
  }

  onEnd = (event: TransformedEvent): void => {
    const state = this.getState()
    if (!state.active) return

    const { currentTarget, pointerId } = state
    if (currentTarget && this.pointerEventsEnabled()) (currentTarget as any).releasePointerCapture(pointerId)
    else this.removeWindowListeners()

    this.updateState({ dragging: false, down: false, buttons: 0, touches: 0 }, { ...genericEndState, event }, GestureFlag.OnEnd)
  }

  onCancel = (event: TransformedEvent): void => {
    this.updateState(null, { canceled: true, cancel: noop })
    requestAnimationFrame(() => this.onEnd(event))
  }

  getEventBindings(): [ReactEventHandlerKey | ReactEventHandlerKey[], Fn][] {
    if (this.pointerEventsEnabled()) {
      return [['onPointerDown', this.onStart], ['onPointerMove', this.onChange], [['onPointerUp', 'onPointerCancel'], this.onEnd]]
    }
    return [[['onMouseDown', 'onTouchStart'], this.onStart]]
  }
}
