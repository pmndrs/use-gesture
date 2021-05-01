import { Controller, GenericOptions, GestureKey, InternalHandlers, NativeHandlers } from '@use-gesture/core'

interface RecognizerConstructor {
  new (
    target: EventTarget,
    handlers: InternalHandlers,
    config: GenericOptions,
    gestureKey?: GestureKey,
    nativeHandlers?: NativeHandlers
  ): Recognizer
}

export interface Recognizer {
  _gestureKey?: GestureKey
  _ctrl: Controller
  destroy(this: Recognizer): void
}

export const Recognizer: RecognizerConstructor = function (
  this: Recognizer,
  target: EventTarget,
  handlers: InternalHandlers,
  config: GenericOptions,
  gestureKey?: GestureKey,
  nativeHandlers?: NativeHandlers
) {
  this._gestureKey = gestureKey
  this._ctrl = new Controller(handlers)
  this._ctrl.applyHandlers(handlers, nativeHandlers)
  this._ctrl.applyConfig({ ...config, target }, this._gestureKey)

  this._ctrl.effect()
} as any

Recognizer.prototype.destroy = function () {
  this._ctrl.clean()
} as Recognizer['destroy']
