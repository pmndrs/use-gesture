import CoordinatesRecognizer from './CoordinatesRecognizer'
import { getPointerEventData } from '../utils'
import GestureController from '../controllers/GestureController'
import { TransformedEvent, GestureFlag, ReactEventHandlerKey, Fn } from '../types'
import { genericEndState } from '../defaults'

export default class MoveRecognizer extends CoordinatesRecognizer {
  constructor(controller: GestureController, args: any[]) {
    super('move', controller, args)
  }

  onChange = (event: TransformedEvent): void => {
    if (!this.isEnabled()) return

    this.clearTimeout()
    this.setTimeout(this.onEnd)

    const { xy, ...rest } = getPointerEventData(event)

    if (!this.getState().active) {
      const startState = this.getStartState(xy, event)
      this.updateState({ moving: true, ...rest }, startState, GestureFlag.OnStart)
    } else {
      const kinematics = this.getKinematics(xy, event)
      this.updateState(rest, { ...kinematics, first: false }, GestureFlag.OnChange)
    }
  }

  onEnd = (): void => {
    if (!this.getState().active) return
    this.updateState({ moving: false }, { ...genericEndState, velocity: 0, vxvy: [0, 0] }, GestureFlag.OnEnd)
  }

  getEventBindings(): [ReactEventHandlerKey | ReactEventHandlerKey[], Fn][] {
    if (this.pointerEventsEnabled()) {
      return [['onPointerMove', this.onChange]]
    }
    return [['onMouseMove', this.onChange]]
  }
}
