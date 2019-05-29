import DistanceAngleRecognizer from './DistanceAngleRecognizer'
import { noop, getTwoTouchesEventData } from '../utils'
import GestureController from '../controllers/GestureController'
import { TransformedEvent, GestureFlag, ReactEventHandlerKey, ReactEventHandlers } from '../../types/events.d'
import { genericEndState } from '../defaults'
import { Fn } from '../../types/common.d'

export default class PinchRecognizer extends DistanceAngleRecognizer {
  constructor(controller: GestureController<ReactEventHandlers | Fn>, args: any[]) {
    super('pinch', controller, args)
  }

  onStart = (event: TransformedEvent<TouchEvent>): void => {
    if (!this.isEnabled() || event.touches.length !== 2) return

    const { values, origin, ...rest } = getTwoTouchesEventData(event)

    const startState = this.getStartState(values, event)
    this.updateState(
      { ...rest, pinching: true, down: true },
      { ...startState, origin, cancel: () => this.onCancel(event) },
      GestureFlag.OnStart
    )
  }

  onChange = (event: TransformedEvent<TouchEvent>): void => {
    const { canceled, active } = this.getState()
    if (canceled || !active || event.touches.length !== 2) return

    const { values, origin, ...rest } = getTwoTouchesEventData(event)

    const kinematics = this.getKinematics(values, event)
    const cancel = () => this.onCancel(event)

    this.updateState(rest, { ...kinematics, origin, first: false, cancel }, GestureFlag.OnChange)
  }

  onEnd = (event: TransformedEvent<TouchEvent>): void => {
    if (!this.getState().active) return
    this.updateState({ pinching: false, down: false, touches: 0 }, { ...genericEndState, event }, GestureFlag.OnEnd)
  }

  onCancel = (event: TransformedEvent<TouchEvent>): void => {
    this.updateState(null, { canceled: true, cancel: noop })
    requestAnimationFrame(() => this.onEnd(event))
  }

  getEventBindings(): [ReactEventHandlerKey | ReactEventHandlerKey[], Fn][] {
    return [['onTouchStart', this.onStart], ['onTouchMove', this.onChange], [['onTouchEnd', 'onTouchCancel'], this.onEnd]]
  }
}
