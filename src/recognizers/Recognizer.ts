import { initialState, mappedKeys } from '../defaults'
import GestureController from '../controllers/GestureController'
import { Coordinates, DistanceAngle, StateKey, GestureState, GestureKey, SharedGestureState } from '../../types/states.d'
import { Fn, Vector2, TransformType } from '../../types/common.d'
import { ReactEventHandlerKey, GestureFlag, TransformedEvent, ReactEventHandlers } from '../../types/events.d'

export default abstract class Recognizer<GestureType extends Coordinates | DistanceAngle, BinderType extends ReactEventHandlers | Fn> {
  protected stateKey: StateKey

  //Todo Fix handler any
  constructor(
    protected readonly gestureKey: GestureKey,
    protected readonly controller: GestureController<BinderType>,
    protected readonly args: any[] = []
  ) {
    this.stateKey = mappedKeys[gestureKey].stateKey
  }

  protected isEnabled = (): boolean => {
    return this.controller.config.enabled && this.controller.config[this.gestureKey]
  }

  protected setTimeout = (callback: (...args: any[]) => void, ms: number, ...args: any[]): void => {
    this.controller.timeouts[this.stateKey] = window.setTimeout(callback, ms, ...args)
  }

  protected clearTimeout = () => {
    clearTimeout(this.controller.timeouts[this.stateKey])
  }

  protected getState = (): GestureState<GestureType> => this.controller.state[this.stateKey] as GestureState<GestureType>
  protected getSharedState = () => this.controller.state.shared
  protected hasPointerEvents = () => this.controller.config.pointerEvents
  protected getEnabledConfig = () => this.controller.config.enabled
  protected getTransformConfig = () => this.controller.config.transform

  protected addWindowListeners = (listeners: [string, Fn][]) => {
    this.controller.addWindowListeners(this.stateKey, listeners)
  }

  protected removeWindowListeners = () => {
    this.controller.removeWindowListeners(this.stateKey)
  }

  public abstract getEventBindings(): [ReactEventHandlerKey | ReactEventHandlerKey[], Fn][]

  protected updateState = (
    sharedState: Partial<SharedGestureState> | null,
    gestureState: Partial<GestureState<GestureType>>,
    gestureFlag?: GestureFlag
  ): void => {
    if (gestureFlag) this.controller.updateState(sharedState, gestureState, this.gestureKey, gestureFlag)
    else this.controller.updateState(sharedState, gestureState, this.gestureKey)
  }

  protected getStartState = ({
    values,
    event,
    args,
  }: {
    values: Vector2
    event: TransformedEvent
    args: any[]
  }): GestureState<GestureType> => {
    const state = this.getState()
    const initial = initialState[this.stateKey]
    const transform: TransformType = state.transform || event.transform || this.getTransformConfig()
    const lastLocal = state.local || initial.local

    return <GestureState<GestureType>>{
      ...(initial as object),
      event,
      values,
      initial: values,
      previous: values,
      local: lastLocal,
      lastLocal,
      first: true,
      active: true,
      transform,
      time: event.timeStamp,
      args,
    }
  }
}
