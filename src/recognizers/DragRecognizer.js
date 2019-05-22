import CoordinatesRecognizer from './CoordinatesRecognizer'
import { noop, getPointerEventData, GESTURE_ONCHANGE, GESTURE_ONSTART, GESTURE_ONEND } from '../utils'
import { genericEndState } from '../default'

export default class DragRecognizer extends CoordinatesRecognizer {
  dragListeners = []

  constructor(...args) {
    super('drag', ...args)
  }

  onStart = event => {
    if (!this.isEnabled()) return

    const { values, ...rest } = getPointerEventData(event)
    // making sure we're not dragging the element when more than one finger press the screen
    if (rest.touches > 1) return

    const { currentTarget, pointerId } = event
    if (this.hasPointerEvents()) {
      currentTarget.setPointerCapture(pointerId)
    } else {
      this.removeWindowListeners()
      const dragListeners = [
        ['mousemove', this.onChange],
        ['mouseup', this.onEnd],
        ['touchmove', this.onChange],
        ['touchend', this.onEnd],
        ['touchcancel', this.onEnd]
      ]
      this.addWindowListeners(dragListeners)
    }

    const startState = this.getStartState({ args: this.args, event, values })

    this.updateState(
      { ...rest, dragging: true, down: true },
      { ...startState, currentTarget, pointerId, cancel: () => this.onCancel(event) },
      GESTURE_ONSTART
    )
  }

  onChange = event => {
    const { canceled, active } = this.getState()
    if (canceled || !active) return

    const { values, ...rest } = getPointerEventData(event)

    if (rest.buttons === 0 && rest.touches === 0) {
      this.onEnd(event)
      return
    }

    const kinematics = this.getKinematics({ values, event })
    const cancel = () => this.onCancel(event)

    this.updateState(rest, { ...kinematics, first: false, cancel }, GESTURE_ONCHANGE)
  }

  onEnd = event => {
    const state = this.getState()
    if (!state.active) return

    const { currentTarget, pointerId } = state
    if (this.hasPointerEvents()) currentTarget.releasePointerCapture(pointerId)
    else this.removeWindowListeners(this.dragListeners)

    this.updateState({ dragging: false, down: false, buttons: 0, touches: 0 }, { ...genericEndState, event }, GESTURE_ONEND)
  }

  onCancel = event => {
    this.updateState(null, { canceled: true, cancel: noop })
    requestAnimationFrame(() => this.onEnd(event))
  }

  getEventBindings = () => {
    if (this.hasPointerEvents()) {
      return [['onPointerDown', this.onStart], ['onPointerMove', this.onChange], [['onPointerUp', 'onPointerCancel'], this.onEnd]]
    }
    return [[['onMouseDown', 'onTouchStart'], this.onStart]]
  }
}
