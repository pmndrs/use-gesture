import useRecognizers from './useRecognizers'
import { buildComplexConfig } from './buildConfig'
import { InternalConfig, InternalHandlers, UserHandlers, UseGestureConfig, Handlers } from '../types'

export function wrapStart(fn: Function) {
  return function (this: any, { first }: any) {
    if (first) fn.apply(this, arguments)
  }
}

export function wrapEnd(fn: Function) {
  return function (this: any, { last }: any) {
    if (last) fn.apply(this, arguments)
  }
}

const RE_NOT_NATIVE = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/

function sortHandlers(handlers: Handlers) {
  const native: any = {}
  const handle: any = {}
  const actions = new Set()

  for (let key in handlers) {
    if (RE_NOT_NATIVE.test(key)) {
      actions.add(RegExp.lastMatch)
      handle[key] = (handlers as any)[key]
    } else {
      native[key] = (handlers as any)[key]
    }
  }

  return [handle, native, actions]
}

/**
 * @public
 *
 * The most complete gesture hook, allowing support for multiple gestures.
 *
 * @param {Handlers} handlers - an object with on[Gesture] keys containg gesture handlers
 * @param {UseGestureConfig} [config={}] - the full config object
 * @returns {(...args: any[]) => HookReturnType<Config>}
 */
export function useGesture<Config = UseGestureConfig>(_handlers: Handlers, config: UseGestureConfig = {}) {
  const [handlers, nativeHandlers, actions] = sortHandlers(_handlers)

  const mergedConfig: InternalConfig = buildComplexConfig(config, actions)
  const internalHandlers: Partial<InternalHandlers> = {}

  if (actions.has('onDrag')) internalHandlers.drag = includeStartEndHandlers(handlers, 'onDrag')
  if (actions.has('onWheel')) internalHandlers.wheel = includeStartEndHandlers(handlers, 'onWheel')
  if (actions.has('onScroll')) internalHandlers.scroll = includeStartEndHandlers(handlers, 'onScroll')
  if (actions.has('onMove')) internalHandlers.move = includeStartEndHandlers(handlers, 'onMove')
  if (actions.has('onPinch')) internalHandlers.pinch = includeStartEndHandlers(handlers, 'onPinch')
  if (actions.has('onHover')) internalHandlers.hover = handlers.onHover

  return useRecognizers<Config>(internalHandlers, mergedConfig, nativeHandlers)
}

/**
 * @private
 *
 * This utility function will integrate start and end handlers into the regular
 * handler function by using first and last conditions.
 *
 * @param {UserHandlersPartial} handlers - the handlers function object
 * @param {HandlerKey} handlerKey - the key for which to integrate start and end handlers
 * @returns
 */
type HandlerKey = 'onDrag' | 'onPinch' | 'onWheel' | 'onMove' | 'onScroll' | 'onHover'
function includeStartEndHandlers(handlers: Partial<UserHandlers>, handlerKey: HandlerKey) {
  const startKey = (handlerKey + 'Start') as keyof UserHandlers
  const endKey = (handlerKey + 'End') as keyof UserHandlers

  const fn = (state: any) => {
    let memo: any = undefined
    if (state.first && startKey in handlers) handlers[startKey]!(state)
    if (handlerKey in handlers) memo = handlers[handlerKey]!(state)
    if (state.last && endKey in handlers) handlers[endKey]!(state)
    return memo
  }
  return fn
}
