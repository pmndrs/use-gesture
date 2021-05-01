import { toDomEventType } from './utils/events'

interface EventStoreConstructor {
  new (ctrl: any): EventStore
}

export interface EventStore {
  _ctrl: any
  _listeners: (() => void)[]
  clean(this: EventStore): void
  add(
    this: EventStore,
    element: EventTarget,
    device: string,
    action: string,
    handler: EventListenerOrEventListenerObject,
    options?: AddEventListenerOptions
  ): void
}

export const EventStore = (function (this: EventStore, ctrl: any) {
  this._ctrl = ctrl
  this._listeners = []
} as any) as EventStoreConstructor

EventStore.prototype.add = function (element, device, action, handler, options) {
  const type = toDomEventType(device, action)
  const eventOptions = options || this._ctrl._config.shared.eventOptions
  element.addEventListener(type, handler, eventOptions)
  this._listeners.push(() => element.removeEventListener(type, handler, eventOptions))
} as EventStore['add']

EventStore.prototype.clean = function () {
  this._listeners.forEach((remove) => remove())
  this._listeners = []
} as EventStore['clean']
