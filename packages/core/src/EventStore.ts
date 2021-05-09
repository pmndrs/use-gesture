import type { Controller } from './Controller'
import { toDomEventType } from './utils/events'

export class EventStore {
  private _listeners: (() => void)[] = []
  private _ctrl: Controller
  constructor(ctrl: Controller) {
    this._ctrl = ctrl
  }

  add(
    element: EventTarget,
    device: string,
    action: string,
    handler: (event: any) => void,
    options?: AddEventListenerOptions
  ) {
    const type = toDomEventType(device, action)
    const eventOptions = options || this._ctrl.config.shared.eventOptions
    element.addEventListener(type, handler, eventOptions)
    this._listeners.push(() => element.removeEventListener(type, handler, eventOptions))
  }

  clean() {
    this._listeners.forEach((remove) => remove())
    this._listeners = []
  }
}
