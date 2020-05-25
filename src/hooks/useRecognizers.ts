/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react'
import Controller from '../Controller'
import {
  InternalConfig,
  HookReturnType,
  InternalHandlers,
  GenericOptions,
  RecognizerClass,
  NativeHandlersPartial,
} from '../types'

import DragRecognizer from '../recognizers/DragRecognizer'
import WheelRecognizer from '../recognizers/WheelRecognizer'
import MoveRecognizer from '../recognizers/MoveRecognizer'
import PinchRecognizer from '../recognizers/PinchRecognizer'
import ScrollRecognizer from '../recognizers/ScrollRecognizer'

/**
 * Utility hook called by all gesture hooks and that will be responsible for the internals.
 *
 * @param handlers
 * @param classes
 * @param config
 * @param nativeHandlers - native handlers such as onClick, onMouseDown, etc.
 */
export default function useRecognizers<Config extends Partial<GenericOptions>>(
  handlers: Partial<InternalHandlers>,
  config: InternalConfig,
  nativeHandlers: NativeHandlersPartial = {}
): (...args: any[]) => HookReturnType<Config> {

  const classes = resolveClasses(handlers)

  const controller = React.useMemo(() => new Controller(classes), [])
  controller!.config = config
  controller!.handlers = handlers
  controller!.nativeRefs = nativeHandlers

  React.useEffect(controller.effect, [])

  // @ts-ignore
  if (controller.config.domTarget) return deprecationNoticeForDomTarget
  // @ts-ignore
  return controller.bind
}

function deprecationNoticeForDomTarget() {
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      `Deprecation notice: When the \`domTarget\` option is specified, you don't need to write \`useEffect(bind, [bind])\` anymore: event binding is now made handled internally to this lib.\n\nNext version won't return anything when \`domTarget\` is provided, therefore your code will break if you try to call \`useEffect\`.`
    )
  }
}


function resolveClasses(internalHandlers: Partial<InternalHandlers>) {
  const classes = new Set<RecognizerClass>()

  if (internalHandlers.drag)    classes.add(DragRecognizer)
  if (internalHandlers.wheel)   classes.add(WheelRecognizer)
  if (internalHandlers.scroll)  classes.add(ScrollRecognizer)
  if (internalHandlers.move)    classes.add(MoveRecognizer)
  if (internalHandlers.pinch)   classes.add(PinchRecognizer)
  if (internalHandlers.hover)   classes.add(MoveRecognizer)

  return classes
}