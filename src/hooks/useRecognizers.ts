/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react'
import Controller from '../Controller'
import {
  InternalConfig,
  HookReturnType,
  InternalHandlers,
  RecognizerClass,
  GenericOptions,
  NativeHandlersPartial,
} from '../types'

import { noop } from '../utils/utils'
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
  classes: RecognizerClass[],
  config: InternalConfig,
  nativeHandlers?: NativeHandlersPartial
): (...args: any[]) => HookReturnType<Config> {
  const controller = React.useMemo(() => new Controller(classes), [])
  controller!.config = config
  controller!.handlers = handlers
  controller!.nativeRefs = nativeHandlers

  React.useEffect(controller.effect, [])

  // @ts-ignore
  if (controller.isDomTargetDefined) return noop
  // @ts-ignore
  return controller.bind
}
