import { PointerEvent } from 'react'
import CoordinatesRecognizer from './CoordinatesRecognizer'
import { getPointerEventData } from '../utils'
import GestureController from '../controllers/GestureController'
import { UseGestureEvent, ReactEventHandlerKey, Fn } from '../types'

const DEFAULT_DRAG_DELAY = 180

export default class DragRecognizer extends CoordinatesRecognizer {
  sharedStartState = { dragging: true, down: true }
  sharedEndState = { dragging: false, down: false, buttons: 0, touches: 0 }

  delayedEvent?: UseGestureEvent

  constructor(controller: GestureController, args: any[]) {
    super('drag', controller, args)
  }

  getPayloadFromEvent(event: UseGestureEvent) {
    const { xy, ...sharedPayload } = getPointerEventData(event)
    return { values: xy, sharedPayload }
  }

  onDragStart = (event: UseGestureEvent): void => {
    if (!this.enabled) return

    // making sure we're not dragging the element when more than one finger press the screen
    const { touches } = getPointerEventData(event)
    if (touches > 1) return

    const { currentTarget, pointerId } = event as PointerEvent
    if (this.controller.config.pointerEvents) {
      // if pointers events
      currentTarget && (currentTarget as any).setPointerCapture(pointerId)
    } else {
      this.removeWindowListeners()
      const dragListeners: [string, Fn][] = [
        ['mousemove', this.onDragChange],
        ['touchmove', this.onDragChange],
        ['mouseup', this.onDragEnd],
        ['touchend', this.onDragEnd],
        ['touchcancel', this.onDragEnd],
      ]
      this.addWindowListeners(dragListeners)
    }

    if (this.controller.config.dragDelay) {
      const dragDelay = typeof this.controller.config.dragDelay === 'number' ? this.controller.config.dragDelay : DEFAULT_DRAG_DELAY
      if (typeof event.persist === 'function') event.persist()
      this.delayedEvent = event

      this.setTimeout(() => {
        this.onStart(this.delayedEvent!, { currentTarget, pointerId, cancel: () => this.onCancel(this.delayedEvent!) })
      }, dragDelay)
    } else {
      this.onStart(event, { currentTarget, pointerId, cancel: () => this.onCancel(event) })
    }
  }

  onDragChange = (event: UseGestureEvent): void => {
    const { canceled, active } = this.state
    if (canceled || !active) return

    const { buttons, touches } = getPointerEventData(event)

    if (buttons === 0 && touches === 0) {
      this.onEnd(event)
      return
    }

    this.onChange(event, { cancel: () => this.onCancel(event) })
  }

  onDragEnd = (event: UseGestureEvent): void => {
    if (!this.state.active) {
      this.clearTimeout()
      return
    }

    const { currentTarget, pointerId } = this.state
    if (currentTarget && this.controller.config.pointerEvents) (currentTarget as any).releasePointerCapture(pointerId)
    this.onEnd(event)
  }

  getEventBindings(): [ReactEventHandlerKey | ReactEventHandlerKey[], Fn][] {
    if (this.controller.config.pointerEvents) {
      return [['onPointerDown', this.onDragStart], ['onPointerMove', this.onDragChange], [['onPointerUp'], this.onDragEnd]]
    }
    return [[['onMouseDown', 'onTouchStart'], this.onDragStart]]
  }
}
