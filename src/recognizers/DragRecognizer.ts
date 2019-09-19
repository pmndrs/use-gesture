import CoordinatesRecognizer from './CoordinatesRecognizer'
import { getPointerEventData } from '../utils'
import GestureController from '../controllers/GestureController'
import { TransformedEvent, ReactEventHandlerKey, Fn } from '../types'

export default class DragRecognizer extends CoordinatesRecognizer {
  sharedStartState = { dragging: true, down: true }
  sharedEndState = { dragging: false, down: false, buttons: 0, touches: 0 }

  constructor(controller: GestureController, args: any[]) {
    super('drag', controller, args)
  }

  getPayloadFromEvent(event: TransformedEvent) {
    const { xy, ...sharedPayload } = getPointerEventData(event)
    return { values: xy, sharedPayload }
  }

  onDragStart = (event: TransformedEvent): void => {
    if (!this.enabled) return

    // making sure we're not dragging the element when more than one finger press the screen
    const { touches } = getPointerEventData(event)
    if (touches > 1) return

    this.removeWindowListeners()
    const dragListeners: [string, Fn][] = [
      ['mousemove', this.onDragChange],
      ['mouseup', this.onEnd],
      ['touchmove', this.onDragChange],
      ['touchend', this.onEnd],
      ['touchcancel', this.onEnd],
    ]
    this.addWindowListeners(dragListeners)

    this.onStart(event, { cancel: () => this.onCancel(event) })
  }

  onDragChange = (event: TransformedEvent): void => {
    const { canceled, active } = this.state
    if (canceled || !active) return

    const { buttons, touches } = getPointerEventData(event)

    if (buttons === 0 && touches === 0) {
      this.onEnd(event)
      return
    }

    this.onChange(event, { cancel: () => this.onCancel(event) })
  }

  getEventBindings(): [ReactEventHandlerKey | ReactEventHandlerKey[], Fn][] {
    return [[['onMouseDown', 'onTouchStart'], this.onDragStart]]
  }
}
