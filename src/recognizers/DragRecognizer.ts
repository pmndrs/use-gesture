import CoordinatesRecognizer from './CoordinatesRecognizer'
import { noop, getPointerEventData } from '../utils'
import GestureController from '../controllers/GestureController'
import { TransformedEvent, GestureFlag, ReactEventHandlerKey, Fn } from '../types'

export default class DragRecognizer extends CoordinatesRecognizer {
  constructor(controller: GestureController, args: any[]) {
    super('drag', controller, args)
  }

  onStart = (event: TransformedEvent): void => {
    if (!this.enabled) return

    const { xy, ...rest } = getPointerEventData(event)
    // making sure we're not dragging the element when more than one finger press the screen
    if (rest.touches > 1) return

    this.removeWindowListeners()
    const dragListeners: [string, Fn][] = [
      ['mousemove', this.onChange],
      ['mouseup', this.onEnd],
      ['touchmove', this.onChange],
      ['touchend', this.onEnd],
      ['touchcancel', this.onEnd],
    ]
    this.addWindowListeners(dragListeners)

    const startState = this.getStartState(xy, event)
    this.updateState({ ...rest, dragging: true, down: true }, { ...startState, cancel: () => this.onCancel(event) }, GestureFlag.OnStart)
  }

  onChange = (event: TransformedEvent): void => {
    const { canceled, active } = this.state
    if (canceled || !active) return

    const { xy, ...rest } = getPointerEventData(event)

    if (rest.buttons === 0 && rest.touches === 0) {
      this.onEnd(event)
      return
    }

    const kinematics = this.getKinematics(xy, event)
    const cancel = () => this.onCancel(event)

    this.updateState(rest, { ...kinematics, first: false, cancel }, GestureFlag.OnChange)
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
